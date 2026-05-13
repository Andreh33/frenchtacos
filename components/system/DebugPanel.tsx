"use client";

import { useEffect, useState } from "react";

/** TEMPORARY: visible debug panel to diagnose cursor + konami.
 *  Toggle with `?debug=1` query param OR Alt+D. Remove once features confirmed. */
export function DebugPanel() {
  const [visible, setVisible] = useState(false);
  const [sectionsCount, setSectionsCount] = useState(0);
  const [currentCat, setCurrentCat] = useState<string | null>(null);
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [lastKey, setLastKey] = useState<string>("");
  const [isTouch, setIsTouch] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sp = new URLSearchParams(window.location.search);
    if (sp.get("debug") === "1") setVisible(true);

    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "d") {
        setVisible((v) => !v);
      }
      setLastKey(e.key);
    };
    window.addEventListener("keydown", onKey);

    setIsTouch(window.matchMedia("(hover: none), (pointer: coarse)").matches);
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const update = () => {
      const sects = document.querySelectorAll<HTMLElement>("[data-category-label]");
      setSectionsCount(sects.length);
      const cy = window.innerHeight / 2;
      let cur: string | null = null;
      sects.forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= cy && r.bottom >= cy) cur = s.getAttribute("data-category-label");
      });
      setCurrentCat(cur);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      setKonamiProgress(w.__clmKonamiProgress ?? 0);
    };
    update();
    const id = window.setInterval(update, 200);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.clearInterval(id);
      window.removeEventListener("scroll", update);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Debug panel"
      className="fixed top-24 right-4 z-[9990] max-w-xs border border-[var(--yellow)] bg-[var(--ink)]/95 p-4 font-mono text-[10px] tracking-wider text-[var(--cream)] backdrop-blur-md"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="font-bold text-[var(--yellow)]">CLM DEBUG</span>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="text-[var(--cream)]/60 hover:text-[var(--yellow)]"
          aria-label="Cerrar debug"
        >
          ✕
        </button>
      </div>
      <ul className="space-y-1">
        <li>touch device: <strong className={isTouch ? "text-red-400" : "text-green-400"}>{isTouch ? "YES (cursor off)" : "no"}</strong></li>
        <li>reduced-motion: <strong className={reducedMotion ? "text-red-400" : "text-green-400"}>{reducedMotion ? "YES" : "no"}</strong></li>
        <li>sections [data-category-label]: <strong>{sectionsCount}</strong></li>
        <li>current category: <strong className="text-[var(--yellow)]">{currentCat ?? "—"}</strong></li>
        <li>last keydown: <strong>{lastKey || "—"}</strong></li>
        <li>konami progress: <strong className="text-[var(--yellow)]">{konamiProgress}/10</strong></li>
      </ul>
      <div className="mt-3 border-t border-[var(--cream)]/15 pt-2 text-[9px] text-[var(--cream)]/55">
        Alt+D to toggle · ?debug=1 to force
      </div>
    </div>
  );
}
