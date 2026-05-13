"use client";

import { useEffect, useRef, type RefObject } from "react";

type Particle = {
  x: number;
  y: number;
  size: number;
  life: number; // 0-1
};

type Props = {
  /** ref to the area where the trail should be active (e.g. hero section) */
  targetRef: RefObject<HTMLElement | null>;
};

export function CursorTrail({ targetRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    const target = targetRef.current;
    if (!canvas || !target) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];
    let inside = false;
    let mx = 0;
    let my = 0;
    let lastSpawnTime = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas || !target) return;
      const r = target.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      canvas.style.width = `${r.width}px`;
      canvas.style.height = `${r.height}px`;
      if (ctx) ctx.scale(dpr, dpr);
    }

    function onMove(e: MouseEvent) {
      if (!target) return;
      const r = target.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      inside = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
      mx = x;
      my = y;
    }

    function tick(t: number) {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // spawn while moving inside
      if (inside && t - lastSpawnTime > 18 && particles.length < 60) {
        particles.push({
          x: mx + (Math.random() - 0.5) * 4,
          y: my + (Math.random() - 0.5) * 4,
          size: 3 + Math.random() * 3,
          life: 1,
        });
        lastSpawnTime = t;
      }

      particles = particles.filter((p) => {
        p.life -= 0.025;
        if (p.life <= 0) return false;
        const alpha = p.life * 0.85;
        ctx.fillStyle = `rgba(255, 214, 10, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      raf = requestAnimationFrame(tick);
    }

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    const ro = new ResizeObserver(resize);
    ro.observe(target);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      ro.disconnect();
    };
  }, [targetRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[5] hidden md:block"
    />
  );
}
