"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Magnetic } from "@/components/system/Magnetic";
import { LocaleSwitcher } from "@/components/system/LocaleSwitcher";
import { useLocale } from "@/components/system/LocaleProvider";
import { ThemeToggle } from "@/components/system/ThemeToggle";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
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
      {/* DYNAMIC ISLAND — pill flotante centrada */}
      <header
        className={cn(
          "fixed inset-x-0 top-3 z-[80] flex justify-center px-3 transition-[top] duration-300 sm:top-5"
        )}
      >
        <motion.div
          initial={{ y: -50, opacity: 0, scale: 0.94 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
          className={cn(
            "pointer-events-auto flex items-center gap-1 rounded-full border bg-[var(--ink)]/85 backdrop-blur-xl transition-all duration-500",
            scrolled
              ? "border-[var(--cream)]/12 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
              : "border-[var(--cream)]/10 shadow-[0_6px_24px_rgba(0,0,0,0.25)]"
          )}
        >
          {/* LOGO (left entry from left) */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.45, ease: [0.65, 0, 0.35, 1] }}
          >
            <Link
              href="/"
              aria-label="CLM French Tacos — inicio"
              className="group flex items-center gap-2 py-2.5 pr-2 pl-4 font-display text-[13px] font-semibold tracking-[-0.02em] text-[var(--cream)] sm:py-2.5 sm:pl-5 sm:text-[14px]"
              data-cursor="HOME"
            >
              <span className="block h-1.5 w-1.5 rounded-full bg-[var(--yellow)] transition-transform duration-300 group-hover:scale-150" />
              <span className="hidden sm:inline">CLM·FRENCH·TACOS</span>
              <span className="sm:hidden">CLM</span>
            </Link>
          </motion.div>

          {/* NAV LINKS — center, entry from sides */}
          <nav className="hidden items-center gap-1 px-1 lg:flex">
            {site.nav.map((l, i) => {
              const isExternal = "external" in l && l.external;
              // first half enters from left, second half from right
              const fromLeft = i < site.nav.length / 2;
              return (
                <motion.a
                  key={l.href}
                  initial={{ x: fromLeft ? -40 : 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.55 + i * 0.08,
                    ease: [0.65, 0, 0.35, 1],
                  }}
                  href={l.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="group relative px-3.5 py-2 font-mono text-[10.5px] tracking-[0.25em] uppercase text-[var(--cream)]/85 transition-colors hover:text-[var(--yellow)]"
                  data-cursor="VER"
                >
                  {l.label}
                  {/* SVG path underline animado */}
                  <svg
                    aria-hidden
                    viewBox="0 0 60 6"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute right-3.5 bottom-1 left-3.5 h-1 w-[calc(100%-1.75rem)]"
                  >
                    <path
                      d="M1 3 C 15 1, 45 5, 59 3"
                      stroke="var(--yellow)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      fill="none"
                      pathLength={1}
                      style={{
                        strokeDasharray: 1,
                        strokeDashoffset: 1,
                        transition:
                          "stroke-dashoffset 0.45s cubic-bezier(0.65,0,0.35,1)",
                      }}
                      className="group-hover:[stroke-dashoffset:0]"
                    />
                  </svg>
                </motion.a>
              );
            })}
          </nav>

          {/* LANG SWITCHER + THEME TOGGLE */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
            className="hidden items-center gap-2 sm:flex"
          >
            <LocaleSwitcher />
            <span className="block h-4 w-px bg-[var(--cream)]/15" aria-hidden />
            <ThemeToggle />
          </motion.div>

          {/* CTA (right entry from right) */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.45, ease: [0.65, 0, 0.35, 1] }}
            className="flex items-center"
          >
            <MagneticCTA />
            <button
              type="button"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative grid h-10 w-10 place-items-center text-[var(--cream)] lg:hidden"
            >
              <span
                className={cn(
                  "absolute h-px w-4 bg-current transition-all duration-300",
                  open ? "rotate-45" : "-translate-y-1"
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-4 bg-current transition-all duration-300",
                  open ? "-rotate-45" : "translate-y-1"
                )}
              />
            </button>
          </motion.div>
        </motion.div>
      </header>

      {/* MOBILE DRAWER */}
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
            <div className="h-20" aria-hidden />
            <nav className="flex flex-1 flex-col justify-center gap-1 px-6 pb-16">
              {site.nav.map((l, i) => {
                const isExternal = "external" in l && l.external;
                return (
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
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-5 font-display text-4xl font-bold tracking-[-0.03em] text-[var(--cream)] transition-colors group-hover:text-[var(--yellow)] sm:text-5xl"
                    >
                      <span>{l.label}</span>
                      <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--yellow)]/80">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </a>
                  </motion.div>
                );
              })}
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

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-10 flex items-center justify-between border-t border-[var(--cream)]/10 pt-5"
              >
                <LocaleSwitcher />
                <ThemeToggle />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MagneticCTA() {
  const { t } = useLocale();
  return (
    <Magnetic strength={0.3} radius={60}>
      <a
        href={site.orderUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-fill hidden items-center gap-1.5 rounded-full border border-[var(--yellow)] bg-[var(--yellow)] px-4 py-2 font-mono text-[10.5px] tracking-[0.25em] text-[var(--ink)] uppercase sm:inline-flex sm:px-5 sm:py-2.5"
        data-cursor="PEDIR"
      >
        <span className="relative z-10">{t.navOrder}</span>
        <span className="relative z-10">→</span>
      </a>
    </Magnetic>
  );
}
