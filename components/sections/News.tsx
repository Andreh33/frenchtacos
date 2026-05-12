"use client";

import { news } from "@/lib/content";
import { Reveal } from "@/components/system/Reveal";

const MARQUEE_ITEMS = [
  "NUEVO SABOR",
  "SÍGUENOS EN INSTAGRAM",
  "MARTES 2×1",
  "SMART TAKOS DESDE 9,90€",
  "EDICIÓN MANCHEGA",
  "RECIÉN SACADO DEL COMAL",
];

const sizeMap: Record<string, string> = {
  lg: "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto md:min-h-[520px]",
  md: "md:col-span-1 md:row-span-1 aspect-[4/5]",
  sm: "md:col-span-1 md:row-span-1 aspect-square",
  wide: "md:col-span-2 md:row-span-1 aspect-[16/9] md:aspect-auto md:min-h-[260px]",
};

const gradients = [
  "from-[#6B2FB3] via-[#3A1A5C] to-[#2A0F3D]",
  "from-[#FFD60A]/30 via-[#6B2FB3]/40 to-[#2A0F3D]",
  "from-[#A855F7]/40 via-[#6B2FB3] to-[#2A0F3D]",
  "from-[#FFC300]/25 via-[#3A1A5C] to-[#2A0F3D]",
];

export function News() {
  return (
    <section id="actualidad" className="relative py-24 sm:py-32">
      {/* Marquee */}
      <div className="mb-16 overflow-hidden border-y border-[var(--uft-yellow)]/40 py-4 sm:mb-20 sm:py-5">
        <div className="marquee-track flex w-max items-center gap-12">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((t, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-12 font-display text-3xl font-extrabold tracking-tight text-[var(--uft-yellow)] sm:text-5xl"
            >
              {t}
              <span className="text-[var(--uft-yellow)]/40" aria-hidden>
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="mb-12 max-w-4xl sm:mb-16">
          <Reveal>
            <span className="font-mono text-[10px] tracking-[0.4em] text-[var(--uft-yellow)] uppercase">
              / 02 — Actualidad
            </span>
          </Reveal>
          <Reveal delay={120}>
            <h2
              className="mt-3 font-display font-extrabold tracking-tight text-[var(--uft-cream)]"
              style={{
                fontSize: "clamp(2.25rem, 6vw, 5.5rem)",
                lineHeight: 0.92,
              }}
            >
              La actualidad se{" "}
              <em className="not-italic text-[var(--uft-yellow)]">saborea</em>{" "}
              también en Urban.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[260px]">
          {news.map((n, i) => (
            <div
              key={n.id}
              className={`group relative overflow-hidden border border-white/10 ${sizeMap[n.size]}`}
              data-cursor="VER"
            >
              <div
                aria-hidden
                className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]} transition-transform duration-700 group-hover:scale-105`}
              />
              {/* big number */}
              <div
                aria-hidden
                className="absolute -top-4 -right-4 font-display text-[12rem] leading-none font-extrabold text-white/5"
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* overlay reveal */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                <div className="translate-y-3 transform transition-transform duration-500 group-hover:translate-y-0">
                  <div className="mb-2 inline-block bg-[var(--uft-yellow)] px-2 py-0.5 font-mono text-[9px] font-bold tracking-[0.3em] text-[var(--uft-purple-deep)] uppercase">
                    Nuevo
                  </div>
                  <h3 className="font-display text-xl leading-tight font-bold tracking-tight text-[var(--uft-cream)] sm:text-2xl">
                    {n.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-snug text-[var(--uft-cream)]/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {n.caption}
                  </p>
                </div>
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[var(--uft-purple-deep)]/0 transition-colors duration-500 group-hover:bg-[var(--uft-purple-deep)]/30"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
