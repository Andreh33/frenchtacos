"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/lib/site";
import { LegalModalTrigger } from "./LegalModal";
import { MuteToggle } from "@/components/system/MuteToggle";

export function Footer() {
  const year = new Date().getFullYear();
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: wordmarkProgress } = useScroll({
    target: wordmarkRef,
    offset: ["start end", "end start"],
  });
  const wordmarkY = useTransform(wordmarkProgress, [0, 1], [60, -60]);

  return (
    <footer className="relative overflow-hidden border-t border-[var(--cream)]/10 bg-[var(--ink)] pt-24 pb-8">
      <div className="mx-auto max-w-[1800px] px-5 sm:px-10 lg:px-14">
        {/* manifesto strip + columns */}
        <div className="grid grid-cols-2 gap-12 md:grid-cols-12 md:gap-8">
          <div className="col-span-2 md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="block h-px w-10 bg-[var(--yellow)]" />
              <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--yellow)]">
                Manifesto
              </span>
            </div>
            <p className="mt-5 max-w-md font-display text-2xl leading-[1.15] font-semibold tracking-[-0.02em] text-[var(--cream)] sm:text-[28px]">
              «&nbsp;Tacos urbanos, 100% franceses. Carne jugosa, patatas dentro, quesazo fundido.&nbsp;»
            </p>
            <p className="mt-6 max-w-xs text-sm leading-[1.55] text-[var(--cream)]/55">
              Hecho con cariño en Ciudad Real. Calle Ciruela 28.
            </p>
          </div>

          <FooterCol title="Carta">
            <a className="footer-link" href={site.orderUrl} target="_blank" rel="noopener noreferrer">
              Pedir en Glovo ↗
            </a>
            <a className="footer-link" href="#carta">Ver carta</a>
            <a className="footer-link" href={site.pages.fullMenu} target="_blank" rel="noopener noreferrer">
              Menú completo ↗
            </a>
          </FooterCol>

          <FooterCol title="Local">
            <a className="footer-link" href="#local">Dirección</a>
            <a className="footer-link" href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
            <a className="footer-link" href={`mailto:${site.email}`}>{site.email}</a>
          </FooterCol>

          <FooterCol title="Más">
            <a className="footer-link" href="/story">
              Historia
            </a>
            <a className="footer-link" href={site.socials.instagram} target="_blank" rel="noopener noreferrer">
              Instagram ↗
            </a>
            <a className="footer-link" href={site.pages.faq} target="_blank" rel="noopener noreferrer">
              FAQ ↗
            </a>
          </FooterCol>
        </div>

        {/* OVERSIZED WORDMARK con parallax */}
        <div
          ref={wordmarkRef}
          aria-hidden
          className="relative mt-24 -mb-[6vw] overflow-hidden md:-mb-[5vw]"
        >
          <motion.div
            className="font-display font-bold leading-[0.78] tracking-[-0.05em] text-[var(--cream)]/[0.06] select-none whitespace-nowrap"
            style={{ fontSize: "clamp(5rem, 23vw, 26rem)", y: wordmarkY }}
          >
            CLM·FRENCH·TACOS
          </motion.div>
        </div>

        <div className="relative mt-10 border-t border-[var(--cream)]/10 pt-8">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--cream)]/55">
              CLM French Tacos — © {year} · Ciudad Real
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <MuteToggle />
              <span className="hidden h-3 w-px bg-[var(--cream)]/15 sm:block" />
              <LegalModalTrigger doc="aviso" className="footer-link-mono">
                Aviso legal
              </LegalModalTrigger>
              <LegalModalTrigger doc="privacidad" className="footer-link-mono">
                Privacidad
              </LegalModalTrigger>
              <LegalModalTrigger doc="cookies" className="footer-link-mono">
                Cookies
              </LegalModalTrigger>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--cream)]/40">
                Hecho con cariño y queso fundido.
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link {
          display: block;
          color: rgba(255,248,231,0.75);
          font-size: 0.9rem;
          line-height: 1.85rem;
          transition: color 0.2s ease, transform 0.2s ease;
          text-align: left;
        }
        .footer-link:hover { color: var(--yellow); transform: translateX(2px); }
        .footer-link-mono {
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,248,231,0.55);
          transition: color 0.2s ease;
        }
        .footer-link-mono:hover { color: var(--yellow); }
      `}</style>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="md:col-span-2">
      <div className="mb-3 font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--yellow)]">
        {title}
      </div>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}
