/**
 * ─────────────────────────────────────────────────────────────────────
 * API CLIENT — the single seam between the frontend and the backend.
 * ─────────────────────────────────────────────────────────────────────
 *
 * Every backend call the candidate UI needs is declared here, once.
 * Right now each function returns mock data (or a resolved stub) so the
 * whole UI is clickable end-to-end without a backend. When the real
 * Azure Function endpoints exist, wire them up in ONE place — the
 * `callApi` helper below — and delete the mock branches.
 *
 * Search for `TODO(backend)` to find every endpoint that needs wiring.
 * The companion doc `BACKEND_TODO.md` lists them all with the exact
 * contract each one must satisfy.
 *
 * Identity rule (applies to every authenticated call): the backend must
 * resolve the user from the validated bearer token, NEVER from a
 * client-supplied user id. These client functions therefore never send
 * a user id — they send the token and the operation's own params only.
 */

import type { Project } from "@/lib/rk/projects";
import { MOCK_PROJECTS } from "@/lib/rk/projects";

const API_BASE = import.meta.env.VITE_API_BASE_URL as string | undefined;
const USE_MOCKS = !API_BASE; // no base URL configured -> run on mocks

/** Small artificial delay so loading states are visible during mock dev. */
const wait = (ms = 400) => new Promise((r) => setTimeout(r, ms));

/**
 * The one place real HTTP happens. Not used while USE_MOCKS is true.
 * When wiring the backend: fill in the fetch, keep the bearer-token
 * header, and remove the mock short-circuits in each function below.
 */
async function callApi<T>(
  path: string,
  opts: { method?: string; token?: string | null; body?: unknown } = {},
): Promise<T> {
  const { method = "GET", token, body } = opts;
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new ApiError(res.status, text || res.statusText);
  }
  return (await res.json()) as T;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ─────────────────────────────────────────────────────────────────────
// AUTH / IDENTITY
// ─────────────────────────────────────────────────────────────────────

export type UserSyncResult = {
  userId: number;
  isNewUser: boolean;
  profileCompleted: boolean;
  // Mirrors users.cv_consent_given_at IS NOT NULL — lets the frontend
  // skip re-showing the consent modal for someone who already agreed,
  // even if they land back on onboarding for an unrelated reason.
  consentGiven: boolean;
};

/**
 * TODO(backend): POST /api/user-sync
 * Validates the bearer token, upserts `users` on entra_object_id,
 * returns the internal user id + whether onboarding is done.
 */
export async function syncUser(token: string): Promise<UserSyncResult> {
  if (USE_MOCKS) {
    await wait(300);
    // Mock identity is per-email so a fresh signup in the same browser
    // does NOT inherit a previous test user's "onboarded" state.
    // AuthProvider stashes the current email under mock.currentEmail.
    const email =
      (typeof window !== "undefined" && window.sessionStorage.getItem("mock.currentEmail")) ||
      "anon";
    const doneKey = `mock.profileCompleted:${email}`;
    const done =
      typeof window !== "undefined" && window.sessionStorage.getItem(doneKey) === "1";
    // Same key recordConsent's mock branch already sets — previously
    // never read back here, so the mock consent modal reappeared every
    // sync regardless of whether mock.consentGiven had been set.
    const consentGiven =
      typeof window !== "undefined" && window.sessionStorage.getItem("mock.consentGiven") === "1";
    return { userId: 1, isNewUser: !done, profileCompleted: done, consentGiven };
  }
  return callApi<UserSyncResult>("/user-sync", { method: "POST", token });
}

// ─────────────────────────────────────────────────────────────────────
// ONBOARDING / PROFILE
// ─────────────────────────────────────────────────────────────────────

export type CandidateProfileInput = {
  city: string;
  occupation: string;
  yearsExperience: number | null;
  availability: string;
  mobileNumber: string;
};

/**
 * TODO(backend): POST /api/complete-profile
 * Writes profile fields, sets users.profile_completed_at.
 */
export async function completeProfile(
  token: string | null,
  profile: CandidateProfileInput,
): Promise<{ ok: true }> {
  if (USE_MOCKS) {
    await wait(500);
    if (typeof window !== "undefined") {
      const email = window.sessionStorage.getItem("mock.currentEmail") || "anon";
      window.sessionStorage.setItem(`mock.profileCompleted:${email}`, "1");
    }
    return { ok: true };
  }
  return callApi("/complete-profile", { method: "POST", token, body: profile });
}

// ─────────────────────────────────────────────────────────────────────
// CV UPLOAD
// ─────────────────────────────────────────────────────────────────────

export type CvUploadTicket = { uploadUrl: string; blobPath: string };

