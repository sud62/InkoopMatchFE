import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/rk/Shell";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [{ title: "How it works — InkoopMatch" }],
  }),
  component: HowItWorks,
});

// ─────────────────────────────────────────────────────────────────
// Page-scoped styles, prefixed `hiw-`. Same tokens as the rest of the
// site. This page is deliberately lighter than /process: one visual
// device (stacked numbered rows) and one moment (the data band).
// ─────────────────────────────────────────────────────────────────
const styles = `
  /* ── Hero: copy left, illustration right ──────────────── */
  .hiw-hero {
    display: grid;
    grid-template-columns: 1.1fr .9fr;
    gap: 64px;
    align-items: center;
    padding-block: 54px 64px;
  }
  .hiw-hero-art {
    justify-self: end;
    width: 100%;
    max-width: 480px;
  }
  .hiw-hero-art svg {
    display: block;
    width: 100%;
    height: auto;
  }
  .hiw-hero h1 {
    font-size: clamp(44px, 4.6vw, 64px);
    line-height: 1.06;
    letter-spacing: -.045em;
    font-weight: 780;
    margin: 22px 0 22px;
    color: var(--ink);
  }
  .hiw-hero h1 em {
    font-style: normal;
    color: var(--green);
  }
  .hiw-hero .lead {
    max-width: 58ch;
  }

  /* ── Steps: stacked rows, big number left, copy right ──── */
  .hiw-steps {
    padding-block: 8px 88px;
  }
  .hiw-steps ol {
    list-style: none;
    margin: 28px 0 0;
    padding: 0;
    border-top: 1px solid var(--line);
  }
  .hiw-steps li {
    display: grid;
    grid-template-columns: 96px 1fr;
    gap: 32px;
    align-items: start;
    padding: 36px 0;
    border-bottom: 1px solid var(--line);
  }
  .hiw-steps .num {
    font-size: 44px;
    line-height: 1;
    font-weight: 800;
    letter-spacing: -.04em;
    color: var(--green);
    /* Tabular figures keep 01/02/03 the same width. */
    font-variant-numeric: tabular-nums;
    padding-top: 4px;
  }
  .hiw-steps h3 {
    font-size: 24px;
    line-height: 1.2;
    letter-spacing: -.025em;
    margin: 0 0 10px;
    color: var(--ink);
  }
  .hiw-steps p {
    margin: 0;
    color: #405363;
    line-height: 1.65;
    max-width: 60ch;
    font-size: 16px;
  }

  /* ── Data band: the trust moment ──────────────────────── */
  .hiw-data {
    background: var(--sage);
    padding-block: 80px 88px;
  }
  .hiw-data-grid {
    display: grid;
    grid-template-columns: .9fr 1.4fr;
    gap: 64px;
    align-items: start;
  }
  .hiw-data h2 {
    font-size: clamp(30px, 3.2vw, 40px);
    line-height: 1.12;
    letter-spacing: -.035em;
    font-weight: 780;
    color: var(--ink);
    margin: 10px 0 0;
  }
  .hiw-data-body p {
    margin: 0 0 18px;
    color: var(--ink);
    line-height: 1.75;
    font-size: 17px;
  }
  .hiw-data-body p:last-of-type {
    margin-bottom: 0;
  }
  .hiw-data-body .text-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 22px;
    font-weight: 700;
    color: var(--green-dark);
    text-decoration: none;
    border-bottom: 2px solid currentColor;
    padding-bottom: 2px;
  }

  /* ── Responsive ───────────────────────────────────────── */
  @media (max-width: 860px) {
    .hiw-hero { grid-template-columns: 1fr; gap: 36px; }
    .hiw-hero-art { justify-self: start; max-width: 400px; }
    .hiw-steps li { grid-template-columns: 1fr; gap: 10px; padding: 28px 0; }
    .hiw-steps .num { font-size: 32px; }
    .hiw-data-grid { grid-template-columns: 1fr; gap: 28px; }
  }
`;

