import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  CustomAuthPublicClientApplication,
  type ICustomAuthPublicClientApplication,
  type SignUpCodeRequiredState,
  type SignUpPasswordRequiredState,
  type SignInCodeRequiredState,
  type SignInPasswordRequiredState,
  type CustomAuthAccountData,
  type SignUpError,
  type SignUpSubmitCodeError,
  type SignInError,
  type SignInSubmitCodeError,
  type ResetPasswordCodeRequiredState,
  type ResetPasswordPasswordRequiredState,
  type ResetPasswordError,
  type ResetPasswordSubmitCodeError,
  type ResetPasswordSubmitPasswordError,
} from "@azure/msal-browser/custom-auth";
import {
  AuthError,
  type AccountInfo,
  type AuthenticationResult,
} from "@azure/msal-browser";
import { customAuthConfig } from "./customAuthConfig";
import { syncUser, type UserSyncResult } from "@/lib/api/client";

/**
 * Native auth (email + password + email OTP) driven from our own modal,
 * plus the user-sync handshake that resolves the Entra identity to a
 * real row in the `users` table.
 *
 * Google is the one exception to "everything happens in our modal":
 * Entra's native auth supports local accounts only, so social sign-in
 * runs as a browser-delegated popup (signInWithGoogle below). Both
 * paths write to the same MSAL cache, so getIdToken(), page-reload
 * restore and logout() work unchanged for either kind of account.
 *
 * SDK shape notes (verified against type declarations):
 *  - SignUpResult has NO isCompleted(); completion only appears after
 *    submitCode()/submitPassword() as SignUpCompletedState, which is a
 *    SignInContinuationState — call .signIn() on it to get a session.
 *  - Errors live on the RESULT (`result.error`), not the state.
 *  - completed-state `data` can be optional; we guard.
 */

export type AuthUser = {
  oid: string;
  name: string;
  email: string;
};

/**
 * What happened when the user clicked "Continue with Google". An
 * outcome rather than a thrown error, so the modal can treat "closed
 * the popup" as a non-event instead of an error toast.
 */
export type GoogleSignInOutcome =
  | { status: "success"; profileCompleted: boolean }
  | { status: "cancelled" }
  | { status: "blocked" }
  | { status: "error"; message: string };

const GOOGLE_SCOPES = ["openid", "profile", "email"];

/**
 * Static page (public/auth-redirect.html) that hands the popup's result
 * back to this window. Required by MSAL v5 — see that file. Built from
 * the current origin so www and apex each round-trip to themselves;
 * the bridge talks over BroadcastChannel, which is same-origin only.
 * Every origin used here must be registered as a Single-page
 * application redirect URI on the app registration.
 */
const REDIRECT_BRIDGE_PATH = "/auth-redirect.html";

type PendingSignUpState =
  | { kind: "code"; state: SignUpCodeRequiredState }
  | { kind: "password"; state: SignUpPasswordRequiredState };

type PendingSignInState =
  | { kind: "code"; state: SignInCodeRequiredState }
  | { kind: "password"; state: SignInPasswordRequiredState };

type PendingResetPasswordState =
  | { kind: "code"; state: ResetPasswordCodeRequiredState }
  | { kind: "password"; state: ResetPasswordPasswordRequiredState };

type FlowStep = "idle" | "code" | "password" | "done" | "error";

