import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { PageShell } from "@/components/rk/Shell";
import { RequireGuest } from "@/components/rk/guards";
import { SignInModal } from "@/components/rk/SignInModal";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "InkoopMatch — Upload your CV. See your matches." },
      {
        name: "description",
        content:
          "InkoopMatch matches procurement, legal, compliance and contract freelancers to EU projects with a transparent fit score. Upload your CV once.",
      },
    ],
  }),
  component: () => (
    <RequireGuest>
      <Landing />
    </RequireGuest>
  ),
});

function Landing() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const signupTriggerRef = useRef<HTMLButtonElement>(null);
  const { t } = useLanguage();

  const handleFile = (file?: File | null) => {
    if (!file) return;
    if (!/\.(pdf|docx?|txt)$/i.test(file.name)) {
      setError("Please upload a PDF or Word document.");
      return;
    }
    setError(null);
    setPicked(file.name);
    signupTriggerRef.current?.click();
  };

  return (
    <PageShell>
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow">
            <span aria-hidden="true">✓</span> {t("landing.badge")}
          </div>
          <h1 id="hero-title">
            {t("landing.heroLine1")} {t("landing.heroLine2")}{" "}
            <em>{t("landing.heroLine2Accent")}.</em>
          </h1>
          <p className="lead">{t("landing.subtitle")}</p>
          <p className="human-note">
            <span aria-hidden="true">♡</span> {t("landing.humanNote")}
          </p>
          <Link className="text-link" to="/how-it-works">
            {t("landing.seeHowItWorks")} <span>→</span>
          </Link>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="profile one" />
          <div className="profile two" />
          <div className="paper">
            <i /><i /><i />
          </div>
          <div className="checklist">
            <i>✓</i><i>✓</i><i>✓</i>
          </div>
          <div className="connector" />
        </div>

        <section className="upload-card" aria-labelledby="upload-title">
          <p className="step-label">{t("landing.timeEstimate")}</p>
          <h2 id="upload-title">{t("landing.startTitle")}</h2>
          <div
            className={`dropzone ${dragging ? "is-dragging" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              handleFile(e.dataTransfer.files?.[0]);
            }}
            onClick={() => inputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
            }}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={(e) => handleFile(e.target.files?.[0])}
              hidden
            />
            <span className="upload-icon" aria-hidden="true">↑</span>
            <strong>{picked ? picked : t("landing.dropCv")}</strong>
            <span>{t("landing.fileHint")}</span>
          </div>
          {error && (
            <p style={{ color: "#b3442f", fontSize: 12, marginTop: 8 }}>{error}</p>
          )}
          <p className="privacy">
            <span aria-hidden="true">♢</span> {t("landing.noSpam")}
          </p>
        </section>
      </section>

      <section className="proof" aria-label="Waarom InkoopMatch">
        <div className="shell proof-grid">
          {[
            ["▣", t("landing.proof1Title"), t("landing.proof1Desc")],
            ["◎", t("landing.proof2Title"), t("landing.proof2Desc")],
            ["✓", t("landing.proof3Title"), t("landing.proof3Desc")],
          ].map(([icon, title, desc]) => (
            <article key={title}>
              <span className="proof-icon">{icon}</span>
              <div>
                <strong>{title}</strong>
                <p>{desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="how shell" id="how">
        <p className="section-kicker">{t("landing.howItWorks")}</p>
        <h2>{t("landing.heroLine1")}</h2>
        <div className="steps">
          {[
            ["01", t("landing.step1Title"), t("landing.step1Desc")],
            ["02", t("landing.step2Title"), t("landing.step2Desc")],
            ["03", t("landing.step3Title"), t("landing.step3Desc")],
          ].map(([n, title, desc]) => (
            <article key={n}>
              <span>{n}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="organisation" id="organisaties">
        <div className="shell organisation-inner">
          <div>
            <p className="section-kicker">{t("nav.forOrganisations")}</p>
            <h2>{t("landing.questionsTitle")}</h2>
            <p>{t("landing.questionsSubtitle")}</p>
          </div>
          <Link className="button button-light" to="/contact">
            {t("landing.contactUs")}
          </Link>
        </div>
      </section>

      <div style={{ display: "none" }}>
        <SignInModal trigger={<button ref={signupTriggerRef} type="button">open signup</button>} />
      </div>
    </PageShell>
  );
}
