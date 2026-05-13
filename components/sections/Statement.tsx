"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useMemo, useRef } from "react";
import { useLocale } from "@/components/system/LocaleProvider";

type LineDef = {
  text: string;
  emphasize?: "italic" | "yellow";
};

function buildLines(rawLines: readonly string[]): LineDef[] {
  return rawLines.map((text, i) => ({
    text,
    emphasize:
      i === rawLines.length - 2
        ? "italic"
        : i === rawLines.length - 1
        ? "yellow"
        : undefined,
  }));
}

// flatten into words with their global index so we can scrub each one
type Word = { text: string; line: number; word: number; total: number };
function buildWords(lines: LineDef[]): Word[] {
  const out: Omit<Word, "total">[] = [];
  lines.forEach((l, lineIdx) => {
    l.text.split(/\s+/).forEach((w, wIdx) => {
      out.push({ text: w, line: lineIdx, word: wIdx });
    });
  });
  return out.map((w) => ({ ...w, total: out.length }));
}

export function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLocale();
  const lines = useMemo(() => buildLines(t.statementLines), [t.statementLines]);
  const WORDS = useMemo(() => buildWords(lines), [lines]);
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
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_50%,rgba(229,97,26,0.16),transparent_55%)]"
      />

      <div className="mx-auto max-w-[1800px] px-5 sm:px-10 lg:px-14">
        <div className="mb-14 flex items-center gap-3 sm:mb-20">
          <span className="block h-px w-12 bg-[var(--yellow)]" />
          <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--yellow)]">
            {t.statementEyebrow}
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
              {t.statementSignature}
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

  // Animate opacity only — color comes from CSS class (theme-aware).
  const opacity = useTransform(progress, [start, end], [0.18, 1]);

  const colorClass =
    emphasize === "italic"
      ? "italic-editorial scrub-italic"
      : emphasize === "yellow"
      ? "scrub-yellow"
      : "scrub-cream";

  return (
    <>
      <motion.span style={{ opacity }} className={`inline-block ${colorClass}`}>
        {children}
      </motion.span>
      <span aria-hidden> </span>
    </>
  );
}
