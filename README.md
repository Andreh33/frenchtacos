# Urban French Takos — sitio web premium · v2 editorial cut

Sitio editorial de **Urban French Takos** (Valdepeñas). Next.js 16.2 + React 19.2,
Tailwind v4, Framer Motion, Lenis. Sin Three.js, sin ilustraciones — todo es
fotografía editorial + tipografía masiva (Clash Display) + un sistema de color
disciplinado: ink dominante, morado de soporte, amarillo de acento.

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
| Animación | Framer Motion (useScroll/useTransform · clip-path reveals · word-by-word scrub) |
| Smooth scroll | Lenis (lazy-imported, desactivado por `prefers-reduced-motion`) |
| Carrusel horizontal | Sticky CSS + Framer Motion (NO GSAP, NO ScrollTrigger) |
| Forms | react-hook-form + zod |
| Tipografía | Clash Display + General Sans (Fontshare, auto-host) · JetBrains Mono · Playfair Italic (Google) |

`next.config.ts` activa `reactCompiler: true` para memoización automática.

---

## Estructura

```
app/
  layout.tsx            # fuentes, metadata, Loader + SmoothScroll + Cursor + JSON-LD
  page.tsx              # composición de secciones
  fonts.ts              # next/font local (Fontshare) + Google
  globals.css           # tokens, grain, marquee, reveal-line, btn-fill
  opengraph-image.tsx   # OG dinámico 1200×630
  manifest.ts robots.ts sitemap.ts icon.svg
  styleguide/page.tsx   # página interna /styleguide (8 secciones)

components/
  layout/
    Header.tsx          # nav fixed transparente→ink/85, drawer fullscreen mobile
    Footer.tsx          # manifesto + cols + wordmark gigante recortado
    LegalModal.tsx      # modales accesibles para aviso, privacidad, cookies
  sections/
    Hero.tsx            # video full-bleed + headline clip-path stagger + marquee
    Statement.tsx       # manifesto con fill palabra a palabra (useScroll)
    Carta.tsx           # 4 takos editorial con sticky horizontal scroll (Framer)
    Ofertas.tsx         # 3 bloques asimétricos (72% L / 66% R / 80% center)
    Local.tsx           # foto + sticker rotado + mapa Google estilizado
    Franquicia.tsx      # form react-hook-form + zod, mailto fallback
    App.tsx             # mockup iPhone CSS + botones disabled
  system/
    SmoothScroll.tsx    # Lenis lazy + anchor handling
    Cursor.tsx          # cursor amarillo desktop con data-cursor dinámico
    Loader.tsx          # logo + barra amarilla (1.0–2.0s)
    Reveal.tsx          # IntersectionObserver + reveal-line
    RestaurantJsonLd.tsx

lib/
  cn.ts                 # tailwind-merge + clsx
  site.ts               # nombre, URL, redes, dirección, horarios, nav
  carta.ts              # 4 takos (nombre, ingredientes, precio, foto)
  ofertas.ts            # 3 promos (eyebrow, título, body, CTA, foto, anchor)
  legal.ts              # textos legales editables

public/
  fonts/                # 7 WOFF2 auto-hospedados desde Fontshare
  video/                # hero.mp4 (2.9MB) + hero.webm (753KB) + hero-poster.jpg
  images/
    carta/              # 4 fotos top-down Pexels (placeholders editoriales)
    ofertas/            # 3 WebP de la web actual, recomprimidas (~140KB c/u)
    local/              # 1 foto fachada placeholder (sustituir por real)
```

---

## Editar contenido — sin tocar componentes

| Quiero cambiar… | Editar archivo |
|---|---|
| Nombre del local, redes, dirección, horarios, link de pedidos | `lib/site.ts` |
| Los 4 takos (nombres, ingredientes, precios, fotos) | `lib/carta.ts` |
| Las 3 ofertas (título, copy, alineación, foto) | `lib/ofertas.ts` |
| Textos legales (aviso, privacidad, cookies) | `lib/legal.ts` |
| Paleta de colores | CSS vars en `app/globals.css` (`--ink`, `--yellow`, etc.) |
| Tipografía | `app/fonts.ts` (carga local Fontshare + Google) |

