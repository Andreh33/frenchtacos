"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

type Props = {
  number: string;        // "Nº02"
  nextTitle: string;     // "BURGERS"
  nextEyebrow: string;   // "Pan brioche y fuego"
};

export function CategorySeparator({ number, nextTitle, nextEyebrow }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.15"],
  });

  // Letters for the giant title — each letter scrub-fades in
  const letters = nextTitle.split("");

  return (
    <section
      ref={ref}
      className="relative grid min-h-[70vh] place-items-center overflow-hidden bg-[var(--ink)] py-[10vh] sm:min-h-[80vh]"
      aria-hidden
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_40%,rgba(107,47,179,0.12),transparent_60%)]"
      />

      <div className="mx-auto w-full max-w-[1800px] px-5 sm:px-10 lg:px-14">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[var(--yellow)]">
            ↓ Siguiente · {number}
          </span>
        </div>

        <div
          className="mt-8 origin-top-left"
          style={{ transform: "rotate(-4deg)" }}
        >
          <h2
            className="font-display font-bold uppercase tracking-[-0.05em]"
            style={{
              fontSize: "clamp(4rem, 18vw, 18rem)",
              lineHeight: 0.88,
              color: "var(--cream)",
            }}
          >
            {letters.map((ch, i) => {
              const start = i / letters.length;
              const end = start + 1 / letters.length;
              return (
                <ScrubLetter
                  key={i}
                  progress={scrollYProgress}
                  range={[start, Math.min(1, end + 0.06)]}
                  highlight={i >= letters.length - 1}
                >
                  {ch}
                </ScrubLetter>
              );
            })}
          </h2>
        </div>

        <div className="mt-6 flex justify-end">
          <span className="italic-editorial text-xl text-[var(--purple-glow)] sm:text-2xl">
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
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span
      style={{
        opacity,
        color: highlight ? "var(--yellow)" : undefined,
      }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
}
