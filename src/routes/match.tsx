import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/rk/Shell";
import { JobBoard } from "@/components/rk/JobBoard";
import { MOCK_PROJECTS } from "@/lib/rk/projects";

export const Route = createFileRoute("/match")({
  head: () => ({
    meta: [
      { title: "Your matches — InkoopMatch" },
      { name: "description", content: "Projects matched to your CV, ranked by fit." },
    ],
  }),
  component: MatchPage,
});

const DETECTED_SKILLS = [
  "EU Procurement",
  "Contract Law",
  "GDPR",
  "Vendor Negotiations",
  "FIDIC",
  "Public Tender",
];

function MatchPage() {
  const count = MOCK_PROJECTS.length;
  return (
    <PageShell>
      <div className="rk-glass overflow-hidden">
        {/* Header */}
        <div className="rk-glass-header flex items-start justify-between gap-4 px-6 py-5">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-[color:var(--text-tertiary)]">
              CV processed
            </p>
            <h1 className="mt-1 text-[22px] font-semibold leading-tight text-foreground">
              We found <span className="text-[color:var(--olive)]">{count} projects</span> that match your profile
            </h1>
            <p className="mt-1 text-[12px] text-[color:var(--text-secondary)]">
              Senior · Procurement & Compliance · Based on 6 detected skills
            </p>
          </div>
          <div className="rk-pill flex items-center gap-2 px-3 py-1.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--olive)] opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-[color:var(--olive)]" />
            </span>
            <span className="text-[12px] font-semibold text-foreground">{count}</span>
            <span className="text-[10px] text-[color:var(--text-tertiary)]">new matches</span>
          </div>
        </div>

        {/* Detected skills strip */}
        <div className="border-b border-white/60 bg-white/25 px-6 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[color:var(--text-tertiary)]">
            Skills detected from your CV
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {DETECTED_SKILLS.map((s) => (
              <span key={s} className="rk-pill-accent rounded-full px-2.5 py-0.5 text-[11px] font-medium">
                {s}
              </span>
            ))}
            <button className="rk-pill rounded-full px-2.5 py-0.5 text-[11px] font-medium text-[color:var(--text-secondary)]">
              + edit
            </button>
          </div>
        </div>

        <JobBoard heading="Ranked by fit" />

        <div className="border-t border-white/60 bg-white/25 px-6 py-4 text-center text-[12px] text-[color:var(--text-secondary)]">
          Like what you see?{" "}
          <Link to="/dashboard" className="font-semibold text-[color:var(--olive-dark)] underline-offset-2 hover:underline">
            Create your free account
          </Link>{" "}
          to apply and save matches.
        </div>
      </div>
    </PageShell>
  );
}
