"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenisInstance: { destroy: () => void } | null = null;
    let raf = 0;

    (async () => {
      const { default: Lenis } = await import("lenis");
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.05,
        touchMultiplier: 1.4,
      });

      function loop(time: number) {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      }
      raf = requestAnimationFrame(loop);
      lenisInstance = lenis as unknown as { destroy: () => void };

      // anchor handling
      const onAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest("a[href^='#']") as HTMLAnchorElement | null;
        if (!anchor) return;
        const id = anchor.getAttribute("href");
        if (!id || id.length < 2) return;
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -80 });
      };
      document.addEventListener("click", onAnchorClick);

      return () => document.removeEventListener("click", onAnchorClick);
    })();

    return () => {
      cancelAnimationFrame(raf);
      lenisInstance?.destroy();
    };
  }, []);

  return null;
}
