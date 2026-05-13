import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

export default function StyleguidePage() {
  return (
    <div className="min-h-screen bg-[var(--ink)] text-[var(--cream)]">
      {/* Header strip */}
      <div className="sticky top-0 z-50 border-b border-[var(--cream)]/10 bg-[var(--ink)]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 lg:px-12">
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--yellow)]">
            CLM / Styleguide
          </span>
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--cream)]/60">
            v2 · checkpoint 01
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] space-y-32 px-6 py-24 lg:px-12">
        {/* PALETTE */}
        <Section number="01" title="Paleta" hint="Fondo dominante = ink. Yellow ≤10%, purple ≤30%.">
          <div className="grid grid-cols-2 gap-px bg-[var(--cream)]/10 md:grid-cols-4 lg:grid-cols-7">
            <Swatch name="ink" hex="#0A0612" bg="bg-[var(--ink)]" textOnDark />
            <Swatch name="red-deep" hex="#3D0F0A" bg="bg-[var(--red-deep)]" textOnDark />
            <Swatch name="red" hex="#C71F1F" bg="bg-[var(--red)]" textOnDark />
            <Swatch name="orange" hex="#E5611A" bg="bg-[var(--orange)]" textOnDark />
            <Swatch name="orange-glow" hex="#FF8A3D" bg="bg-[var(--orange-glow)]" textOnDark />
            <Swatch name="yellow" hex="#FFD60A" bg="bg-[var(--yellow)]" />
            <Swatch name="yellow-warm" hex="#FFC300" bg="bg-[var(--yellow-warm)]" />
            <Swatch name="cream" hex="#FFF8E7" bg="bg-[var(--cream)]" />
          </div>
        </Section>

        {/* TYPE */}
        <Section number="02" title="Tipografía" hint="Clash Display (headlines) · General Sans (body) · JetBrains Mono · Playfair Italic (acento).">
          <div className="space-y-12">
            <div>
              <Tag>H1 · Display 700 · clamp(4rem, 12vw, 14rem)</Tag>
              <h1
                className="mt-3 font-display font-bold tracking-[-0.04em] text-[var(--cream)]"
                style={{ fontSize: "clamp(4rem, 12vw, 14rem)", lineHeight: 0.85 }}
              >
                FRENCH <span className="text-[var(--yellow)]">TAKOS</span>
                <br />
                DE LA <span className="italic-editorial text-[var(--orange-glow)]">calle.</span>
              </h1>
            </div>

            <div>
              <Tag>H2 · Display 700 · clamp(2.5rem, 7vw, 7rem)</Tag>
              <h2
                className="mt-3 font-display font-bold tracking-[-0.03em] text-[var(--cream)]"
                style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)", lineHeight: 0.9 }}
              >
                Empezamos en Lyon. Crecimos en{" "}
                <span className="italic-editorial text-[var(--yellow)]">Ciudad Real.</span>
              </h2>
            </div>

            <div>
              <Tag>H3 · Display 600 · clamp(1.75rem, 3vw, 3rem)</Tag>
              <h3
                className="mt-3 font-display font-semibold tracking-[-0.02em] text-[var(--cream)]"
                style={{ fontSize: "clamp(1.75rem, 3vw, 3rem)", lineHeight: 1 }}
              >
                L&apos;Original — pollo, salsa argelina, queso fundido, papas.
              </h3>
            </div>

            <div className="max-w-2xl">
              <Tag>Body · General Sans 400 · 17px · leading 1.55</Tag>
              <p className="mt-3 text-[17px] leading-[1.55] tracking-[-0.005em] text-[var(--cream)]/85">
                Tacos urbanos, 100% franceses. Carne jugosa, patatas dentro, quesazo fundido y
                tus salsas favoritas. Un solo bocado y entiendes por qué es tendencia en toda
                Europa. Servimos en Ciudad Real, recién sacado de la plancha.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <Tag>Mono · JetBrains Mono · 12px · tracking 0.25em</Tag>
                <p className="mt-3 font-mono text-xs tracking-[0.25em] uppercase text-[var(--yellow)]">
                  Nº01 · Ciudad Real · Abierto hasta 00:00
                </p>
              </div>
              <div>
                <Tag>Italic editorial · Playfair · 32px</Tag>
                <p className="italic-editorial mt-3 text-3xl text-[var(--orange-glow)]">
                  « comer la calle »
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* BUTTONS */}
        <Section number="03" title="Botones" hint="Primario amarillo fill desde abajo · secundario outline cream.">
          <div className="flex flex-wrap items-start gap-6">
            <button
              type="button"
              className="btn-fill inline-flex items-center gap-3 border border-[var(--yellow)] bg-[var(--yellow)] px-7 py-4 font-mono text-xs font-medium tracking-[0.25em] text-[var(--ink)] uppercase"
            >
              <span className="relative z-10">Pide ya</span>
              <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-3 border border-[var(--cream)]/40 px-7 py-4 font-mono text-xs font-medium tracking-[0.25em] text-[var(--cream)] uppercase transition-colors hover:border-[var(--cream)] hover:bg-[var(--cream)]/5"
            >
              Ver carta
            </button>

            <button
              type="button"
              className="group inline-flex items-center gap-2 border-b border-[var(--cream)]/40 pb-1 font-mono text-xs tracking-[0.25em] text-[var(--cream)] uppercase transition-colors hover:border-[var(--yellow)] hover:text-[var(--yellow)]"
            >
              Aprovecharla
              <span className="transition-transform group-hover:translate-x-1">↗</span>
            </button>

            <button
              type="button"
              disabled
              className="inline-flex cursor-not-allowed items-center gap-3 border border-[var(--cream)]/20 px-7 py-4 font-mono text-xs tracking-[0.25em] text-[var(--cream)]/40 uppercase"
            >
              Próximamente
            </button>
          </div>
        </Section>

        {/* TAGS / EYEBROWS */}
        <Section number="04" title="Tags & eyebrows" hint="Sólo mono. Sólo uppercase. Tracking generoso.">
          <div className="flex flex-wrap items-center gap-4">
            <span className="border-b border-[var(--yellow)] pb-1 font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--yellow)]">
              / 01 — Carta editorial
            </span>
            <span className="border border-[var(--yellow)]/40 bg-[var(--yellow)]/5 px-3 py-1.5 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--yellow)]">
              Edición Ciudad Real
            </span>
            <span className="bg-[var(--yellow)] px-3 py-1.5 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--ink)]">
              Oferta · Nº01
            </span>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--cream)]/60">
              Nº01 · Ciudad Real
            </span>
          </div>
        </Section>

        {/* MARQUEE */}
        <Section number="05" title="Marquee" hint="Loop infinito · 40s · sin pausa.">
          <div className="overflow-hidden border-y border-[var(--yellow)]/40 py-5">
            <div className="marquee-track flex w-max items-center gap-12">
              {Array.from({ length: 3 }).flatMap((_, k) =>
                [
                  "ABIERTO HASTA LAS 00:00",
                  "MARTES 2×1",
                  "NUEVO SABOR",
                  "SÍGUENOS @CLMFRENCHTACOS",
                  "Nº01 · CIUDAD REAL",
                ].map((t, i) => (
                  <span
                    key={`${k}-${i}`}
                    className="flex shrink-0 items-center gap-12 font-display text-3xl font-bold tracking-[-0.02em] text-[var(--yellow)] sm:text-5xl"
                  >
                    {t}
                    <span className="text-[var(--yellow)]/40" aria-hidden>
                      ✦
                    </span>
                  </span>
                ))
              )}
            </div>
          </div>
        </Section>

        {/* REVEAL DEMO */}
        <Section number="06" title="Reveal clip-path" hint="Inserta clase .is-in al entrar en viewport. Demo con hover.">
          <div className="group inline-block">
            <div className="reveal-line group-hover:is-in [.group:hover_&]:[clip-path:inset(0)] [.group:hover_&]:translate-y-0 [.group:hover_&]:opacity-100">
              <h3 className="font-display text-5xl font-bold tracking-[-0.03em] text-[var(--cream)]">
                Pasa el cursor sobre este bloque
              </h3>
            </div>
            <p className="mt-2 font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--cream)]/50">
              (la animación real ocurre en scroll)
            </p>
          </div>
        </Section>

        {/* SAMPLE BLOCK */}
        <Section number="07" title="Bloque editorial — muestra de composición" hint="Asimetría intencionada · texto + dato grande.">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-7">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--yellow)]">
                / Muestra
              </span>
              <h3
                className="mt-3 font-display font-bold tracking-[-0.03em] text-[var(--cream)]"
                style={{ fontSize: "clamp(2rem, 4vw, 4rem)", lineHeight: 0.95 }}
              >
                Le Manchego.{" "}
                <span className="italic-editorial text-[var(--orange-glow)]">Lyon × La Mancha.</span>
              </h3>
              <p className="mt-6 max-w-md text-[17px] leading-[1.55] text-[var(--cream)]/80">
                Chorizo, queso manchego curado, alioli ahumado, jalapeño. Salsa picante de la casa.
              </p>
            </div>
            <div className="col-span-12 md:col-span-5 md:pl-12">
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--cream)]/55">
                Precio
              </div>
              <div
                className="mt-2 font-display font-bold tracking-[-0.06em] text-[var(--yellow)]"
                style={{ fontSize: "clamp(5rem, 12vw, 12rem)", lineHeight: 0.85 }}
              >
                11
                <span className="text-2xl align-top text-[var(--yellow)]">,50€</span>
              </div>
              <div className="mt-3 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--cream)]/55">
                Nº03 / 04
              </div>
            </div>
          </div>
        </Section>

        {/* CONTRAST PROOF */}
        <Section number="08" title="Proporciones cromáticas" hint="Demuestro la regla: ink dominante, yellow ≤10%, purple ≤30%.">
          <div className="grid h-[260px] grid-cols-12 grid-rows-6 gap-1">
            <div className="col-span-12 row-span-6 bg-[var(--ink)] outline outline-[var(--cream)]/15 grid place-items-center">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--cream)]/60">
                INK · ~60% — fondo principal
              </span>
            </div>
          </div>
          <div className="mt-1 grid grid-cols-12 gap-1">
            <div className="col-span-4 h-16 bg-[var(--red-deep)] grid place-items-center">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--cream)]/80">
                Purple-deep ~18%
              </span>
            </div>
            <div className="col-span-3 h-16 bg-[var(--orange)] grid place-items-center">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--cream)]">
                Purple ~10%
              </span>
            </div>
            <div className="col-span-1 h-16 bg-[var(--yellow)] grid place-items-center">
              <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--ink)]">
                Y
              </span>
            </div>
            <div className="col-span-4 h-16 bg-[var(--cream)]/10 outline outline-[var(--cream)]/15 grid place-items-center">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--cream)]/70">
                Cream texto
              </span>
            </div>
          </div>
        </Section>
      </div>

      <footer className="border-t border-[var(--cream)]/10 px-6 py-10 lg:px-12">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--cream)]/40">
            Fin del styleguide
          </span>
          <a
            href="/"
            className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--yellow)] underline-offset-4 hover:underline"
          >
            ← Volver al inicio
          </a>
        </div>
      </footer>
    </div>
  );
}

function Section({
  number,
  title,
  hint,
  children,
}: {
  number: string;
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-10 flex flex-col items-start justify-between gap-2 border-b border-[var(--cream)]/10 pb-4 md:flex-row md:items-end">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--yellow)]">
            / {number}
          </span>
          <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-[var(--cream)] md:text-3xl">
            {title}
          </h2>
        </div>
        <p className="max-w-md font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--cream)]/55">
          {hint}
        </p>
      </div>
      {children}
    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--cream)]/50">
      {children}
    </span>
  );
}

function Swatch({
  name,
  hex,
  bg,
  textOnDark,
}: {
  name: string;
  hex: string;
  bg: string;
  textOnDark?: boolean;
}) {
  return (
    <div className={`${bg} relative aspect-square p-4`}>
      <div
        className={`flex h-full flex-col justify-between font-mono text-[10px] tracking-[0.2em] uppercase ${
          textOnDark ? "text-[var(--cream)]/85" : "text-[var(--ink)]"
        }`}
      >
        <span>{name}</span>
        <span className={textOnDark ? "text-[var(--cream)]/55" : "text-[var(--ink)]/65"}>{hex}</span>
      </div>
    </div>
  );
}
