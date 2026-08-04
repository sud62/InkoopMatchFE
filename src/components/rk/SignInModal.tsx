import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

type View = "signin" | "signup" | "verify" | "forgot" | "forgot-code" | "forgot-newpassword";

export function SignInModal({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("signin");
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState("");
  const [verifyingFlow, setVerifyingFlow] = useState<"signup" | "signin" | null>(null);

  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const notImplemented = (what: string) =>
    toast(`${what} is not connected yet`, { description: "Coming soon." });

  const resetAll = () => {
    setView("signin");
    setName("");
    setEmail("");
    setPassword("");
    setNewPassword("");
    setCode("");
    setVerifyingFlow(null);
    auth.resetSignUp();
    auth.resetSignIn();
    auth.resetResetPassword();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.isReady) {
      toast("Still loading", { description: "Give it a second and try again." });
      return;
    }
    setSubmitting(true);
    try {
      if (view === "signup") await auth.signUpStart(email, password, name);
      else if (view === "signin") await auth.signIn(email, password);
      else if (view === "verify") {
        if (verifyingFlow === "signup") await auth.submitSignUpCode(code);
        else if (verifyingFlow === "signin") await auth.submitSignInCode(code);
      } else if (view === "forgot") {
        await auth.resetPasswordStart(email);
      } else if (view === "forgot-code") {
        await auth.submitResetPasswordCode(code);
      } else if (view === "forgot-newpassword") {
        await auth.submitNewPassword(newPassword);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const activeStep =
    view === "signup" ? auth.signUpStep : view === "signin" ? auth.signInStep : null;
  const flowError =
    view === "signup" ? auth.signUpError : view === "signin" ? auth.signInError : null;

  useEffect(() => {
    if (activeStep === "code" && view !== "verify") {
      setVerifyingFlow(view === "signup" ? "signup" : "signin");
      setCode("");
      setView("verify");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  useEffect(() => {
    if (activeStep === "done") {
      setOpen(false);
      resetAll();
      navigate({ to: auth.profileCompleted ? "/dashboard" : "/onboarding" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  // Reset-password flow: email -> code -> new password -> auto
  // sign-in, real end to end via the native-auth SDK's resetPassword
  // flow (previously this whole path was a "coming soon" stub with no
  // real functionality behind it).
  useEffect(() => {
    if (auth.resetPasswordStep === "code" && view === "forgot") {
      setCode("");
      setView("forgot-code");
    } else if (auth.resetPasswordStep === "password" && view === "forgot-code") {
      setNewPassword("");
      setView("forgot-newpassword");
    } else if (auth.resetPasswordStep === "done") {
      setOpen(false);
      resetAll();
      toast("Password updated", { description: "You're signed in with your new password." });
      navigate({ to: auth.profileCompleted ? "/dashboard" : "/onboarding" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.resetPasswordStep]);

  const verifyError =
    verifyingFlow === "signup"
      ? auth.signUpError
      : verifyingFlow === "signin"
        ? auth.signInError
        : null;

  const resendCode = async () => {
    if (verifyingFlow !== "signup") return;
    await auth.resendSignUpCode();
    toast("Code resent", { description: "Check your email for the new code." });
  };

  const resendResetCode = async () => {
    await auth.resendResetPasswordCode();
    toast("Code resent", { description: "Check your email for the new code." });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) resetAll();
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="auth-card" style={{ maxWidth: 460 }}>
        {(view === "verify" || view === "forgot-code") && (
          <div className="mail-mark" aria-hidden="true">✉</div>
        )}

        <p className="section-kicker">
          {view === "signin" && t("auth.welcomeBack")}
          {view === "signup" && t("auth.createAccount")}
          {view === "verify" && t("auth.checkEmail")}
          {view === "forgot" && t("auth.resetPassword")}
          {view === "forgot-code" && t("auth.checkEmail")}
          {view === "forgot-newpassword" && t("auth.chooseNewPasswordTitle")}
        </p>
        <h1>
          {view === "signin" && t("auth.welcomeBack")}
          {view === "signup" && t("auth.createAccount")}
          {view === "verify" && t("auth.checkEmail")}
          {view === "forgot" && t("auth.resetPassword")}
          {view === "forgot-code" && t("auth.checkEmail")}
          {view === "forgot-newpassword" && t("auth.chooseNewPasswordTitle")}
        </h1>
        <p>
          {view === "signin" && t("auth.signInSubtitle")}
          {view === "signup" && t("auth.signUpSubtitle")}
          {view === "verify" && (
            <>We sent a code to <strong>{email}</strong>. Enter it below.</>
          )}
          {view === "forgot" && t("auth.forgotSubtitle")}
          {view === "forgot-code" && (
            <>We sent a code to <strong>{email}</strong>. Enter it below.</>
          )}
          {view === "forgot-newpassword" && t("auth.chooseNewPasswordSubtitle")}
        </p>

        {(view === "signin" || view === "signup") && (
          <button
            type="button"
            className="button button-outline"
            style={{ width: "100%", marginBottom: 14 }}
            onClick={() => notImplemented("Google sign-in")}
            disabled={submitting}
          >
            {t("auth.continueWithGoogle")}
          </button>
        )}

        <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
          {view === "signup" && (
            <div style={{ marginBottom: 14 }}>
              <label htmlFor="name" style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 5 }}>
                {t("auth.fullName")}
              </label>
              <input
                id="name"
                required
                placeholder="Ada Lovelace"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid var(--line)" }}
              />
            </div>
          )}

          {(view === "signin" || view === "signup" || view === "forgot") && (
            <div style={{ marginBottom: 14 }}>
              <label htmlFor="email" style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 5 }}>
                {t("auth.email")}
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid var(--line)" }}
              />
            </div>
          )}

          {(view === "signin" || view === "signup") && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <label htmlFor="password" style={{ fontSize: 13, fontWeight: 700, marginBottom: 5 }}>
                  {t("auth.password")}
                </label>
                {view === "signin" && (
                  <button type="button" onClick={() => { auth.resetResetPassword(); setView("forgot"); }} style={{ fontSize: 12, color: "var(--green)" }}>
                    {t("auth.forgotPassword")}
                  </button>
                )}
              </div>
              <div style={{ position: "relative" }}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: "100%", padding: "12px 40px 12px 14px", borderRadius: 12, border: "1px solid var(--line)" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
              {view === "signup" && (
                <p className="auth-note">{t("auth.passwordHint")}</p>
              )}
            </div>
          )}

          {view === "verify" && (
            <div style={{ marginBottom: 14 }}>
              <label htmlFor="code" style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 5 }}>
                {t("auth.verificationCode")}
              </label>
              <input
                id="code"
                required
                inputMode="numeric"
                autoFocus
                placeholder="12345678"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid var(--line)", textAlign: "center" }}
              />
              {verifyingFlow === "signup" && (
                <button type="button" onClick={resendCode} className="resend">
                  {t("auth.resendCode")}
                </button>
              )}
            </div>
          )}

          {view === "forgot-code" && (
            <div style={{ marginBottom: 14 }}>
              <label htmlFor="reset-code" style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 5 }}>
                {t("auth.verificationCode")}
              </label>
              <input
                id="reset-code"
                required
                inputMode="numeric"
                autoFocus
                placeholder="12345678"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid var(--line)", textAlign: "center" }}
              />
              <button type="button" onClick={resendResetCode} className="resend">
                {t("auth.resendCode")}
              </button>
            </div>
          )}

          {view === "forgot-newpassword" && (
            <div style={{ marginBottom: 14 }}>
              <label htmlFor="new-password" style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 5 }}>
                {t("settings.newPassword")}
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  autoFocus
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{ width: "100%", padding: "12px 40px 12px 14px", borderRadius: 12, border: "1px solid var(--line)" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
              <p className="auth-note">{t("auth.passwordHint")}</p>
            </div>
          )}

          {(view === "verify"
            ? verifyError
            : view === "forgot" || view === "forgot-code" || view === "forgot-newpassword"
              ? auth.resetPasswordError
              : flowError) && (
            <p style={{ color: "#b3442f", fontSize: 13, marginBottom: 12 }}>
              {view === "verify"
                ? verifyError
                : view === "forgot" || view === "forgot-code" || view === "forgot-newpassword"
                  ? auth.resetPasswordError
                  : flowError}
            </p>
          )}

          <button type="submit" className="button button-primary auth-button" disabled={submitting}>
            {view === "signin" && t("auth.signInButton")}
            {view === "signup" && t("auth.createAccountButton")}
            {view === "verify" && t("auth.verifyButton")}
            {view === "forgot" && t("auth.sendResetLink")}
            {view === "forgot-code" && t("auth.verifyButton")}
            {view === "forgot-newpassword" && t("settings.updatePassword")}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: 13, color: "var(--muted)", marginTop: 16 }}>
          {view === "signin" && (
            <>
              {t("auth.noAccount")}{" "}
              <button type="button" onClick={() => { auth.resetSignIn(); setView("signup"); }} style={{ fontWeight: 700, color: "var(--ink)" }}>
                {t("auth.signUpLink")}
              </button>
            </>
          )}
          {view === "signup" && (
            <>
              {t("auth.haveAccount")}{" "}
              <button type="button" onClick={() => { auth.resetSignUp(); setView("signin"); }} style={{ fontWeight: 700, color: "var(--ink)" }}>
                {t("auth.signInLink")}
              </button>
            </>
          )}
          {view === "verify" && (
            <button type="button" onClick={() => { setView(verifyingFlow === "signup" ? "signup" : "signin"); setVerifyingFlow(null); }} style={{ fontWeight: 700, color: "var(--ink)" }}>
              {t("auth.back")}
            </button>
          )}
          {(view === "forgot" || view === "forgot-code" || view === "forgot-newpassword") && (
            <button type="button" onClick={() => { auth.resetResetPassword(); setView("signin"); }} style={{ fontWeight: 700, color: "var(--ink)" }}>
              {t("auth.backToSignIn")}
            </button>
          )}
        </p>
      </DialogContent>
    </Dialog>
  );
}
