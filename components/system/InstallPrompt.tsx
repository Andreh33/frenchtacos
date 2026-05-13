"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function InstallPrompt() {
  const [evt, setEvt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [iosVisible, setIosVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("clm_install_dismissed") === "1") return;

    // Already installed
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const standalone = window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone;
    if (standalone) return;

    const isMobile = window.matchMedia("(max-width: 767.98px)").matches;
    if (!isMobile) return;

    // iOS Safari doesn't fire beforeinstallprompt — detect & show fallback
    const isIos =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !/MSStream/.test(navigator.userAgent);

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setEvt(e as BeforeInstallPromptEvent);
      window.setTimeout(() => setVisible(true), 30_000);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);

    if (isIos) {
      window.setTimeout(() => setIosVisible(true), 30_000);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
    };
  }, []);

  const accept = async () => {
    if (!evt) return;
    await evt.prompt();
    setEvt(null);
    setVisible(false);
    localStorage.setItem("clm_install_dismissed", "1");
  };
  const dismiss = () => {
    setVisible(false);
    setIosVisible(false);
    localStorage.setItem("clm_install_dismissed", "1");
  };

  return (
    <AnimatePresence>
      {(visible || iosVisible) && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-x-4 bottom-4 z-[8500] mx-auto max-w-md border border-[var(--yellow)]/30 bg-[var(--ink)]/95 p-4 backdrop-blur-xl md:hidden"
          role="dialog"
          aria-label="Instalar app"
        >
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 bg-[var(--yellow)]" />
            <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--yellow)]">
              Instalar app
            </span>
          </div>
          <p className="mt-3 font-display text-base font-bold leading-[1.15] tracking-[-0.025em] text-[var(--cream)]">
            CLM en tu pantalla de inicio.
          </p>
          {iosVisible ? (
            <p className="mt-2 text-[12px] leading-[1.5] text-[var(--cream)]/70">
              Pulsa <strong className="text-[var(--cream)]">Compartir</strong> y luego{" "}
              <strong className="text-[var(--cream)]">Añadir a pantalla de inicio</strong>.
            </p>
          ) : (
            <p className="mt-2 text-[12px] leading-[1.5] text-[var(--cream)]/70">
              Acceso directo sin abrir el navegador. Pesa lo que un sticker.
            </p>
          )}
          <div className="mt-4 flex gap-2">
            {evt && (
              <button
                type="button"
                onClick={accept}
                className="btn-fill flex-1 border border-[var(--yellow)] bg-[var(--yellow)] px-4 py-2.5 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--ink)]"
              >
                <span className="relative z-10">Instalar</span>
              </button>
            )}
            <button
              type="button"
              onClick={dismiss}
              className="flex-1 border border-[var(--cream)]/25 px-4 py-2.5 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--cream)]/65"
            >
              No, gracias
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
