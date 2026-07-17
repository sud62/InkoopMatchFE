import { useEffect, useState } from "react";

export type Session = { name: string; email: string } | null;

const KEY = "im.session";
const EVENT = "im.session.change";

export function getSession(): Session {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function signIn(session: NonNullable<Session>) {
  window.localStorage.setItem(KEY, JSON.stringify(session));
  window.dispatchEvent(new Event(EVENT));
}

export function signOut() {
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event(EVENT));
}

export function useSession(): Session {
  const [session, setSession] = useState<Session>(null);
  useEffect(() => {
    setSession(getSession());
    const update = () => setSession(getSession());
    window.addEventListener(EVENT, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(EVENT, update);
      window.removeEventListener("storage", update);
    };
  }, []);
  return session;
}

export function nameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "user";
  return local
    .split(/[._-]+/)
    .filter(Boolean)
    .map((s) => s[0]!.toUpperCase() + s.slice(1))
    .join(" ") || "User";
}
