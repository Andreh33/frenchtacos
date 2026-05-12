import { Reveal } from "@/components/system/Reveal";

export function AppTeaser() {
  return (
    <section id="app" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Mockup */}
          <div className="order-2 lg:order-1 lg:col-span-6">
            <div className="relative mx-auto aspect-[9/16] max-w-[320px]">
              {/* Glow */}
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_60%,rgba(255,214,10,0.25),transparent_70%)] blur-2xl"
              />
              {/* phone frame */}
              <div className="relative h-full w-full rounded-[3rem] border-[10px] border-[var(--uft-ink)] bg-[var(--uft-ink)] shadow-[0_30px_80px_-20px_rgba(168,85,247,0.4)]">
                <div className="absolute top-3 left-1/2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
                <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] bg-gradient-to-br from-[var(--uft-purple-deep)] via-[var(--uft-purple)] to-[var(--uft-purple-deep)]">
                  <div className="flex h-full flex-col p-6 pt-12">
                    <div className="font-mono text-[9px] tracking-[0.3em] text-[var(--uft-yellow)] uppercase">
                      Urban · App
                    </div>
                    <div className="mt-2 font-display text-2xl leading-tight font-extrabold text-[var(--uft-cream)]">
                      ¿Qué te apetece <span className="text-[var(--uft-yellow)]">hoy?</span>
                    </div>

                    <div className="mt-6 space-y-3">
                      {[
                        { t: "Tako Clásico", p: "8,90€" },
                        { t: "Smart Combo", p: "9,90€" },
                        { t: "Manchego XL", p: "11,50€" },
                      ].map((i) => (
                        <div
                          key={i.t}
                          className="flex items-center justify-between border border-[var(--uft-cream)]/15 bg-[var(--uft-cream)]/5 px-3 py-2.5 backdrop-blur-sm"
                        >
                          <div>
                            <div className="text-xs font-semibold text-[var(--uft-cream)]">
                              {i.t}
                            </div>
                            <div className="font-mono text-[9px] text-[var(--uft-cream)]/60">
                              Recién hecho
                            </div>
                          </div>
                          <div className="font-mono text-xs font-bold text-[var(--uft-yellow)]">
                            {i.p}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <div className="bg-[var(--uft-yellow)] py-3 text-center font-mono text-[10px] font-bold tracking-[0.25em] text-[var(--uft-purple-deep)] uppercase">
                        Pedir · 30,30€
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="order-1 lg:order-2 lg:col-span-6">
            <Reveal>
              <span className="font-mono text-[10px] tracking-[0.4em] text-[var(--uft-yellow)] uppercase">
                / 05 — Próximamente
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h2
                className="mt-3 font-display font-extrabold tracking-tight text-[var(--uft-cream)]"
                style={{
                  fontSize: "clamp(2.25rem, 6.5vw, 6rem)",
                  lineHeight: 0.9,
                }}
              >
                Tu antojo en el{" "}
                <span className="text-[var(--uft-yellow)]">bolsillo.</span>
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-6 max-w-md text-lg leading-[1.55] text-[var(--uft-cream)]/80">
                Llevamos al pulgar lo que servimos al plato. App para Android, muy pronto.
              </p>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  disabled
                  title="Próximamente"
                  className="inline-flex cursor-not-allowed items-center gap-3 border border-[var(--uft-cream)]/30 bg-[var(--uft-cream)]/5 px-5 py-3 text-left opacity-60"
                >
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-[var(--uft-cream)]">
                    <path
                      fill="currentColor"
                      d="M17.05 20.28c-.98.95-2.05.88-3.08.43c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.43C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.53 4.08M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25"
                    />
                  </svg>
                  <span>
                    <div className="font-mono text-[9px] tracking-[0.25em] text-[var(--uft-cream)]/70 uppercase">
                      Próximamente en
                    </div>
                    <div className="font-display text-base font-bold text-[var(--uft-cream)]">
                      App Store
                    </div>
                  </span>
                </button>
                <button
                  type="button"
                  disabled
                  title="Próximamente"
                  className="inline-flex cursor-not-allowed items-center gap-3 border border-[var(--uft-cream)]/30 bg-[var(--uft-cream)]/5 px-5 py-3 text-left opacity-60"
                >
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-[var(--uft-cream)]">
                    <path
                      fill="currentColor"
                      d="M3 20.5V3.5c0-.41.16-.78.42-1.06l9.93 9.56l-9.93 9.56c-.26-.28-.42-.65-.42-1.06m12-7.45l2.6 2.5l-11.43 6.55l8.83-9.05m0-2.1L6.17 1.9l11.43 6.55l-2.6 2.5M20.78 11.2l-2.5 1.43l-2.85-2.74l2.85-2.74l2.5 1.43c.87.5.87 1.62 0 2.12"
                    />
                  </svg>
                  <span>
                    <div className="font-mono text-[9px] tracking-[0.25em] text-[var(--uft-cream)]/70 uppercase">
                      Próximamente en
                    </div>
                    <div className="font-display text-base font-bold text-[var(--uft-cream)]">
                      Google Play
                    </div>
                  </span>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
