import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DashShell } from "@/components/rk/Shell";
import { RequireAuth } from "@/components/rk/guards";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import {
  getCandidateJobs,
  getMyShortlist,
  getMyApplications,
  getMyApplicationJobs,
  type CandidateJob,
} from "@/lib/api/client";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — InkoopMatch" },
      { name: "description", content: "Your matched freelance projects and shortlist." },
    ],
  }),
  component: () => (
    <RequireAuth>
      <Dashboard />
    </RequireAuth>
  ),
});

const PAGE_SIZE = 50;
type StatusFilter = "open" | "closed" | "all";
type View = "matches" | "applied" | "shortlist";

function useGreetingKey(): "goodMorning" | "goodAfternoon" | "goodEvening" {
  const h = new Date().getHours();
  return h < 12 ? "goodMorning" : h < 18 ? "goodAfternoon" : "goodEvening";
}

function useDebounced<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(t);
  }, [value, delayMs]);
  return debounced;
}

/** Exact reference .match-card structure. tierLabel/statusLabel/newLabel
 * are pre-resolved strings (not looked up inside this component) so it
 * stays a plain presentational component, same as the reference's own
 * inline card markup. */
function MatchCard({
  job,
  applied,
  isNew,
  tierLabel,
  scoringLabel,
  statusLabel,
  appliedLabel,
}: {
  job: CandidateJob;
  applied: boolean;
  isNew: boolean;
  tierLabel: string;
  scoringLabel: string;
  statusLabel: string;
  appliedLabel: string;
}) {
  const metaLine = [job.org, job.location].filter(Boolean).join(" · ");
  const detailLine = [job.duration, job.mode, job.rate].filter(Boolean).join(" · ");

  return (
    <Link className="match-card" to="/project/$id" params={{ id: job.id }}>
      <div className="match-accent" />
      <div className="match-main">
        <p className="match-meta">
          {isNew && <b>{statusLabel}</b>}
          {applied && <b>{appliedLabel}</b>} ID {job.id}
        </p>
        <h2>{job.title}</h2>
        {metaLine && <p>{metaLine}</p>}
        {detailLine && <p>{detailLine}</p>}
        {job.description && <p>{job.description}</p>}
        {job.tags.length > 0 && (
          <div className="tags">
            {job.tags.slice(0, 4).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}
      </div>
      <div className="score">
        {job.fitScore !== null ? (
          <>
            <strong>{job.fitScore}%</strong>
            <span>{tierLabel}</span>
          </>
        ) : (
          <span>{scoringLabel}</span>
        )}
      </div>
      <span className="card-arrow">→</span>
    </Link>
  );
}

function Dashboard() {
  const greetingKey = useGreetingKey();
  const { user, getIdToken } = useAuth();
  const { t } = useLanguage();
  const greeting =
    greetingKey === "goodMorning"
      ? t("dashboard.goodMorning")
      : greetingKey === "goodAfternoon"
        ? t("dashboard.goodAfternoon")
        : t("dashboard.goodEvening");
  const firstName = user?.name?.split(" ")[0];

  const [jobs, setJobs] = useState<CandidateJob[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [shortlist, setShortlist] = useState<CandidateJob[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<CandidateJob[]>([]);
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());

  const [view, setView] = useState<View>("matches");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounced(search, 350);

  // Filters limited to fields with REAL data behind them (status +
  // a client-side minimum-score threshold, since fitScore is already
  // fetched with every job). Category/work-mode filters from the
  // reference aren't wired to anything — the jobs table has no
  // reliable structured data for those — so they're intentionally
  // left out rather than shown as non-functional checkboxes.
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("open");
  const [minScore, setMinScore] = useState(0);

  const hasMore = jobs.length < total;
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const inFlightRef = useRef(false);

  const loadFirstPage = useCallback(
    async (searchTerm: string, status: StatusFilter) => {
      setLoadingJobs(true);
      const token = await getIdToken();
      const res = await getCandidateJobs(token, {
        page: 1,
        pageSize: PAGE_SIZE,
        search: searchTerm || undefined,
        status,
      });
      setJobs(res.jobs);
      setTotal(res.total);
      setPage(1);
      setLoadingJobs(false);
    },
    [getIdToken],
  );

  const loadNextPage = useCallback(async () => {
    if (inFlightRef.current || !hasMore) return;
    inFlightRef.current = true;
    setLoadingMore(true);
    try {
      const token = await getIdToken();
      const nextPage = page + 1;
      const res = await getCandidateJobs(token, {
        page: nextPage,
        pageSize: PAGE_SIZE,
        search: debouncedSearch || undefined,
        status: statusFilter,
      });
      setJobs((prev) => [...prev, ...res.jobs]);
      setTotal(res.total);
      setPage(nextPage);
    } finally {
      setLoadingMore(false);
      inFlightRef.current = false;
    }
  }, [page, hasMore, debouncedSearch, statusFilter, getIdToken]);

  useEffect(() => {
    let active = true;
    (async () => {
      const token = await getIdToken();
      const a = await getMyApplications(token);
      if (active) setAppliedIds(new Set(a.jobIds));
    })();
    (async () => {
      const token = await getIdToken();
      const s = await getMyShortlist(token);
      if (active) setShortlist(s.jobs);
    })();
    (async () => {
      const token = await getIdToken();
      const a = await getMyApplicationJobs(token);
      if (active) setAppliedJobs(a.jobs);
    })();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadFirstPage(debouncedSearch, statusFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, statusFilter]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || view !== "matches") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadNextPage();
      },
      { rootMargin: "400px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadNextPage, view]);

  const visibleJobs = useMemo(
    () => jobs.filter((j) => j.fitScore === null || j.fitScore >= minScore),
    [jobs, minScore],
  );

  const list = view === "matches" ? visibleJobs : view === "applied" ? appliedJobs : shortlist;

  const tierLabel = (score: number | null) =>
    score === null
      ? ""
      : score >= 45
        ? t("dashboard.strongMatch")
        : score >= 30
          ? t("dashboard.goodMatch")
          : t("dashboard.worthALook");

  return (
    <DashShell>
      <section className="dash-shell shell">
        <div className="dash-title">
          <div>
            <p>{firstName ? `${greeting}, ${firstName}` : greeting}</p>
            <h1>{t("dashboard.yourMatches")}</h1>
            <span>{t("dashboard.subtitle")}</span>
          </div>
          <div className="profile-status">
            <span>✓</span>
            <div>
              <strong>{t("dashboard.total")}: {total}</strong>
              <small>
                {jobs.filter((j) => j.postedHoursAgo < 24).length} {t("dashboard.newIn24h")}
              </small>
            </div>
          </div>
        </div>

        {/* View switch — real functionality (Matches/Applied/Shortlisted)
            the reference doesn't show (it only has one list). Styled as
            plain nav links to stay visually unobtrusive. */}
        <nav style={{ display: "flex", gap: 24, marginBottom: 18, fontSize: 14, fontWeight: 700 }}>
          <button
            type="button"
            onClick={() => setView("matches")}
            style={{ color: view === "matches" ? "var(--green)" : "var(--muted)" }}
          >
            {t("dashboard.yourMatches")}
          </button>
          <button
            type="button"
            onClick={() => setView("applied")}
            style={{ color: view === "applied" ? "var(--green)" : "var(--muted)" }}
          >
            {t("dashboard.applied")} {appliedJobs.length > 0 && `(${appliedJobs.length})`}
          </button>
          <button
            type="button"
            onClick={() => setView("shortlist")}
            style={{ color: view === "shortlist" ? "var(--green)" : "var(--muted)" }}
          >
            {t("dashboard.shortlisted")} {shortlist.length > 0 && `(${shortlist.length})`}
          </button>
        </nav>

        <div className="matches-layout">
          <aside>
            <h2>{t("dashboard.status")}</h2>
            <fieldset>
              <legend>{t("dashboard.status")}</legend>
              {(["open", "closed", "all"] as StatusFilter[]).map((s) => (
                <label key={s}>
                  <input
                    type="checkbox"
                    checked={statusFilter === s}
                    onChange={() => setStatusFilter(s)}
                  />
                  {s === "open" ? t("dashboard.open") : s === "closed" ? t("dashboard.closed") : t("dashboard.allStatuses")}
                </label>
              ))}
            </fieldset>
            <fieldset>
              <legend>{t("dashboard.scoringLabel")}</legend>
              <input
                type="range"
                min={0}
                max={80}
                value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
              />
              <small>{minScore}%+</small>
            </fieldset>
          </aside>

          <div className="match-list">
            <div className="list-top">
              <p>
                <strong>{list.length}</strong> {view === "matches" ? t("dashboard.yourMatches") : view === "applied" ? t("dashboard.appliedTabHint") : t("dashboard.shortlistTabHint")}
              </p>
              {view === "matches" && (
                <input
                  aria-label="Search"
                  placeholder={t("dashboard.searchPlaceholder")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    background: "var(--paper)",
                    border: "1px solid var(--line)",
                    padding: "10px 12px",
                    borderRadius: 10,
                    color: "var(--ink)",
                  }}
                />
              )}
            </div>

            {list.length === 0 ? (
              <p style={{ color: "var(--muted)", padding: "24px 0" }}>
                {loadingJobs
                  ? t("dashboard.loadingMore")
                  : view === "matches"
                    ? t("dashboard.noMatchesYet")
                    : view === "applied"
                      ? t("dashboard.noApplications")
                      : t("dashboard.noShortlist")}
              </p>
            ) : (
              list.map((job) => (
                <MatchCard
                  key={job.id}
                  job={job}
                  applied={appliedIds.has(job.id)}
                  isNew={job.postedHoursAgo < 24}
                  tierLabel={tierLabel(job.fitScore)}
                  scoringLabel={t("dashboard.scoringLabel")}
                  statusLabel={t("dashboard.newBadge")}
                  appliedLabel={t("dashboard.applied")}
                />
              ))
            )}

            {view === "matches" && list.length > 0 && (
              <div ref={sentinelRef} style={{ height: 16 }}>
                {loadingMore && (
                  <p style={{ textAlign: "center", color: "var(--muted)", fontSize: 12 }}>
                    {t("dashboard.loadingMore")}
                  </p>
                )}
                {!hasMore && !loadingMore && (
                  <p style={{ textAlign: "center", color: "var(--muted)", fontSize: 12 }}>
                    {t("dashboard.reachedEnd")} — {total} {t("dashboard.total")}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </DashShell>
  );
}
