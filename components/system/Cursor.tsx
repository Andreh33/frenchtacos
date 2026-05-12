"use client";

import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch =
      window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
        ringRef.current.style.transform = `translate3d(${rx - 20}px, ${ry - 20}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const c = t.closest<HTMLElement>("[data-cursor]");
      if (c) {
        setActive(true);
        setLabel(c.dataset.cursor || null);
      } else {
        const interactive = t.closest("a, button, [role='button'], input, textarea, select");
        if (interactive) {
          setActive(true);
          setLabel(null);
        } else {
          setActive(false);
          setLabel(null);
        }
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-active");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden md:block"
        style={{ willChange: "transform" }}
      >
        <div className="h-2 w-2 rounded-full bg-[var(--uft-yellow)]" />
      </div>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden md:block"
        style={{ willChange: "transform" }}
      >
        <div
          className={`relative grid place-items-center rounded-full border transition-[width,height,background,color] duration-200 ease-out ${
            active
              ? "h-10 w-10 border-[var(--uft-yellow)] bg-[var(--uft-yellow)]/15"
              : "h-10 w-10 border-[var(--uft-yellow)]/40 bg-transparent"
          }`}
        >
          {label ? (
            <span className="font-mono text-[10px] font-bold tracking-widest text-[var(--uft-yellow)] uppercase">
              {label}
            </span>
          ) : null}
        </div>
      </div>
    </>
  );
}
