"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/lib/sound";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const DURATION = 12_000;

type Confetti = {
  id: number;
  left: number;
  delay: number;
  rotation: number;
  size: number;
  drift: number;
};

export function KonamiMode() {
  const [active, setActive] = useState(false);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const buffer = useRef<string[]>([]);
  const confettiCounter = useRef(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (active) return;
      if (e.repeat) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      // Only buffer keys that could be part of the sequence
      const next = [...buffer.current, key].slice(-SEQUENCE.length);
      buffer.current = next;

      // Check progressive match — gives feedback / lets us preventDefault on arrows
      const matchSoFar = next.every(
        (k, i) => k === SEQUENCE[SEQUENCE.length - next.length + i]
      );
      if (matchSoFar && key.startsWith("Arrow")) {
        e.preventDefault();
      }

      if (next.length === SEQUENCE.length) {
        const full = SEQUENCE.every((k, i) => next[i] === k);
        if (full) {
          buffer.current = [];
          trigger();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const trigger = () => {
    setActive(true);
    document.documentElement.classList.add("party-mode");
    // generate confetti
    const next: Confetti[] = Array.from({ length: 90 }, () => ({
      id: confettiCounter.current++,
      left: Math.random() * 100,
      delay: Math.random() * 600,
      rotation: Math.random() * 360,
      size: 6 + Math.random() * 10,
      drift: -20 + Math.random() * 40,
    }));
    setConfetti(next);
    // sound flourish
    sound.playSwoosh();
    setTimeout(() => sound.playClick(), 200);
    setTimeout(() => sound.playClick(), 400);
    setTimeout(() => sound.playClick(), 600);

    setTimeout(() => {
      setActive(false);
      document.documentElement.classList.remove("party-mode");
      setConfetti([]);
    }, DURATION);
  };

  return (
    <AnimatePresence>
      {active && (
        <>
          {/* toast */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
            className="fixed bottom-6 left-1/2 z-[9500] -translate-x-1/2 border-2 border-[var(--ink)] bg-[var(--yellow)] px-5 py-3 font-mono text-[10px] font-bold tracking-[0.3em] text-[var(--ink)] uppercase shadow-[5px_5px_0_0_rgba(0,0,0,0.5)]"
          >
            ◉ Lo has encontrado · Party mode 12s
          </motion.div>

          {/* confetti rain */}
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[9400] overflow-hidden"
          >
            {confetti.map((c) => (
              <span
                key={c.id}
                className="absolute top-0 block bg-[var(--yellow)]"
                style={{
                  left: `${c.left}%`,
                  width: c.size,
                  height: c.size * 0.4,
                  transform: `rotate(${c.rotation}deg)`,
                  animation: `confetti-fall 2.4s ${c.delay}ms cubic-bezier(0.5,0.2,0.3,1) forwards`,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ["--drift" as any]: `${c.drift}vw`,
                }}
              />
            ))}
          </div>

          <style>{`
            @keyframes confetti-fall {
              0% { transform: translate3d(0, -10vh, 0) rotate(0deg); opacity: 1; }
              100% { transform: translate3d(var(--drift, 0vw), 110vh, 0) rotate(720deg); opacity: 0.3; }
            }
            html.party-mode .marquee-track {
              animation-duration: 8s !important;
            }
            html.party-mode body {
              filter: hue-rotate(-15deg) saturate(1.25);
            }
            html.party-mode .grain::after {
              opacity: 0.12 !important;
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}
