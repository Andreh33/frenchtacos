"use client";

import { useSound } from "./SoundProvider";

export function MuteToggle({ className }: { className?: string }) {
  const { muted, toggle } = useSound();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={muted ? "Activar sonido" : "Silenciar"}
      aria-pressed={!muted}
      className={`group inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--cream)]/55 transition-colors hover:text-[var(--yellow)] ${className ?? ""}`}
      data-cursor={muted ? "ACTIVAR" : "MUTE"}
    >
      <span
        className="relative grid h-4 w-4 place-items-center"
        aria-hidden
      >
        {muted ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-full">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-full">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </span>
      <span>{muted ? "Sonido off" : "Sonido on"}</span>
    </button>
  );
}