// ─────────────────────────────────────────────────────────────────
// Hero illustration: a CV fanning out to three open projects, with
// the middle one marked as the match. Same line-art language as the
// role marks on /process and the landing hero art — thin green
// strokes, no fills, abstract rather than literal.
// ─────────────────────────────────────────────────────────────────
function HeroArt() {
  return (
    <svg
      viewBox="0 0 480 400"
      fill="none"
      stroke="var(--green)"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* The CV */}
      <rect x="40" y="90" width="150" height="200" rx="10" />
      <path d="M62 122 h70" strokeWidth={3} />
      <circle cx="160" cy="122" r="9" />
      <path d="M62 148 h106" />
      <path d="M62 166 h88" />
      <path d="M62 184 h100" />
      <path d="M62 214 h96" />
      <path d="M62 232 h72" />
      <path d="M62 250 h104" />

      {/* Three open projects */}
      <rect x="330" y="72" width="110" height="64" rx="8" />
      <path d="M348 94 h56" />
      <path d="M348 110 h40" />

      <rect x="330" y="168" width="110" height="64" rx="8" />
      <path d="M348 190 h56" />
      <path d="M348 206 h40" />
      <circle cx="422" cy="200" r="5" fill="var(--green)" stroke="none" />

      <rect x="330" y="264" width="110" height="64" rx="8" />
      <path d="M348 286 h56" />
      <path d="M348 302 h40" />

      {/* Connectors — solid to the match, dashed to the others */}
      <path d="M190 190 C 250 190, 270 104, 330 104" strokeDasharray="3 5" />
      <path d="M190 190 C 250 190, 270 200, 330 200" strokeWidth={2.25} />
      <path d="M190 190 C 250 190, 270 296, 330 296" strokeDasharray="3 5" />
      <circle cx="190" cy="190" r="4" fill="#fff" />
    </svg>
  );
}

function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    [t("howItWorks.process1Title"), t("howItWorks.process1Desc")],
    [t("howItWorks.process2Title"), t("howItWorks.process2Desc")],
    [t("howItWorks.process3Title"), t("howItWorks.process3Desc")],
  ];

  return (
    <PageShell>
      <style>{styles}</style>

      {/* ── Hero ── */}
      <section className="shell hiw-hero" aria-labelledby="hiw-title">
        <div>
          <p className="section-kicker">{t("howItWorks.badge")}</p>
          <h1 id="hiw-title">
            {t("howItWorks.title")} <em>{t("howItWorks.titleAccent")}</em>
          </h1>
          <p className="lead">{t("howItWorks.subtitle")}</p>
        </div>
        <div className="hiw-hero-art">
          <HeroArt />
        </div>
      </section>

      {/* ── Three steps as stacked rows ── */}
      <section className="shell hiw-steps" aria-labelledby="hiw-steps-title">
        <p className="section-kicker" id="hiw-steps-title">
          {t("howItWorks.processTitle")}
        </p>
        <ol>
          {steps.map(([title, desc], i) => (
            <li key={title}>
              <span className="num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Where your data goes — the trust moment ── */}
      <section className="hiw-data" aria-labelledby="hiw-data-title">
        <div className="shell hiw-data-grid">
          <div>
            <p className="section-kicker">{t("howItWorks.badge")}</p>
            <h2 id="hiw-data-title">{t("howItWorks.disclosureTitle")}</h2>
          </div>
          <div className="hiw-data-body">
            <p>{t("howItWorks.disclosureBody")}</p>
            <Link className="text-link" to="/terms">
              {t("footer.terms")} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Organisations CTA — reuses the site's existing band ── */}
      <section className="organisation">
        <div className="shell organisation-inner">
          <div>
            <h2>{t("howItWorks.orgsTitle")}</h2>
            <p>{t("howItWorks.orgsSubtitle")}</p>
          </div>
          <Link className="button button-light" to="/contact">
            {t("howItWorks.orgsCta")}
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
