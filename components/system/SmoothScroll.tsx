"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let cleanup: () => void = () => {};
    let cancelled = false;

    (async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      const lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.3,
      });

      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      const onAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest("a[href^='#']") as HTMLAnchorElement | null;
        if (!anchor) return;
        const id = anchor.getAttribute("href");
        if (!id || id.length < 2) return;
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -64 });
      };
      document.addEventListener("click", onAnchorClick);

      cleanup = () => {
        document.removeEventListener("click", onAnchorClick);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      cleanup();
    };
  }, []);

  return null;
}
