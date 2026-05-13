import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 · Esta página se nos quemó",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-[var(--ink)] px-5 py-24 sm:px-10">
      {/* radial purple wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(107,47,179,0.16),transparent_60%)]"
      />

      {/* burnt yellow stripe */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-0 h-1 bg-[linear-gradient(90deg,transparent_0%,var(--yellow)_20%,#7a4a00_55%,#1a0a00_75%,transparent_100%)] opacity-60"
      />

      <div className="relative mx-auto w-full max-w-[1400px]">
        {/* eyebrow */}
        <div className="flex items-center gap-3">
          <span className="block h-px w-12 bg-[var(--yellow)]" />
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[var(--yellow)]">
            Error 404 · Plancha demasiado caliente
          </span>
        </div>

        {/* burnt 404 + word */}
        <h1
          className="mt-8 font-display font-bold leading-[0.85] tracking-[-0.05em] text-[var(--cream)]"
          style={{ fontSize: "clamp(4rem, 16vw, 17rem)" }}
        >
          <span className="block">SE NOS</span>
          <span
            className="block"
            style={{
              color: "transparent",
              WebkitTextStroke: "2px var(--yellow)",
            }}
          >
            QUEMÓ
          </span>
          <span className="block text-[var(--yellow)]">ESTA PÁGINA.</span>
        </h1>

        <p
          className="mt-10 max-w-md text-[15px] leading-[1.55] text-[var(--cream)]/75 sm:text-[17px]"
        >
          La carta sigue donde la dejamos. La plancha también. Te dejamos volver al
          principio antes de que se enfríe nada.
        </p>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/"
            className="btn-fill group inline-flex items-center gap-3 border border-[var(--yellow)] bg-[var(--yellow)] px-7 py-4 font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--ink)]"
            data-cursor="VOLVER"
          >
            <span className="relative z-10">← Volver al inicio</span>
          </Link>
          <Link
            href="/#carta"
            className="inline-flex items-center gap-3 border border-[var(--cream)]/40 px-7 py-4 font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--cream)] transition-colors hover:border-[var(--cream)] hover:bg-[var(--cream)]/5"
            data-cursor="VER"
          >
            Ver carta directa
          </Link>
        </div>

        {/* tiny signature */}
        <div className="mt-20 flex items-center gap-3 sm:mt-28">
          <span className="block h-px w-10 bg-[var(--cream)]/30" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--cream)]/45">
            — CLM French Tacos · Ciudad Real
          </span>
        </div>
      </div>
    </div>
  );
}
