import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/rk/Shell";
import { JobBoard } from "@/components/rk/JobBoard";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — ReKruit" },
      { name: "description", content: "Your live freelance project matches, applications and shortlist." },
    ],
  }),
  component: Dashboard,
});

const STATS = [
  { label: "Matches", value: "12", accent: true, sub: "this week" },
  { label: "Applied", value: "4", sub: "in review" },
  { label: "Shortlisted", value: "2", sub: "by orgs" },
  { label: "Avg rate", value: "€820", sub: "per day" },
  { label: "Availability", value: "Open", sub: "from Jul 1" },
];

function Dashboard() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <PageShell>
      <div className="rk-glass overflow-hidden">
        <div className="rk-glass-header flex items-start justify-between gap-4 px-6 py-5">
          <div>
            <h1 className="text-[22px] font-semibold leading-tight text-foreground">
              {greeting}, Rob
            </h1>
            <p className="mt-0.5 text-[12px] text-[color:var(--text-secondary)]">
              Here's your breakdown for today.
            </p>
          </div>
          <div className="rk-pill flex items-center gap-2 px-3 py-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[color:var(--olive-dark)]">
              <path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9" strokeLinecap="round" />
              <path d="M10 21a2 2 0 004 0" strokeLinecap="round" />
            </svg>
            <span className="text-[12px] font-semibold text-foreground">2 tickets</span>
            <span className="text-[10px] text-[color:var(--text-tertiary)]">need your attention</span>
          </div>
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-2 border-b border-white/60 bg-white/25 px-6 py-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className={`${s.accent ? "rk-pill-accent" : "rk-pill"} flex flex-col items-start rounded-2xl px-3.5 py-2`}
            >
              <span className="text-[10px] font-semibold uppercase tracking-wider opacity-70">
                {s.label}
              </span>
              <span className="text-[15px] font-semibold leading-tight">{s.value}</span>
              <span className="text-[10px] opacity-70">{s.sub}</span>
            </div>
          ))}
        </div>

        <JobBoard heading="Today's matches" />
      </div>
    </PageShell>
  );
}
