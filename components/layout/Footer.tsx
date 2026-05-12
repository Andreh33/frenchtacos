import { site } from "@/lib/site";
import { LegalModalTrigger } from "./LegalModal";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[var(--cream)]/10 bg-[var(--ink)] pt-24 pb-8">
      <div className="mx-auto max-w-[1800px] px-5 sm:px-10 lg:px-14">
        {/* manifesto strip + columns */}
        <div className="grid grid-cols-2 gap-12 md:grid-cols-12 md:gap-8">
          <div className="col-span-2 md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="block h-px w-10 bg-[var(--yellow)]" />
              <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--yellow)]">
                Manifesto
              </span>
            </div>
            <p className="mt-5 max-w-md font-display text-2xl leading-[1.15] font-semibold tracking-[-0.02em] text-[var(--cream)] sm:text-[28px]">
              «&nbsp;Street food francés con alma manchega. Calle, comal, calidad.&nbsp;»
            </p>
            <p className="mt-6 max-w-xs text-sm leading-[1.55] text-[var(--cream)]/55">
              Hecho con cariño en Valdepeñas. Cada tako sale como si fuera el primero de tu vida.
            </p>
          </div>

          <FooterCol title="Carta">
            <a className="footer-link" href={site.orderUrl} target="_blank" rel="noopener noreferrer">
              Pedir online ↗
            </a>
            <a className="footer-link" href="#carta">Ver carta</a>
            <a className="footer-link" href="#ofertas">Ofertas</a>
          </FooterCol>

          <FooterCol title="Marca">
            <a className="footer-link" href="#local">Local</a>
            <a className="footer-link" href="#franquicia">Franquicia</a>
          </FooterCol>

          <FooterCol title="Redes">
            <a className="footer-link" href={site.socials.instagram} target="_blank" rel="noopener noreferrer">
              Instagram ↗
            </a>
            <a className="footer-link" href={site.socials.facebook} target="_blank" rel="noopener noreferrer">
              Facebook ↗
            </a>
            <a className="footer-link" href={site.location.mapsUrl} target="_blank" rel="noopener noreferrer">
              Cómo llegar ↗
            </a>
          </FooterCol>
        </div>

        {/* OVERSIZED WORDMARK */}
        <div
          aria-hidden
          className="relative mt-24 -mb-[6vw] overflow-hidden md:-mb-[5vw]"
        >
          <div
            className="font-display font-bold leading-[0.78] tracking-[-0.05em] text-[var(--cream)]/[0.06] select-none whitespace-nowrap"
            style={{ fontSize: "clamp(5rem, 23vw, 26rem)" }}
          >
            URBAN·UFT
          </div>
        </div>

        <div className="relative mt-10 border-t border-[var(--cream)]/10 pt-8">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--cream)]/55">
              © {year} Urban French Takos · Valdepeñas
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <LegalModalTrigger doc="aviso" className="footer-link-mono">
                Aviso legal
              </LegalModalTrigger>
              <LegalModalTrigger doc="privacidad" className="footer-link-mono">
                Privacidad
              </LegalModalTrigger>
              <LegalModalTrigger doc="cookies" className="footer-link-mono">
                Cookies
              </LegalModalTrigger>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--cream)]/40">
                Hecho con cariño y queso fundido.
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link {
          display: block;
          color: rgba(255,248,231,0.75);
          font-size: 0.9rem;
          line-height: 1.85rem;
          transition: color 0.2s ease, transform 0.2s ease;
          text-align: left;
        }
        .footer-link:hover { color: var(--yellow); transform: translateX(2px); }
        .footer-link-mono {
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,248,231,0.55);
          transition: color 0.2s ease;
        }
        .footer-link-mono:hover { color: var(--yellow); }
      `}</style>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="md:col-span-2">
      <div className="mb-3 font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--yellow)]">
        {title}
      </div>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}
