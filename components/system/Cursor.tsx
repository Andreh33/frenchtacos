"use client";

import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [categoryLabel, setCategoryLabel] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return; // cursor stays as native on touch
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setMounted(true);
    document.documentElement.classList.add("cursor-active");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
      }
      // With reduced-motion: skip the lerp, snap ring to cursor immediately
      if (reduce) {
        rx = mx;
        ry = my;
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${rx - 28}px, ${ry - 28}px, 0)`;
        }
      }
    };

    const tick = () => {
      if (!reduce) {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${rx - 28}px, ${ry - 28}px, 0)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const tagged = t.closest<HTMLElement>("[data-cursor]");
      if (tagged) {
        setActive(true);
        setLabel(tagged.dataset.cursor || null);
        return;
      }
      const interactive = t.closest(
        "a, button, [role='button'], input, textarea, select, label"
      );
      if (interactive) {
        setActive(true);
        setLabel(null);
      } else {
        setActive(false);
        setLabel(null);
      }
    };

    const onLeave = () => {
      setActive(false);
      setLabel(null);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);

    // Check which [data-category-label] section's middle is at viewport center.
    // We can't use IntersectionObserver thresholds because the sections are
    // taller than viewport (md:h-[400-600vh]) so intersectionRatio max is < 0.25.
    let scrollRaf = 0;
    const sections = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-category-label]"));

    const checkCategory = () => {
      scrollRaf = 0;
      const centerY = window.innerHeight / 2;
      let found: string | null = null;
      for (const s of sections()) {
        const r = s.getBoundingClientRect();
        if (r.top <= centerY && r.bottom >= centerY) {
          found = s.getAttribute("data-category-label");
          break;
        }
      }
      setCategoryLabel(found);
    };

    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(checkCategory);
    };
    checkCategory();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Debug helper
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    w.__clm = w.__clm || {};
    w.__clm.cursor = () => ({
      mounted: true,
      sectionsFound: sections().length,
      currentCategory: () => {
        const cy = window.innerHeight / 2;
        return sections()
          .find((s) => {
            const r = s.getBoundingClientRect();
            return r.top <= cy && r.bottom >= cy;
          })
          ?.getAttribute("data-category-label");
      },
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-active");
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden md:block"
        style={{ willChange: "transform" }}
      >
        <div className="h-2 w-2 rounded-full bg-[var(--yellow)]" />
      </div>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden md:block"
        style={{ willChange: "transform" }}
      >
        <div
          className={`relative grid place-items-center rounded-full border transition-[width,height,background] duration-200 ease-out ${
            active
              ? "h-14 w-14 border-[var(--yellow)] bg-[var(--yellow)]/15"
              : "h-14 w-14 border-[var(--yellow)]/35"
          }`}
        >
          {label ? (
            <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-[var(--yellow)] uppercase">
              {label}
            </span>
          ) : null}

          {/* Category chip — always visible when in a category section */}
          {categoryLabel ? (
            <span
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[var(--yellow)] px-2 py-0.5 font-mono text-[9px] font-bold tracking-[0.25em] text-[var(--ink)] uppercase"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.35)" }}
            >
              {categoryLabel}
            </span>
          ) : null}
        </div>
      </div>
    </>
  );
}
