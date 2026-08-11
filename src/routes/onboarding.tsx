import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { DashShell } from "@/components/rk/Shell";
import { RequireAuth } from "@/components/rk/guards";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth/AuthProvider";
import {
  getCvUploadUrl,
  uploadCvToBlob,
  confirmCvUpload,
  completeProfile,
  recordConsent,
} from "@/lib/api/client";
import { ConsentModal, CONSENT_VERSION } from "@/components/rk/ConsentModal";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [{ title: "Set up your profile — InkoopMatch" }],
  }),
  component: () => (
    // requireProfile=false: the whole point of this page is to COMPLETE
    // the profile, so an authed-but-not-onboarded user must be allowed in.
    <RequireAuth requireProfile={false}>
      <Onboarding />
    </RequireAuth>
  ),
});

const AVAILABILITY = ["Immediately", "Within 2 weeks", "Within a month", "Just exploring"];

function Onboarding() {
  const navigate = useNavigate();
  const { getIdToken, refreshSync, profileCompleted, consentGiven } = useAuth();
  const { t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [city, setCity] = useState("");
  const [occupation, setOccupation] = useState("");
  const [years, setYears] = useState("");
  const [availability, setAvailability] = useState("");
  const [mobile, setMobile] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Latch: once the user starts onboarding here, do NOT let a
  // background sync flipping profileCompleted yank them off the form
  // mid-fill. Redirect only happens on explicit successful submit.
  const [justFinished, setJustFinished] = useState(false);

  // Consent must be given before the CV is uploaded/processed at all —
  // gated as a blocking modal shown as soon as onboarding loads.
  // `consentGiven` comes from AuthProvider's context (synced from the
  // server on every login), not local state — so someone who already
  // agreed doesn't see this modal again just because they landed back
  // on onboarding for an unrelated reason (e.g. profile not finished).
  const [consenting, setConsenting] = useState(false);

  const handleAgree = async () => {
    setConsenting(true);
    try {
      // Defensive timeout: whatever the underlying cause of a hang
      // turns out to be (slow cold-start, network issue), the user
      // must never be stuck on "Saving…" with no way out.
      await Promise.race([
        recordConsent(await getIdToken(), CONSENT_VERSION),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 15000),
        ),
      ]);
      // Re-sync so context's consentGiven flips true from the real
      // server value, rather than trusting a local flag that could
      // drift from what's actually recorded.
      await refreshSync();
    } catch {
      toast("Couldn't save your consent", {
        description: "That took too long — please check your connection and try again.",
      });
    } finally {
      setConsenting(false);
    }
  };

  // Only bounce out if the profile was ALREADY complete on arrival
  // (e.g. deep-linked here by mistake) — never mid-session.
  useEffect(() => {
    if (profileCompleted && !justFinished && !submitting) {
      navigate({ to: "/dashboard" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pickCv = (file?: File | null) => {
    if (!file) return;
    if (!/\.(pdf|docx?|txt)$/i.test(file.name)) {
      setError("Please upload a PDF or Word document.");
      return;
    }
    setError(null);
    setCvFile(file);
  };

  const canSubmit = cvFile && city.trim() && occupation.trim() && availability && !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || !cvFile) return;
    if (!consentGiven) {
      // Should be unreachable via the UI (modal blocks interaction),
      // but never upload a CV without recorded consent regardless.
      toast("Please agree to the terms first.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const token = await getIdToken();

      // 1. CV -> Blob (SAS ticket, direct upload, confirm).
      const ticket = await getCvUploadUrl(token, cvFile.name);
      await uploadCvToBlob(ticket, cvFile);
      await confirmCvUpload(token, ticket.blobPath, cvFile.name);

      // 2. Profile fields.
      await completeProfile(token, {
        city: city.trim(),
        occupation: occupation.trim(),
        yearsExperience: years ? Number(years) : null,
        availability,
        mobileNumber: mobile.trim(),
      });

      // 3. Re-sync so profileCompleted flips true, then into the app.
      setJustFinished(true);
      await refreshSync();
      toast("You're all set", { description: "Finding your matches now." });
      navigate({ to: "/dashboard" });
    } catch (err) {
      console.error(err);
      setError("Something went wrong saving your profile. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashShell>
      <ConsentModal open={!consentGiven} onAgree={handleAgree} agreeing={consenting} />
      <div className="mx-auto max-w-2xl pt-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {t("onboarding.title")}
          </h1>
          <p className="mt-2 text-[14px] text-[color:var(--text-secondary)]">
            {t("onboarding.subtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rk-glass mt-8 space-y-6 p-6">
          {/* CV */}
          <div>
            <Label className="text-[13px] font-medium">{t("onboarding.yourCv")}</Label>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                pickCv(e.dataTransfer.files?.[0]);
              }}
              className="mt-1.5 flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[color:var(--sage-light)] bg-[color:var(--paper)] py-8 text-center transition hover:border-[color:var(--olive)] hover:bg-[color:var(--olive-light)]"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-[color:var(--sage)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[color:var(--olive)]">
                  <path d="M12 5v14M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-[13px] font-medium text-foreground">
                {cvFile ? cvFile.name : t("onboarding.dropCv")}
              </p>
              <p className="text-[11px] text-[color:var(--text-tertiary)]">{t("onboarding.fileHint")}</p>
            </button>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
              onChange={(e) => pickCv(e.target.files?.[0])}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="city">{t("onboarding.city")}</Label>
              <Input id="city" required placeholder="Amsterdam" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="occupation">{t("onboarding.occupation")}</Label>
              <Input id="occupation" required placeholder="Procurement Advisor" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="years">{t("onboarding.yearsExperience")}</Label>
              <Input id="years" type="number" min={0} max={60} placeholder="8" value={years} onChange={(e) => setYears(e.target.value)} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="mobile">{t("onboarding.mobileOptional")}</Label>
              <Input id="mobile" type="tel" placeholder="+31 6 12345678" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            </div>
            <div className="grid gap-1.5">
              <Label>{t("onboarding.availability")}</Label>
              <Select value={availability} onValueChange={setAvailability}>
                <SelectTrigger>
                  <SelectValue placeholder={t("onboarding.selectPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABILITY.map((a) => (
                    <SelectItem key={a} value={a}>
                      {a}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && <p className="text-[13px] text-destructive">{error}</p>}

          <Button type="submit" className="w-full" disabled={!canSubmit}>
            {submitting ? t("onboarding.saving") : t("onboarding.finishButton")}
          </Button>
        </form>
      </div>
    </DashShell>
  );
}
