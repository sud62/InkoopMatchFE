import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { DashShell } from "@/components/rk/Shell";
import { RequireAuth } from "@/components/rk/guards";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import {
  getMyProfile,
  updateProfile,
  getNotificationPrefs,
  updateNotificationPrefs,
  changePassword,
  deleteAccount,
  getMyCv,
  getMyCvDownloadUrl,
  getCvUploadUrl,
  uploadCvToBlob,
  confirmCvUpload,
  type CandidateProfile,
  type NotificationPrefs,
  type MyCvInfo,
} from "@/lib/api/client";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — InkoopMatch" }] }),
  component: () => (
    <RequireAuth>
      <Settings />
    </RequireAuth>
  ),
});

const AVAILABILITY = ["Immediately", "Within 2 weeks", "Within a month", "Just exploring"];

function Card({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rk-glass overflow-hidden">
      <div className="rk-glass-header px-6 py-4">
        <h2 className="text-[15px] font-bold text-foreground">{title}</h2>
        {desc && <p className="mt-0.5 text-[12px] text-[color:var(--text-secondary)]">{desc}</p>}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function Settings() {
  const navigate = useNavigate();
  const { getIdToken, logout } = useAuth();
  const { t } = useLanguage();

  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [notif, setNotif] = useState<NotificationPrefs | null>(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingNotif, setSavingNotif] = useState(false);

  // CV state — mirrors the three-step upload the onboarding page already
  // uses (SAS URL → PUT to Blob → confirm). Replacement happens
  // server-side inside ConfirmCvUpload, which deactivates any prior
  // active row for this user before setting the new one active.
  const [cv, setCv] = useState<MyCvInfo | null>(null);
  const [uploadingCv, setUploadingCv] = useState(false);
  const [openingCv, setOpeningCv] = useState(false);
  const cvInputRef = useRef<HTMLInputElement | null>(null);

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [changingPw, setChangingPw] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const token = await getIdToken();
      const [p, n, c] = await Promise.all([
        getMyProfile(token),
        getNotificationPrefs(token),
        getMyCv(token),
      ]);
      if (!active) return;
      setProfile(p);
      setNotif(n);
      setCv(c);
    })();
    return () => {
      active = false;
    };
  }, [getIdToken]);

  const replaceCv = async (file?: File | null) => {
    if (!file) return;
    const okType =
      /\.(pdf|docx?|txt)$/i.test(file.name) ||
      file.type === "application/pdf" ||
      file.type.includes("word") ||
      file.type === "text/plain";
    if (!okType) {
      toast("Unsupported file", { description: "Please upload a PDF or Word document." });
      return;
    }
    setUploadingCv(true);
    try {
      const token = await getIdToken();
      const ticket = await getCvUploadUrl(token, file.name);
      await uploadCvToBlob(ticket, file);
      await confirmCvUpload(token, ticket.blobPath, file.name);
      // Refetch so the card reflects the new filename + timestamp
      // without needing a page reload.
      const fresh = await getMyCv(token);
      setCv(fresh);
      toast("CV updated");
    } catch {
      toast("Couldn't update CV", { description: "Please try again." });
    } finally {
      setUploadingCv(false);
      if (cvInputRef.current) cvInputRef.current.value = "";
    }
  };

  const openCv = async () => {
    // Popup blockers only permit window.open() when it fires
    // SYNCHRONOUSLY inside the click gesture — before any await. So we
    // open a placeholder tab immediately, then navigate it once the
    // SAS URL is back. Can't use noopener here because we need the
    // window handle to redirect the tab; we null out newTab.opener
    // manually after navigation for the same defensive posture.
    const newTab = window.open("about:blank", "_blank");
    if (!newTab) {
      toast("Popup blocked", {
        description:
          "Allow popups for inkoopmatch.nl in your browser, then click View again.",
      });
      return;
    }
    // Placeholder so the user isn't looking at a blank about:blank tab
    // while the SAS request is in flight.
    newTab.document.write(
      "<title>Loading CV…</title>" +
        "<p style='font:14px system-ui;padding:2rem;color:#374151'>" +
        "Loading your CV…</p>",
    );

    setOpeningCv(true);
    try {
      const token = await getIdToken();
      const { downloadUrl } = await getMyCvDownloadUrl(token);
      newTab.location.href = downloadUrl;
      try {
        newTab.opener = null;
      } catch {
        // Cross-origin write can throw once we've navigated to blob.core;
        // safe to ignore — the tab is already on its way.
      }
    } catch {
      newTab.close();
      toast("Couldn't open CV", { description: "Please try again." });
    } finally {
      setOpeningCv(false);
    }
  };

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSavingProfile(true);
    try {
      await updateProfile(await getIdToken(), profile);
      toast("Profile updated");
    } catch {
      toast("Couldn't save profile", { description: "Please try again." });
    } finally {
      setSavingProfile(false);
    }
  };

  const saveNotif = async (next: NotificationPrefs) => {
    setNotif(next);
    setSavingNotif(true);
    try {
      await updateNotificationPrefs(await getIdToken(), next);
    } catch {
      toast("Couldn't save preferences");
    } finally {
      setSavingNotif(false);
    }
  };

  const submitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangingPw(true);
    try {
      await changePassword(await getIdToken(), {
        currentPassword: currentPw,
        newPassword: newPw,
      });
      setCurrentPw("");
      setNewPw("");
      toast("Password changed");
    } catch {
      toast("Couldn't change password", {
        description: "Check your current password and try a stronger new one.",
      });
    } finally {
      setChangingPw(false);
    }
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await deleteAccount(await getIdToken());
      await logout();
      toast("Account deleted");
      navigate({ to: "/" });
    } catch {
      toast("Couldn't delete account", { description: "Please try again." });
      setDeleting(false);
    }
  };

  return (
    <DashShell>
      <div className="mx-auto max-w-2xl space-y-4 pt-2">
        <div className="px-1">
          <h1 className="text-[22px] font-bold tracking-tight text-foreground">{t("settings.title")}</h1>
          <p className="mt-0.5 text-[12px] text-[color:var(--text-secondary)]">
            {t("settings.subtitle")}
          </p>
        </div>

        {/* Profile */}
        <Card title={t("settings.profileTitle")} desc={t("settings.profileSubtitle")}>
          {profile ? (
            <form onSubmit={saveProfile} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="name">{t("auth.fullName")}</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="email">{t("auth.email")}</Label>
                  <Input id="email" value={profile.email} disabled className="opacity-70" />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="city">{t("onboarding.city")}</Label>
                  <Input
                    id="city"
                    value={profile.city}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="occ">{t("onboarding.occupation")}</Label>
                  <Input
                    id="occ"
                    value={profile.occupation}
                    onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="yrs">{t("onboarding.yearsExperience")}</Label>
                  <Input
                    id="yrs"
                    type="number"
                    min={0}
                    max={60}
                    value={profile.yearsExperience ?? ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        yearsExperience: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="mobile">{t("onboarding.mobileNumber")}</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="+31 6 12345678"
                    value={profile.mobileNumber}
                    onChange={(e) => setProfile({ ...profile, mobileNumber: e.target.value })}
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label>{t("onboarding.availability")}</Label>
                  <Select
                    value={profile.availability}
                    onValueChange={(v) => setProfile({ ...profile, availability: v })}
                  >
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
              <Button type="submit" disabled={savingProfile}>
                {savingProfile ? t("settings.saving") : t("settings.saveChanges")}
              </Button>
            </form>
          ) : (
            <p className="text-[13px] text-[color:var(--text-secondary)]">Loading…</p>
          )}
        </Card>

        {/* CV */}
        <Card
          title="CV"
          desc="Replace the CV we match against open assignments. Uploading a new file automatically retires the previous one."
        >
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[color:var(--sage-light)] bg-[color:var(--paper)] p-3">
              <div className="min-w-0">
                {cv === null ? (
                  <p className="text-[13px] text-[color:var(--text-secondary)]">Loading…</p>
                ) : cv.hasCv ? (
                  <>
                    <p className="truncate text-[13px] font-medium text-foreground">
                      {cv.fileName ?? "CV on file"}
                    </p>
                    {cv.uploadedAt && (
                      <p className="text-[11px] text-[color:var(--text-secondary)]">
                        Uploaded {new Date(cv.uploadedAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-[13px] text-[color:var(--text-secondary)]">
                    No CV on file yet.
                  </p>
                )}
              </div>
              <div className="flex shrink-0 gap-2">
                {cv?.hasCv && (
                  <Button
                    type="button"
                    variant="outline"
                    disabled={openingCv || uploadingCv}
                    onClick={openCv}
                  >
                    {openingCv ? "Opening…" : "View"}
                  </Button>
                )}
                <Button
                  type="button"
                  variant="outline"
                  disabled={uploadingCv || cv === null}
                  onClick={() => cvInputRef.current?.click()}
                >
                  {uploadingCv ? "Uploading…" : cv?.hasCv ? "Replace CV" : "Upload CV"}
                </Button>
              </div>
            </div>
            <p className="text-[11px] text-[color:var(--text-tertiary)]">
              PDF, DOC, DOCX or TXT.
            </p>
            <input
              ref={cvInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
              onChange={(e) => replaceCv(e.target.files?.[0])}
            />
          </div>
        </Card>

        {/* Password */}
        <Card title={t("settings.passwordTitle")} desc={t("settings.passwordSubtitle")}>
          <form onSubmit={submitPassword} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="curpw">{t("settings.currentPassword")}</Label>
                <Input
                  id="curpw"
                  type="password"
                  required
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="newpw">{t("settings.newPassword")}</Label>
                <Input
                  id="newpw"
                  type="password"
                  required
                  minLength={8}
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" variant="outline" disabled={changingPw}>
              {changingPw ? t("settings.updating") : t("settings.updatePassword")}
            </Button>
          </form>
        </Card>

        {/* Notifications */}
        <Card title={t("settings.notificationsTitle")} desc={t("settings.notificationsSubtitle")}>
          {notif ? (
            <div className="space-y-3">
              {(
                [
                  { key: "newMatches" as const, label: t("settings.newMatchesLabel"), desc: t("settings.newMatchesDesc") },
                  { key: "shortlisted" as const, label: t("settings.shortlistedLabel"), desc: t("settings.shortlistedDesc") },
                  { key: "productUpdates" as const, label: t("settings.productUpdatesLabel"), desc: t("settings.productUpdatesDesc") },
                ]
              ).map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[13px] font-medium text-foreground">{label}</p>
                    <p className="text-[11px] text-[color:var(--text-secondary)]">{desc}</p>
                  </div>
                  <Switch
                    checked={notif[key]}
                    disabled={savingNotif}
                    onCheckedChange={(v) => saveNotif({ ...notif, [key]: v })}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[13px] text-[color:var(--text-secondary)]">Loading…</p>
          )}
        </Card>

        {/* Danger zone */}
        <Card title={t("settings.dangerTitle")} desc={t("settings.dangerSubtitle")}>
          <div className="flex items-center justify-between gap-4">
            <p className="text-[12px] text-[color:var(--text-secondary)]">
              {t("settings.dangerText")}
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="shrink-0 border-[color:var(--destructive)] text-[color:var(--destructive)] hover:bg-destructive/5"
                >
                  {t("settings.deleteButton")}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t("settings.deleteConfirmTitle")}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t("settings.deleteConfirmDesc")}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t("settings.cancel")}</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={confirmDelete}
                    disabled={deleting}
                    className="bg-[color:var(--destructive)] hover:bg-[color:var(--destructive)]/90"
                  >
                    {deleting ? t("settings.deleting") : t("settings.yesDelete")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </Card>
      </div>
    </DashShell>
  );
}
