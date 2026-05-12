"use client";

import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduce) return;

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
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx - 28}px, ${ry - 28}px, 0)`;
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

    return () => {
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
          className={`grid place-items-center rounded-full border transition-[width,height,background] duration-200 ease-out ${
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
        </div>
      </div>
    </>
  );
}
