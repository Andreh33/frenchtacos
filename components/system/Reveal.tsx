"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
};

export function Reveal({ children, className = "", delay = 0, threshold = 0.15 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => el.classList.add("is-in"), delay);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, threshold]);

  return (
    <div ref={ref} className={`reveal-line ${className}`}>
      {children}
    </div>
  );
}
