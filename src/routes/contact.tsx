import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/rk/Shell";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — InkoopMatch" },
      { name: "description", content: "Get in touch with the InkoopMatch team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t, language } = useLanguage();
  const email = "help@inkoopmatch.nl";

  return (
    <PageShell>
      <div className="shell" style={{ maxWidth: 640, paddingTop: 40, paddingBottom: 64, textAlign: "center" }}>
        <div className="eyebrow" style={{ display: "inline-flex" }}>
          <span aria-hidden="true">✉</span> {language === "nl" ? "Neem contact op" : "Get in touch"}
        </div>
        <h1 style={{ marginTop: 18 }}>{t("contact.title")}</h1>
        <p style={{ margin: "12px auto 0", maxWidth: 440, color: "var(--muted)" }}>
          {t("contact.subtitle")}
        </p>

        <a
          href={`mailto:${email}`}
          style={{
            display: "block",
            marginTop: 32,
            padding: "28px 24px",
            borderRadius: 20,
            border: "1px solid var(--line)",
            background: "var(--paper)",
            boxShadow: "var(--shadow)",
            textDecoration: "none",
            transition: "transform .15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {language === "nl" ? "E-mail ons direct" : "Email us directly"}
          </span>
          <span style={{ display: "block", marginTop: 6, fontSize: 28, fontWeight: 800, color: "var(--green)" }}>
            {email}
          </span>
        </a>

        <p style={{ marginTop: 24, fontSize: 13, color: "var(--muted)", maxWidth: 440, marginLeft: "auto", marginRight: "auto" }}>
          {t("contact.orgsNote")}
        </p>

        <p style={{ marginTop: 40, fontSize: 12, color: "var(--muted)" }}>
          {t("contact.privacyNote")}{" "}
          <Link to="/terms" style={{ color: "var(--green)", fontWeight: 700 }}>
            {t("contact.privacyLink")}
          </Link>
        </p>
      </div>
    </PageShell>
  );
}
