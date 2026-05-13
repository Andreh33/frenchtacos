"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  strength?: number; // 0-1, how much it follows
  radius?: number; // detection radius in px
  className?: string;
};

/** Wraps a child element so it translates toward the cursor when nearby.
 *  Disabled on touch / reduced-motion. */
export function Magnetic({
  children,
  strength = 0.28,
  radius = 110,
  className,
}: Props) {
  const wrap = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(hover: none), (pointer: coarse)").matches
    )
      return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const ex = r.left + r.width / 2;
      const ey = r.top + r.height / 2;
      const dx = e.clientX - ex;
      const dy = e.clientY - ey;
      const dist = Math.hypot(dx, dy);
      if (dist < radius + Math.max(r.width, r.height) / 2) {
        tx = dx * strength;
        ty = dy * strength;
      } else {
        tx = 0;
        ty = 0;
      }
    };

    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    document.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [strength, radius]);

  return (
    <span
      ref={wrap}
      className={`inline-block ${className ?? ""}`}
      style={{ willChange: "transform" }}
    >
      {children}
    </span>
  );
}
