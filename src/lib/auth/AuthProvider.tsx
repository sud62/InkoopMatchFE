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
import { customAuthConfig } from "./customAuthConfig";
import { syncUser, type UserSyncResult } from "@/lib/api/client";

/**
 * Native auth (email + password + email OTP) driven from our own modal,
 * plus the user-sync handshake that resolves the Entra identity to a
 * real row in the `users` table.
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
  refreshSync: () => Promise<void>;

  getIdToken: () => Promise<string | null>;
  logout: () => Promise<void>;

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
      account.username ??
      (claims.email as string) ??
      (claims.preferred_username as string) ??
      "",
  };
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
    return "This account signs in a different way — try 'Continue with Google' or 'Continue with Microsoft'.";
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
    return "This account can't reset its password this way — try 'Continue with Google' or 'Continue with Microsoft'.";
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

  const [signUpStep, setSignUpStep] = useState<FlowStep>("idle");
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const pendingSignUp = useRef<PendingSignUpState | null>(null);

  const [signInStep, setSignInStep] = useState<FlowStep>("idle");
  const [signInError, setSignInError] = useState<string | null>(null);
  const pendingSignIn = useRef<PendingSignInState | null>(null);

  const [resetPasswordStep, setResetPasswordStep] = useState<FlowStep>("idle");
  const [resetPasswordError, setResetPasswordError] = useState<string | null>(null);
  const pendingResetPassword = useRef<PendingResetPasswordState | null>(null);

  const getIdToken = async (): Promise<string | null> => {
    const client = clientRef.current;
    if (!client) return null;
    const accountResult = client.getCurrentAccount();
    if (!accountResult.isCompleted() || !accountResult.data) return null;
    return accountResult.data.getIdToken() ?? null;
  };

  /** Call /api/user-sync and store the resulting identity + gate. */
  const runSync = async (emailHint?: string) => {
    try {
      const token = await getIdToken();
      if (!token) return;
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
    } catch (e) {
      console.error("[auth] user-sync failed", e);
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

  const logout = async () => {
    const client = clientRef.current;
    if (!client) return;
    const accountResult = client.getCurrentAccount();
    if (accountResult.isCompleted() && accountResult.data) {
      await accountResult.data.signOut();
    }
    setUser(null);
    setUserId(null);
    setProfileCompleted(false);
    setConsentGiven(false);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      isReady,
      isAuthenticated: user !== null,
      user,
      userId,
      profileCompleted,
      consentGiven,
      refreshSync,
      getIdToken,
      logout,
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
