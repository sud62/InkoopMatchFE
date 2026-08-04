import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/rk/Shell";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [{ title: "How it works — InkoopMatch" }],
  }),
  component: HowItWorks,
});

function HowItWorks() {
  const { t } = useLanguage();

  return (
    <PageShell>
      <section className="shell" style={{ paddingTop: 36, textAlign: "center" }}>
        <p className="section-kicker">{t("howItWorks.badge")}</p>
        <h1 style={{ marginTop: 12 }}>{t("howItWorks.title")}</h1>
        <p style={{ margin: "16px auto 0", maxWidth: 620, color: "var(--muted)" }}>
          {t("howItWorks.subtitle")}
        </p>
      </section>

      <section className="how shell" style={{ marginTop: 24 }}>
        <p className="section-kicker">{t("howItWorks.processTitle")}</p>
        <div className="steps">
          {[
            ["01", t("howItWorks.process1Title"), t("howItWorks.process1Desc")],
            ["02", t("howItWorks.process2Title"), t("howItWorks.process2Desc")],
            ["03", t("howItWorks.process3Title"), t("howItWorks.process3Desc")],
          ].map(([n, title, desc]) => (
            <article key={n}>
              <span>{n}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="shell" style={{ marginTop: 40 }}>
        <div
          style={{
            borderRadius: 20,
            border: "1px solid var(--line)",
            background: "var(--paper)",
            boxShadow: "var(--shadow)",
            padding: "32px 36px",
          }}
        >
          <h2 style={{ fontSize: 20 }}>{t("howItWorks.disclosureTitle")}</h2>
          <p style={{ marginTop: 10, maxWidth: 680, color: "var(--muted)" }}>
            {t("howItWorks.disclosureBody")}
          </p>
        </div>
      </section>

      <section className="organisation" style={{ marginTop: 40 }}>
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
