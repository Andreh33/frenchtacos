"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

type Line = { text: string; className: string; underlineCalle?: boolean };
const lines: Line[] = [
  { text: "FRENCH", className: "" },
  { text: "TAKOS", className: "text-[var(--yellow)]" },
  { text: "DE LA CALLE.", className: "", underlineCalle: true },
];

const MARQUEE_ITEMS = [
  "ABIERTO HASTA LAS 00:00",
  "MARTES 2×1",
  "Nº01 · VALDEPEÑAS",
  "PIDE ONLINE",
  "DESDE 8,90€",
];

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
  return (
    <section
      className="relative isolate flex w-full flex-col overflow-hidden"
      style={{ minHeight: "100svh", height: "100svh" }}
    >
      {/* VIDEO LAYER */}
      <div className="absolute inset-0 -z-20">
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
      </div>

      {/* DARK GRADIENT OVERLAY */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,6,18,0.78)_0%,rgba(10,6,18,0.55)_40%,rgba(10,6,18,0.82)_100%)]"
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
          <span>Valdepeñas</span>
          <span className="text-[var(--cream)]/40">·</span>
          <span>Desde 2024</span>
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

      {/* HEADLINE BLOCK */}
      <div className="relative z-10 flex flex-1 flex-col justify-end px-5 pb-32 sm:px-8 sm:pb-40 lg:px-12 lg:pb-44">
        <div className="max-w-[1400px]">
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
            Street food francés con alma manchega.
            <br />
            Recién sacado del comal a la calle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
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
            <a
              href="#carta"
              className="inline-flex items-center gap-3 border border-[var(--cream)]/40 px-7 py-4 font-mono text-[11px] tracking-[0.3em] text-[var(--cream)] uppercase transition-colors hover:border-[var(--cream)] hover:bg-[var(--cream)]/5"
              data-cursor="VER"
            >
              Ver carta
            </a>
          </motion.div>
        </div>
      </div>

      {/* BOTTOM MARQUEE */}
      <div className="absolute inset-x-0 bottom-0 z-10 overflow-hidden border-y border-[var(--yellow)] bg-[var(--ink)]">
        <div className="marquee-track flex w-max items-center gap-10 py-3.5 sm:py-4">
          {Array.from({ length: 3 }).flatMap((_, k) =>
            MARQUEE_ITEMS.map((t, i) => (
              <span
                key={`${k}-${i}`}
                className="flex shrink-0 items-center gap-10 font-mono text-[11px] tracking-[0.3em] text-[var(--yellow)] uppercase sm:text-[12px]"
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
