"use client";

import { useEffect } from "react";

/** Activates `html.neon-mode` between 22:00 and 06:00 (local time).
 *  Re-checks every 5 minutes. */
export function NeonMode() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const evaluate = () => {
      const h = new Date().getHours();
      const isNight = h >= 22 || h < 6;
      document.documentElement.classList.toggle("neon-mode", isNight);
    };
    evaluate();
    const id = window.setInterval(evaluate, 5 * 60 * 1000);
    return () => window.clearInterval(id);
  }, []);

  return null;
}
