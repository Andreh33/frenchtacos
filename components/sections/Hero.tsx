"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { Magnetic } from "@/components/system/Magnetic";
import { CursorTrail } from "@/components/system/CursorTrail";

type Line = { text: string; className: string; underlineCalle?: boolean };
const lines: Line[] = [
  { text: "FRENCH", className: "" },
  { text: "TACOS", className: "text-[var(--yellow)]" },
  { text: "DE LA CALLE.", className: "", underlineCalle: true },
];

const MARQUEE_ITEMS = [
  "ABIERTO HASTA LAS 00:00",
  "PIDE EN GLOVO",
  "Nº01 · CIUDAD REAL",
  "@CLMFRENCHTACOS",
  "DESDE 7,50€",
];

const MARQUEE_NIGHT = "◉ NOCTURNE — LA CALLE NUNCA DUERME";

function CurrentTime() {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      setNow(`${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`);
    };
    fmt();
    const id = setInterval(fmt, 30_000);
    return () => clearInterval(id);
  }, []);
  return <span>{now || "—"}</span>;
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  // Mouse parallax — text drifts subtly opposite to cursor
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: MouseEvent) => {
      const hero = heroRef.current;
      const headline = headlineRef.current;
      if (!hero || !headline) return;
      const r = hero.getBoundingClientRect();
      const nx = (e.clientX - r.left - r.width / 2) / r.width;
      const ny = (e.clientY - r.top - r.height / 2) / r.height;
      // opposite direction, max ~12px
      tx = nx * -12;
      ty = ny * -8;
    };

    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      if (headlineRef.current) {
        headlineRef.current.style.setProperty("--parallax-x", `${cx}px`);
        headlineRef.current.style.setProperty("--parallax-y", `${cy}px`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  // Scroll-linked darkening: as user scrolls, overlay darkens + content fades
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.55, 0.95]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={heroRef}
      className="relative isolate flex w-full flex-col overflow-hidden"
      style={{ minHeight: "100svh", height: "100svh" }}
    >
      {/* VIDEO LAYER (with scale on scroll) */}
      <motion.div
        className="absolute inset-0 -z-20"
        style={{ scale: videoScale }}
      >
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/video/hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/video/hero.webm" type="video/webm" />
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* CURSOR TRAIL (hero only, desktop) */}
      <CursorTrail targetRef={heroRef} />

      {/* DARK GRADIENT OVERLAY (static base) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,6,18,0.78)_0%,rgba(10,6,18,0.55)_40%,rgba(10,6,18,0.82)_100%)]"
      />

      {/* DARKENING ON SCROLL */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[var(--ink)]"
        style={{ opacity: overlayOpacity }}
      />

      {/* PURPLE TINT */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 mix-blend-color opacity-25 bg-[radial-gradient(ellipse_at_70%_30%,rgba(168,85,247,0.5),transparent_60%),radial-gradient(ellipse_at_20%_80%,rgba(107,47,179,0.6),transparent_55%)]"
      />

      {/* TOP TAG ROW — under header */}
      <div className="relative z-10 flex items-start justify-between px-5 pt-20 sm:px-8 sm:pt-24 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--cream)]/85"
        >
          <span className="h-1.5 w-1.5 bg-[var(--yellow)]" />
          <span>Ciudad Real</span>
          <span className="text-[var(--cream)]/40">·</span>
          <span>Calle Ojos del Guadiana 3</span>
          <span className="text-[var(--cream)]/40">·</span>
          <span>Nº01</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="hidden items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--cream)]/75 md:flex"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--yellow)] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--yellow)]" />
          </span>
          <span>
            Abierto · <CurrentTime />
          </span>
        </motion.div>
      </div>

      {/* HEADLINE BLOCK — fades + slides up on scroll */}
      <motion.div
        className="relative z-10 flex flex-1 flex-col justify-end px-5 pb-32 sm:px-8 sm:pb-40 lg:px-12 lg:pb-44"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div
          ref={headlineRef}
          className="max-w-[1400px]"
          style={{
            transform:
              "translate3d(var(--parallax-x, 0px), var(--parallax-y, 0px), 0)",
            transition: "transform 0.06s linear",
          }}
        >
          <h1
            className="font-display font-bold tracking-[-0.04em] text-[var(--cream)]"
            style={{
              fontSize: "clamp(3.5rem, 11vw, 13rem)",
              lineHeight: 0.86,
            }}
          >
            {lines.map((line, i) => (
              <span key={line.text} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.35 + i * 0.08,
                    ease: [0.65, 0, 0.35, 1],
                  }}
                  className={`block ${line.className ?? ""}`}
                >
                  {line.underlineCalle ? (
                    <>
                      DE LA{" "}
                      <span className="relative inline-block">
                        CALLE
                        <motion.svg
                          aria-hidden
                          viewBox="0 0 320 22"
                          preserveAspectRatio="none"
                          className="absolute -bottom-0 left-0 h-[0.2em] w-full"
                        >
                          <motion.path
                            d="M2 14 C 80 4, 200 22, 318 8"
                            stroke="var(--yellow)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{
                              duration: 1.1,
                              delay: 1.4,
                              ease: [0.65, 0, 0.35, 1],
                            }}
                          />
                        </motion.svg>
                      </span>
                      .
                    </>
                  ) : (
                    line.text
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="mt-8 max-w-md text-[15px] leading-[1.5] tracking-[-0.005em] text-[var(--cream)]/82 sm:text-[17px]"
          >
            Tacos urbanos, 100% franceses.
            <br />
            Carne jugosa, patatas dentro, quesazo fundido.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic strength={0.25} radius={120}>
              <a
                href={site.orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fill group inline-flex items-center gap-3 border border-[var(--yellow)] bg-[var(--yellow)] px-7 py-4 font-mono text-[11px] tracking-[0.3em] text-[var(--ink)] uppercase"
                data-cursor="PEDIR"
              >
                <span className="relative z-10">Pide ya</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="relative z-10 h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </Magnetic>
            <a
              href="#carta"
              className="inline-flex items-center gap-3 border border-[var(--cream)]/40 px-7 py-4 font-mono text-[11px] tracking-[0.3em] text-[var(--cream)] uppercase transition-colors hover:border-[var(--cream)] hover:bg-[var(--cream)]/5"
              data-cursor="VER"
            >
              Ver carta
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* BOTTOM MARQUEE */}
      <div className="absolute inset-x-0 bottom-0 z-10 overflow-hidden border-y border-[var(--yellow)] bg-[var(--ink)]">
        <div className="marquee-track flex w-max items-center gap-10 py-3.5 sm:py-4">
          {Array.from({ length: 3 }).flatMap((_, k) =>
            [...MARQUEE_ITEMS, MARQUEE_NIGHT].map((t, i) => (
              <span
                key={`${k}-${i}`}
                className={
                  t === MARQUEE_NIGHT
                    ? "neon-only shrink-0 items-center gap-10 font-mono text-[11px] tracking-[0.3em] text-[var(--yellow)] uppercase sm:text-[12px]"
                    : "flex shrink-0 items-center gap-10 font-mono text-[11px] tracking-[0.3em] text-[var(--yellow)] uppercase sm:text-[12px]"
                }
              >
                {t}
                <span className="text-[var(--yellow)]/40" aria-hidden>
                  ✦
                </span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* SCROLL INDICATOR — desktop only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.7 }}
        className="absolute right-8 bottom-24 z-10 hidden -rotate-90 origin-bottom-right items-center gap-3 font-mono text-[9px] tracking-[0.4em] uppercase text-[var(--cream)]/55 lg:flex"
        aria-hidden
      >
        <span className="block h-px w-12 bg-[var(--cream)]/55" />
        Scroll
      </motion.div>
    </section>
  );
}
