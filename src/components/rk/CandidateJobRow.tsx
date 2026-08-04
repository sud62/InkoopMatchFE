import type { CandidateJob } from "@/lib/api/client";
import { Link } from "@tanstack/react-router";

/**
 * The fit badge has TWO states, deliberately distinct:
 *  - a real score (green pill, "Strong/Good match")
 *  - NOT YET SCORED (neutral, "Scoring in progress") — never a 0%,
 *    which would read as a terrible match. Requirement #9: until we
 *    have a score, we don't show a score.
 */
function FitBadge({ score }: { score: number | null }) {
  if (score === null) {
    return (
      <div className="flex flex-col items-end">
        <div className="inline-flex items-center gap-1 rounded-full bg-white/50 px-2.5 py-0.5 text-[11px] font-medium text-[color:var(--text-secondary)]">
          <span className="size-1.5 animate-pulse rounded-full bg-[color:var(--text-tertiary)]" />
          Scoring
        </div>
        <span className="mt-1 text-[10px] text-[color:var(--text-tertiary)]">
          Ready within 24h
        </span>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-end">
      <div className="rk-pill-accent inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold">
        <span className="size-1.5 rounded-full bg-[color:var(--olive)]" />
        {score}% fit
      </div>
      <span className="mt-1 text-[10px] text-[color:var(--text-tertiary)]">
        {score >= 90 ? "Strong match" : score >= 80 ? "Good match" : "Worth a look"}
      </span>
    </div>
  );
}

/** Same status pill used on the detail page — now also here, so an
 * Open vs Closed job is distinguishable in the list, not just after
 * clicking in. */
function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();
  const label = normalized.charAt(0).toUpperCase() + normalized.slice(1);
  const tone =
    normalized === "open"
      ? "bg-[color:var(--olive)]/15 text-[color:var(--olive-dark)]"
      : "bg-black/5 text-[color:var(--text-secondary)]";
  return (
    <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${tone}`}>{label}</span>
  );
}

export function CandidateJobRow({
  job,
  applied = false,
}: {
  job: CandidateJob;
  applied?: boolean;
}) {
  const isNew = job.postedHoursAgo < 24;
  const line1 = [job.org, job.location].filter(Boolean).join(" · ");
  const line2 = [job.duration, job.mode, job.rate].filter(Boolean).join(" · ");

  return (
    <Link
      to="/project/$id"
      params={{ id: job.id }}
      className="rk-row group flex gap-3 rounded-lg px-3 py-3 transition-colors"
    >
      <div className="rk-leftbar mt-1 self-stretch" />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-semibold text-[color:var(--text-tertiary)]">
                ID {job.id}
              </span>
              <StatusBadge status={job.status} />
              {isNew && (
                <span className="rounded-full bg-[color:var(--olive)] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white">
                  New
                </span>
              )}
              {applied && (
                <span className="rounded-full border border-[color:var(--olive)] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[color:var(--olive-dark)]">
                  Applied
                </span>
              )}
            </div>
            <h3 className="mt-0.5 truncate text-[13px] font-semibold text-foreground">
              {job.title}
            </h3>
            {line1 && (
              <p className="mt-0.5 text-[11px] text-[color:var(--text-secondary)]">{line1}</p>
            )}
            {line2 && (
              <p className="mt-0.5 text-[10px] text-[color:var(--text-tertiary)]">{line2}</p>
            )}
            {job.description && (
              <p className="mt-1 line-clamp-2 max-w-2xl text-[11px] leading-snug text-[color:var(--text-secondary)]">
                {job.description}
              </p>
            )}
            {job.tags.length > 0 && (
              <div className="mt-1.5 flex flex-wrap gap-[3px]">
                {job.tags.slice(0, 4).map((t) => (
                  <span key={t} className="rk-chip">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
          <FitBadge score={job.fitScore} />
        </div>
      </div>
    </Link>
  );
}
