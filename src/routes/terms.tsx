import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/rk/Shell";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { termsNL, termsEN, BLANKS_TO_CONFIRM, type TermsBlock } from "@/lib/legal/terms-content";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Privacy — InkoopMatch" },
      { name: "description", content: "InkoopMatch terms of use and mediation." },
    ],
  }),
  component: Terms,
});

function Block({ block }: { block: TermsBlock }) {
  if (block.type === "list") {
    return (
      <ul style={{ paddingLeft: 20, margin: "6px 0 14px", listStyle: "disc" }}>
        {block.items.map((item, i) => (
          <li key={i} style={{ marginBottom: 4 }}>
            {item}
          </li>
        ))}
      </ul>
    );
  }
  return <p style={{ margin: "0 0 10px" }}>{block.text}</p>;
}

function Terms() {
  const { language } = useLanguage();
  const isNL = language === "nl";
  const content = isNL ? termsNL : termsEN;

  return (
    <PageShell>
      <div className="shell" style={{ maxWidth: 820, paddingTop: 24, paddingBottom: 64 }}>
        <div
          style={{
            border: "1px solid #e0b34d",
            background: "#fdf6e3",
            borderRadius: 12,
            padding: "16px 20px",
            marginBottom: 28,
            fontSize: 13,
          }}
        >
          <strong>To confirm with the team before publishing —</strong> the source
          document itself left these blank; nothing below is invented:
          <ul style={{ paddingLeft: 20, margin: "8px 0 0" }}>
            {BLANKS_TO_CONFIRM.map((b, i) => (
              <li key={i} style={{ marginBottom: 4 }}>
                {b}
              </li>
            ))}
          </ul>
        </div>

        {!isNL && (
          <div
            style={{
              border: "1px solid var(--line)",
              background: "#f1efe6",
              borderRadius: 12,
              padding: "12px 16px",
              marginBottom: 24,
              fontSize: 12,
              color: "var(--muted)",
            }}
          >
            This is a complete English translation for convenience only. The
            Dutch-language version is the authoritative, legally binding
            text (per Article 29.6). If anything here differs from the
            Dutch version, the Dutch version governs.
          </div>
        )}

        <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>
          {content.version} · {content.effectiveDate} ·{" "}
          {isNL ? "laatst gewijzigd" : "last modified"}: {content.lastModified}
        </p>
        <h1 style={{ marginBottom: 18 }}>{content.docTitle}</h1>

        {content.intro.map((p, i) => (
          <p key={i} style={{ marginBottom: 10 }}>
            {p}
          </p>
        ))}

        <ol style={{ paddingLeft: 20, margin: "16px 0" }}>
          {content.summaryPoints.map((p, i) => (
            <li key={i} style={{ marginBottom: 8 }}>
              {p}
            </li>
          ))}
        </ol>
        <p style={{ fontWeight: 700, marginBottom: 28 }}>{content.summaryClosing}</p>

        {content.articles.map((article) => (
          <section key={article.number} style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 17, marginBottom: 8 }}>
              {isNL ? "Artikel" : "Article"} {article.number} — {article.title}
            </h2>
            {article.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </section>
        ))}

        <section style={{ marginTop: 40, borderTop: "1px solid var(--line)", paddingTop: 24 }}>
          <h2 style={{ fontSize: 17, marginBottom: 14 }}>
            {isNL ? "Teksten bij het inschrijfformulier" : "Registration-form texts"}
          </h2>
          {content.formTexts.map((f, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <p style={{ fontWeight: 700, marginBottom: 4 }}>{f.heading}</p>
              <p style={{ whiteSpace: "pre-line", color: "var(--muted)" }}>{f.text}</p>
            </div>
          ))}
        </section>

        <p style={{ marginTop: 32, fontSize: 12, color: "var(--muted)" }}>
          {isNL ? "Vragen?" : "Questions?"}{" "}
          <Link to="/contact" style={{ color: "var(--green)", fontWeight: 700 }}>
            {isNL ? "Neem contact op" : "Contact us"}
          </Link>
        </p>
      </div>
    </PageShell>
  );
}
