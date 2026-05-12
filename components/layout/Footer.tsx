import { site } from "@/lib/site";
import { LegalModalTrigger } from "./LegalModal";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[var(--uft-yellow)]/30 bg-[var(--uft-purple-deep)] pt-24 pb-8">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12 md:gap-8">
          <div className="col-span-2 md:col-span-5">
            <div className="font-mono text-[10px] tracking-[0.3em] text-[var(--uft-yellow)] uppercase">
              Urban French Takos · Manifesto
            </div>
            <p className="mt-4 max-w-md font-display text-2xl leading-tight font-bold text-[var(--uft-cream)] sm:text-3xl">
              «&nbsp;Street food francés con alma manchega. Calle, comal, calidad.&nbsp;»
            </p>
            <p className="mt-6 max-w-sm text-sm leading-[1.6] text-[var(--uft-cream)]/65">
              Hecho con cariño en Valdepeñas. Cada tako sale como si fuera el primero
              de tu vida.
            </p>
          </div>

          <div className="md:col-span-2">
            <FooterCol title="Carta">
              <a className="footer-link" href={site.orderUrl} target="_blank" rel="noopener noreferrer">
                Pedir online
              </a>
              <a className="footer-link" href="#ofertas">
                Ofertas
              </a>
              <a className="footer-link" href="#actualidad">
                Novedades
              </a>
            </FooterCol>
          </div>

          <div className="md:col-span-2">
            <FooterCol title="Marca">
              <a className="footer-link" href="#local">
                Local
              </a>
              <a className="footer-link" href="#franquicia">
                Franquicia
              </a>
              <a className="footer-link" href="#app">
                App
              </a>
            </FooterCol>
          </div>

          <div className="md:col-span-3">
            <FooterCol title="Redes">
              <a
                className="footer-link"
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram ↗
              </a>
              <a
                className="footer-link"
                href={site.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook ↗
              </a>
              <a className="footer-link" href={site.location.mapsUrl} target="_blank" rel="noopener noreferrer">
                Cómo llegar ↗
              </a>
            </FooterCol>
          </div>
        </div>

        {/* Oversized logo */}
        <div
          aria-hidden
          className="relative mt-20 -mb-16 overflow-hidden md:-mb-28"
        >
          <div
            className="font-display font-extrabold leading-[0.78] tracking-tight text-[var(--uft-cream)]/[0.06] select-none"
            style={{ fontSize: "clamp(5rem, 22vw, 22rem)" }}
          >
            URBAN·FRENCH·TAKOS
          </div>
        </div>

        <div className="relative mt-8 border-t border-[var(--uft-cream)]/10 pt-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="font-mono text-[10px] tracking-[0.25em] text-[var(--uft-cream)]/55 uppercase">
              © {year} Urban French Takos · Valdepeñas · Hecho con cariño
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <LegalModalTrigger
                doc="aviso"
                className="footer-link font-mono text-[10px] tracking-[0.25em] uppercase"
              >
                Aviso legal
              </LegalModalTrigger>
              <LegalModalTrigger
                doc="privacidad"
                className="footer-link font-mono text-[10px] tracking-[0.25em] uppercase"
              >
                Privacidad
              </LegalModalTrigger>
              <LegalModalTrigger
                doc="cookies"
                className="footer-link font-mono text-[10px] tracking-[0.25em] uppercase"
              >
                Cookies
              </LegalModalTrigger>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link {
          display: block;
          color: rgba(255,248,231,0.75);
          font-size: 0.875rem;
          line-height: 1.75rem;
          transition: color 0.2s ease, transform 0.2s ease;
          text-align: left;
        }
        .footer-link:hover { color: var(--uft-yellow); transform: translateX(2px); }
      `}</style>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 font-mono text-[10px] tracking-[0.3em] text-[var(--uft-yellow)] uppercase">
        {title}
      </div>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}