type AuthContextValue = {
  isReady: boolean;
  isAuthenticated: boolean;
  user: AuthUser | null;

  // From /api/user-sync — the app's own identity + onboarding gate.
  userId: number | null;
  profileCompleted: boolean;
  consentGiven: boolean;
  /**
   * True once the initial /api/user-sync round-trip has finished
   * (success OR failure). Guards MUST wait for this before routing on
   * `profileCompleted` / `consentGiven`, because "false" from those two
   * flags is otherwise ambiguous between "the answer really is no" and
   * "we haven't heard from the backend yet" — and the second one
   * caused users with completed profiles to get bounced to /onboarding.
   */
  syncCompleted: boolean;
  refreshSync: () => Promise<void>;

  getIdToken: () => Promise<string | null>;
  logout: () => Promise<void>;

  signInWithGoogle: () => Promise<GoogleSignInOutcome>;

  signUpStep: FlowStep;
  signUpError: string | null;
  signUpStart: (email: string, password: string, name: string) => Promise<void>;
  submitSignUpCode: (code: string) => Promise<void>;
  resendSignUpCode: () => Promise<void>;
  resetSignUp: () => void;

  signInStep: FlowStep;
  signInError: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  submitSignInCode: (code: string) => Promise<void>;
  resetSignIn: () => void;

  // Password reset: email -> OTP code -> new password -> auto sign-in.
  resetPasswordStep: FlowStep;
  resetPasswordError: string | null;
  resetPasswordStart: (email: string) => Promise<void>;
  submitResetPasswordCode: (code: string) => Promise<void>;
  resendResetPasswordCode: () => Promise<void>;
  submitNewPassword: (password: string) => Promise<void>;
  resetResetPassword: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function accountDataToUser(data: CustomAuthAccountData): AuthUser {
  const account = data.getAccount();
  const claims = (data.getClaims() ?? {}) as Record<string, unknown>;
  return {
    oid: (claims.oid as string) ?? account.localAccountId,
    name: account.name ?? (claims.name as string) ?? "",
    email:
      (claims.email as string) ??
      account.username ??
      (claims.preferred_username as string) ??
      "",
  };
}

/** Same mapping as above, from a plain MSAL account (popup result). */
function msalAccountToUser(account: AccountInfo): AuthUser {
  const claims = (account.idTokenClaims ?? {}) as Record<string, unknown>;
  return {
    oid: (claims.oid as string) ?? account.localAccountId,
    name: account.name ?? (claims.name as string) ?? "",
    email:
      (claims.email as string) ??
      account.username ??
      (claims.preferred_username as string) ??
      "",
  };
}

function describeGoogleError(e: unknown): GoogleSignInOutcome {
  const code = e instanceof AuthError ? e.errorCode : "";
  // Closed the popup, or said no on Google's consent screen.
  if (code === "user_cancelled" || code === "access_denied") {
    return { status: "cancelled" };
  }
  // The browser refused to open the popup at all.
  if (code === "popup_window_error" || code === "empty_window_error") {
    return { status: "blocked" };
  }
  console.error("[auth] Google sign-in failed", e);
  // timed_out almost always means the popup never reached a working
  // redirect bridge — check /auth-redirect.html is being served.
  const message =
    e instanceof AuthError
      ? e.errorMessage || e.errorCode
      : "Something went wrong. Please try again.";
  return { status: "error", message };
}

/**
 * True when an ID token is expired or will be within five minutes.
 * The margin covers clock skew and the request already in flight.
 */
function isIdTokenExpiring(claims: Record<string, unknown> | undefined): boolean {
  const exp = typeof claims?.exp === "number" ? claims.exp : undefined;
  if (!exp) return true;
  return exp * 1000 < Date.now() + 5 * 60 * 1000;
}

function describeSignUpError(err: SignUpError): string {
  if (err.isUserAlreadyExists())
    return "An account with this email already exists. Try signing in instead.";
  if (err.isInvalidPassword())
    return "That password isn't allowed — it may be too common or predictable (e.g. contains a word like \"password\"). Try something less guessable.";
  if (err.isInvalidUsername()) return "That doesn't look like a valid email address.";
  return err.errorData.errorDescription ?? "Something went wrong. Please try again.";
}
function describeSignUpCodeError(err: SignUpSubmitCodeError): string {
  if (err.isInvalidCode()) return "That code isn't right. Check your email and try again.";
  return err.errorData.errorDescription ?? "Something went wrong. Please try again.";
}
function describeSignInError(err: SignInError): string {
  if (err.isUserNotFound()) {
    return "We couldn't find an account with that email. Try signing up instead.";
  }
  if (err.isInvalidUsername()) {
    return "That doesn't look like a valid email address.";
  }
  if (err.isPasswordIncorrect()) {
    return "That password isn't right. Try again or reset your password.";
  }
  if (err.isPasswordResetRequired()) {
    return "You'll need to reset your password before signing in again.";
  }
  if (err.isUnsupportedChallengeType()) {
    return "This account signs in a different way — try 'Continue with Google' instead.";
  }
  return "Couldn't sign in with those details. Please try again.";
}
function describeSignInCodeError(err: SignInSubmitCodeError): string {
  if (err.isInvalidCode()) return "That code isn't right. Check your email and try again.";
  return err.errorData.errorDescription ?? "Something went wrong. Please try again.";
}
function describeResetPasswordError(err: ResetPasswordError): string {
  if (err.isUserNotFound()) {
    return "We couldn't find an account with that email.";
  }
  if (err.isInvalidUsername()) return "That doesn't look like a valid email address.";
  if (err.isUnsupportedChallengeType()) {
    return "This account doesn't use a password — try 'Continue with Google' instead.";
  }
  return err.errorData.errorDescription ?? "Something went wrong. Please try again.";
}
function describeResetPasswordCodeError(err: ResetPasswordSubmitCodeError): string {
  if (err.isInvalidCode()) return "That code isn't right. Check your email and try again.";
  return err.errorData.errorDescription ?? "Something went wrong. Please try again.";
}
function describeResetPasswordPasswordError(err: ResetPasswordSubmitPasswordError): string {
  if (err.isInvalidPassword()) {
    return "That password isn't allowed — it may be too common or predictable. Try something less guessable.";
  }
  if (err.isPasswordResetFailed()) {
    return "That didn't go through — this usually means the new password is too close to one you've used before on this account. Try a genuinely different password.";
  }
  return err.errorData.errorDescription ?? "Something went wrong. Please try again.";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const clientRef = useRef<ICustomAuthPublicClientApplication | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  const [userId, setUserId] = useState<number | null>(null);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [syncCompleted, setSyncCompleted] = useState(false);

  const [signUpStep, setSignUpStep] = useState<FlowStep>("idle");
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const pendingSignUp = useRef<PendingSignUpState | null>(null);

  const [signInStep, setSignInStep] = useState<FlowStep>("idle");
  const [signInError, setSignInError] = useState<string | null>(null);
  const pendingSignIn = useRef<PendingSignInState | null>(null);

  const [resetPasswordStep, setResetPasswordStep] = useState<FlowStep>("idle");
  const [resetPasswordError, setResetPasswordError] = useState<string | null>(null);
  const pendingResetPassword = useRef<PendingResetPasswordState | null>(null);

  // When the token has expired, several API calls can ask for a new one
  // at the same moment. They share a single renewal instead of racing.
  const refreshInFlight = useRef<Promise<string | null> | null>(null);

  const getIdToken = async (): Promise<string | null> => {
    const client = clientRef.current;
    if (!client) return null;
    const accountResult = client.getCurrentAccount();
    if (!accountResult.isCompleted() || !accountResult.data) return null;
    const account = accountResult.data;

    // The token saved at sign-in is only valid for about an hour. Use it
    // while it's fresh; otherwise renew it with the cached refresh token.
    // (Returning it as-is forever is what made every request fail with
    // 401 once a tab had been open for an hour.)
    const cached = account.getIdToken();
    if (
      cached &&
      !isIdTokenExpiring(account.getClaims() as Record<string, unknown> | undefined)
    ) {
      return cached;
    }

    if (!refreshInFlight.current) {
      refreshInFlight.current = (async () => {
        const renewed = await account.getAccessToken({ forceRefresh: true });
        if (renewed.isCompleted() && renewed.data?.idToken) {
          return renewed.data.idToken;
        }
        // No usable refresh token either: the session is over. End it
        // cleanly so the app shows "Sign in", rather than looking signed
        // in while every request is rejected.
        console.warn("[auth] session expired — signing out locally", renewed.error);
        await endLocalSession();
        return null;
      })().finally(() => {
        refreshInFlight.current = null;
      });
    }
    return refreshInFlight.current;
  };

  /** Call /api/user-sync and store the resulting identity + gate. */
  const runSync = async (emailHint?: string): Promise<boolean | null> => {
    try {
      const token = await getIdToken();
      if (!token) return null;
      // Dev-only: lets the mock API key onboarding state per-user so a
      // new signup in the same browser doesn't inherit a prior user's
      // "onboarded" flag. Harmless when real endpoints are used.
      const email = emailHint ?? user?.email;
      if (typeof window !== "undefined" && email) {
        window.sessionStorage.setItem("mock.currentEmail", email);
      }
      const result: UserSyncResult = await syncUser(token);
      setUserId(result.userId);
      setProfileCompleted(result.profileCompleted);
      setConsentGiven(result.consentGiven);
      return result.profileCompleted;
    } catch (e) {
      console.error("[auth] user-sync failed", e);
      return null;
    } finally {
      // Always flip this — even on failure — so guards can make a
      // decision either way. Blocking forever on a failed sync is
      // worse than routing on the last-known-good values.
      setSyncCompleted(true);
    }
  };

  const refreshSync = async () => {
    await runSync();
  };

  useEffect(() => {
    let cancelled = false;
    CustomAuthPublicClientApplication.create(customAuthConfig)
      .then(async (client) => {
        if (cancelled) return;
        clientRef.current = client;
        // The library that answers "who is signed in?" just takes the
        // FIRST cached account. With more than one cached, an earlier
        // session wasn't cleaned up and there's no reliable way to tell
        // which is current — so start clean rather than guess wrong.
        if (client.getAllAccounts().length > 1) {
          await client.clearCache();
          client.setActiveAccount(null);
        }
        const accountResult = client.getCurrentAccount();
        if (accountResult.isCompleted() && accountResult.data) {
          const u0 = accountDataToUser(accountResult.data);
          setUser(u0);
          await runSync(u0.email);
        }
        setIsReady(true);
      })
      .catch((e) => {
        console.error("[auth] init failed", e);
        setIsReady(true);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Sign-up ──────────────────────────────────────────────────────
  const resetSignUp = () => {
    setSignUpStep("idle");
    setSignUpError(null);
    pendingSignUp.current = null;
  };

  async function finishSignUpWithSignIn(state: {
    signIn: () => Promise<{ isCompleted: () => boolean; data?: CustomAuthAccountData }>;
  }) {
    const signInResult = await state.signIn();
    if (signInResult.isCompleted() && signInResult.data) {
      const u1 = accountDataToUser(signInResult.data);
      setUser(u1);
      await runSync(u1.email);
    }
    setSignUpStep("done");
    pendingSignUp.current = null;
  }

  const signUpStart = async (email: string, password: string, name: string) => {
    const client = clientRef.current;
    if (!client) throw new Error("Auth not ready");
    setSignUpError(null);
    try {
      const result = await client.signUp({
        username: email,
        password,
        attributes: { displayName: name, givenName: name },
      });
      if (result.isCodeRequired()) {
        pendingSignUp.current = { kind: "code", state: result.state };
        setSignUpStep("code");
      } else if (result.isPasswordRequired()) {
        pendingSignUp.current = { kind: "password", state: result.state };
        setSignUpStep("password");
      } else if (result.isAttributesRequired()) {
        setSignUpError(
          "This account needs additional details we don't collect yet. Please contact support.",
        );
        setSignUpStep("error");
      } else if (result.isFailed() && result.error) {
        setSignUpError(describeSignUpError(result.error));
        setSignUpStep("error");
      }
    } catch (e) {
      console.error("[auth] signUp failed", e);
      setSignUpError(e instanceof Error ? e.message : "Something went wrong.");
      setSignUpStep("error");
    }
  };

  const submitSignUpCode = async (code: string) => {
    const pending = pendingSignUp.current;
    if (!pending || pending.kind !== "code") {
      setSignUpError("Session expired — please start again.");
      setSignUpStep("error");
      return;
    }
    setSignUpError(null);
    try {
      const result = await pending.state.submitCode(code);
      if (result.isCompleted()) {
        await finishSignUpWithSignIn(result.state);
      } else if (result.isPasswordRequired()) {
        pendingSignUp.current = { kind: "password", state: result.state };
        setSignUpStep("password");
      } else if (result.isAttributesRequired()) {
        setSignUpError(
          "This account needs additional details we don't collect yet. Please contact support.",
        );
      } else if (result.isFailed() && result.error) {
        setSignUpError(describeSignUpCodeError(result.error));
      }
    } catch (e) {
      console.error("[auth] submitSignUpCode failed", e);
      setSignUpError(e instanceof Error ? e.message : "Something went wrong.");
    }
  };

  const resendSignUpCode = async () => {
    const pending = pendingSignUp.current;
    if (!pending || pending.kind !== "code") return;
    try {
      await pending.state.resendCode();
    } catch (e) {
      console.error("[auth] resendSignUpCode failed", e);
      setSignUpError("Couldn't resend the code. Please try again in a moment.");
    }
  };

  // ── Sign-in ──────────────────────────────────────────────────────
  const resetSignIn = () => {
    setSignInStep("idle");
    setSignInError(null);
    pendingSignIn.current = null;
  };

  const signIn = async (email: string, password: string) => {
    const client = clientRef.current;
    if (!client) throw new Error("Auth not ready");
    setSignInError(null);
    try {
      const result = await client.signIn({ username: email, password });
      if (result.isCompleted() && result.data) {
        const u = accountDataToUser(result.data);
        setUser(u);
        await runSync(u.email);
        setSignInStep("done");
      } else if (result.isCodeRequired()) {
        pendingSignIn.current = { kind: "code", state: result.state };
        setSignInStep("code");
      } else if (result.isPasswordRequired()) {
        pendingSignIn.current = { kind: "password", state: result.state };
        setSignInStep("password");
      } else if (result.isFailed() && result.error) {
        setSignInError(describeSignInError(result.error));
        setSignInStep("error");
      } else {
        setSignInError("This account requires an additional step we don't support yet.");
        setSignInStep("error");
      }
    } catch (e) {
      console.error("[auth] signIn failed", e);
      setSignInError(e instanceof Error ? e.message : "Something went wrong.");
      setSignInStep("error");
    }
  };

  const submitSignInCode = async (code: string) => {
    const pending = pendingSignIn.current;
    if (!pending || pending.kind !== "code") {
      setSignInError("Session expired — please start again.");
      setSignInStep("error");
      return;
    }
    setSignInError(null);
    try {
      const result = await pending.state.submitCode(code);
      if (result.isCompleted() && result.data) {
        const u = accountDataToUser(result.data);
        setUser(u);
        await runSync(u.email);
        setSignInStep("done");
        pendingSignIn.current = null;
      } else if (result.isFailed() && result.error) {
        setSignInError(describeSignInCodeError(result.error));
      }
    } catch (e) {
      console.error("[auth] submitSignInCode failed", e);
      setSignInError(e instanceof Error ? e.message : "Something went wrong.");
    }
  };

  // ── Reset password ───────────────────────────────────────────────
  const resetResetPassword = () => {
    setResetPasswordStep("idle");
    setResetPasswordError(null);
    pendingResetPassword.current = null;
  };

  const resetPasswordStart = async (email: string) => {
    const client = clientRef.current;
    if (!client) throw new Error("Auth not ready");
    setResetPasswordError(null);
    try {
      const result = await client.resetPassword({ username: email });
      if (result.isCodeRequired()) {
        pendingResetPassword.current = { kind: "code", state: result.state };
        setResetPasswordStep("code");
      } else if (result.isFailed() && result.error) {
        setResetPasswordError(describeResetPasswordError(result.error));
        setResetPasswordStep("error");
      }
    } catch (e) {
      console.error("[auth] resetPassword failed", e);
      setResetPasswordError(e instanceof Error ? e.message : "Something went wrong.");
      setResetPasswordStep("error");
    }
  };

  const submitResetPasswordCode = async (code: string) => {
    const pending = pendingResetPassword.current;
    if (!pending || pending.kind !== "code") {
      setResetPasswordError("Session expired — please start again.");
      setResetPasswordStep("error");
      return;
    }
    setResetPasswordError(null);
    try {
      const result = await pending.state.submitCode(code);
      if (result.isPasswordRequired()) {
        pendingResetPassword.current = { kind: "password", state: result.state };
        setResetPasswordStep("password");
      } else if (result.isFailed() && result.error) {
        setResetPasswordError(describeResetPasswordCodeError(result.error));
      }
    } catch (e) {
      console.error("[auth] submitResetPasswordCode failed", e);
      setResetPasswordError(e instanceof Error ? e.message : "Something went wrong.");
    }
  };

  const resendResetPasswordCode = async () => {
    const pending = pendingResetPassword.current;
    if (!pending || pending.kind !== "code") return;
    try {
      await pending.state.resendCode();
    } catch (e) {
      console.error("[auth] resendResetPasswordCode failed", e);
      setResetPasswordError("Couldn't resend the code. Please try again in a moment.");
    }
  };

  const submitNewPassword = async (password: string) => {
    const pending = pendingResetPassword.current;
    if (!pending || pending.kind !== "password") {
      setResetPasswordError("Session expired — please start again.");
      setResetPasswordStep("error");
      return;
    }
    setResetPasswordError(null);
    try {
      const result = await pending.state.submitNewPassword(password);
      if (result.isCompleted()) {
        // ResetPasswordCompletedState extends SignInContinuationState —
        // same pattern as sign-up completion: call .signIn() to get a
        // real session on the account whose password was just reset.
        const signInResult = await result.state.signIn();
        if (signInResult.isCompleted() && signInResult.data) {
          const u = accountDataToUser(signInResult.data);
          setUser(u);
          await runSync(u.email);
        }
        setResetPasswordStep("done");
        pendingResetPassword.current = null;
      } else if (result.isFailed() && result.error) {
        setResetPasswordError(describeResetPasswordPasswordError(result.error));
      }
    } catch (e) {
      console.error("[auth] submitNewPassword failed", e);
      setResetPasswordError(e instanceof Error ? e.message : "Something went wrong.");
    }
  };

  // ── Google (browser-delegated popup) ─────────────────────────────
  const signInWithGoogle = async (): Promise<GoogleSignInOutcome> => {
    const client = clientRef.current;
    if (!client) {
      return { status: "error", message: "Sign-in is still loading. Try again in a moment." };
    }

    // Drop any leftover active account. With prompt=login (below), MSAL
    // turns the active account into a login_hint, and domain_hint plus
    // login_hint breaks repeat sign-ins (AADSTS165000). Synchronous, so
    // it doesn't delay the popup.
    client.setActiveAccount(null);

    let result: AuthenticationResult;
    try {
      // Nothing may be awaited before this call. Browsers only allow a
      // popup inside the click that triggered it — a single await in
      // between and it gets silently blocked.
      result = await client.loginPopup({
        scopes: GOOGLE_SCOPES,
        redirectUri: `${window.location.origin}${REDIRECT_BRIDGE_PATH}`,
        // Capital G matters: "Google" goes straight to Google's account
        // picker; "google" fails with AADSTS90023 and "google.com"
        // still shows Microsoft's page first. Do NOT add login_hint
        // alongside it — that combination breaks repeat sign-ins
        // (AADSTS165000).
        domainHint: "Google",
        // "login", not "select_account": select_account makes Entra show
        // its own sign-in page, overriding domain_hint. login goes
        // straight to Google AND forces a fresh sign-in, so a shared
        // computer can't silently reuse the previous person's session.
        prompt: "login",
      });
    } catch (e) {
      return describeGoogleError(e);
    }

    if (!result.account) {
      return { status: "error", message: "Google sign-in returned no account." };
    }
    // Keep only the account that just signed in. Anything left over from
    // an earlier session would otherwise be picked as "current" (it's
    // always the first cached account), and the app would sync — and
    // route — as the wrong person.
    const keep = result.account.homeAccountId;
    for (const other of client.getAllAccounts()) {
      if (other.homeAccountId !== keep) {
        await client.clearCache({ account: other });
      }
    }
    client.setActiveAccount(result.account);
    const u = msalAccountToUser(result.account);
    setUser(u);
    const profileCompleted = await runSync(u.email);
    return { status: "success", profileCompleted: profileCompleted ?? false };
  };

  /** Forget every cached account and reset auth state (this device only). */
  const endLocalSession = async () => {
    const client = clientRef.current;
    if (client) {
      try {
        await client.clearCache();
      } catch (e) {
        console.error("[auth] clearing the token cache failed", e);
      }
      client.setActiveAccount(null);
    }
    setUser(null);
    setUserId(null);
    setProfileCompleted(false);
    setConsentGiven(false);
    setSyncCompleted(false);
  };

  const logout = async () => {
    const client = clientRef.current;
    if (!client) return;
    const accountResult = client.getCurrentAccount();
    if (accountResult.isCompleted() && accountResult.data) {
      await accountResult.data.signOut();
    }
    // signOut() removes a single account. Clear everything, so no stale
    // account is left to be picked up as "current" next time.
    await endLocalSession();
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      isReady,
      isAuthenticated: user !== null,
      user,
      userId,
      profileCompleted,
      consentGiven,
      syncCompleted,
      refreshSync,
      getIdToken,
      logout,
      signInWithGoogle,
      signUpStep,
      signUpError,
      signUpStart,
      submitSignUpCode,
      resendSignUpCode,
      resetSignUp,
      signInStep,
      signInError,
      signIn,
      submitSignInCode,
      resetSignIn,
      resetPasswordStep,
      resetPasswordError,
      resetPasswordStart,
      submitResetPasswordCode,
      resendResetPasswordCode,
      submitNewPassword,
      resetResetPassword,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      isReady,
      user,
      userId,
      profileCompleted,
      consentGiven,
      syncCompleted,
      signUpStep,
      signUpError,
      signInStep,
      signInError,
      resetPasswordStep,
      resetPasswordError,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
