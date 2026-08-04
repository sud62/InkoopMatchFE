import { createContext, useContext, useState, type ReactNode } from "react";
import { dictionaries, type Language, type Dictionary } from "./dictionaries";
import { LANGUAGE_COOKIE } from "./language.functions";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  /** Dot-path lookup into the current dictionary, e.g. t("nav.signIn"). */
  t: (path: NestedKeyPaths) => string;
};

// A loose but still-checked type for dot-paths into the dictionary —
// keeps t() calls typo-checked against the actual dictionary shape
// without hand-writing every union member.
type NestedKeyPaths = {
  [K in keyof Dictionary]: {
    [K2 in keyof Dictionary[K]]: `${K & string}.${K2 & string}`;
  }[keyof Dictionary[K]];
}[keyof Dictionary];

const LanguageContext = createContext<LanguageContextValue | null>(null);

function lookup(dict: Dictionary, path: string): string {
  const [section, key] = path.split(".") as [keyof Dictionary, string];
  const value = (dict[section] as Record<string, string> | undefined)?.[key];
  return value ?? path; // fall back to the key itself if something's missing
}

export function LanguageProvider({
  initialLanguage,
  children,
}: {
  initialLanguage: Language;
  children: ReactNode;
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof document !== "undefined") {
      // One year, site-wide. Cookie (not just localStorage) so the
      // NEXT full page load/SSR request already knows the language —
      // see language.functions.ts for the server-side read.
      document.cookie = `${LANGUAGE_COOKIE}=${lang}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    }
  };

  const dict = dictionaries[language];
  const t = (path: NestedKeyPaths) => lookup(dict, path);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within <LanguageProvider>");
  return ctx;
}
