"use client";

import { useEffect, useRef, useState } from "react";
import { CursorCategoryIcon } from "./CursorCategoryIcon";

export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [categoryLabel, setCategoryLabel] = useState<string | null>(null);

  // Show the fancy cursor only when there's something to display
  const hasContent = !!(label || categoryLabel);

  // Toggle cursor-hide on <html> based on hasContent
  useEffect(() => {
    if (!mounted) return;
    if (hasContent) {
      document.documentElement.classList.add("cursor-active");
    } else {
      document.documentElement.classList.remove("cursor-active");
    }
  }, [hasContent, mounted]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setMounted(true);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // With reduced-motion: snap ring to cursor immediately
      if (reduce) {
        rx = mx;
        ry = my;
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${rx - 40}px, ${ry - 40}px, 0)`;
        }
      }
    };

    const tick = () => {
      if (!reduce) {
        rx += (mx - rx) * 0.22;
        ry += (my - ry) * 0.22;
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${rx - 40}px, ${ry - 40}px, 0)`;
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

    // Scroll-position check for which category section is at viewport center
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
    <div
      ref={ringRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9998] hidden md:block"
      style={{ willChange: "transform" }}
    >
      <div
        className={`relative grid h-20 w-20 place-items-center rounded-full border-2 transition-all duration-300 ease-out ${
          hasContent
            ? "border-[var(--yellow)] bg-[var(--yellow)]/15 opacity-100 scale-100"
            : "border-[var(--yellow)]/0 opacity-0 scale-50"
        }`}
      >
        {label ? (
          <span className="px-2 text-center font-mono text-[11px] font-bold tracking-[0.2em] leading-tight text-[var(--yellow)] uppercase">
            {label}
          </span>
        ) : categoryLabel ? (
          <CursorCategoryIcon
            category={categoryLabel}
            className="h-12 w-12 text-[var(--yellow)]"
          />
        ) : null}

        {/* Category chip below — visible when in a category section */}
        {categoryLabel ? (
          <span
            className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[var(--yellow)] px-2 py-0.5 font-mono text-[9px] font-bold tracking-[0.25em] text-[var(--ink)] uppercase"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.35)" }}
          >
            {categoryLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
}
