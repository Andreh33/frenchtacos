import { site } from "@/lib/site";
import { Reveal } from "@/components/system/Reveal";

export function Location() {
  return (
    <section id="local" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="mb-12 max-w-4xl sm:mb-16">
          <Reveal>
            <span className="font-mono text-[10px] tracking-[0.4em] text-[var(--uft-yellow)] uppercase">
              / 03 — Nuestros restaurantes
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
              Un local. Una calle. <span className="text-[var(--uft-yellow)]">Un comal.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="relative lg:col-span-5">
            <div className="relative border-2 border-[var(--uft-yellow)]/60 bg-[var(--uft-purple)]/30 p-6 backdrop-blur-sm sm:p-8">
              {/* sticker */}
              <div
                aria-hidden
                className="absolute -top-5 -right-3 z-10 -rotate-[8deg] border-2 border-[var(--uft-purple-deep)] bg-[var(--uft-yellow)] px-4 py-1.5 font-mono text-[10px] font-bold tracking-[0.25em] text-[var(--uft-purple-deep)] uppercase shadow-[3px_3px_0_0_rgba(0,0,0,0.4)]"
              >
                Único local
              </div>

              <div className="font-mono text-[10px] tracking-[0.3em] text-[var(--uft-yellow)] uppercase">
                Nº01 · Valdepeñas
              </div>

              <h3 className="mt-3 font-display text-3xl leading-[0.95] font-extrabold tracking-tight text-[var(--uft-cream)] sm:text-4xl">
                {site.location.address}
              </h3>
              <p className="mt-1 font-sans text-base text-[var(--uft-cream)]/75">
                {site.location.postalCode} {site.location.city} · {site.location.region}
              </p>

              <div className="mt-8">
                <div className="mb-3 font-mono text-[10px] tracking-[0.3em] text-[var(--uft-cream)]/60 uppercase">
                  Horario
                </div>
                <ul className="space-y-2 text-sm">
                  {site.location.hours.map((h) => (
                    <li
                      key={h.day}
                      className="flex items-baseline justify-between gap-4 border-b border-[var(--uft-cream)]/10 pb-2 last:border-b-0"
                    >
                      <span className="text-[var(--uft-cream)]/90">{h.day}</span>
                      <span className="font-mono text-xs text-[var(--uft-yellow)]">
                        {h.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={site.location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fill group mt-8 inline-flex w-full items-center justify-center gap-2 border border-[var(--uft-yellow)] bg-[var(--uft-yellow)] px-6 py-4 font-mono text-xs font-bold tracking-widest text-[var(--uft-purple-deep)] uppercase"
                data-cursor="ABRIR"
              >
                <span className="relative z-10">Cómo llegar</span>
                <span className="relative z-10 transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div
              className="relative aspect-[4/3] w-full overflow-hidden border border-white/10 lg:aspect-auto lg:h-full lg:min-h-[480px]"
              style={{
                filter: "invert(0.92) hue-rotate(200deg) saturate(0.85) brightness(0.95)",
              }}
            >
              <iframe
                title="Mapa Urban French Takos Valdepeñas"
                src={site.location.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
