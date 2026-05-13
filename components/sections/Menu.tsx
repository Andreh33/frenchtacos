"use client";

import { categories } from "@/lib/menu";
import { site } from "@/lib/site";
import { HorizontalCategory } from "@/components/menu/HorizontalCategory";
import { CategorySeparator } from "@/components/menu/CategorySeparator";

export function Menu() {
  return (
    <div id="carta">
      {categories.map((cat, i) => {
        const next = categories[i + 1];
        return (
          <div key={cat.slug}>
            <HorizontalCategory
              num={cat.num}
              title={cat.title}
              eyebrow={cat.eyebrow}
              products={cat.products}
            />
            {next ? (
              <CategorySeparator
                number={next.num}
                nextTitle={next.title.toUpperCase()}
                nextEyebrow={next.eyebrow}
              />
            ) : null}
          </div>
        );
      })}

      {/* Teaser: hay más categorías sin productos visibles aún */}
      <section className="relative bg-[var(--ink)] py-[16vh] sm:py-[22vh]">
        <div className="mx-auto max-w-[1800px] px-5 sm:px-10 lg:px-14">
          <div className="flex items-center gap-3">
            <span className="block h-px w-10 bg-[var(--yellow)]" />
            <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--yellow)]">
              + Esto es sólo el aperitivo
            </span>
          </div>
          <h3
            className="mt-6 max-w-4xl font-display font-bold tracking-[-0.04em] text-[var(--cream)]"
            style={{ fontSize: "clamp(2rem, 5.5vw, 5rem)", lineHeight: 0.95 }}
          >
            También hay <span className="italic-editorial text-[var(--purple-glow)]">Sándwiches</span>,{" "}
            <span className="italic-editorial text-[var(--purple-glow)]">Nuggets & Tenders</span>,{" "}
            Patatas y <span className="italic-editorial text-[var(--purple-glow)]">Menú Kids</span>.
          </h3>
          <p className="mt-6 max-w-md text-[15px] leading-[1.55] text-[var(--cream)]/70 sm:text-[17px]">
            La carta completa está en la web oficial — actualizada al día y con todas las variantes.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={site.pages.fullMenu}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fill group inline-flex items-center gap-3 border border-[var(--yellow)] bg-[var(--yellow)] px-7 py-4 font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--ink)]"
              data-cursor="VER"
            >
              <span className="relative z-10">Ver carta completa</span>
              <span className="relative z-10 transition-transform group-hover:translate-x-1">↗</span>
            </a>
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
      </section>
    </div>
  );
}
