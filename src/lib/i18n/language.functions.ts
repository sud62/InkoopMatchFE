import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import type { Language } from "./dictionaries";

export const LANGUAGE_COOKIE = "inkoopmatch_lang";

/**
 * Reads the language cookie on the SERVER during the initial request,
 * so the first HTML render already has the right language — without
 * this, a client-only localStorage read would flash English (or
 * whatever the server default is) before hydration corrects it.
 */
export const getInitialLanguage = createServerFn({ method: "GET" }).handler(
  async (): Promise<Language> => {
    const value = getCookie(LANGUAGE_COOKIE);
    return value === "nl" ? "nl" : "en";
  },
);
