import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DashShell } from "@/components/rk/Shell";
import { RequireAuth } from "@/components/rk/guards";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import {
  getCandidateJob,
  getMyApplications,
  applyToJob,
  type CandidateJob,
} from "@/lib/api/client";

export const Route = createFileRoute("/project/$id")({
  head: () => ({ meta: [{ title: "Project — InkoopMatch" }] }),
  component: () => (
    <RequireAuth>
      <ProjectDetail />
    </RequireAuth>
  ),
});

function formatDeadline(deadline: string | null): string | null {
  if (!deadline) return null;
  const d = new Date(deadline);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

function ProjectDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { getIdToken } = useAuth();
  const { t } = useLanguage();

  const [job, setJob] = useState<CandidateJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [applied, setApplied] = useState(false);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const token = await getIdToken();
      const [j, apps] = await Promise.all([
        getCandidateJob(token, id),
        getMyApplications(token),
      ]);
      if (!active) return;
      if (!j) {
        setNotFound(true);
      } else {
        setJob(j);
        setApplied(apps.jobIds.includes(id));
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [id, getIdToken]);

  const handleApply = async () => {
    if (applied || applying) return;
    setApplying(true);
    try {
      const token = await getIdToken();
      const res = await applyToJob(token, id);
      setApplied(true);
      toast(res.alreadyApplied ? "Already applied" : "Application sent", {
        description: res.alreadyApplied
          ? "You'd already applied to this project."
          : "The organisation will see your profile.",
      });
    } catch {
      toast("Couldn't apply", { description: "Please try again in a moment." });
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <DashShell>
        <div className="shell" style={{ padding: "60px 0", textAlign: "center", color: "var(--muted)" }}>
          Loading…
        </div>
      </DashShell>
    );
  }

  if (notFound || !job) {
    return (
      <DashShell>
        <div className="shell" style={{ padding: "60px 0", textAlign: "center" }}>
          <h1>{t("project.notFound")}</h1>
          <button onClick={() => navigate({ to: "/dashboard" })} className="back">
            {t("project.backToDashboard")}
          </button>
        </div>
      </DashShell>
    );
  }

  const p = job;
  const hasScore = p.fitScore !== null;
  const deadline = formatDeadline(p.deadline);
  const metaLine = [p.org, p.location, p.duration, p.mode].filter(Boolean).join(" · ");
  const isNew = p.postedHoursAgo < 24;
  const statusLabel =
    p.status.toLowerCase() === "open" ? t("dashboard.open") : t("dashboard.closed");
  const tierLabel = !hasScore
    ? ""
    : (p.fitScore ?? 0) >= 45
      ? t("dashboard.strongMatch")
      : (p.fitScore ?? 0) >= 30
        ? t("dashboard.goodMatch")
        : t("dashboard.worthALook");

  return (
    <DashShell>
      <div className="shell">
        <Link className="back" to="/dashboard">
          ← {t("project.backToMatches")}
        </Link>

        <section className="detail-hero">
          <div>
            <p className="match-meta">
              {isNew && <b>{t("dashboard.newBadge")}</b>} ID {p.id} · {statusLabel.toUpperCase()}
            </p>
            <h1>{p.title}</h1>
            {metaLine && <p>{metaLine}</p>}
          </div>
          <div className="big-score">
            {hasScore ? (
              <>
                <strong>{p.fitScore}%</strong>
                <span>{tierLabel}</span>
              </>
            ) : (
              <span>{t("project.scoringInProgress")}</span>
            )}
          </div>
        </section>

        <div className="detail-layout">
          <article className="detail-content">
            <section>
              <p className="section-kicker">{t("project.aboutProject")}</p>
              <h2>{p.title}</h2>
              <p>{p.description}</p>
            </section>

            {hasScore && (
              <section>
                <p className="section-kicker">{t("project.fitBreakdown")}</p>
                <p style={{ color: "#52616b" }}>{t("project.evidenceComingSoon")}</p>
              </section>
            )}

            {!hasScore && (
              <section>
                <p className="section-kicker">{t("project.scoringInProgress")}</p>
                <p style={{ color: "#52616b" }}>{t("project.scoringExplainer")}</p>
              </section>
            )}

            {p.tags.length > 0 && (
              <section>
                <p className="section-kicker">{t("project.requiredSkills")}</p>
                <div className="tags">
                  {p.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </section>
            )}
          </article>

          <aside className="apply-panel">
            {p.rate && (
              <>
                <p>{t("project.dayRate")}</p>
                <strong>{p.rate}</strong>
                <hr />
              </>
            )}
            <p>{t("project.deadline")}</p>
            <strong>{deadline ?? t("project.notSpecified")}</strong>
            <button
              className="button button-primary"
              onClick={handleApply}
              disabled={applied || applying}
            >
              {applied ? t("project.appliedButton") : applying ? t("project.applying") : t("project.applyButton")}
            </button>
            <small>
              {applied ? t("project.consentAfterApply") : t("project.consentBeforeApply")}
            </small>
          </aside>
        </div>
      </div>
    </DashShell>
  );
}
