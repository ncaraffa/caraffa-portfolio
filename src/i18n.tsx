import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "pt" | "en";
export type Txt = { pt: string; en: string };

const KEY = "lang";

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "pt" || saved === "en") return saved;
  } catch {
    /* storage blocked — fall through */
  }
  return navigator.language?.toLowerCase().startsWith("pt") ? "pt" : "en";
}

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "pt",
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    try {
      localStorage.setItem(KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);
  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLang = () => useContext(LangCtx);

/** `t("Olá", "Hello")` or `t({ pt, en })`. */
// eslint-disable-next-line react-refresh/only-export-components
export function useT() {
  const { lang } = useLang();
  return (a: string | Txt, b?: string) =>
    typeof a === "string" ? (lang === "en" ? (b ?? a) : a) : a[lang];
}
