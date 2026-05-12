"use client";

import { useEffect, useState } from "react";

export function Loader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("uft_loaded") === "1") {
      setVisible(false);
      return;
    }

    const start = performance.now();
    const min = 1200;
    const max = 2400;
    let raf = 0;

    const tick = () => {
      const elapsed = performance.now() - start;
      const ratio = Math.min(1, elapsed / max);
      setProgress(ratio);
      if (elapsed < min) {
        raf = requestAnimationFrame(tick);
      } else if (document.readyState === "complete") {
        setProgress(1);
        setTimeout(() => {
          setVisible(false);
          sessionStorage.setItem("uft_loaded", "1");
        }, 280);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[var(--uft-purple-deep)] transition-opacity duration-500"
      style={{ opacity: progress >= 1 ? 0 : 1 }}
    >
      <div className="flex flex-col items-center gap-8 px-6 text-center">
        <div className="font-display text-5xl font-extrabold tracking-tight text-[var(--uft-cream)] sm:text-7xl">
          URBAN <span className="text-[var(--uft-yellow)]">FRENCH</span> TAKOS
        </div>
        <p className="font-mono text-xs tracking-[0.3em] text-[var(--uft-cream)]/70 uppercase">
          Calentando el comal…
        </p>
        <div className="relative h-[2px] w-64 overflow-hidden bg-[var(--uft-cream)]/15">
          <div
            className="absolute inset-y-0 left-0 bg-[var(--uft-yellow)] transition-[width] duration-150 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
