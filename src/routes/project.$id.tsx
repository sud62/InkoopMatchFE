import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { PageShell } from "@/components/rk/Shell";
import { MOCK_PROJECTS } from "@/lib/rk/projects";

export const Route = createFileRoute("/project/$id")({
  loader: ({ params }) => {
    const project = MOCK_PROJECTS.find((p) => p.id === params.id);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.project.title ?? "Project"} — InkoopMatch` },
      { name: "description", content: loaderData?.project.description ?? "Project detail" },
    ],
  }),
  component: ProjectDetail,
  notFoundComponent: () => (
    <PageShell>
      <div className="rk-glass p-10 text-center">
        <h1 className="text-xl font-semibold">Project not found</h1>
        <Link to="/dashboard" className="mt-3 inline-block text-[color:var(--olive-dark)] underline">
          Back to dashboard
        </Link>
      </div>
    </PageShell>
  ),
  errorComponent: ({ reset }) => {
    const router = useRouter();
    return (
      <PageShell>
        <div className="rk-glass p-10 text-center">
          <h1 className="text-xl font-semibold">Something went wrong</h1>
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rk-pill-accent mt-4 px-4 py-2 text-sm font-semibold"
          >
            Try again
          </button>
        </div>
      </PageShell>
    );
  },
});

function ProjectDetail() {
  const { project: p } = Route.useLoaderData();
  return (
    <PageShell>
      <div className="rk-glass overflow-hidden">
        <div className="rk-glass-header flex flex-wrap items-start justify-between gap-4 px-6 py-5">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[color:var(--text-tertiary)]">
              ID {p.id} · {p.category}
            </p>
            <h1 className="mt-1 text-[22px] font-semibold leading-tight text-foreground">
              {p.title}
            </h1>
            <p className="mt-1 text-[12px] text-[color:var(--text-secondary)]">
              {p.org} · {p.location} · {p.duration} · {p.mode} · {p.rate}
            </p>
          </div>
          <div className="rk-pill-accent rounded-full px-3 py-1 text-[12px] font-semibold">
            {p.fit}% fit
          </div>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-[2fr_1fr]">
          <div className="space-y-5">
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[color:var(--text-tertiary)]">
                About the project
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-foreground">{p.description}</p>
            </section>

            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[color:var(--text-tertiary)]">
                Fit breakdown
              </h2>
              <div className="mt-2 overflow-hidden rounded-lg border border-white/70 bg-white/40">
                <div className="grid grid-cols-2 border-b border-white/60 bg-white/30 px-3 py-2 text-[11px] font-semibold text-[color:var(--text-secondary)]">
                  <span>Required skill</span>
                  <span>Status</span>
                </div>
                {[...p.matchedSkills, ...p.unmatchedSkills].map((s) => {
                  const matched = p.matchedSkills.includes(s);
                  return (
                    <div key={s} className="grid grid-cols-2 border-b border-white/40 px-3 py-2 text-[12px] last:border-0">
                      <span className="text-foreground">{s}</span>
                      <span className={matched ? "text-[color:var(--sage)]" : "text-[color:var(--text-tertiary)]"}>
                        {matched ? "✓ On your CV" : "— Not detected"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[color:var(--text-tertiary)]">
                Required skills
              </h2>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.tags.map((t: string) => (
                  <span key={t} className="rk-chip">{t}</span>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-4">
            <div className="rk-glass p-4">
              <p className="text-[11px] text-[color:var(--text-secondary)]">Day rate</p>
              <p className="text-[18px] font-semibold text-foreground">{p.rate}</p>
              <p className="mt-3 text-[11px] text-[color:var(--text-secondary)]">Start date</p>
              <p className="text-[13px] font-medium text-foreground">As soon as possible</p>
            </div>
            <button className="w-full rounded-lg bg-[color:var(--olive)] py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[color:var(--olive-dark)]">
              Apply with my CV
            </button>
            <p className="text-center text-[10px] text-[color:var(--text-tertiary)]">
              Your CV is shared only after you confirm.
            </p>
            <Link
              to="/dashboard"
              className="block text-center text-[11px] text-[color:var(--text-secondary)] hover:text-foreground"
            >
              ← Back to matches
            </Link>
          </aside>
        </div>
      </div>
    </PageShell>
  );
}