/**
 * TODO(backend): POST /api/cv-upload-url
 * Returns a short-lived, write-only SAS URL scoped to one blob path.
 */
export async function getCvUploadUrl(
  token: string | null,
  fileName: string,
): Promise<CvUploadTicket> {
  if (USE_MOCKS) {
    await wait(300);
    return { uploadUrl: "mock://upload", blobPath: `cvs/mock/${fileName}` };
  }
  return callApi("/cv-upload-url", { method: "POST", token, body: { fileName } });
}

/**
 * Uploads the file bytes to the SAS URL. In mock mode this is a no-op
 * that just resolves — no real Blob Storage is touched.
 * TODO(backend): this PUTs directly to Azure Blob Storage (not our API).
 */
export async function uploadCvToBlob(ticket: CvUploadTicket, file: File): Promise<void> {
  if (USE_MOCKS || ticket.uploadUrl.startsWith("mock://")) {
    await wait(700);
    return;
  }
  const res = await fetch(ticket.uploadUrl, {
    method: "PUT",
    headers: { "x-ms-blob-type": "BlockBlob" },
    body: file,
  });
  if (!res.ok) throw new ApiError(res.status, "CV upload failed");
}

/**
 * TODO(backend): POST /api/cv-upload-confirm
 * Marks the new UserCVs row active, previous ones inactive,
 * EmbeddingStatus = 'pending'.
 */
export async function confirmCvUpload(
  token: string | null,
  blobPath: string,
  fileName: string,
): Promise<{ ok: true }> {
  if (USE_MOCKS) {
    await wait(300);
    return { ok: true };
  }
  return callApi("/cv-upload-confirm", {
    method: "POST",
    token,
    body: { blobPath, fileName },
  });
}

/**
 * Metadata about the caller's currently-active CV. `hasCv` is the only
 * always-present field; fileName / uploadedAt are undefined when no CV
 * is on file, and uploadedAt may be undefined even when hasCv=true if
 * the backend SP doesn't return that column.
 */
export type MyCvInfo = {
  hasCv: boolean;
  fileName?: string;
  uploadedAt?: string;
};

/**
 * GET /api/my-cv — returns metadata about the caller's active CV.
 * Used by the Settings page's CV card to show the user what's on file
 * before they replace it.
 */
export async function getMyCv(token: string | null): Promise<MyCvInfo> {
  if (USE_MOCKS) {
    await wait(150);
    return { hasCv: false };
  }
  return callApi("/my-cv", { method: "GET", token });
}

/**
 * A short-lived read link to the caller's own CV. SAS-based, 15 min
 * expiry — never a permanent public URL.
 */
export type MyCvDownloadUrl = { downloadUrl: string; fileName: string };

/**
 * GET /api/my-cv-url — mints a short-lived read SAS URL for the
 * caller's currently-active CV, so the Settings page can offer a
 * "View" button that opens the CV in a new tab.
 */
export async function getMyCvDownloadUrl(
  token: string | null,
): Promise<MyCvDownloadUrl> {
  if (USE_MOCKS) {
    await wait(150);
    return { downloadUrl: "mock://download", fileName: "mock.pdf" };
  }
  return callApi("/my-cv-url", { method: "GET", token });
}

export type CandidateProfile = CandidateProfileInput & {
  name: string;
  email: string;
};

/**
 * TODO(backend): GET /api/my-profile
 * Returns the current user's profile for the settings page.
 */
export async function getMyProfile(token: string | null): Promise<CandidateProfile> {
  if (USE_MOCKS) {
    await wait(250);
    const raw =
      typeof window !== "undefined" && window.sessionStorage.getItem("mock.profile");
    const saved = raw ? (JSON.parse(raw) as Partial<CandidateProfile>) : {};
    return {
      name: saved.name ?? "Ada Lovelace",
      email: saved.email ?? "ada@example.com",
      city: saved.city ?? "Amsterdam",
      occupation: saved.occupation ?? "Procurement Advisor",
      yearsExperience: saved.yearsExperience ?? 8,
      availability: saved.availability ?? "Within 2 weeks",
      mobileNumber: saved.mobileNumber ?? "",
    };
  }
  return callApi("/my-profile", { token });
}

export type NotificationPrefs = {
  newMatches: boolean;
  shortlisted: boolean;
  productUpdates: boolean;
};

/**
 * TODO(backend): GET /api/my-notification-prefs
 */
export async function getNotificationPrefs(
  token: string | null,
): Promise<NotificationPrefs> {
  if (USE_MOCKS) {
    await wait(200);
    const raw =
      typeof window !== "undefined" && window.sessionStorage.getItem("mock.notif");
    return raw
      ? (JSON.parse(raw) as NotificationPrefs)
      : { newMatches: true, shortlisted: true, productUpdates: false };
  }
  return callApi("/my-notification-prefs", { token });
}

