"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

type Props = {
  number: string;
  nextTitle: string;
  nextEyebrow: string;
};

export function CategorySeparator({ number, nextTitle, nextEyebrow }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.05"],
  });

  const letters = nextTitle.split("");
  // last letter ends up yellow as accent
  const yellowFromIndex = letters.length - 1;

  return (
    <section
      ref={ref}
      data-warp-trigger
      className="relative grid min-h-[80vh] place-items-center overflow-hidden bg-[var(--ink)] py-[12vh] sm:min-h-[95vh]"
      aria-hidden
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_45%,rgba(229,97,26,0.14),transparent_60%)]"
      />

      <div className="relative mx-auto w-full max-w-[1800px] px-5 sm:px-10 lg:px-14">
        <div className="flex items-center gap-3">
          <span className="block h-px w-12 bg-[var(--yellow)]" />
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[var(--yellow)]">
            ↓ Siguiente · {number}
          </span>
        </div>

        <h2
          className="font-display relative mt-10 origin-top-left font-bold uppercase leading-[0.82] whitespace-nowrap"
          style={{
            // Reducido para que palabras largas (ENSALADAS, 9 chars) quepan en una línea
            // en cualquier viewport ≥ 360px.
            fontSize: `clamp(3rem, ${Math.min(13, 90 / Math.max(letters.length, 5))}vw, ${Math.min(16, 120 / Math.max(letters.length, 5))}rem)`,
            letterSpacing: "-0.05em",
            transform: "rotate(-3deg)",
            color: "var(--cream)",
          }}
        >
          <span className="block overflow-hidden pb-[0.05em]">
            {letters.map((ch, i) => {
              const start = i / letters.length;
              const end = Math.min(1, start + 1 / letters.length + 0.08);
              return (
                <ScrubLetter
                  key={i}
                  progress={scrollYProgress}
                  range={[start, end]}
                  highlight={i === yellowFromIndex}
                >
                  {ch}
                </ScrubLetter>
              );
            })}
          </span>
        </h2>

        <div className="mt-10 flex items-end justify-end gap-3 sm:mt-14">
          <span className="block h-px w-12 bg-[var(--cream)]/40" />
          <span className="italic-editorial text-xl text-[var(--orange-glow)] sm:text-3xl">
            {nextEyebrow}.
          </span>
        </div>
      </div>
    </section>
  );
}

function ScrubLetter({
  children,
  progress,
  range,
  highlight,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  highlight?: boolean;
}) {
  // Two animations: opacity (always) + y-translate (small, gives "rising" feel)
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, ["35%", "0%"]);

  return (
    <motion.span
      style={{
        opacity,
        y,
        color: highlight ? "var(--yellow)" : undefined,
        display: "inline-block",
      }}
    >
      {children}
    </motion.span>
  );
}
