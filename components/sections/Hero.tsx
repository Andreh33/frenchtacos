"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const TakoCanvas = dynamic(
  () => import("@/components/hero/TakoCanvas").then((m) => m.TakoCanvas),
  { ssr: false }
);

function CurrentStatus() {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      setNow(`${hh}:${mm}`);
    };
    fmt();
    const id = setInterval(fmt, 30_000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-[var(--uft-cream)]/70 uppercase sm:text-[11px]">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--uft-yellow)] opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--uft-yellow)]" />
      </span>
      <span>Abierto hasta 00:00 · Ahora {now}</span>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-20">
      {/* Background radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[10%] -z-10 h-[60vh] w-[60vh] -translate-y-1/2 rounded-full bg-[var(--uft-yellow)]/8 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 -z-10 h-[40vh] w-[40vh] rounded-full bg-[var(--uft-purple-glow)]/15 blur-[100px]"
      />

      {/* Local number — top right */}
      <div className="absolute top-24 right-4 z-10 hidden text-right sm:top-28 sm:right-8 md:block">
        <div className="font-mono text-[10px] tracking-[0.3em] text-[var(--uft-yellow)] uppercase">
          Nº01
        </div>
        <div className="font-mono text-[10px] tracking-[0.3em] text-[var(--uft-cream)]/60 uppercase">
          Valdepeñas
        </div>
      </div>

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-10">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-3 border border-[var(--uft-yellow)]/40 bg-[var(--uft-yellow)]/5 px-3 py-1.5 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--uft-yellow)]" />
            <span className="font-mono text-[10px] font-medium tracking-[0.25em] text-[var(--uft-yellow)] uppercase">
              Edición Valdepeñas · 2026
            </span>
          </motion.div>

          <h1
            className="font-display font-extrabold tracking-tight text-[var(--uft-cream)]"
            style={{
              fontSize: "clamp(3rem, 9.5vw, 9rem)",
              lineHeight: 0.88,
            }}
          >
            <motion.span
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
              className="block"
            >
              FRENCH
            </motion.span>
            <motion.span
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.65, 0, 0.35, 1] }}
              className="block text-[var(--uft-yellow)]"
            >
              TAKOS
            </motion.span>
            <motion.span
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
              className="block"
            >
              DE LA <span className="relative inline-block">
                CALLE
                <svg
                  aria-hidden
                  viewBox="0 0 220 18"
                  className="absolute -bottom-1 left-0 h-3 w-full"
                >
                  <path
                    d="M3 12 C 60 2, 120 18, 217 6"
                    stroke="var(--uft-yellow)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 max-w-xl text-[17px] leading-[1.55] text-[var(--uft-cream)]/85 sm:text-lg"
          >
            Street food francés con alma manchega.{" "}
            <span className="text-[var(--uft-yellow)]">Valdepeñas</span>, desde el corazón —
            recién sacado del comal a la calle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href={site.orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fill group relative inline-flex items-center gap-3 border border-[var(--uft-yellow)] bg-[var(--uft-yellow)] px-7 py-4 font-mono text-xs font-bold tracking-widest text-[var(--uft-purple-deep)] uppercase"
              data-cursor="PEDIR"
            >
              <span className="relative z-10">Pide ya</span>
              <svg
                className="relative z-10 h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href={site.orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-[var(--uft-cream)]/40 px-7 py-4 font-mono text-xs font-bold tracking-widest text-[var(--uft-cream)] uppercase transition-colors hover:border-[var(--uft-cream)] hover:bg-[var(--uft-cream)]/5"
              data-cursor="VER"
            >
              Ver carta
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-12 hidden sm:block"
          >
            <CurrentStatus />
          </motion.div>
        </div>

        <div className="relative lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
            className="relative"
          >
            <TakoCanvas />
          </motion.div>

          {/* Floating price tag sticker */}
          <motion.div
            initial={{ opacity: 0, rotate: -16, y: 20 }}
            animate={{ opacity: 1, rotate: -8, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="absolute -bottom-2 -left-2 z-10 hidden border-2 border-[var(--uft-purple-deep)] bg-[var(--uft-yellow)] px-4 py-2 shadow-[4px_4px_0_0_rgba(0,0,0,0.4)] sm:block"
          >
            <div className="font-mono text-[9px] tracking-[0.3em] text-[var(--uft-purple-deep)] uppercase">
              Desde
            </div>
            <div className="font-display text-2xl font-extrabold text-[var(--uft-purple-deep)]">
              8,90€
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mt-16 sm:hidden">
        <div className="px-4">
          <CurrentStatus />
        </div>
      </div>
    </section>
  );
}
