import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { PageShell } from "@/components/rk/Shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "InkoopMatch — Upload your CV. See your matches." },
      {
        name: "description",
        content:
          "InkoopMatch matches procurement, legal, compliance and contract freelancers to EU projects with a transparent fit score. Upload your CV once.",
      },
      { property: "og:title", content: "InkoopMatch — Upload your CV. See your matches." },
      {
        property: "og:description",
        content: "Upload your CV once. See ranked freelance projects with fit scores and reasons.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "reading" | "matching">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file?: File | null) => {
    if (!file) return;
    const ok = /\.(pdf|docx?|txt)$/i.test(file.name);
    if (!ok) {
      setError("Please upload a PDF or Word document.");
      return;
    }
    setError(null);
    setStatus("reading");
    setTimeout(() => setStatus("matching"), 1100);
    setTimeout(() => navigate({ to: "/match" }), 2400);
  };

  return (
    <PageShell>
      <section className="pt-10 md:pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rk-pill inline-block px-3 py-1 text-[11px] font-medium text-[color:var(--olive-dark)]">
            GDPR-compliant · Your CV is never shared without your consent
          </span>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl">
            Upload your CV.
            <br />
            See your <span className="text-[color:var(--olive)]">matches</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[color:var(--text-secondary)]">
            InkoopMatch reads your CV and surfaces the EU procurement, legal, compliance and
            contract projects you actually fit — with a clear reason for every match.
          </p>
        </div>

        {/* Glass upload card */}
        <div className="rk-glass mx-auto mt-10 max-w-2xl overflow-hidden">
          <div className="rk-glass-header flex items-center justify-between px-6 py-4">
            <div>
              <h2 className="text-[15px] font-semibold text-foreground">Start with your CV</h2>
              <p className="text-[12px] text-[color:var(--text-secondary)]">
                One upload. No account needed to see your matches.
              </p>
            </div>
            <span className="rk-pill-accent rounded-full px-2.5 py-0.5 text-[11px] font-semibold">
              ~ 20 seconds
            </span>
          </div>

          <div className="p-6">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFile(e.dataTransfer.files?.[0]);
              }}
              disabled={status !== "idle"}
              className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/90 bg-white/40 py-12 text-center transition hover:bg-white/55 disabled:opacity-80"
            >
              {status === "idle" && (
                <>
                  <div className="rk-pill flex size-10 items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[color:var(--olive-dark)]">
                      <path d="M12 5v14M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-[13px] font-medium text-foreground">
                    Drop your CV here, or click to upload
                  </p>
                  <p className="text-[11px] text-[color:var(--text-tertiary)]">
                    PDF or Word · up to 5 MB
                  </p>
                </>
              )}
              {status === "reading" && (
                <p className="text-[13px] font-medium text-foreground">Reading your CV…</p>
              )}
              {status === "matching" && (
                <p className="text-[13px] font-medium text-foreground">Finding matches…</p>
              )}
            </button>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            {error && (
              <p className="mt-3 text-[12px] text-[color:var(--destructive)]">{error}</p>
            )}
            <div className="mt-4 flex items-center justify-between text-[11px] text-[color:var(--text-tertiary)]">
              <span>No recruiter spam. Ever.</span>
              <button
                onClick={() => navigate({ to: "/match" })}
                className="font-medium text-[color:var(--olive-dark)] underline-offset-2 hover:underline"
              >
                Skip and preview matches →
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-3 text-center">
          {[
            ["2,400+", "active projects"],
            ["84%", "match accuracy"],
            ["3 days", "avg. first reply"],
          ].map(([n, l]) => (
            <div key={l} className="rk-glass px-3 py-4">
              <div className="text-[18px] font-semibold text-foreground">{n}</div>
              <div className="text-[11px] text-[color:var(--text-secondary)]">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mt-24">
        <h2 className="text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-[color:var(--text-tertiary)]">
          How it works
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["01", "Upload once", "We read your CV and extract skills, seniority and role focus."],
            ["02", "See fit scores", "Every match shows exactly which of your skills lined up — and which didn't."],
            ["03", "Apply in one click", "We send your profile to the organisation. You stay in control of consent."],
          ].map(([n, t, d]) => (
            <div key={n} className="rk-glass p-5">
              <div className="text-[11px] font-semibold text-[color:var(--olive-dark)]">{n}</div>
              <h3 className="mt-2 text-[15px] font-semibold text-foreground">{t}</h3>
              <p className="mt-1 text-[12px] leading-relaxed text-[color:var(--text-secondary)]">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="orgs" className="mt-20 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Hiring on the other side?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-[13px] text-[color:var(--text-secondary)]">
          Post a project and receive pre-screened, contextually matched freelance profiles.
        </p>
        <Link
          to="/"
          className="rk-pill-accent mt-5 inline-block px-5 py-2 text-[13px] font-semibold"
        >
          For organisations →
        </Link>
      </section>
    </PageShell>
  );
}
