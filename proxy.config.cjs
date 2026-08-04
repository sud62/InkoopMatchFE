// Local CORS proxy config — dev only. See ./cors.js.
// `proxy` is your Entra External ID tenant's native-auth endpoint root.
// `localApiPath` is what the frontend calls (VITE_AUTH_PROXY_URL below).
module.exports = {
  proxy: "https://InkoopMatch.ciamlogin.com/InkoopMatch.onmicrosoft.com",
  localApiPath: "/api",
};
