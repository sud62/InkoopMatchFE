import type { CustomAuthConfiguration } from "@azure/msal-browser/custom-auth";

/**
 * Native ("Custom Auth") config for Microsoft Entra External ID.
 * Sign-up / sign-in run entirely inside our own modal — no redirect.
 *
 * Requires, in the app registration:
 *  - "Enable public client and native authentication" = Yes
 *  - "Allow public client flows" = Yes
 *  - admin consent granted for the app's delegated permissions
 *
 * The native-auth API sends no CORS headers, so all traffic must route
 * through a proxy (authApiProxyUrl) — never point it at ciamlogin.com
 * directly.
 */

const clientId = import.meta.env.VITE_ENTRA_CLIENT_ID as string | undefined;
const authority = import.meta.env.VITE_ENTRA_AUTHORITY as string | undefined;
const authProxyUrl = import.meta.env.VITE_AUTH_PROXY_URL as string | undefined;

if (!clientId || !authority || !authProxyUrl) {
  console.warn(
    "[auth] Missing VITE_ENTRA_CLIENT_ID / VITE_ENTRA_AUTHORITY / " +
      "VITE_AUTH_PROXY_URL. Native authentication will not work until " +
      "these are set in .env.",
  );
}

export const customAuthConfig: CustomAuthConfiguration = {
  auth: {
    clientId: clientId ?? "",
    authority: authority ?? "",
  },
  customAuth: {
    challengeTypes: ["password", "oob", "redirect"],
    authApiProxyUrl: authProxyUrl ?? "",
  },
  cache: {
    cacheLocation: "sessionStorage",
  },
};
