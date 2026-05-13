"use client";

import { useEffect, useRef, useState } from "react";

const EMOJI: Record<string, string> = {
  TACOS: "🌮",
  BURGERS: "🍔",
  BOWLS: "🥣",
  ENSALADAS: "🥗",
};

export function Cursor() {
  const emojiRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [categoryLabel, setCategoryLabel] = useState<string | null>(null);

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

    const apply = (x: number, y: number) => {
      if (emojiRef.current) {
        emojiRef.current.style.transform = `translate3d(${x - 28}px, ${y - 28}px, 0)`;
      }
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (reduce) {
        rx = mx;
        ry = my;
        apply(rx, ry);
      }
    };

    const tick = () => {
      if (!reduce) {
        rx += (mx - rx) * 0.22;
        ry += (my - ry) * 0.22;
        apply(rx, ry);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    document.addEventListener("mousemove", onMove, { passive: true });

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
      cancelAnimationFrame(raf);
    };
  }, []);

  // Toggle native-cursor hide based on whether we're showing an emoji
  useEffect(() => {
    if (!mounted) return;
    if (categoryLabel) {
      document.documentElement.classList.add("emoji-cursor-active");
    } else {
      document.documentElement.classList.remove("emoji-cursor-active");
    }
  }, [categoryLabel, mounted]);

  if (!mounted) return null;

  const emoji = categoryLabel ? EMOJI[categoryLabel] : null;

  return (
    <div
      ref={emojiRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9998] hidden md:block"
      style={{ willChange: "transform" }}
    >
      <div
        className={`grid h-14 w-14 place-items-center transition-all duration-300 ease-out ${
          emoji ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
        style={{
          fontSize: "44px",
          lineHeight: 1,
          filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.45))",
        }}
      >
        {emoji}
      </div>
    </div>
  );
}