/**
 * TODO(backend): POST /api/my-notification-prefs
 */
export async function updateNotificationPrefs(
  token: string | null,
  prefs: NotificationPrefs,
): Promise<{ ok: true }> {
  if (USE_MOCKS) {
    await wait(300);
    if (typeof window !== "undefined")
      window.sessionStorage.setItem("mock.notif", JSON.stringify(prefs));
    return { ok: true };
  }
  return callApi("/my-notification-prefs", { method: "POST", token, body: prefs });
}

/**
 * TODO(backend): POST /api/update-profile
 * Updates name + profile fields (does NOT re-gate onboarding).
 */
export async function updateProfile(
  token: string | null,
  profile: CandidateProfile,
): Promise<{ ok: true }> {
  if (USE_MOCKS) {
    await wait(400);
    if (typeof window !== "undefined")
      window.sessionStorage.setItem("mock.profile", JSON.stringify(profile));
    return { ok: true };
  }
  return callApi("/update-profile", { method: "POST", token, body: profile });
}

/**
 * TODO(backend): POST /api/change-password
 * For native-auth accounts, this triggers Entra's self-service
 * password reset / change flow. Social accounts have no password.
 */
export async function changePassword(
  token: string | null,
  body: { currentPassword: string; newPassword: string },
): Promise<{ ok: true }> {
  if (USE_MOCKS) {
    await wait(500);
    if (body.newPassword.length < 8) throw new ApiError(400, "Password too short");
    return { ok: true };
  }
  return callApi("/change-password", { method: "POST", token, body });
}

/**
 * TODO(backend): POST /api/delete-account
 * Soft-deletes / anonymises the user, revokes the CV blob, cascades
 * applications. Irreversible from the user's side.
 */
export async function deleteAccount(token: string | null): Promise<{ ok: true }> {
  if (USE_MOCKS) {
    await wait(600);
    if (typeof window !== "undefined") window.sessionStorage.clear();
    return { ok: true };
  }
  return callApi("/delete-account", { method: "POST", token });
}

// ─────────────────────────────────────────────────────────────────────
// JOBS + MATCHES
// ─────────────────────────────────────────────────────────────────────

/**
 * A job as the candidate UI needs it. `fitScore` is null when no match
 * has been computed yet — the UI must render a "scoring in progress"
 * state, never a 0%.
 */
export type CandidateJob = {
  id: string;
  title: string;
  /** Parsed from the listing when detectable; "" if unknown — never
   *  the internal scraper source name. */
  org: string;
  location: string;
  duration: string;
  /** null = genuinely unknown, not a guess. */
  mode: Project["mode"] | null;
  rate: string;
  tags: string[];
  /** null = no reliable categorisation available yet. */
  category: Project["category"] | null;
  description: string;
  postedHoursAgo: number;
  deadline: string | null;
  status: string;
  sourceUrl: string | null;
  fitScore: number | null; // null = not scored yet
  matchedSkills: string[];
  unmatchedSkills: string[];
};

function projectToCandidateJob(p: Project, withScore: boolean): CandidateJob {
  return {
    id: p.id,
    title: p.title,
    org: p.org,
    location: p.location,
    duration: p.duration,
    mode: p.mode,
    rate: p.rate,
    tags: p.tags,
    category: p.category,
    description: p.description,
    postedHoursAgo: p.postedHoursAgo,
    deadline: null,
    status: "open",
    sourceUrl: null,
    fitScore: withScore ? p.fit : null,
    matchedSkills: p.matchedSkills,
    unmatchedSkills: p.unmatchedSkills,
  };
}

/**
 * TODO(backend): GET /api/candidate-jobs?page=&pageSize=&search=
 * Candidate-safe fields only (NOT recruiter_notes etc.). Calls a new
 * GetJobsForCandidate SP.
 */
export async function getCandidateJobs(
  token: string | null,
  opts: {
    page?: number;
    pageSize?: number;
    search?: string;
    /** "open" (default) | "closed" | "all" — real jobs.status filter. */
    status?: "open" | "closed" | "all";
    /** ISO date (YYYY-MM-DD) — only jobs with a deadline on/before this. */
    deadlineBefore?: string;
  } = {},
): Promise<{ jobs: CandidateJob[]; total: number }> {
  if (USE_MOCKS) {
    await wait(400);
    const search = (opts.search ?? "").toLowerCase();
    const filtered = MOCK_PROJECTS.filter(
      (p) =>
        !search ||
        p.title.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search),
    );
    // Mock reality: only some jobs are scored yet, to exercise the
    // "scoring in progress" state. Even-indexed jobs have a score.
    return {
      jobs: filtered.map((p, i) => projectToCandidateJob(p, i % 3 !== 0)),
      total: filtered.length,
    };
  }
  const qs = new URLSearchParams();
  if (opts.page) qs.set("page", String(opts.page));
  if (opts.pageSize) qs.set("pageSize", String(opts.pageSize));
  if (opts.search) qs.set("search", opts.search);
  if (opts.status) qs.set("status", opts.status);
  if (opts.deadlineBefore) qs.set("deadlineBefore", opts.deadlineBefore);
  return callApi(`/candidate-jobs?${qs.toString()}`, { token });
}

