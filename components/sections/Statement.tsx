"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

type LineDef = {
  text: string;
  emphasize?: "italic" | "yellow";
};

const lines: LineDef[] = [
  { text: "« NACIDO EN FRANCIA," },
  { text: "CRIADO EN LA CALLE." },
  { text: "CARNE JUGOSA," },
  { text: "PATATAS DENTRO," },
  { text: "QUESAZO FUNDIDO,", emphasize: "italic" },
  { text: "Y SE ACABÓ. »", emphasize: "yellow" },
];

// flatten into words with their global index so we can scrub each one
type Word = { text: string; line: number; word: number; total: number };
function buildWords(): Word[] {
  const out: Omit<Word, "total">[] = [];
  lines.forEach((l, lineIdx) => {
    l.text.split(/\s+/).forEach((w, wIdx) => {
      out.push({ text: w, line: lineIdx, word: wIdx });
    });
  });
  return out.map((w) => ({ ...w, total: out.length }));
}

const WORDS = buildWords();

export function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // start animating when section bottom enters viewport bottom,
    // finish when section top hits viewport top (gives full sticky-feeling fill)
    offset: ["start 0.85", "end 0.4"],
  });

  return (
    <section
      id="manifesto"
      className="relative isolate overflow-hidden bg-[var(--ink)] py-[22vh] sm:py-[28vh]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_50%,rgba(107,47,179,0.18),transparent_55%)]"
      />

      <div className="mx-auto max-w-[1800px] px-5 sm:px-10 lg:px-14">
        <div className="mb-14 flex items-center gap-3 sm:mb-20">
          <span className="block h-px w-12 bg-[var(--yellow)]" />
          <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--yellow)]">
            Manifesto · 2024
          </span>
        </div>

        <div
          ref={ref}
          className="relative origin-top-left"
          style={{ transform: "rotate(-2.5deg)" }}
        >
          <h2
            className="font-display font-bold tracking-[-0.04em]"
            style={{
              fontSize: "clamp(2.7rem, 8.8vw, 9rem)",
              lineHeight: 0.92,
            }}
          >
            {lines.map((l, lineIdx) => (
              <span key={lineIdx} className="block">
                {l.text.split(/\s+/).map((w, wIdx) => {
                  const global = WORDS.findIndex(
                    (x) => x.line === lineIdx && x.word === wIdx
                  );
                  return (
                    <ScrubWord
                      key={`${lineIdx}-${wIdx}`}
                      progress={scrollYProgress}
                      index={global}
                      total={WORDS.length}
                      emphasize={l.emphasize}
                    >
                      {w}
                    </ScrubWord>
                  );
                })}
              </span>
            ))}
          </h2>

          <div className="mt-16 flex items-center justify-end gap-3 sm:mt-24">
            <span className="block h-px w-12 bg-[var(--cream)]/40" />
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--cream)]/65">
              — Urban French Takos
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScrubWord({
  children,
  progress,
  index,
  total,
  emphasize,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  index: number;
  total: number;
  emphasize?: "italic" | "yellow";
}) {
  // Each word becomes "lit" at scrollProgress ≈ index / total,
  // with a small overlap window so the fill feels continuous.
  const start = Math.max(0, index / total - 0.04);
  const end = Math.min(1, index / total + 0.10);

  const dim =
    emphasize === "yellow"
      ? "rgba(255, 214, 10, 0.18)"
      : emphasize === "italic"
      ? "rgba(168, 85, 247, 0.18)"
      : "rgba(255, 248, 231, 0.18)";

  const bright =
    emphasize === "yellow"
      ? "rgba(255, 214, 10, 1)"
      : emphasize === "italic"
      ? "rgba(168, 85, 247, 1)"
      : "rgba(255, 248, 231, 1)";

  const color = useTransform(progress, [start, end], [dim, bright]);

  return (
    <>
      <motion.span
        style={{ color }}
        className={`inline-block transition-[filter] ${
          emphasize === "italic" ? "italic-editorial" : ""
        }`}
      >
        {children}
      </motion.span>
      <span aria-hidden> </span>
    </>
  );
}
