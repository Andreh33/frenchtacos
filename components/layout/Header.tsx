"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-[background,backdrop-filter,border-color] duration-300",
          scrolled
            ? "border-b border-[var(--cream)]/8 bg-[var(--ink)]/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-14 max-w-[1800px] items-center justify-between px-5 sm:h-16 sm:px-8 lg:px-12">
          <Link
            href="/"
            aria-label="Urban French Takos — inicio"
            className="group flex items-center gap-2.5 font-display text-[15px] font-semibold tracking-[-0.02em] text-[var(--cream)]"
          >
            <span className="block h-1.5 w-1.5 rounded-full bg-[var(--yellow)] transition-transform duration-300 group-hover:scale-150" />
            URBAN·UFT
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {site.nav.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative font-mono text-[11px] tracking-[0.25em] uppercase text-[var(--cream)]/80 transition-colors hover:text-[var(--yellow)]"
                data-cursor="VER"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-[var(--yellow)] transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={site.orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fill hidden items-center gap-2 border border-[var(--yellow)] bg-[var(--yellow)] px-5 py-2.5 font-mono text-[11px] tracking-[0.25em] text-[var(--ink)] uppercase sm:inline-flex"
              data-cursor="PEDIR"
            >
              <span className="relative z-10">Pide ya</span>
              <span className="relative z-10">→</span>
            </a>
            <button
              type="button"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative grid h-10 w-10 place-items-center text-[var(--cream)] lg:hidden"
            >
              <span
                className={cn(
                  "absolute h-px w-5 bg-current transition-all duration-300",
                  open ? "rotate-45" : "-translate-y-1.5"
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-5 bg-current transition-all duration-300",
                  open ? "-rotate-45" : "translate-y-1.5"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] flex flex-col bg-[var(--ink)] lg:hidden"
          >
            <div className="h-14 sm:h-16" aria-hidden />
            <nav className="flex flex-1 flex-col justify-center gap-1 px-6 pb-16">
              {site.nav.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    delay: 0.05 + i * 0.06,
                    duration: 0.55,
                    ease: [0.65, 0, 0.35, 1],
                  }}
                  className="group border-b border-[var(--cream)]/10"
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-5 font-display text-4xl font-bold tracking-[-0.03em] text-[var(--cream)] transition-colors group-hover:text-[var(--yellow)] sm:text-5xl"
                  >
                    <span>{l.label}</span>
                    <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--yellow)]/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </a>
                </motion.div>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                href={site.orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-10 inline-flex items-center justify-center gap-2 bg-[var(--yellow)] px-6 py-5 font-mono text-xs tracking-[0.3em] text-[var(--ink)] uppercase"
              >
                Pide ya →
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
