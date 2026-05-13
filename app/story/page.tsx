import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StoryReveal } from "@/components/story/StoryReveal";

export const metadata: Metadata = {
  title: "Historia",
  description:
    "Cómo un tacos francés acabó en Ciudad Real. La historia de CLM French Tacos.",
};

export default function StoryPage() {
  return (
    <>
      <Header />

      {/* INTRO */}
      <section className="relative overflow-hidden bg-[var(--ink)] pt-40 pb-[14vh] sm:pt-48 sm:pb-[20vh]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_30%,rgba(107,47,179,0.18),transparent_60%)]"
        />
        <div className="mx-auto max-w-[1500px] px-5 sm:px-10 lg:px-14">
          <div className="flex items-center gap-3">
            <span className="block h-px w-12 bg-[var(--yellow)]" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[var(--yellow)]">
              Historia · Capítulo único
            </span>
          </div>
          <h1
            className="mt-8 max-w-[1300px] font-display font-bold tracking-[-0.045em] text-[var(--cream)]"
            style={{ fontSize: "clamp(2.8rem, 9vw, 9rem)", lineHeight: 0.9 }}
          >
            Cómo un tacos francés acabó <span className="italic-editorial text-[var(--purple-glow)]">en Ciudad Real.</span>
          </h1>
          <p className="mt-10 max-w-xl text-[15px] leading-[1.6] text-[var(--cream)]/75 sm:text-[17px]">
            No es una receta robada. Tampoco una fusión forzada. Es lo que pasa
            cuando una idea simple — meter dentro del wrap todo lo que ya estaba en el
            plato — viaja 1.500 kilómetros y se instala en una calle manchega.
          </p>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="relative bg-[var(--ink)] py-[12vh] sm:py-[18vh]">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-10 lg:px-14">
          <StoryReveal>
            <blockquote
              className="font-display font-bold tracking-[-0.04em] text-[var(--cream)]"
              style={{ fontSize: "clamp(1.8rem, 4.5vw, 4.5rem)", lineHeight: 1.05 }}
            >
              «&nbsp;En Lyon, en 2007, un puñado de cocineros decidieron que un
              wrap no tenía por qué ser un sándwich aburrido. Le metieron carne,
              patatas, queso fundido, salsas. Cerraron el papel y lo pasaron por
              la <span className="italic-editorial text-[var(--yellow)]">plancha</span>.&nbsp;»
            </blockquote>
          </StoryReveal>
        </div>
      </section>

      {/* CHAPTERS */}
      <Chapter
        num="01"
        title="No es mexicano. No es francés. Es nuestro."
        copy={`El "tacos francés" — siempre en plural, incluso si pides uno — nació en los suburbios industriales de Lyon a mediados de los 2000. Inmigrantes magrebíes, ingenieros del fast food, panaderos curiosos. Una receta sin pedigrí, hecha para llenar barriga después de un turno de fábrica.`}
        side={`En España apenas existe fuera de las grandes capitales. En Ciudad Real, era cuestión de tiempo: aquí no se le tiene miedo al picante ni al queso fundido.`}
      />

      <Chapter
        num="02"
        title="Cómo se hace uno bien."
        copy={`Plancha caliente al máximo. Tortilla blanda, no de maíz. Carne caliente, no fría. Patatas crujientes, no flácidas. Salsa generosa, no escondida. Queso fundido — no espolvoreado — para que actúe de pegamento.`}
        side={`Los cuatro pasos son matemáticos. Saltarse uno arruina el resultado. Por eso en CLM cada tacos se hace al momento, no se prepara con antelación.`}
      />

      <Chapter
        num="03"
        title="La Mancha entra en la ecuación."
        copy={`Queso manchego curado. Chorizo de la zona. Aceite de oliva virgen extra. Pimientos rojos asados. Ingredientes que nunca estuvieron en la receta original, pero que ahora forman parte de la carta sin pedir permiso.`}
        side={`El "Cabra & Miel" no existe en Lyon. El "Spicy" tampoco. Son adaptaciones manchegas, hechas con producto de proximidad.`}
      />

      <Chapter
        num="04"
        title="¿Por qué Ciudad Real?"
        copy={`Porque aquí la noche es larga, los precios son honestos y la gente no necesita que le expliques qué llevas dentro de la plancha. Le das de comer bien y vuelve. Le das una excusa para presumirlo en Instagram y vuelve con sus amigos.`}
        side={`Calle Ojos del Guadiana, 3. No hay segunda planta. No hay terraza. Hay una barra, una plancha, y una carta corta hecha bien.`}
      />

      {/* SIGNATURE QUOTE */}
      <section className="relative bg-[var(--ink)] py-[14vh] sm:py-[22vh]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_50%,rgba(168,85,247,0.18),transparent_60%)]"
        />
        <div className="mx-auto max-w-[1300px] px-5 sm:px-10 lg:px-14">
          <StoryReveal>
            <p
              className="font-display font-bold tracking-[-0.04em] text-[var(--yellow)]"
              style={{ fontSize: "clamp(2rem, 6vw, 6rem)", lineHeight: 1 }}
            >
              «&nbsp;Si te gusta, vuelve. Si no, ya nos veremos por la calle.&nbsp;»
            </p>
            <div className="mt-10 flex items-center justify-end gap-3">
              <span className="block h-px w-12 bg-[var(--cream)]/40" />
              <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--cream)]/70">
                — La cocina de CLM
              </span>
            </div>
          </StoryReveal>
        </div>
      </section>

      {/* CTAs */}
      <section className="relative bg-[var(--ink)] pb-[18vh] sm:pb-[24vh]">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-10 lg:px-14">
          <div className="border-t border-[var(--cream)]/10 pt-12">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--yellow)]">
                  Volver a la calle
                </span>
                <h3
                  className="mt-3 font-display font-bold tracking-[-0.035em] text-[var(--cream)]"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                >
                  La carta sigue caliente.
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/#carta"
                  className="btn-fill group inline-flex items-center gap-3 border border-[var(--yellow)] bg-[var(--yellow)] px-7 py-4 font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--ink)]"
                  data-cursor="VER"
                >
                  <span className="relative z-10">Ver la carta</span>
                  <span className="relative z-10 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 border border-[var(--cream)]/40 px-7 py-4 font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--cream)] transition-colors hover:border-[var(--cream)] hover:bg-[var(--cream)]/5"
                  data-cursor="HOME"
                >
                  Volver al inicio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function Chapter({
  num,
  title,
  copy,
  side,
}: {
  num: string;
  title: string;
  copy: string;
  side: string;
}) {
  return (
    <section className="relative bg-[var(--ink)] py-[10vh] sm:py-[14vh]">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10 lg:px-14">
        <div className="grid grid-cols-12 gap-6 sm:gap-10">
          <StoryReveal className="col-span-12 md:col-span-2">
            <div className="sticky top-32 font-mono text-[10px] tracking-[0.4em] uppercase text-[var(--yellow)]">
              Cap. {num}
            </div>
          </StoryReveal>

          <StoryReveal className="col-span-12 md:col-span-7">
            <h2
              className="font-display font-bold tracking-[-0.035em] text-[var(--cream)]"
              style={{ fontSize: "clamp(1.8rem, 4vw, 4rem)", lineHeight: 0.98 }}
            >
              {title}
            </h2>
            <p className="mt-8 text-[15px] leading-[1.7] text-[var(--cream)]/85 sm:text-[17px]">
              {copy}
            </p>
          </StoryReveal>

          <StoryReveal className="col-span-12 md:col-span-3">
            <p className="border-l-2 border-[var(--yellow)] pl-4 font-mono text-[11px] leading-[1.7] tracking-[0.04em] text-[var(--cream)]/65 sm:text-[12px]">
              {side}
            </p>
          </StoryReveal>
        </div>
      </div>
    </section>
  );
}
