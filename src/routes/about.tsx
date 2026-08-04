import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/rk/Shell";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — InkoopMatch" },
      {
        name: "description",
        content:
          "InkoopMatch helps procurement, legal, compliance and contract freelancers find EU projects that fit their skills.",
      },
    ],
  }),
  component: About,
});

const content = {
  en: {
    kicker: "Our story",
    title: "Matching freelancers to projects",
    titleAccent: "beyond the job title.",
    intro:
      "InkoopMatch was built for the independent specialists who keep EU procurement, legal and compliance work moving. We look at your whole CV — not just your last job title — so you see opportunities that a keyword search would miss.",
    whoTitle: "Who's actually behind InkoopMatch",
    whoBody1:
      "The Goodlife Company B.V., trading as Meester Inkoop, is the organisation behind InkoopMatch. InkoopMatch is our digital matching tool — not a separate company, and not a general job board that forwards CVs without context.",
    whoBody2:
      "Every match InkoopMatch proposes is reviewed by a real Meester Inkoop staff member before anyone sees it — the fit score is a starting point for that review, never the final word. Your CV only reaches an organisation after you've separately agreed to that specific proposal.",
    whoLink: "See our full process →",
    points: [
      { title: "Your whole CV counts", desc: "Not just your job title, but skills, sector experience, and context." },
      { title: "Always a human in the loop", desc: "A real reviewer checks every proposed match before it goes anywhere." },
      { title: "Reviewed by recruiters", desc: "Applications are assessed by a person, not decided by a score alone." },
      { title: "Private by design", desc: "Your CV is never shared without your consent. See our Terms for exactly how data flows." },
    ],
    ctaTitle: "Want to know more?",
    ctaSubtitle: "Reach out to learn how InkoopMatch can help your team or your freelance career.",
    ctaButton: "Contact us",
  },
  nl: {
    kicker: "Ons verhaal",
    title: "Freelancers matchen aan opdrachten",
    titleAccent: "voorbij de functietitel.",
    intro:
      "InkoopMatch is gebouwd voor de zelfstandige specialisten die EU-inkoop, juridisch werk en compliance draaiende houden. We kijken naar je hele cv — niet alleen je laatste functietitel — zodat je ook kansen ziet die een zoekterm zou missen.",
    whoTitle: "Wie er echt achter InkoopMatch zit",
    whoBody1:
      "The Goodlife Company B.V., handelend onder de naam Meester Inkoop, is de organisatie achter InkoopMatch. InkoopMatch is onze digitale matchingtool — geen aparte onderneming, en geen algemene vacaturebank die cv's zonder context doorstuurt.",
    whoBody2:
      "Elke match die InkoopMatch voorstelt, wordt beoordeeld door een echte medewerker van Meester Inkoop voordat iemand hem ziet — de fit-score is het startpunt van die beoordeling, nooit het laatste woord. Je cv bereikt een organisatie pas nadat jij apart akkoord bent gegaan met die specifieke voordracht.",
    whoLink: "Bekijk ons volledige proces →",
    points: [
      { title: "Je hele cv telt", desc: "Niet alleen je functietitel, maar vaardigheden, sectorervaring en context." },
      { title: "Altijd een mens erbij", desc: "Een echte beoordelaar controleert elke voorgestelde match voordat deze verdergaat." },
      { title: "Beoordeeld door recruiters", desc: "Sollicitaties worden beoordeeld door een persoon, niet enkel bepaald door een score." },
      { title: "Privé by design", desc: "Je cv wordt nooit gedeeld zonder jouw toestemming. Bekijk onze voorwaarden voor precies hoe gegevens stromen." },
    ],
    ctaTitle: "Meer weten?",
    ctaSubtitle: "Neem contact op om te horen hoe InkoopMatch jouw team of freelance carrière kan helpen.",
    ctaButton: "Neem contact op",
  },
};

function About() {
  const { language } = useLanguage();
  const c = language === "nl" ? content.nl : content.en;

  return (
    <PageShell>
      <section className="shell" style={{ paddingTop: 36, textAlign: "center" }}>
        <p className="section-kicker">{c.kicker}</p>
        <h1 style={{ marginTop: 12 }}>
          {c.title}
          <br />
          <em>{c.titleAccent}</em>
        </h1>
        <p style={{ margin: "16px auto 0", maxWidth: 620, color: "var(--muted)" }}>{c.intro}</p>
      </section>

      <section className="shell" style={{ marginTop: 48 }}>
        <div
          style={{
            borderRadius: 20,
            border: "1px solid var(--line)",
            background: "var(--paper)",
            boxShadow: "var(--shadow)",
            padding: "36px 40px",
          }}
        >
          <h2 style={{ fontSize: 22 }}>{c.whoTitle}</h2>
          <p style={{ marginTop: 12, maxWidth: 680, color: "var(--muted)" }}>{c.whoBody1}</p>
          <p style={{ marginTop: 12, maxWidth: 680, color: "var(--muted)" }}>{c.whoBody2}</p>
          <Link to="/process" style={{ display: "inline-block", marginTop: 16, fontWeight: 700, color: "var(--green)" }}>
            {c.whoLink}
          </Link>
        </div>
      </section>

      <section className="proof" style={{ marginTop: 48 }}>
        <div className="shell proof-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {c.points.map((p) => (
            <article key={p.title}>
              <span className="proof-icon">✓</span>
              <div>
                <strong style={{ fontSize: 16 }}>{p.title}</strong>
                <p>{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="organisation" style={{ marginTop: 0 }}>
        <div className="shell organisation-inner">
          <div>
            <p className="section-kicker">{c.ctaTitle}</p>
            <h2>{c.ctaSubtitle}</h2>
          </div>
          <Link className="button button-light" to="/contact">
            {c.ctaButton}
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
