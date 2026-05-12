"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { takos, type Tako } from "@/lib/carta";
import { site } from "@/lib/site";

// N panels → height = N * 100vh on desktop, auto on mobile (CSS responsive)
const PANELS = takos.length;
const TRAVEL_PCT = -100 * ((PANELS - 1) / PANELS); // -75% for 4 panels

export function Carta() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const trackX = useTransform(scrollYProgress, [0, 1], ["0%", `${TRAVEL_PCT}%`]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(v);
    const idx = Math.min(
      PANELS - 1,
      Math.max(0, Math.floor(v * PANELS * 0.9999))
    );
    setActiveIndex(idx);
  });

  return (
    <section
      ref={sectionRef}
      id="carta"
      className="relative bg-[var(--ink)] h-auto md:h-[400vh]"
      aria-label="Carta editorial"
    >
      {/* DESKTOP: sticky stage with horizontal track */}
      <div className="hidden h-full md:block">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* sticky header tag */}
          <div className="pointer-events-none absolute top-0 left-0 z-30 w-full px-8 pt-24 lg:px-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="block h-px w-10 bg-[var(--yellow)]" />
                <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--yellow)]">
                  / 01 — Carta editorial
                </span>
              </div>
              <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--cream)]/55">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(takos.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <motion.div
            className="flex h-full"
            style={{
              width: `${PANELS * 100}vw`,
              x: trackX,
              willChange: "transform",
            }}
          >
            {takos.map((t, i) => (
              <TakoPanel key={t.num} tako={t} index={i} />
            ))}
          </motion.div>

          {/* progress bar */}
          <div className="pointer-events-none absolute bottom-8 left-1/2 z-30 w-[min(560px,60vw)] -translate-x-1/2">
            <div className="relative h-px w-full bg-[var(--cream)]/15">
              <div
                className="absolute inset-y-0 left-0 bg-[var(--yellow)]"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[9px] tracking-[0.3em] uppercase text-[var(--cream)]/45">
              <span>{takos[activeIndex]?.name}</span>
              <span>Scroll →</span>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE vertical stack */}
      <div className="block md:hidden">
        <div className="space-y-24 px-5 pt-32 pb-20">
          <div className="flex items-center gap-3">
            <span className="block h-px w-10 bg-[var(--yellow)]" />
            <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--yellow)]">
              / 01 — Carta
            </span>
          </div>
          {takos.map((t) => (
            <TakoPanelMobile key={t.num} tako={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TakoPanel({ tako, index }: { tako: Tako; index: number }) {
  const imageLeft = index % 2 === 0;

  return (
    <div className="relative flex h-full w-screen flex-shrink-0 flex-col justify-center px-[6vw]">
      <div className="grid h-full max-h-[78vh] w-full grid-cols-12 items-center gap-[3vw] self-center">
        <div
          className={`relative col-span-7 h-full overflow-hidden ${
            imageLeft ? "order-1" : "order-2"
          }`}
        >
          <Image
            src={tako.image.src}
            alt={tako.image.alt}
            fill
            priority={index === 0}
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-cover"
            style={{ filter: "saturate(1.08) contrast(1.06) brightness(0.92)" }}
          />
          <span
            className={`pointer-events-none absolute top-5 z-10 font-display font-bold text-[var(--cream)] mix-blend-difference ${
              imageLeft ? "right-5" : "left-5"
            }`}
            aria-hidden
            style={{
              fontSize: "clamp(2rem, 4vw, 4rem)",
              letterSpacing: "-0.04em",
            }}
          >
            {tako.num}
          </span>
        </div>

        <div
          className={`col-span-5 flex flex-col gap-6 ${
            imageLeft ? "order-2" : "order-1"
          }`}
        >
          <div>
            <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--yellow)]">
              {tako.num} — French tako
            </span>
            <h3
              className="mt-3 font-display font-bold tracking-[-0.035em] text-[var(--cream)]"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 6rem)", lineHeight: 0.92 }}
            >
              {tako.name}
            </h3>
            <p
              className="italic-editorial mt-3 max-w-md text-[var(--purple-glow)]"
              style={{ fontSize: "clamp(1.15rem, 1.6vw, 1.6rem)", lineHeight: 1.2 }}
            >
              {tako.subtitle}
            </p>
          </div>

          <ul className="space-y-1 border-t border-[var(--cream)]/15 pt-4 font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--cream)]/75">
            {tako.ingredients.map((ing) => (
              <li
                key={ing}
                className="flex items-baseline gap-3 border-b border-[var(--cream)]/8 py-2"
              >
                <span className="block h-[2px] w-2 bg-[var(--yellow)]" />
                {ing}
              </li>
            ))}
          </ul>

          <div className="mt-2 flex items-end justify-between gap-6">
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--cream)]/55">
                Precio
              </span>
              <div
                className="flex items-start font-display font-bold tracking-[-0.06em] text-[var(--yellow)]"
                style={{ lineHeight: 0.84 }}
              >
                <span style={{ fontSize: "clamp(4rem, 9vw, 10rem)" }}>
                  {tako.price.whole}
                </span>
                <span
                  className="ml-1 tracking-normal"
                  style={{
                    fontSize: "clamp(1rem, 1.8vw, 1.6rem)",
                    marginTop: "0.4em",
                  }}
                >
                  {tako.price.decimals}
                </span>
              </div>
            </div>

            <a
              href={site.orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fill group inline-flex shrink-0 items-center gap-2 border border-[var(--yellow)] bg-[var(--yellow)] px-6 py-3.5 font-mono text-[11px] tracking-[0.3em] text-[var(--ink)] uppercase"
              data-cursor="PEDIR"
            >
              <span className="relative z-10">Pedir</span>
              <span className="relative z-10 transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function TakoPanelMobile({ tako }: { tako: Tako }) {
  return (
    <article>
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={tako.image.src}
          alt={tako.image.alt}
          fill
          sizes="(min-width: 768px) 1px, 100vw"
          className="object-cover"
          style={{ filter: "saturate(1.08) contrast(1.06) brightness(0.92)" }}
        />
        <span
          className="pointer-events-none absolute top-3 right-3 font-display font-bold text-[var(--cream)] mix-blend-difference"
          style={{ fontSize: "1.5rem", letterSpacing: "-0.03em" }}
        >
          {tako.num}
        </span>
      </div>
      <div className="mt-6">
        <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--yellow)]">
          {tako.num} — French tako
        </span>
        <h3
          className="mt-3 font-display font-bold tracking-[-0.035em] text-[var(--cream)]"
          style={{ fontSize: "clamp(2.5rem, 11vw, 4.5rem)", lineHeight: 0.92 }}
        >
          {tako.name}
        </h3>
        <p className="italic-editorial mt-3 text-xl text-[var(--purple-glow)]">
          {tako.subtitle}
        </p>
        <ul className="mt-6 space-y-1 border-t border-[var(--cream)]/15 pt-4 font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--cream)]/75">
          {tako.ingredients.map((ing) => (
            <li
              key={ing}
              className="flex items-baseline gap-3 border-b border-[var(--cream)]/8 py-2"
            >
              <span className="block h-[2px] w-2 bg-[var(--yellow)]" />
              {ing}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-end justify-between gap-6">
          <div>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--cream)]/55">
              Precio
            </span>
            <div
              className="flex items-start font-display font-bold tracking-[-0.06em] text-[var(--yellow)]"
              style={{ lineHeight: 0.84 }}
            >
              <span style={{ fontSize: "clamp(4rem, 18vw, 7rem)" }}>
                {tako.price.whole}
              </span>
              <span
                className="ml-1 text-lg tracking-normal"
                style={{ marginTop: "0.4em" }}
              >
                {tako.price.decimals}
              </span>
            </div>
          </div>
          <a
            href={site.orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-fill inline-flex items-center gap-2 border border-[var(--yellow)] bg-[var(--yellow)] px-5 py-3 font-mono text-[10px] tracking-[0.3em] text-[var(--ink)] uppercase"
          >
            <span className="relative z-10">Pedir →</span>
          </a>
        </div>
      </div>
    </article>
  );
}
