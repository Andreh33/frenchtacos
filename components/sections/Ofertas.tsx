"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { ofertas, type Oferta } from "@/lib/ofertas";
import { site } from "@/lib/site";

export function Ofertas() {
  return (
    <section id="ofertas" className="relative bg-[var(--ink)] py-[14vh] sm:py-[18vh]">
      <div className="mx-auto max-w-[1800px] px-5 sm:px-10 lg:px-14">
        <div className="mb-16 flex items-end justify-between gap-6 sm:mb-24">
          <div>
            <div className="flex items-center gap-3">
              <span className="block h-px w-10 bg-[var(--yellow)]" />
              <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--yellow)]">
                / 02 — Ofertas
              </span>
            </div>
            <h2
              className="mt-5 max-w-3xl font-display font-bold tracking-[-0.04em] text-[var(--cream)]"
              style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)", lineHeight: 0.92 }}
            >
              Promos que <span className="italic-editorial text-[var(--purple-glow)]">revientan</span> el bolsillo.
            </h2>
          </div>
          <div className="hidden max-w-xs text-right font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--cream)]/60 md:block">
            Tres rondas. Cada una pegada al hambre.
          </div>
        </div>

        <div className="flex flex-col gap-[14vh]">
          {ofertas.map((o, i) => (
            <OfertaBlock key={o.num} oferta={o} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OfertaBlock({ oferta, index }: { oferta: Oferta; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  const align =
    oferta.align === "right"
      ? "items-end text-right"
      : oferta.align === "center"
      ? "items-center text-center mx-auto"
      : "items-start text-left";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
      className={`${oferta.width} flex flex-col ${align} group`}
    >
      {/* IMAGE */}
      <a
        href={site.orderUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-[16/10] w-full overflow-hidden"
        data-cursor="PEDIR"
        aria-label={`${oferta.title} — pedir online`}
      >
        <Image
          src={oferta.image.src}
          alt={oferta.image.alt}
          fill
          sizes="(min-width: 768px) 80vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          style={{ filter: "saturate(1.08) contrast(1.04)" }}
        />
        {/* hover purple overlay */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[var(--purple-deep)]/0 transition-colors duration-500 group-hover:bg-[var(--purple-deep)]/30"
        />
        {/* hover arrow */}
        <div
          aria-hidden
          className="absolute right-4 bottom-4 grid h-14 w-14 translate-y-3 place-items-center rounded-full border border-[var(--yellow)] bg-[var(--yellow)]/0 text-[var(--yellow)] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:bg-[var(--yellow)] group-hover:text-[var(--ink)] group-hover:opacity-100"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </div>
        {/* number stamp */}
        <span
          className="pointer-events-none absolute top-4 left-4 font-display font-bold text-[var(--cream)] mix-blend-difference"
          aria-hidden
          style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)", letterSpacing: "-0.03em" }}
        >
          {oferta.num}
        </span>
      </a>

      {/* TEXT */}
      <div className={`mt-6 ${oferta.align === "right" ? "" : oferta.align === "center" ? "max-w-2xl" : "max-w-xl"} flex flex-col gap-3`}>
        <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--yellow)]">
          {oferta.eyebrow}
        </span>
        <h3
          className="font-display font-bold tracking-[-0.035em] text-[var(--cream)]"
          style={{ fontSize: "clamp(1.75rem, 4vw, 4rem)", lineHeight: 0.95 }}
        >
          {oferta.title}
        </h3>
        <p className={`text-[15px] leading-[1.55] text-[var(--cream)]/75 sm:text-[17px] ${oferta.align === "right" ? "ml-auto" : ""}`}>
          {oferta.body}
        </p>
        <div className={`mt-3 ${oferta.align === "right" ? "self-end" : oferta.align === "center" ? "self-center" : "self-start"}`}>
          <a
            href={site.orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/cta inline-flex items-center gap-2 border-b border-[var(--cream)]/40 pb-1 font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--cream)] transition-colors hover:border-[var(--yellow)] hover:text-[var(--yellow)]"
            data-cursor="PEDIR"
          >
            {oferta.cta}
            <span className="transition-transform group-hover/cta:translate-x-1">→</span>
          </a>
        </div>
      </div>

      {/* tiny index marker for the right-aligned block, like a chapter */}
      <span className="mt-8 font-mono text-[9px] tracking-[0.4em] uppercase text-[var(--cream)]/30">
        {String(index + 1).padStart(2, "0")} / {String(ofertas.length).padStart(2, "0")}
      </span>
    </motion.div>
  );
}
