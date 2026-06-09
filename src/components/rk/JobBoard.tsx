import { useMemo, useState } from "react";
import { MOCK_PROJECTS, type Project } from "@/lib/rk/projects";
import { ProjectRow } from "./ProjectRow";

const CATEGORIES = ["Procurement", "Legal", "Compliance", "Finance", "Contract"] as const;
const MODES = ["Remote", "Hybrid", "On-site"] as const;

export function JobBoard({ heading = "Matches for you" }: { heading?: string }) {
  const [cats, setCats] = useState<string[]>([]);
  const [modes, setModes] = useState<string[]>([]);
  const [minFit, setMinFit] = useState(0);

  const filtered = useMemo(() => {
    return MOCK_PROJECTS.filter((p) => {
      if (cats.length && !cats.includes(p.category)) return false;
      if (modes.length && !modes.includes(p.mode)) return false;
      if (p.fit < minFit) return false;
      return true;
    }).sort((a: Project, b: Project) => b.fit - a.fit || a.postedHoursAgo - b.postedHoursAgo);
  }, [cats, modes, minFit]);

  const toggle = (list: string[], setList: (v: string[]) => void, v: string) => {
    setList(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr]">
      {/* Filters */}
      <aside className="rk-glass-panel space-y-5 p-5 text-[12px]">
        <div>
          <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[color:var(--text-tertiary)]">
            Role category
          </h4>
          <div className="space-y-1.5">
            {CATEGORIES.map((c) => (
              <label key={c} className="flex cursor-pointer items-center gap-2 text-foreground">
                <input
                  type="checkbox"
                  checked={cats.includes(c)}
                  onChange={() => toggle(cats, setCats, c)}
                  className="size-3.5 accent-[color:var(--olive)]"
                />
                {c}
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-white/60 pt-4">
          <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[color:var(--text-tertiary)]">
            Work mode
          </h4>
          <div className="space-y-1.5">
            {MODES.map((m) => (
              <label key={m} className="flex cursor-pointer items-center gap-2 text-foreground">
                <input
                  type="checkbox"
                  checked={modes.includes(m)}
                  onChange={() => toggle(modes, setModes, m)}
                  className="size-3.5 accent-[color:var(--olive)]"
                />
                {m}
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-white/60 pt-4">
          <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[color:var(--text-tertiary)]">
            Minimum fit · {minFit}%
          </h4>
          <input
            type="range"
            min={0}
            max={95}
            step={5}
            value={minFit}
            onChange={(e) => setMinFit(Number(e.target.value))}
            className="w-full accent-[color:var(--olive)]"
          />
        </div>
      </aside>

      {/* Feed */}
      <section className="p-4">
        <div className="mb-3 flex items-baseline justify-between px-3">
          <h2 className="text-[13px] font-semibold text-foreground">{heading}</h2>
          <span className="text-[11px] text-[color:var(--text-secondary)]">
            {filtered.length} of {MOCK_PROJECTS.length} projects
          </span>
        </div>
        <div className="divide-y divide-white/40">
          {filtered.map((p) => (
            <ProjectRow key={p.id} project={p} />
          ))}
          {filtered.length === 0 && (
            <div className="px-3 py-10 text-center text-[12px] text-[color:var(--text-secondary)]">
              No projects match those filters. Loosen one to see more.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
