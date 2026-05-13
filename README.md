# CLM French Tacos — sitio editorial

Sitio web premium para **CLM French Tacos** (Ciudad Real, Calle Ciruela 28).
Next.js 16.2 + React 19.2, Tailwind v4, Framer Motion, Lenis. Sin Three.js, sin ilustraciones —
fotografía editorial + tipografía masiva (Clash Display) + paleta disciplinada ink + amarillo.

---

## Quickstart

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

Node 20+. Probado con Node 24 LTS.

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16.2 (App Router · Turbopack · React Compiler estable) |
| UI | React 19.2 · Tailwind CSS v4 · Tokens CSS en `app/globals.css` |
| Animación | Framer Motion (useScroll/useTransform · clip-path reveals · scrubbed word reveal) |
| Smooth scroll | Lenis (lazy, off con `prefers-reduced-motion`) |
| Carrusel horizontal | Sticky CSS + Framer Motion useScroll (NO GSAP) |
| Forms | n/a — no hay forms en este sitio (CTAs son externos a Glovo) |
| Tipografía | Clash Display + General Sans (Fontshare, auto-host) · JetBrains Mono · Playfair Italic (Google) |

`next.config.ts` activa `reactCompiler: true` para memoización automática.

---

## Estructura

```
app/
  layout.tsx            # fuentes, metadata, Loader + SmoothScroll + Cursor + JSON-LD
  page.tsx              # Header → Hero → Statement → Menu → Local → Footer
  fonts.ts              # next/font local (Fontshare) + Google
  globals.css           # tokens, grain, marquee, reveal-line, btn-fill
  opengraph-image.tsx   # OG dinámico 1200×630
  manifest.ts robots.ts sitemap.ts icon.svg
  styleguide/page.tsx   # página interna /styleguide (no indexada)

components/
  layout/
    Header.tsx          # nav fixed transparente→ink/85, drawer fullscreen mobile
    Footer.tsx          # manifesto + cols + wordmark gigante recortado
    LegalModal.tsx      # modales accesibles para aviso, privacidad, cookies
  sections/
    Hero.tsx            # video full-bleed + headline clip-path stagger + marquee
    Statement.tsx       # manifesto con fill palabra a palabra (useScroll, inclinado -2.5°)
    Menu.tsx            # composición de las 4 categorías + separadores + teaser
    Local.tsx           # foto + sticker + mapa estilizado + teléfono + email + Glovo
  menu/
    HorizontalCategory.tsx  # 1 categoría = sticky stage + horizontal scroll Framer
    CategorySeparator.tsx   # nombre próxima categoría con scrub-letter reveal inclinado -4°
  system/
    SmoothScroll.tsx    # Lenis lazy + anchor handling
    Cursor.tsx          # cursor amarillo desktop con data-cursor dinámico
    Loader.tsx          # logo CLM + barra amarilla (1.0–2.0s)
    Reveal.tsx          # IntersectionObserver + reveal-line
    RestaurantJsonLd.tsx

lib/
  cn.ts                 # tailwind-merge + clsx
  site.ts               # marca, contacto, redes, Glovo, dirección, horarios, nav
  menu.ts               # 4 categorías × productos (tacos, burgers, bowls, ensaladas)
  legal.ts              # textos legales editables

public/
  brand/logo.png        # logo oficial CLM
  og.jpg                # imagen OG
  fonts/                # 7 WOFF2 auto-hospedados desde Fontshare
  video/                # hero.mp4 (2.9MB) + hero.webm (753KB) + hero-poster.jpg
  images/
    tacos/              # 4 productos (PNG transparente del catálogo oficial)
    burgers/            # 6 productos
    bowls/              # 2 productos reales + 2 placeholders (Pexels)
    ensaladas/          # 2 productos
    local/              # 1 foto fachada placeholder (sustituir por real)
```

---

## Editar contenido — sin tocar componentes

| Quiero cambiar… | Editar archivo |
|---|---|
| Nombre, contacto, redes, dirección, horarios, link Glovo | `lib/site.ts` |
| Productos y precios de cada categoría | `lib/menu.ts` |
| Textos legales (aviso, privacidad, cookies) | `lib/legal.ts` |
| Paleta de colores | CSS vars en `app/globals.css` (`--ink`, `--yellow`, etc.) |
| Tipografía | `app/fonts.ts` |

---

## Añadir un producto nuevo

Edita `lib/menu.ts` — añade un objeto al array de la categoría:

```ts
{
  num: "Nº05",
  name: "Nuevo Tacos",
  ingredients: "Ingredientes separados por comas.",
  priceLow: "9,90",
  priceHigh: "11,90",  // opcional
  image: { src: "/images/tacos/nuevo.png", alt: "Tacos Nuevo" },
}
```

El layout se recalcula automáticamente — el sticky stage se hace más alto (`md:h-[500vh]` si pasas de 4 a 5 productos). Los mapeos hardcoded de altura están en `HorizontalCategory.tsx` línea ~50 (`heightMap`).

---

## Reemplazar fotos

- **Productos:** sustituye los archivos en `public/images/{categoria}/`. Tamaño ideal 600–1200px, PNG transparente o JPG. Los placeholders de bowls (`*-placeholder.jpg`) llevan comentario `TODO` en `lib/menu.ts`.
- **Local:** `public/images/local/facade.jpg`.
- **Hero:** `public/video/hero.{mp4,webm}` + poster. Regenera con `ffmpeg -i hero.mp4 -c:v libvpx-vp9 -crf 33 -b:v 0 -an hero.webm`.
- **OG:** `public/og.jpg` (1200×630).
- **Logo:** `public/brand/logo.png`.

---

## Microinteracciones

| Patrón | Cómo usarlo |
|---|---|
| Cursor custom label | `data-cursor="VER"` (o "PEDIR", "LLAMAR", etc.) en cualquier clicable |
| Botón "fill" | Clase `btn-fill` + fondo amarillo |
| Reveal clip-path | `<Reveal>` o clase `.reveal-line` |
| Smooth scroll anchor | Cualquier `<a href="#id">` se anima automáticamente vía Lenis |
| Marquee infinito | Clase `marquee-track` sobre un wrapper `flex w-max` |
| Word fill scrubbed | Ver `Statement.tsx` y `CategorySeparator.tsx` |
| Sticky horizontal scroll | Ver `HorizontalCategory.tsx` — `md:h-[N00vh]` + sticky `top-0 h-screen` + track translado por `useTransform` |

---

## Accesibilidad y rendimiento

- Skip-link al `<main>` (visible al tab)
- `prefers-reduced-motion`: desactiva Lenis, cursor custom, scrub, marquee, parallax
- Contraste AA mínimo · AAA en body (cream sobre ink)
- Focus visible: outline amarillo 2px + offset 3px
- `<html lang="es">` · alt descriptivo en español · `aria-modal` en legales
- Fuentes con `display: swap`
- Imágenes vía `next/image` → AVIF + WebP automáticos en producción

---

## Deploy en Vercel

```bash
git add .
git commit -m "..."
git push origin main
```

Conectado al repo de GitHub. Vercel despliega automático.

### Dominio

Settings → Domains → añade `frenchtacos.es` y los DNS que indique Vercel.

---

## Sobre Next 16

- `params` y `searchParams` son `async` (no afecta a este proyecto)
- ESLint ya no corre en `next build` — manual: `npx eslint .`
- Turbopack es el bundler por defecto
- `AGENTS.md` y `CLAUDE.md` generados por scaffold se eliminaron

---

Hecho con cariño y queso fundido.
