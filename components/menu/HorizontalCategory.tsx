"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import type { Product } from "@/lib/menu";
import { site } from "@/lib/site";

type Props = {
  num: string;
  title: string;
  eyebrow: string;
  products: Product[];
};

export function HorizontalCategory({ num, title, eyebrow, products }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const PANELS = products.length;
  // -100 * (N-1)/N e.g. -83.33% for 6 panels, -75% for 4 panels
  const xPct = -100 * ((PANELS - 1) / PANELS);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const trackX = useTransform(scrollYProgress, [0, 1], ["0%", `${xPct}%`]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(v);
    const idx = Math.min(PANELS - 1, Math.max(0, Math.floor(v * PANELS * 0.9999)));
    setActive(idx);
  });

  // section height = N * 100vh on desktop. Map explicitly so Tailwind scans
  // the literal strings (arbitrary-value classes must be static at build).
  const heightMap: Record<number, string> = {
    2: "md:h-[200vh]",
    3: "md:h-[300vh]",
    4: "md:h-[400vh]",
    5: "md:h-[500vh]",
    6: "md:h-[600vh]",
    7: "md:h-[700vh]",
    8: "md:h-[800vh]",
  };
  const heightStyle = heightMap[PANELS] ?? "md:h-[400vh]";

  return (
    <section
      ref={sectionRef}
      id={title.toLowerCase()}
      className={`relative bg-[var(--ink)] h-auto ${heightStyle}`}
      aria-label={`${title} — carta`}
    >
      {/* DESKTOP: sticky horizontal stage */}
      <div className="hidden h-full md:block">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* sticky tag */}
          <div className="pointer-events-none absolute top-0 left-0 z-30 w-full px-8 pt-24 lg:px-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="block h-px w-10 bg-[var(--yellow)]" />
                <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--yellow)]">
                  {num} · {eyebrow}
                </span>
              </div>
              <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--cream)]/55">
                {String(active + 1).padStart(2, "0")} / {String(PANELS).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* huge category label vertical right */}
          <div
            className="pointer-events-none absolute top-1/2 right-4 z-20 -translate-y-1/2 origin-center -rotate-90 font-display font-bold text-[var(--cream)]/[0.04] uppercase tracking-[-0.04em] whitespace-nowrap select-none"
            style={{ fontSize: "clamp(5rem, 12vw, 14rem)", lineHeight: 0.8 }}
            aria-hidden
          >
            {title}
          </div>

          <motion.div
            className="flex h-full"
            style={{
              width: `${PANELS * 100}vw`,
              x: trackX,
              willChange: "transform",
            }}
          >
            {products.map((p, i) => (
              <ProductPanel key={p.num} product={p} index={i} categoryTitle={title} />
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
              <span>
                {title} · {products[active]?.name}
              </span>
              <span>Scroll →</span>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE: native scroll-snap horizontal */}
      <div className="block md:hidden">
        <div className="px-5 pt-32 pb-6">
          <div className="flex items-center gap-3">
            <span className="block h-px w-10 bg-[var(--yellow)]" />
            <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--yellow)]">
              {num} · {eyebrow}
            </span>
          </div>
          <h2
            className="mt-4 font-display font-bold uppercase tracking-[-0.04em] text-[var(--cream)]"
            style={{ fontSize: "clamp(2.5rem, 11vw, 4.5rem)", lineHeight: 0.92 }}
          >
            {title}
          </h2>
        </div>

        <div
          className="flex w-full snap-x snap-mandatory overflow-x-auto scroll-pl-5 pb-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          data-lenis-prevent
        >
          {products.map((p) => (
            <article
              key={p.num}
              className="ml-5 flex w-[85vw] shrink-0 snap-start flex-col gap-5 pr-5 last:pr-5"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--purple-deep)]/30">
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  fill
                  sizes="85vw"
                  className="object-contain"
                />
                <span
                  className="pointer-events-none absolute top-3 right-3 font-display font-bold text-[var(--cream)] mix-blend-difference"
                  style={{ fontSize: "1.5rem", letterSpacing: "-0.03em" }}
                >
                  {p.num}
                </span>
              </div>
              <div>
                <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--yellow)]">
                  {p.num} · {title}
                </span>
                <h3
                  className="mt-2 font-display font-bold tracking-[-0.035em] text-[var(--cream)]"
                  style={{ fontSize: "clamp(2rem, 8vw, 2.75rem)", lineHeight: 0.95 }}
                >
                  {p.name}
                </h3>
                <p className="mt-3 text-[13px] leading-[1.55] text-[var(--cream)]/70">
                  {p.ingredients}
                </p>
                <PriceTag low={p.priceLow} high={p.priceHigh} compact />
                <a
                  href={site.orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-fill mt-4 inline-flex items-center gap-2 border border-[var(--yellow)] bg-[var(--yellow)] px-5 py-3 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--ink)]"
                >
                  <span className="relative z-10">Pedir →</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductPanel({
  product,
  index,
  categoryTitle,
}: {
  product: Product;
  index: number;
  categoryTitle: string;
}) {
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
            src={product.image.src}
            alt={product.image.alt}
            fill
            priority={index === 0}
            sizes="(min-width: 768px) 60vw, 100vw"
            className={product.placeholder ? "object-cover" : "object-contain"}
            style={
              product.placeholder
                ? { filter: "saturate(1.05) contrast(1.05) brightness(0.92)" }
                : undefined
            }
          />
          <span
            className={`pointer-events-none absolute top-5 z-10 font-display font-bold text-[var(--cream)] mix-blend-difference ${
              imageLeft ? "right-5" : "left-5"
            }`}
            aria-hidden
            style={{ fontSize: "clamp(2rem, 4vw, 4rem)", letterSpacing: "-0.04em" }}
          >
            {product.num}
          </span>
        </div>

        <div
          className={`col-span-5 flex flex-col gap-6 ${imageLeft ? "order-2" : "order-1"}`}
        >
          <div>
            <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--yellow)]">
              {product.num} · {categoryTitle}
            </span>
            <h3
              className="mt-3 font-display font-bold tracking-[-0.035em] text-[var(--cream)]"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 6rem)", lineHeight: 0.92 }}
            >
              {product.name}
            </h3>
            <p
              className="mt-4 max-w-md text-[14px] leading-[1.55] text-[var(--cream)]/75"
              style={{ fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)" }}
            >
              {product.ingredients}
            </p>
          </div>

          <div className="border-t border-[var(--cream)]/15 pt-4">
            <PriceTag low={product.priceLow} high={product.priceHigh} />
          </div>

          <a
            href={site.orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-fill group inline-flex w-fit items-center gap-2 border border-[var(--yellow)] bg-[var(--yellow)] px-6 py-3.5 font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--ink)]"
            data-cursor="PEDIR"
          >
            <span className="relative z-10">Pedir en Glovo</span>
            <span className="relative z-10 transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

