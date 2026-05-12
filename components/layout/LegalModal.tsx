"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { legal, type LegalKey } from "@/lib/legal";

export function LegalModalTrigger({
  doc,
  children,
  className,
}: {
  doc: LegalKey;
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const { title, body } = legal[doc];

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/70 backdrop-blur-md sm:items-center"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto border border-[var(--yellow)] bg-[var(--ink)] p-6 sm:p-10"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--yellow)]">
                    Legal
                  </div>
                  <h2 className="mt-2 font-display text-2xl leading-tight font-bold tracking-[-0.02em] text-[var(--cream)] sm:text-3xl">
                    {title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar"
                  className="grid h-10 w-10 place-items-center border border-[var(--cream)]/25 text-[var(--cream)] transition-colors hover:border-[var(--yellow)] hover:text-[var(--yellow)]"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4 text-sm leading-[1.7] whitespace-pre-line text-[var(--cream)]/85">
                {body}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
