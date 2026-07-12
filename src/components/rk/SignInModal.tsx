import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

type View = "signin" | "signup" | "forgot";

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.6 6.3 29 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5c10.9 0 19.5-8 19.5-19.5 0-1.2-.1-2.4-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.4 19 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.6 6.3 29 4.5 24 4.5 16.3 4.5 9.7 8.8 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 43.5c5 0 9.5-1.7 13-4.6l-6-5.1c-2 1.4-4.5 2.2-7 2.2-5.2 0-9.6-3.1-11.3-7.5l-6.5 5C9.5 39.2 16.2 43.5 24 43.5z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.8l6 5.1c-.4.4 6.5-4.8 6.5-14.9 0-1.2-.1-2.4-.4-3.5z"/>
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#F25022" d="M1 1h10v10H1z"/>
      <path fill="#7FBA00" d="M13 1h10v10H13z"/>
      <path fill="#00A4EF" d="M1 13h10v10H1z"/>
      <path fill="#FFB900" d="M13 13h10v10H13z"/>
    </svg>
  );
}

export function SignInModal({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("signin");
  const [loading, setLoading] = useState(false);

  const notImplemented = (what: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast(`${what} is not connected yet`, {
        description: "Enable a backend to activate authentication.",
      });
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    notImplemented(
      view === "signin" ? "Sign in" : view === "signup" ? "Sign up" : "Password reset"
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setView("signin");
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {view === "signin" && "Welcome back"}
            {view === "signup" && "Create your account"}
            {view === "forgot" && "Reset your password"}
          </DialogTitle>
          <DialogDescription>
            {view === "signin" && "Sign in to InkoopMatch to see your matches."}
            {view === "signup" && "Join InkoopMatch and get matched to EU projects."}
            {view === "forgot" && "We'll email you a link to reset your password."}
          </DialogDescription>
        </DialogHeader>

        {view !== "forgot" && (
          <>
            <div className="grid gap-2">
              <Button
                type="button"
                variant="outline"
                className="w-full justify-center gap-2"
                onClick={() => notImplemented("Google sign-in")}
                disabled={loading}
              >
                <GoogleIcon />
                Continue with Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-center gap-2"
                onClick={() => notImplemented("Microsoft sign-in")}
                disabled={loading}
              >
                <MicrosoftIcon />
                Continue with Microsoft
              </Button>
            </div>

            <div className="relative my-2">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-[11px] uppercase tracking-wider text-[color:var(--text-tertiary)]">
                or
              </span>
            </div>
          </>
        )}

        <form onSubmit={handleSubmit} className="grid gap-3">
          {view === "signup" && (
            <div className="grid gap-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" required placeholder="Ada Lovelace" />
            </div>
          )}
          <div className="grid gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required placeholder="you@company.com" />
          </div>
          {view !== "forgot" && (
            <div className="grid gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {view === "signin" && (
                  <button
                    type="button"
                    onClick={() => setView("forgot")}
                    className="text-[12px] text-[color:var(--olive)] hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <Input id="password" type="password" required minLength={8} placeholder="••••••••" />
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {view === "signin" && "Sign in"}
            {view === "signup" && "Create account"}
            {view === "forgot" && "Send reset link"}
          </Button>
        </form>

        <div className="text-center text-[13px] text-[color:var(--text-secondary)]">
          {view === "signin" && (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setView("signup")}
                className="font-medium text-foreground hover:underline"
              >
                Sign up
              </button>
            </>
          )}
          {view === "signup" && (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setView("signin")}
                className="font-medium text-foreground hover:underline"
              >
                Sign in
              </button>
            </>
          )}
          {view === "forgot" && (
            <button
              type="button"
              onClick={() => setView("signin")}
              className="font-medium text-foreground hover:underline"
            >
              Back to sign in
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
