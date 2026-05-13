"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme = "dark" | "light";

type Ctx = {
  theme: Theme;
  toggle: () => void;
  set: (t: Theme) => void;
};

const ThemeCtx = createContext<Ctx | null>(null);

function detectInitial(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem("clm_theme") as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  // Default: dark (brand-aligned). Respect prefers-color-scheme: light if explicit.
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const initial = detectInitial();
    setTheme(initial);
    apply(initial);
  }, []);

  const set = useCallback((t: Theme) => {
    setTheme(t);
    localStorage.setItem("clm_theme", t);
    apply(t);
  }, []);

  const toggle = useCallback(() => {
    setTheme((cur) => {
      const next = cur === "dark" ? "light" : "dark";
      localStorage.setItem("clm_theme", next);
      apply(next);
      return next;
    });
  }, []);

  return (
    <ThemeCtx.Provider value={{ theme, toggle, set }}>
      {children}
    </ThemeCtx.Provider>
  );
}

function apply(t: Theme) {
  const root = document.documentElement;
  if (t === "light") {
    root.classList.add("theme-light");
    root.setAttribute("data-theme", "light");
  } else {
    root.classList.remove("theme-light");
    root.setAttribute("data-theme", "dark");
  }
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) return { theme: "dark" as Theme, toggle: () => {}, set: () => {} };
  return ctx;
}
