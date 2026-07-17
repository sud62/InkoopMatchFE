
## Goal

After a user signs in (or signs up) via the SignInModal, land them on the screen shown in the screenshot — the existing `/match` page — and update the top nav to reflect the signed-in state (name + avatar + Sign out) instead of the "Sign in" button.

Auth stays UI-only (no Lovable Cloud yet), simulated with a lightweight client-side session.

## Changes

1. **Client-side session helper** — `src/lib/rk/session.ts`
   - `getSession()`, `signIn({ name, email })`, `signOut()` backed by `localStorage` (key `im.session`).
   - Tiny `useSession()` hook subscribing to a `storage`/custom event so the nav re-renders on login/logout.

2. **SignInModal** — `src/components/rk/SignInModal.tsx`
   - On submit of Sign in / Sign up / Google / Microsoft buttons: call `signIn(...)` with a derived display name (from email local-part, or "Sudhanshu" for social mocks), close the modal, then `navigate({ to: "/match" })`.
   - Keep "Forgot password" as-is (toast).

3. **Nav** — `src/components/rk/Shell.tsx`
   - Use `useSession()`. If signed in: render `{name}` + circular avatar initial + a "Sign out" pill button (calls `signOut()` and navigates to `/`). If signed out: keep the current `<SignInModal>` trigger.
   - Matches the screenshot's top-right: "Sudhanshu · S · Sign out".

4. **Default post-login destination**
   - Modal always sends users to `/match` after auth (per the screenshot). `/dashboard` remains reachable directly.

## Out of scope

- No real auth backend, no protected routes / redirects for direct URL access (can add later with Lovable Cloud).
- No changes to the matches UI itself — the screenshot's page already exists at `/match`.
