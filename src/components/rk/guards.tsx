import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth/AuthProvider";

/**
 * Guards run in the component tree, not in `beforeLoad`, on purpose:
 * MSAL (native auth) only initialises in the browser, and `beforeLoad`
 * also runs during SSR and before React context is available — so it
 * can't see auth state. These wrappers wait for `isReady`, then decide.
 *
 * While auth is initialising they render a minimal placeholder rather
 * than flashing protected content or the wrong redirect.
 */

function Blocking() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-[13px] text-[color:var(--text-tertiary)]">Loading…</div>
    </div>
  );
}

/** Signed-in candidates only. Also enforces onboarding completion. */
export function RequireAuth({
  children,
  requireProfile = true,
}: {
  children: ReactNode;
  requireProfile?: boolean;
}) {
  const { isReady, isAuthenticated, profileCompleted } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isReady) return;
    if (!isAuthenticated) {
      navigate({ to: "/" });
    } else if (requireProfile && !profileCompleted) {
      navigate({ to: "/onboarding" });
    }
  }, [isReady, isAuthenticated, profileCompleted, requireProfile, navigate]);

  if (!isReady) return <Blocking />;
  if (!isAuthenticated) return <Blocking />;
  if (requireProfile && !profileCompleted) return <Blocking />;
  return <>{children}</>;
}

/**
 * Signed-out only (landing page). A signed-in candidate hitting "/" —
 * whether by the logo, the back button, or typing the URL — is bounced
 * to their dashboard. This is the real enforcement behind requirement
 * #2 ("can't go back to the general home page").
 */
export function RequireGuest({ children }: { children: ReactNode }) {
  const { isReady, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isReady && isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isReady, isAuthenticated, navigate]);

  if (!isReady) return <Blocking />;
  if (isAuthenticated) return <Blocking />;
  return <>{children}</>;
}
