import type { ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { SignInModal } from "@/components/rk/SignInModal";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/** Exact brand mark from the reference (.brand / .brand-crop). */
function Brand({ to }: { to: string | null }) {
  const inner = (
    <>
      <span className="brand-crop">
        <img src="public/inkoopmatch-beeldmerk.svg" alt="" width={72} height={35} />
      </span>
      <span>
        Inkoop<span>Match</span>
      </span>
    </>
  );
  if (!to) {
    return (
      <span className="brand" aria-label="InkoopMatch">
        {inner}
      </span>
    );
  }
  return (
    <Link className="brand" to={to} aria-label="InkoopMatch home">
      {inner}
    </Link>
  );
}

/** Small EN/NL toggle — real functionality the reference doesn't show
 * (single-language site), kept minimal so it doesn't disrupt the
 * reference's exact header layout/spacing. */
function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        border: "1px solid var(--line)",
        borderRadius: 999,
        padding: 2,
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        style={{
          borderRadius: 999,
          padding: "4px 9px",
          background: language === "en" ? "var(--green)" : "transparent",
          color: language === "en" ? "#fff" : "var(--ink)",
        }}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("nl")}
        aria-pressed={language === "nl"}
        style={{
          borderRadius: 999,
          padding: "4px 9px",
          background: language === "nl" ? "var(--green)" : "transparent",
          color: language === "nl" ? "#fff" : "var(--ink)",
        }}
      >
        NL
      </button>
    </div>
  );
}

function UserMenu() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="button button-outline" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {user?.name?.split(" ")[0] || t("nav.settings")}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={() => navigate({ to: "/dashboard" })}>
          {t("nav.dashboard")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate({ to: "/settings" })}>
          {t("nav.settings")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await logout();
            navigate({ to: "/" });
          }}
        >
          {t("nav.signOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Two header variants, matching the reference exactly:
 *  - "site": marketing pages (.site-header) — Zo werkt het / Voor
 *    organisaties / Over ons + Inloggen
 *  - "dash": authenticated pages (.dash-header) — Start / Mijn
 *    matches / Mijn profiel + user menu
 * Both share the reference's base .site-header,.dash-header CSS rule
 * (height, flex layout) — only the nav content differs, same as the
 * reference's own two page types.
 */
export function Header({ variant = "site" }: { variant?: "site" | "dash" }) {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();

  if (variant === "dash") {
    return (
      <header className="dash-header shell">
        <Brand to={isAuthenticated ? null : "/"} />
        <nav>
          <Link to="/dashboard">{t("dashboard.yourMatches")}</Link>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <LanguageSwitcher />
          <UserMenu />
        </div>
      </header>
    );
  }

  return (
    <header className="site-header shell">
      <Brand to="/" />
      <nav aria-label="Hoofdnavigatie">
        <Link to="/how-it-works">{t("nav.howItWorks")}</Link>
        <Link to="/about">{t("nav.about")}</Link>
      </nav>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <LanguageSwitcher />
        {isAuthenticated ? (
          <UserMenu />
        ) : (
          <SignInModal
            trigger={
              <button type="button" className="button button-outline">
                {t("nav.signIn")}
              </button>
            }
          />
        )}
      </div>
    </header>
  );
}

function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="shell">
      <span>© {new Date().getFullYear()} InkoopMatch</span>
      <Link to="/terms">{t("footer.terms")}</Link>
      <Link to="/contact">{t("footer.contact")}</Link>
    </footer>
  );
}

/**
 * Marketing-page wrapper (site header + footer). Used by index,
 * how-it-works, about, contact, terms.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header variant="site" />
      {children}
      <Footer />
    </>
  );
}

/**
 * Authenticated-page wrapper (dash header, no footer — matches the
 * reference's dashboard/detail pages, which have no footer at all).
 */
export function DashShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header variant="dash" />
      {children}
    </>
  );
}
