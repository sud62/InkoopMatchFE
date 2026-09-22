/**
 * Copies MSAL's redirect-bridge bundle into public/ so that
 * public/auth-redirect.html can load it as a plain <script>.
 * Runs before `dev` and `build` so the bridge always matches the
 * installed @azure/msal-browser version.
 */
import { copyFileSync, existsSync } from "node:fs";

const src =
  "node_modules/@azure/msal-browser/lib/redirect-bridge/msal-redirect-bridge.min.js";
const dest = "public/msal-redirect-bridge.min.js";

if (!existsSync(src)) {
  console.error(`[copy-msal-bridge] ${src} not found — run npm install first.`);
  process.exit(1);
}

copyFileSync(src, dest);
console.log(`[copy-msal-bridge] updated ${dest}`);
