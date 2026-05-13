"use client";

import { useEffect } from "react";

/** Provides an SVG displacement filter used by section transitions to
 *  briefly "warp" the page. Components opt-in by toggling the
 *  `data-warping="true"` attribute on <html> or by adding the
 *  `.warping` class to <main>.
 *
 *  The CategorySeparator uses IntersectionObserver to trigger the warp
 *  for ~900ms when entering the viewport. */
export function WarpFilter() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 767.98px)").matches) return;

    const separators = Array.from(
      document.querySelectorAll<HTMLElement>("[data-warp-trigger]")
    );
    if (separators.length === 0) return;

    const main = document.getElementById("main");
    if (!main) return;

    const triggerWarp = () => {
      main.classList.remove("warping");
      // force reflow so animation restarts
      void main.offsetWidth;
      main.classList.add("warping");
      window.setTimeout(() => main.classList.remove("warping"), 950);
    };

    const seen = new WeakSet<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !seen.has(entry.target)) {
            seen.add(entry.target);
            triggerWarp();
          } else if (!entry.isIntersecting && seen.has(entry.target)) {
            // allow re-trigger when re-entering
            seen.delete(entry.target);
          }
        }
      },
      { threshold: 0.6 }
    );
    separators.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <svg
      aria-hidden
      width="0"
      height="0"
      style={{ position: "absolute", overflow: "hidden" }}
    >
      <defs>
        <filter id="uft-warp" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.018"
            numOctaves="2"
            seed="3"
          >
            <animate
              attributeName="baseFrequency"
              dur="0.95s"
              keyTimes="0;0.5;1"
              values="0.012 0.018; 0.04 0.06; 0.012 0.018"
              repeatCount="1"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="0">
            <animate
              attributeName="scale"
              dur="0.95s"
              keyTimes="0;0.35;0.65;1"
              values="0; 38; 14; 0"
              repeatCount="1"
            />
          </feDisplacementMap>
        </filter>
      </defs>
    </svg>
  );
}
