import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { SignInModal } from "@/components/rk/SignInModal";

export function Ambient() {
  return (
    <div className="rk-ambient" aria-hidden="true">
      <div className="rk-blob rk-blob-1" />
      <div className="rk-blob rk-blob-2" />
      <div className="rk-blob rk-blob-3" />
      <div className="rk-blob rk-blob-4" />
    </div>
  );
}

export function Nav() {
  return (
    <nav className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
      <Link to="/" className="text-[16px] font-semibold tracking-tight text-foreground">
        Inkoop<span className="rk-logo-k">Match</span>
      </Link>
      <div className="hidden items-center gap-8 text-[13px] text-[color:var(--text-secondary)] md:flex">
        <Link to="/" className="hover:text-foreground" activeProps={{ className: "text-foreground" }}>How it works</Link>
        <Link to="/" className="hover:text-foreground" activeProps={{ className: "text-foreground" }}>For organisations</Link>
        <Link to="/about" className="hover:text-foreground" activeProps={{ className: "text-foreground" }}>About</Link>

      </div>
      <SignInModal
        trigger={
          <button
            type="button"
            className="rk-pill px-4 py-1.5 text-[13px] font-medium text-foreground hover:bg-white/80"
          >
            Sign in
          </button>
        }
      />
    </nav>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Ambient />
      <Nav />
      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20">{children}</main>
    </div>
  );
}
