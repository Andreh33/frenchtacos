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
    const min = 1000;
    const max = 2000;
    let raf = 0;

    const tick = () => {
      const elapsed = performance.now() - start;
      const ratio = Math.min(1, elapsed / max);
      setProgress(ratio);
      if (elapsed < min) {
        raf = requestAnimationFrame(tick);
      } else if (document.readyState === "complete" || elapsed > max) {
        setProgress(1);
        window.setTimeout(() => {
          setVisible(false);
          sessionStorage.setItem("uft_loaded", "1");
        }, 250);
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
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[var(--ink)] transition-opacity duration-500"
      style={{ opacity: progress >= 1 ? 0 : 1 }}
    >
      <div className="flex w-[min(680px,86vw)] flex-col items-center gap-10 text-center">
        <div
          className="font-display font-bold leading-[0.9] tracking-[-0.04em] text-[var(--cream)]"
          style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
        >
          URBAN <span className="text-[var(--yellow)]">FRENCH</span> TAKOS
        </div>
        <div className="relative h-px w-full overflow-hidden bg-[var(--cream)]/15">
          <div
            className="absolute inset-y-0 left-0 bg-[var(--yellow)] transition-[width] duration-150 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
