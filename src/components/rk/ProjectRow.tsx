import type { Project } from "@/lib/rk/projects";
import { Link } from "@tanstack/react-router";

function FitBadge({ score }: { score: number }) {
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

export function ProjectRow({ project }: { project: Project }) {
  const isNew = project.postedHoursAgo < 24;
  return (
    <Link
      to="/project/$id"
      params={{ id: project.id }}
      className="rk-row group flex gap-3 rounded-lg px-3 py-3 transition-colors"
    >
      <div className="rk-leftbar mt-1 self-stretch" />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-medium text-[color:var(--text-tertiary)]">
                ID {project.id}
              </span>
              {isNew && (
                <span className="rounded-full bg-[color:var(--olive)] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white">
                  New
                </span>
              )}
            </div>
            <h3 className="mt-0.5 truncate text-[13px] font-semibold text-foreground">
              {project.title}
            </h3>
            <p className="mt-0.5 text-[11px] text-[color:var(--text-secondary)]">
              {project.org} · {project.location}
            </p>
            <p className="mt-0.5 text-[10px] text-[color:var(--text-tertiary)]">
              {project.duration} · {project.mode} · {project.rate}
            </p>
            <div className="mt-1.5 flex flex-wrap gap-[3px]">
              {project.tags.slice(0, 4).map((t) => (
                <span key={t} className="rk-chip">{t}</span>
              ))}
            </div>
          </div>
          <FitBadge score={project.fit} />
        </div>
      </div>
    </Link>
  );
}