function PriceTag({
  low,
  high,
  compact = false,
}: {
  low: string;
  high?: string;
  compact?: boolean;
}) {
  const wholeLow = low.split(",")[0];
  const decLow = "," + (low.split(",")[1] ?? "00") + "€";
  const wholeHigh = high?.split(",")[0];
  const decHigh = high ? "," + (high.split(",")[1] ?? "00") + "€" : "";

  return (
    <div>
      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--cream)]/55">
        Precio
      </span>
      <div
        className={`mt-1 flex items-start font-display font-bold tracking-[-0.06em] text-[var(--yellow)]`}
        style={{ lineHeight: 0.84 }}
      >
        <span style={{ fontSize: compact ? "clamp(3rem, 14vw, 5rem)" : "clamp(3.5rem, 7vw, 8rem)" }}>
          {wholeLow}
        </span>
        <span
          className="ml-1 tracking-normal"
          style={{
            fontSize: compact ? "0.9rem" : "clamp(0.9rem, 1.4vw, 1.4rem)",
            marginTop: "0.4em",
          }}
        >
          {decLow}
        </span>
        {high && (
          <>
            <span
              className="mx-3 self-center font-mono tracking-normal text-[var(--cream)]/40"
              style={{ fontSize: compact ? "1rem" : "clamp(1rem, 1.4vw, 1.4rem)" }}
            >
              –
            </span>
            <span
              style={{ fontSize: compact ? "clamp(3rem, 14vw, 5rem)" : "clamp(3.5rem, 7vw, 8rem)" }}
            >
              {wholeHigh}
            </span>
            <span
              className="ml-1 tracking-normal"
              style={{
                fontSize: compact ? "0.9rem" : "clamp(0.9rem, 1.4vw, 1.4rem)",
                marginTop: "0.4em",
              }}
            >
              {decHigh}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
