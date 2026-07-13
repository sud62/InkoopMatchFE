import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/rk/Shell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — InkoopMatch" },
      {
        name: "description",
        content:
          "InkoopMatch helps procurement, legal, compliance and contract freelancers find EU projects that fit their skills.",
      },
      { property: "og:title", content: "About — InkoopMatch" },
      {
        property: "og:description",
        content:
          "Upload your CV once. See ranked freelance projects with fit scores and reasons.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell>
      <section className="pt-10 md:pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rk-pill inline-block px-3 py-1 text-[11px] font-medium text-[color:var(--olive-dark)]">
            Our story
          </span>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-5xl">
            Matching freelancers to EU projects
            <br />
            with <span className="text-[color:var(--olive)]">transparency</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-[color:var(--text-secondary)]">
            InkoopMatch was built for the independent specialists who keep EU procurement moving — lawyers, compliance officers, contract managers and procurement experts. We match your CV to the projects that actually fit, then explain why.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            [
              "For freelancers",
              "Upload your CV once, see ranked project matches with clear fit scores, and stay in control of who sees your profile.",
            ],
            [
              "For organisations",
              "Post a project and receive pre-screened profiles that match the skills, seniority and contract context you asked for.",
            ],
            [
              "Private by design",
              "Your CV is never shared without your consent. We process data in line with GDPR and do not sell profile information.",
            ],
          ].map(([t, d]) => (
            <div key={t} className="rk-glass p-5">
              <h3 className="text-[15px] font-semibold text-foreground">{t}</h3>
              <p className="mt-1 text-[12px] leading-relaxed text-[color:var(--text-secondary)]">
                {d}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Want to know more?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-[13px] text-[color:var(--text-secondary)]">
          Reach out to learn how InkoopMatch can help your team or your freelance career.
        </p>
        <a
          href="mailto:hello@inkoopmatch.com"
          className="rk-pill-accent mt-5 inline-block px-5 py-2 text-[13px] font-semibold"
        >
          Contact us →
        </a>
      </section>
    </PageShell>
  );
}
