import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { termsNL, termsEN, type TermsBlock } from "@/lib/legal/terms-content";

export const CONSENT_VERSION = "v3";

function Block({ block }: { block: TermsBlock }) {
  if (block.type === "list") {
    return (
      <ul style={{ paddingLeft: 18, margin: "4px 0 8px", listStyle: "disc" }}>
        {block.items.map((item, i) => (
          <li key={i} style={{ marginBottom: 2 }}>
            {item}
          </li>
        ))}
      </ul>
    );
  }
  return <p style={{ margin: "0 0 6px" }}>{block.text}</p>;
}

export function ConsentModal({
  open,
  onAgree,
  agreeing,
}: {
  open: boolean;
  onAgree: () => void;
  agreeing: boolean;
}) {
  const [checked, setChecked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { t, language } = useLanguage();
  const content = language === "nl" ? termsNL : termsEN;

  const points = [
    t("consent.point1"),
    t("consent.point2"),
    t("consent.point3"),
    t("consent.point4"),
    t("consent.point5"),
  ];

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="auth-card [&>button:last-of-type]:hidden"
        style={{
          maxWidth: 480,
          textAlign: "left",
          maxHeight: "88vh",
          overflowY: "auto",
        }}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <p className="section-kicker">{t("consent.title")}</p>
        <h1 style={{ fontSize: 22 }}>{t("consent.title")}</h1>
        <p>{t("consent.subtitle")}</p>

        <ul style={{ listStyle: "none", padding: 0, margin: "14px 0" }}>
          {points.map((point) => (
            <li
              key={point}
              style={{ display: "flex", gap: 8, fontSize: 13, lineHeight: 1.5, marginBottom: 8 }}
            >
              <span style={{ color: "var(--green)", flexShrink: 0 }}>✓</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <Collapsible open={expanded} onOpenChange={setExpanded}>
          <CollapsibleTrigger asChild>
            <button type="button" className="resend" style={{ marginBottom: 8 }}>
              {expanded ? t("consent.hideFullTerms") : t("consent.readFullTerms")}
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div
              style={{
                marginTop: 4,
                marginBottom: 8,
                maxHeight: 220,
                overflowY: "auto",
                borderRadius: 12,
                border: "1px solid var(--line)",
                background: "#f1efe6",
                padding: 14,
                fontSize: 11,
                lineHeight: 1.5,
                color: "var(--muted)",
              }}
            >
              <p style={{ fontWeight: 700, color: "var(--ink)", marginBottom: 6 }}>
                {content.docTitle}
              </p>
              {content.articles.map((article) => (
                <div key={article.number} style={{ marginBottom: 10 }}>
                  <p style={{ fontWeight: 700, color: "var(--ink)", marginBottom: 3 }}>
                    {language === "nl" ? "Artikel" : "Article"} {article.number} — {article.title}
                  </p>
                  {article.blocks.map((block, i) => (
                    <Block key={i} block={block} />
                  ))}
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Link
          to="/terms"
          target="_blank"
          style={{ display: "inline-block", fontSize: 12, fontWeight: 700, color: "var(--green)", marginBottom: 14 }}
        >
          {language === "nl" ? "Open volledige voorwaarden op een nieuwe pagina →" : "Open full terms on a new page →"}
        </Link>

        <label style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, marginBottom: 16 }}>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            style={{ marginTop: 3 }}
          />
          <span>{t("consent.checkboxLabel")}</span>
        </label>

        <button
          type="button"
          className="button button-primary auth-button"
          onClick={onAgree}
          disabled={!checked || agreeing}
          style={{ width: "100%" }}
        >
          {agreeing ? t("consent.saving") : t("consent.agreeButton")}
        </button>
      </DialogContent>
    </Dialog>
  );
}
