import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
  type CandidateProfile,
  type NotificationPrefs,
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

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [changingPw, setChangingPw] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const token = await getIdToken();
      const [p, n] = await Promise.all([getMyProfile(token), getNotificationPrefs(token)]);
      if (!active) return;
      setProfile(p);
      setNotif(n);
    })();
    return () => {
      active = false;
    };
  }, [getIdToken]);

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
