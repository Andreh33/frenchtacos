import Image from "next/image";
import { site } from "@/lib/site";
import { Magnetic } from "@/components/system/Magnetic";

export function Local() {
  return (
    <section id="local" className="relative bg-[var(--ink)] py-[14vh] sm:py-[18vh]">
      <div className="mx-auto max-w-[1800px] px-5 sm:px-10 lg:px-14">
        {/* eyebrow + title */}
        <div className="mb-16 sm:mb-24">
          <div className="flex items-center gap-3">
            <span className="block h-px w-10 bg-[var(--yellow)]" />
            <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--yellow)]">
              / 03 — Local
            </span>
          </div>
          <h2
            className="mt-5 max-w-4xl font-display font-bold tracking-[-0.04em] text-[var(--cream)]"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)", lineHeight: 0.9 }}
          >
            Una calle.<br />
            Una plancha. <span className="italic-editorial text-[var(--orange-glow)]">CLM.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* PHOTO + sticker */}
          <div className="relative lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[5/4]">
              <Image
                src="/images/local/facade.jpg"
                alt="Fachada del local — CLM French Tacos · Ciudad Real (foto representativa)"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
                style={{ filter: "saturate(1.15) contrast(1.1) brightness(0.85) hue-rotate(-10deg)" }}
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-[var(--ink)]/55 via-transparent to-transparent" />
            </div>

            {/* sticker */}
            <div
              className="absolute -bottom-6 -right-3 z-10 -rotate-[7deg] border-2 border-[var(--ink)] bg-[var(--yellow)] px-5 py-2.5 font-mono text-[10px] font-bold tracking-[0.3em] text-[var(--ink)] uppercase shadow-[5px_5px_0_0_rgba(0,0,0,0.5)] sm:px-7 sm:py-3 sm:text-[11px]"
              aria-hidden
            >
              Único local — de momento.
            </div>
          </div>

          {/* INFO CARD */}
          <div className="lg:col-span-5 lg:pl-4">
            <div className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--yellow)]">
              Nº01 · Ciudad Real
            </div>
            <h3
              className="mt-4 font-display font-bold tracking-[-0.035em] text-[var(--cream)]"
              style={{ fontSize: "clamp(1.6rem, 3vw, 3rem)", lineHeight: 1 }}
            >
              {site.location.address}.
            </h3>
            <p className="mt-2 text-[15px] text-[var(--cream)]/65">
              {site.location.postalCode} {site.location.city} · {site.location.region}
            </p>

            <div className="mt-10">
              <div className="mb-4 font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--cream)]/55">
                Horario
              </div>
              <ul className="space-y-3 text-[15px]">
                {site.location.hours.map((h) => (
                  <li
                    key={h.day}
                    className="flex items-baseline justify-between gap-4 border-b border-[var(--cream)]/10 pb-2.5"
                  >
                    <span className="text-[var(--cream)]/90">{h.day}</span>
                    <span className="font-mono text-[12px] tracking-[0.1em] text-[var(--yellow)]">
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-[var(--cream)]/10 pt-6 text-[13px]">
              <a
                href={`tel:${site.phone}`}
                className="group block"
                data-cursor="LLAMAR"
              >
                <div className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--cream)]/55">
                  Llama
                </div>
                <div className="mt-1 font-mono text-[var(--yellow)] transition-colors group-hover:text-[var(--yellow-warm)]">
                  {site.phoneDisplay}
                </div>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="group block"
                data-cursor="ESCRIBIR"
              >
                <div className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--cream)]/55">
                  Escribe
                </div>
                <div className="mt-1 font-mono text-[var(--yellow)] transition-colors group-hover:text-[var(--yellow-warm)]">
                  {site.email}
                </div>
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Magnetic strength={0.22} radius={110}>
                <a
                  href={site.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-fill group inline-flex items-center gap-3 border border-[var(--yellow)] bg-[var(--yellow)] px-7 py-4 font-mono text-[11px] tracking-[0.3em] text-[var(--ink)] uppercase"
                  data-cursor="ABRIR"
                >
                  <span className="relative z-10">Cómo llegar</span>
                  <span className="relative z-10 transition-transform group-hover:translate-x-1">↗</span>
                </a>
              </Magnetic>
              <a
                href={site.orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-[var(--cream)]/40 px-7 py-4 font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--cream)] transition-colors hover:border-[var(--cream)] hover:bg-[var(--cream)]/5"
                data-cursor="PEDIR"
              >
                Pedir en Glovo ↗
              </a>
            </div>
          </div>
        </div>

        {/* MAP — styled with filter */}
        <div className="mt-20 sm:mt-28">
          <div className="mb-4 flex items-center gap-3">
            <span className="block h-px w-6 bg-[var(--cream)]/40" />
            <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--cream)]/55">
              En el mapa
            </span>
          </div>
          <div
            data-map
            className="relative aspect-[16/9] w-full overflow-hidden border border-[var(--cream)]/10 sm:aspect-[21/9]"
            style={{ filter: "invert(0.92) hue-rotate(200deg) saturate(0.9) brightness(0.95)" }}
          >
            <iframe
              title="Mapa CLM French Tacos · Ciudad Real"
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
    </section>
  );
}
