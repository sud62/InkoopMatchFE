/**
 * Local CORS proxy for Entra External ID native authentication.
 *
 * The native-auth API (ciamlogin.com) does not return CORS headers, so
 * a browser SPA cannot call it directly — every request must go
 * through a proxy that adds those headers. This is Microsoft's own
 * documented pattern for local dev:
 *   https://learn.microsoft.com/entra/identity-platform/how-to-native-authentication-single-page-app-javascript-sdk-set-up-local-cors
 *
 * DEV ONLY. For production, deploy the equivalent as a route on the
 * existing Azure Function App instead of running this script — see
 * /server/README.md.
 *
 * Run:  node cors.js
 * Then set VITE_AUTH_PROXY_URL=http://localhost:3001/api in .env
 */

const http = require("http");
const https = require("https");
const { URL } = require("url");
const proxyConfig = require("./proxy.config.cjs");

const PORT = 3001;

// Headers the native-auth SDK attaches for telemetry/client identification.
// These must be explicitly allowed or the SDK's requests get blocked by
// the browser's CORS preflight.
const extraHeaders = [
  "x-client-SKU",
  "x-client-VER",
  "x-client-OS",
  "x-client-CPU",
  "x-client-current-telemetry",
  "x-client-last-telemetry",
  "client-request-id",
];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, " + extraHeaders.join(", "),
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Max-Age": "86400",
};

const targetHost = new URL(proxyConfig.proxy).hostname;

http
  .createServer((req, res) => {
    if (req.method === "OPTIONS") {
      res.writeHead(204, corsHeaders);
      res.end();
      return;
    }

    if (!req.url.startsWith(proxyConfig.localApiPath)) {
      res.writeHead(404, corsHeaders);
      res.end(JSON.stringify({ error: "not found" }));
      return;
    }

    const forwardPath = req.url.slice(proxyConfig.localApiPath.length) || "/";
    const targetUrl = proxyConfig.proxy + forwardPath;

    console.log(`[cors-proxy] ${req.method} ${req.url} -> ${targetUrl}`);

    const proxyReq = https.request(
      targetUrl,
      {
        method: req.method,
        headers: { ...req.headers, host: targetHost },
      },
      (proxyRes) => {
        // Buffer the full response instead of piping it through.
        // Piping streams end-to-end can silently truncate under some
        // header/chunking combinations (which is what we suspect
        // happened before); buffering removes that whole class of bug
        // and lets us log exactly what came back for diagnosis.
        const chunks = [];
        proxyRes.on("data", (chunk) => chunks.push(chunk));
        proxyRes.on("end", () => {
          const body = Buffer.concat(chunks);

          console.log(
            `[cors-proxy] <- ${proxyRes.statusCode} ${req.url} ` +
            `(${body.length} bytes) ${body.slice(0, 300).toString("utf8")}`,
          );

          const forwardHeaders = { ...proxyRes.headers };
          delete forwardHeaders["content-length"];
          delete forwardHeaders["transfer-encoding"];
          delete forwardHeaders["connection"];
          delete forwardHeaders["keep-alive"];

          res.writeHead(proxyRes.statusCode, {
            ...forwardHeaders,
            ...corsHeaders,
            "content-length": Buffer.byteLength(body),
          });
          res.end(body);
        });
      },
    );

    proxyReq.on("error", (err) => {
      console.error("[cors-proxy] upstream error:", err.message);
      res.writeHead(502, corsHeaders);
      res.end(JSON.stringify({ error: "proxy upstream error" }));
    });

    req.pipe(proxyReq, { end: true });
  })
  .listen(PORT, () => {
    console.log(`[cors-proxy] listening on http://localhost:${PORT}${proxyConfig.localApiPath}`);
    console.log(`[cors-proxy] forwarding to ${proxyConfig.proxy}`);
  });