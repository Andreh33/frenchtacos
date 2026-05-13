"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/site";
import { getStatus, formatDuration, type OpenStatus } from "@/lib/openHours";
import { haversineMeters, formatDistance } from "@/lib/geo";

type OpenInfo = Extract<OpenStatus, { open: true }>;
type ClosedInfo = Extract<OpenStatus, { open: false }>;

type Variant =
  | { kind: "near"; meters: number }
  | { kind: "open"; status: OpenInfo }
  | { kind: "closed"; status: ClosedInfo }
  | { kind: "fr" }
  | { kind: "en" }
  | null;

const NEAR_RADIUS = 500; // metres
const AUTO_HIDE_MS = 11_000;

export function GeoAware() {
  const [hidden, setHidden] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [denied, setDenied] = useState(false);

  // Hydrate date client-side only (avoid SSR mismatch)
  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  // Auto-hide after delay (collapse to tiny chip)
  useEffect(() => {
    if (hidden || collapsed) return;
    const t = window.setTimeout(() => setCollapsed(true), AUTO_HIDE_MS);
    return () => window.clearTimeout(t);
  }, [hidden, collapsed]);

  const lang = useMemo(() => {
    if (typeof navigator === "undefined") return "es";
    return navigator.language?.slice(0, 2).toLowerCase() ?? "es";
  }, []);

  const variant: Variant = useMemo(() => {
    if (!now) return null;
    // Priority 1: explicit distance via geolocation
    if (coords) {
      const m = haversineMeters(coords.lat, coords.lng, site.location.lat, site.location.lng);
      if (m < NEAR_RADIUS) return { kind: "near", meters: m };
    }
    // Priority 2: foreign visitor (FR or EN)
    if (lang === "fr") return { kind: "fr" };
    if (lang === "en") return { kind: "en" };
    // Priority 3: open/closed status
    const status = getStatus(now);
    if (status.open) {
      return { kind: "open", status };
    }
    return { kind: "closed", status };
  }, [now, coords, lang]);

  if (!now || hidden || !variant) return null;

  const askLocation = () => {
    if (locating) return;
    if (!("geolocation" in navigator)) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
        setCollapsed(false);
      },
      () => {
        setDenied(true);
        setLocating(false);
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60_000 }
    );
  };

  const content = renderContent(variant, locating, denied, askLocation);

  return (
    <AnimatePresence>
      <motion.div
        key={collapsed ? "chip" : "full"}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
        className="pointer-events-auto fixed bottom-5 left-5 z-[8000] max-w-sm sm:bottom-6 sm:left-6"
      >
        {collapsed ? (
          <button
            type="button"
            onClick={() => setCollapsed(false)}
            className="group flex items-center gap-2 border border-[var(--yellow)]/40 bg-[var(--ink)]/85 px-3 py-1.5 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--yellow)] backdrop-blur-md transition-colors hover:bg-[var(--ink)]"
            aria-label="Mostrar estado del local"
            data-cursor="VER"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--yellow)] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--yellow)]" />
            </span>
            <span>{shortBadge(variant)}</span>
          </button>
        ) : (
          <div className="relative border border-[var(--yellow)]/40 bg-[var(--ink)]/90 p-4 backdrop-blur-md sm:p-5">
            <button
              type="button"
              onClick={() => setHidden(true)}
              aria-label="Cerrar"
              className="absolute top-2 right-2 grid h-6 w-6 place-items-center text-[var(--cream)]/45 transition-colors hover:text-[var(--yellow)]"
            >
              ✕
            </button>
            {content}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function shortBadge(v: Variant): string {
  if (!v) return "";
  if (v.kind === "near") return `A ${formatDistance(v.meters)}`;
  if (v.kind === "fr") return "Bienvenue";
  if (v.kind === "en") return "Welcome";
  if (v.kind === "open") return `Abierto · cierra en ${formatDuration(v.status.closesIn)}`;
  return `Cerrado · abre en ${formatDuration(v.status.opensIn)}`;
}

function renderContent(
  v: NonNullable<Variant>,
  locating: boolean,
  denied: boolean,
  askLocation: () => void
) {
  switch (v.kind) {
    case "near":
      return (
        <Body
          eyebrow={`📍 Estás a ${formatDistance(v.meters)} del local`}
          title="Te conviene venir."
          copy="Mismo precio que Glovo, sin comisiones, recién sacado de la plancha."
          ctas={[
            { label: "Cómo llegar ↗", href: site.location.mapsUrl, primary: true },
            { label: "Ver la carta", href: "#carta" },
          ]}
        />
      );
    case "fr":
      return (
        <Body
          eyebrow="🇫🇷 Bienvenue"
          title="Du tacos français en Espagne."
          copy="Vous êtes au bon endroit. Ouverts midi et soir à Ciudad Real."
          ctas={[
            { label: "Voir la carte", href: "#carta", primary: true },
            { label: "Notre histoire", href: "/story" },
          ]}
        />
      );
    case "en":
      return (
        <Body
          eyebrow="👋 Welcome"
          title="French tacos in Ciudad Real."
          copy="You found us. Open lunch and dinner — order on Glovo or come by."
          ctas={[
            { label: "See menu", href: "#carta", primary: true },
            { label: "Our story", href: "/story" },
          ]}
        />
      );
    case "open":
      return (
        <Body
          eyebrow={`🟡 Abierto ahora · Nº01 · Ciudad Real`}
          title={`Cerramos en ${formatDuration(v.status.closesIn)}.`}
          copy={`Hora de cierre: ${v.status.closesAt}. Plancha caliente, masa fresca, salsas hechas en casa.`}
          ctas={[
            { label: "Pide en Glovo ↗", href: site.orderUrl, primary: true, external: true },
            ...(locating
              ? [{ label: "Buscando…", href: "#", disabled: true }]
              : denied
              ? [{ label: "Cómo llegar ↗", href: site.location.mapsUrl, external: true }]
              : [{ label: "¿Cuánto te queda?", href: "#", onClick: askLocation }]),
          ]}
        />
      );
    case "closed":
      return (
        <Body
          eyebrow="⊘ Ahora estamos cerrados"
          title={`Abrimos en ${formatDuration(v.status.opensIn)}.`}
          copy={`Próximo turno a las ${v.status.opensAt}. La carta sigue donde la dejamos.`}
          ctas={[
            { label: "Ver la carta", href: "#carta", primary: true },
            { label: "Cómo llegar ↗", href: site.location.mapsUrl, external: true },
          ]}
        />
      );
  }
}

type Cta = {
  label: string;
  href: string;
  primary?: boolean;
  external?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

function Body({
  eyebrow,
  title,
  copy,
  ctas,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  ctas: Cta[];
}) {
  return (
    <div>
      <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--yellow)]">
        <span>{eyebrow}</span>
      </div>
      <h3 className="mt-2 max-w-xs font-display text-lg font-bold leading-[1.15] tracking-[-0.02em] text-[var(--cream)] sm:text-xl">
        {title}
      </h3>
      <p className="mt-1 max-w-xs text-[12px] leading-[1.5] text-[var(--cream)]/70">
        {copy}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {ctas.map((c, i) =>
          c.onClick ? (
            <button
              key={i}
              type="button"
              onClick={c.onClick}
              disabled={c.disabled}
              className={ctaClasses(c)}
              data-cursor="VER"
            >
              {c.label}
            </button>
          ) : (
            <a
              key={i}
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noopener noreferrer" : undefined}
              className={ctaClasses(c)}
              data-cursor={c.primary ? "PEDIR" : "VER"}
            >
              {c.label}
            </a>
          )
        )}
      </div>
    </div>
  );
}

function ctaClasses(c: Cta): string {
  const base =
    "inline-flex items-center gap-1 px-3 py-1.5 font-mono text-[10px] tracking-[0.25em] uppercase transition-colors";
  if (c.disabled) return `${base} border border-[var(--cream)]/20 text-[var(--cream)]/40 cursor-wait`;
  if (c.primary) return `${base} border border-[var(--yellow)] bg-[var(--yellow)] text-[var(--ink)] hover:bg-[var(--yellow-warm)]`;
  return `${base} border border-[var(--cream)]/40 text-[var(--cream)] hover:border-[var(--yellow)] hover:text-[var(--yellow)]`;
}