---

## Reemplazar fotos

- **Carta:** sustituye los 4 archivos en `public/images/carta/` por las reales (mantén nombres o cambia las rutas en `lib/carta.ts`). Top-down o 3/4 cenital, ratios 4:5 / 3:4 funcionan.
- **Ofertas:** sustituye los 3 WebP en `public/images/ofertas/`.
- **Local:** sustituye `public/images/local/facade.jpg` por una foto real del local. Ratio 4:3–5:4.
- **Hero:** reemplaza `public/video/hero.mp4` y `hero.webm` (regenera webm con `ffmpeg -i hero.mp4 -c:v libvpx-vp9 -crf 33 -b:v 0 -an hero.webm`). El poster se extrae con `ffmpeg -i hero.mp4 -ss 00:00:02 -frames:v 1 hero-poster.jpg`.

---

## Microinteracciones que usa la web

| Patrón | Cómo usarlo |
|---|---|
| Cursor custom label | Añade `data-cursor="VER"` (o "PEDIR", "ARRASTRA", etc.) a cualquier clicable |
| Botón "se sirve el plato" | Clase `btn-fill` + fondo amarillo |
| Reveal clip-path | `<Reveal>` o clase `.reveal-line` (se añade `is-in` al entrar al viewport) |
| Smooth scroll anchor | Cualquier `<a href="#id">` se anima automáticamente con Lenis |
| Marquee infinito | Clase `marquee-track` sobre un wrapper `flex w-max` con contenido duplicado |
| Word-by-word fill (scrub) | Ver `Statement.tsx` — patrón `useScroll` + `useTransform` por palabra |
| Sticky horizontal scroll | Ver `Carta.tsx` — sección `h-[N00vh]` + sticky `top-0 h-screen` + track translado por `useTransform` |

---

## Accesibilidad y rendimiento

- Skip-link al `<main>` (visible al tab)
- `prefers-reduced-motion`: desactiva Lenis, cursor custom, scrub, marquee, parallax
- Conexiones lentas y mobile <380px: ya no había Canvas WebGL; nada que desactivar
- Contraste AA mínimo · AAA en body (cream sobre ink)
- Focus visible: outline amarillo 2px + offset 3px
- `<html lang="es">` · alt descriptivo en español · `aria-modal` en legales
- Fuentes con `display: swap`
- Imágenes vía `next/image` → AVIF + WebP automáticos en producción

---

## Deploy en Vercel

```bash
git add .
git commit -m "feat: urban french takos v2 editorial cut"
git push origin main
```

Luego en https://vercel.com/new importa `Andreh33/frenchtacos`. Vercel detecta Next 16 automáticamente.

### Dominio custom

Settings → Domains → añade `urbanfrenchtakos.com`. Vercel da los DNS (A o CNAME) que el proveedor debe configurar.

### Sustituir el envío del form de franquicia

El form usa `mailto:` como fallback. Para producción real:

- **Formspree:** registra un form, sustituye el `onSubmit` en `Franquicia.tsx` por `fetch('https://formspree.io/f/XXXX', {...})`
- **API route:** crea `app/api/franquicia/route.ts` que envíe email vía Resend / SendGrid, y haz `fetch('/api/franquicia', ...)`

Variables de entorno: copia `.env.example` (cuando lo añadas) a `.env.local` y replica en Vercel Dashboard → Settings → Environment Variables.

---

## Sobre Next 16

- `params` y `searchParams` son `async` (no afecta a este proyecto, no usa rutas dinámicas)
- ESLint ya no se ejecuta en `next build` — para validar manual: `npx eslint .`
- Turbopack es el bundler por defecto (no necesitas `--turbopack`)
- `AGENTS.md` y `CLAUDE.md` que genera `create-next-app` son seguros de borrar (ya borrados)

---

Hecho con cariño y queso fundido.
