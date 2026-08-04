import {
  type Configuration,
  type PopupRequest,
  LogLevel,
} from "@azure/msal-browser";

/**
 * Microsoft Entra External ID (CIAM) configuration.
 *
 * Values come from Vite env vars (VITE_* are injected by the Lovable
 * tanstack config). Never hard-code the client id / authority here.
 *
 * For External ID the authority is simply the tenant endpoint —
 * the sign-up/sign-in user flow is bound to the app registration
 * server-side, so MSAL does not reference the B2X_1_ flow name.
 */

const clientId = import.meta.env.VITE_ENTRA_CLIENT_ID as string | undefined;
const authority = import.meta.env.VITE_ENTRA_AUTHORITY as string | undefined;

if (!clientId || !authority) {
  // Surfaces early in dev if the .env is missing, rather than a cryptic
  // MSAL error later.
  console.warn(
    "[auth] VITE_ENTRA_CLIENT_ID or VITE_ENTRA_AUTHORITY is not set. " +
      "Authentication will not work until these are provided in .env",
  );
}

// The ciamlogin.com host must be trusted explicitly for CIAM authorities.
const authorityHost = (() => {
  try {
    return authority ? new URL(authority).host : "";
  } catch {
    return "";
  }
})();

export const msalConfig: Configuration = {
  auth: {
    clientId: clientId ?? "",
    authority: authority ?? "",
    knownAuthorities: authorityHost ? [authorityHost] : [],
    // Where Entra redirects back to after auth. Must match a
    // Single-page application redirect URI on the app registration.
    redirectUri:
      typeof window !== "undefined" ? window.location.origin : "/",
    postLogoutRedirectUri:
      typeof window !== "undefined" ? window.location.origin : "/",
  },
  cache: {
    // sessionStorage keeps tokens scoped to the tab and clears on close —
    // safer default for a CIAM SPA than localStorage.
    cacheLocation: "sessionStorage",
  },
  system: {
    loggerOptions: {
      logLevel: LogLevel.Error,
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        if (level === LogLevel.Error) console.error("[msal]", message);
      },
    },
  },
};

/**
 * Scopes requested at login. "openid" and "profile" yield the ID token
 * (name, email). Add your API's exposed scope here later when the
 * frontend needs to call the Function App with an access token, e.g.
 *   `api://<api-client-id>/access_as_user`
 */
export const loginRequest: PopupRequest = {
  scopes: ["openid", "profile", "email"],
};
