"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_DURATION = 2400;
const EXIT_DURATION = 800;

export function Loader() {
  const [phase, setPhase] = useState<"hidden" | "in" | "out">("hidden");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("clm_loaded") === "1") {
      setPhase("hidden");
      return;
    }
    setPhase("in");
    const t1 = window.setTimeout(() => setPhase("out"), TOTAL_DURATION);
    const t2 = window.setTimeout(() => {
      setPhase("hidden");
      sessionStorage.setItem("clm_loaded", "1");
    }, TOTAL_DURATION + EXIT_DURATION);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  return (
    <AnimatePresence>
      {phase !== "hidden" && (
        <motion.div
          aria-hidden
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[10000] grid place-items-center overflow-hidden bg-[var(--ink)]"
        >
          {/* radial purple wash */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(107,47,179,0.15),transparent_60%)]"
          />

          <div className="relative flex flex-col items-center px-6">
            {/* small eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: phase === "out" ? 0 : 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex items-center gap-3"
            >
              <span className="block h-px w-10 bg-[var(--yellow)]" />
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[var(--yellow)]">
                Ciudad Real · Desde 2024
              </span>
              <span className="block h-px w-10 bg-[var(--yellow)]" />
            </motion.div>

            {/* CLM giant */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{
                y: phase === "out" ? -30 : 0,
                opacity: phase === "out" ? 0 : 1,
              }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.65, 0, 0.35, 1] }}
              className="mt-6 font-display font-bold leading-[0.85] tracking-[-0.05em] text-[var(--cream)]"
              style={{ fontSize: "clamp(5rem, 18vw, 16rem)" }}
            >
              CLM
            </motion.div>

            {/* FRENCH TACOS subline */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{
                y: phase === "out" ? -20 : 0,
                opacity: phase === "out" ? 0 : 1,
              }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.65, 0, 0.35, 1] }}
              className="mt-1 font-display font-bold leading-[0.85] tracking-[-0.04em] text-[var(--yellow)]"
              style={{ fontSize: "clamp(2rem, 7vw, 6rem)" }}
            >
              FRENCH TACOS
            </motion.div>

            {/* line + tagline */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: phase === "out" ? 0 : 1,
                opacity: phase === "out" ? 0 : 1,
              }}
              transition={{ duration: 0.9, delay: 0.7, ease: [0.65, 0, 0.35, 1] }}
              className="mt-10 h-px w-32 origin-center bg-[var(--cream)]/35"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "out" ? 0 : 0.75 }}
              transition={{ duration: 0.5, delay: 0.95 }}
              className="mt-4 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--cream)]/70"
            >
              Carne · Patatas · Quesazo
            </motion.div>
          </div>

          {/* yellow wipe up — exit element */}
          {phase === "out" && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "-100%" }}
              transition={{ duration: 1.0, ease: [0.85, 0, 0.15, 1] }}
              className="pointer-events-none absolute inset-0 z-10 bg-[var(--yellow)]"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
