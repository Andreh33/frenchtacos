"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { offers, type Offer } from "@/lib/content";
import { Reveal } from "@/components/system/Reveal";

const accentMap: Record<Offer["accent"], { bg: string; text: string; tape: string }> = {
  yellow: {
    bg: "bg-[var(--uft-yellow)]",
    text: "text-[var(--uft-purple-deep)]",
    tape: "bg-[var(--uft-purple-deep)] text-[var(--uft-yellow)]",
  },
  purple: {
    bg: "bg-[var(--uft-purple)]",
    text: "text-[var(--uft-cream)]",
    tape: "bg-[var(--uft-yellow)] text-[var(--uft-purple-deep)]",
  },
  cream: {
    bg: "bg-[var(--uft-cream)]",
    text: "text-[var(--uft-purple-deep)]",
    tape: "bg-[var(--uft-purple-deep)] text-[var(--uft-yellow)]",
  },
};

function OfferCard({ offer, index }: { offer: Offer; index: number }) {
  const c = accentMap[offer.accent];
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };
  const onLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      className="embla__slide shrink-0 grow-0 basis-[88%] pl-4 sm:basis-[62%] md:basis-[44%] lg:basis-[34%]"
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.25s cubic-bezier(0.65,0,0.35,1)",
        }}
        className={`relative flex aspect-[3/4] flex-col justify-between overflow-hidden border-2 border-[var(--uft-purple-deep)] p-6 sm:p-8 ${c.bg} ${c.text} shadow-[6px_6px_0_0_rgba(0,0,0,0.45)] transition-shadow hover:shadow-[10px_10px_0_0_rgba(168,85,247,0.45)]`}
        data-cursor="PEDIR"
      >
        {/* Tape */}
        <span
          className={`absolute -top-3 left-6 -rotate-3 px-3 py-1 font-mono text-[10px] tracking-[0.3em] uppercase ${c.tape}`}
        >
          {offer.label}
        </span>

        <div className="flex items-start justify-between">
          <span className="font-mono text-xs tracking-widest opacity-70">
            {String(index + 1).padStart(2, "0")} / 03
          </span>
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </div>

        <div>
          <h3 className="font-display text-3xl leading-[0.95] font-extrabold tracking-tight sm:text-4xl">
            {offer.title}
          </h3>
          <p className="mt-4 text-sm leading-snug opacity-80 sm:text-base">
            {offer.body}
          </p>
        </div>

        <div className="flex items-end justify-between">
          <a
            href={offer.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border-b border-current pb-1 font-mono text-xs font-bold tracking-widest uppercase"
          >
            {offer.cta}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <div className="font-display text-5xl leading-none font-extrabold opacity-15">
            ★
          </div>
        </div>

        {/* corner grit */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 -bottom-8 h-32 w-32 rounded-full mix-blend-overlay"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%)",
          }}
        />
      </motion.div>
    </div>
  );
}

export function Offers() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [progress, setProgress] = useState(0);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    setProgress(Math.max(0, Math.min(1, emblaApi.scrollProgress())));
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    emblaApi.on("scroll", onScroll);
    emblaApi.on("reInit", onScroll);
    return () => {
      emblaApi.off("scroll", onScroll);
    };
  }, [emblaApi, onScroll]);

  return (
    <section id="ofertas" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end sm:mb-16">
          <div>
            <Reveal>
              <span className="font-mono text-[10px] tracking-[0.4em] text-[var(--uft-yellow)] uppercase">
                / 01 — Ofertas del momento
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h2
                className="mt-3 max-w-3xl font-display font-extrabold tracking-tight text-[var(--uft-cream)]"
                style={{
                  fontSize: "clamp(2.25rem, 6vw, 5.5rem)",
                  lineHeight: 0.92,
                }}
              >
                Promos que <span className="text-[var(--uft-yellow)]">revientan</span> el bolsillo.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <p className="max-w-sm text-sm leading-[1.6] text-[var(--uft-cream)]/70">
              Tres rondas. Cada una pegada al hambre. Arrastra hacia el lado para ver más.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex pl-4 sm:pl-[max(1.5rem,calc((100vw-1600px)/2+2.5rem))]">
          {offers.map((o, i) => (
            <OfferCard key={o.id} offer={o} index={i} />
          ))}
          <div className="shrink-0 grow-0 basis-12" aria-hidden />
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="relative h-px w-full max-w-xs overflow-hidden bg-[var(--uft-cream)]/15">
          <div
            className="absolute inset-y-0 left-0 bg-[var(--uft-yellow)] transition-[width] duration-150"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
}