/**
 * TODO(backend): GET /api/my-applications-jobs
 * Full job details (not just ids) for the dashboard's "Applied" tab.
 */
export async function getMyApplicationJobs(
  token: string | null,
): Promise<{ jobs: CandidateJob[] }> {
  if (USE_MOCKS) {
    await wait(300);
    const raw =
      (typeof window !== "undefined" && window.sessionStorage.getItem("mock.applied")) || "[]";
    const ids = new Set<string>(JSON.parse(raw));
    const applied = MOCK_PROJECTS.filter((p) => ids.has(p.id));
    return { jobs: applied.map((p) => projectToCandidateJob(p, true)) };
  }
  return callApi("/my-applications-jobs", { token });
}

/**
 * TODO(backend): POST /api/record-consent
 * Records that the candidate agreed to CV processing / terms.
 */
export async function recordConsent(
  token: string | null,
  consentVersion = "v1",
): Promise<{ ok: true }> {
  if (USE_MOCKS) {
    await wait(200);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("mock.consentGiven", "1");
    }
    return { ok: true };
  }
  return callApi("/record-consent", { method: "POST", token, body: { consentVersion } });
}

/**
 * TODO(backend): GET /api/candidate-jobs/:id (or reuse the list SP with
 * an id filter). Single candidate-safe job.
 */
export async function getCandidateJob(
  token: string | null,
  id: string,
): Promise<CandidateJob | null> {
  if (USE_MOCKS) {
    await wait(300);
    const idx = MOCK_PROJECTS.findIndex((p) => p.id === id);
    if (idx < 0) return null;
    return projectToCandidateJob(MOCK_PROJECTS[idx], idx % 3 !== 0);
  }
  return callApi(`/candidate-jobs/${encodeURIComponent(id)}`, { token });
}

// ─────────────────────────────────────────────────────────────────────
// APPLICATIONS
// ─────────────────────────────────────────────────────────────────────

/**
 * TODO(backend): GET /api/my-applications
 * Returns the job ids this candidate has already applied to.
 */
export async function getMyApplications(token: string | null): Promise<{ jobIds: string[] }> {
  if (USE_MOCKS) {
    await wait(200);
    const raw =
      (typeof window !== "undefined" &&
        window.sessionStorage.getItem("mock.applied")) ||
      "[]";
    return { jobIds: JSON.parse(raw) as string[] };
  }
  return callApi("/my-applications", { token });
}

/**
 * TODO(backend): POST /api/apply-job  { jobId }
 * Inserts into JobApplications (idempotent per (JobID, UserID)).
 */
export async function applyToJob(
  token: string | null,
  jobId: string,
): Promise<{ ok: true; alreadyApplied: boolean }> {
  if (USE_MOCKS) {
    await wait(400);
    const raw =
      (typeof window !== "undefined" &&
        window.sessionStorage.getItem("mock.applied")) ||
      "[]";
    const ids = new Set<string>(JSON.parse(raw));
    const already = ids.has(jobId);
    ids.add(jobId);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("mock.applied", JSON.stringify([...ids]));
    }
    return { ok: true, alreadyApplied: already };
  }
  return callApi("/apply-job", { method: "POST", token, body: { jobId } });
}

// ─────────────────────────────────────────────────────────────────────
// SHORTLIST
// ─────────────────────────────────────────────────────────────────────

/**
 * TODO(backend): GET /api/my-shortlist
 * Jobs where a recruiter set JobCandidateActions.Status = 'Shortlisted'
 * for this candidate.
 */
export async function getMyShortlist(token: string | null): Promise<{ jobs: CandidateJob[] }> {
  if (USE_MOCKS) {
    await wait(400);
    // Mock: pretend the recruiter shortlisted the two strongest matches.
    const top = [...MOCK_PROJECTS].sort((a, b) => b.fit - a.fit).slice(0, 2);
    return { jobs: top.map((p) => projectToCandidateJob(p, true)) };
  }
  return callApi("/my-shortlist", { token });
}