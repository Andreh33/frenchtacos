"use client";

import { LOCALES } from "@/lib/i18n";
import { useLocale } from "./LocaleProvider";

export function LocaleSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLocale();

  return (
    <div className={`flex items-center gap-px ${className}`}>
      {LOCALES.map((l, i) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          aria-label={`Idioma: ${l.toUpperCase()}`}
          className={`px-2 py-1 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors ${
            locale === l
              ? "text-[var(--yellow)]"
              : "text-[var(--cream)]/45 hover:text-[var(--cream)]"
          } ${i > 0 ? "border-l border-[var(--cream)]/15" : ""}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
