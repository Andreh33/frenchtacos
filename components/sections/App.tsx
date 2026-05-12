export function AppTeaser() {
  return (
    <section id="app" className="relative bg-[var(--ink)] py-[14vh] sm:py-[18vh]">
      <div className="mx-auto max-w-[1800px] px-5 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Phone wireframe */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="relative mx-auto aspect-[9/16] max-w-[300px]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-[-15%] -z-10 bg-[radial-gradient(circle_at_50%_60%,rgba(255,214,10,0.18),transparent_60%)] blur-3xl"
              />
              <div className="relative h-full w-full rounded-[2.6rem] border-[9px] border-[var(--cream)]/10 bg-[var(--ink)] p-3">
                <div className="absolute top-2 left-1/2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-[var(--cream)]/8" />
                <div className="relative h-full w-full overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-[var(--purple-deep)] via-[#1a0a2e] to-[var(--ink)] p-5 pt-10">
                  <div className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--yellow)]">
                    Urban · App
                  </div>
                  <div
                    className="mt-2 font-display font-bold leading-[1] tracking-[-0.025em] text-[var(--cream)]"
                    style={{ fontSize: "1.7rem" }}
                  >
                    ¿Qué te apetece <span className="text-[var(--yellow)]">hoy?</span>
                  </div>

                  <div className="mt-6 space-y-2.5">
                    {[
                      { t: "L'Original", p: "9,90€" },
                      { t: "Le Boucher", p: "11,50€" },
                      { t: "El Manchego", p: "10,90€" },
                    ].map((i) => (
                      <div
                        key={i.t}
                        className="flex items-center justify-between border border-[var(--cream)]/12 bg-[var(--cream)]/4 px-3 py-2"
                      >
                        <div>
                          <div className="text-[11px] font-semibold tracking-[-0.01em] text-[var(--cream)]">
                            {i.t}
                          </div>
                          <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-[var(--cream)]/55">
                            Recién hecho
                          </div>
                        </div>
                        <div className="font-mono text-[10px] font-bold text-[var(--yellow)]">
                          {i.p}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="absolute right-3 bottom-3 left-3">
                    <div className="bg-[var(--yellow)] py-2.5 text-center font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--ink)]">
                      Pedir · 32,30€
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="block h-px w-10 bg-[var(--yellow)]" />
              <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--yellow)]">
                / 05 — Próximamente
              </span>
            </div>
            <h2
              className="mt-5 font-display font-bold tracking-[-0.04em] text-[var(--cream)]"
              style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)", lineHeight: 0.9 }}
            >
              Pronto en tu <span className="italic-editorial text-[var(--purple-glow)]">bolsillo.</span>
            </h2>
            <p className="mt-8 max-w-md text-[15px] leading-[1.55] text-[var(--cream)]/75 sm:text-[17px]">
              App Android en desarrollo. Llevamos al pulgar lo que servimos al plato.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-3">
              <DisabledStoreButton store="App Store" />
              <DisabledStoreButton store="Google Play" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DisabledStoreButton({ store }: { store: string }) {
  return (
    <button
      type="button"
      disabled
      title="Próximamente"
      className="inline-flex cursor-not-allowed items-center gap-3 border border-[var(--cream)]/25 px-5 py-3 text-left opacity-40"
      aria-disabled
    >
      <span>
        <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-[var(--cream)]/70">
          Próximamente en
        </div>
        <div className="font-display text-base font-bold tracking-[-0.02em] text-[var(--cream)]">
          {store}
        </div>
      </span>
    </button>
  );
}
