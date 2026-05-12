# Urban French Takos — sitio web premium

Web premium para **Urban French Takos** (Valdepeñas) construida con Next.js 16 + React 19.2,
React Three Fiber para el taco 3D, Tailwind v4, Framer Motion, GSAP y Lenis.

---

## Quickstart

```bash
npm install
npm run dev
# http://localhost:3000
```

```bash
npm run build   # build de producción (Turbopack)
npm start       # arranca el server productivo
```

> Node 20+ requerido. Probado con Node 24 LTS.

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16.2 (App Router, Turbopack, React Compiler estable) |
| UI | React 19.2 + Tailwind CSS v4 |
| 3D | React Three Fiber + drei + three |
| Animación | Framer Motion + GSAP (lazy) + Lenis (smooth scroll) |
| Carrusel | embla-carousel-react |
| Forms | react-hook-form + zod |
| Tipografía | Bricolage Grotesque (display) · Plus Jakarta Sans (body) · JetBrains Mono |

`next.config.ts` activa `reactCompiler: true` y `optimizePackageImports` para `framer-motion` y `@react-three/drei`.

---

## Estructura

```
app/
  layout.tsx              # fuentes, metadata, providers globales (loader, cursor, smooth scroll)
  page.tsx                # composición de secciones
  globals.css             # tokens, grain overlay, marquee, reveal keyframes
  opengraph-image.tsx     # OG dinámico 1200×630
  apple-icon.tsx          # icono iOS
  icon.svg, manifest.ts, robots.ts, sitemap.ts

components/
  hero/
    TakoCanvas.tsx        # Canvas R3F con PresentationControls + Float
    TakoModel.tsx         # modelo procedural (cambia por GLB cuando quieras)
  layout/
    Header.tsx            # nav con drawer fullscreen mobile
    Footer.tsx            # manifesto + columnas + tipografía gigante
    LegalModal.tsx        # modal accesible para aviso, privacidad, cookies
  sections/
    Hero.tsx Offers.tsx News.tsx Location.tsx Franchise.tsx App.tsx
  system/
    SmoothScroll.tsx      # Lenis + anchor handling
    Cursor.tsx            # cursor amarillo desktop con label data-cursor
    Loader.tsx            # "Calentando el comal…"
    Reveal.tsx            # IntersectionObserver + reveal-clip
    RestaurantJsonLd.tsx  # schema.org Restaurant

lib/
  cn.ts                   # tailwind-merge + clsx
  site.ts                 # nombre, URL, redes, dirección, horarios
  content.ts              # ofertas, novedades, navegación
  legal.ts                # textos legales editables

public/
  models/                 # añade tu .glb aquí (ver más abajo)
```

---

## Cambiar el modelo 3D

El `TakoModel.tsx` actual es procedural (Three.js primitives) para que el repo arranque sin
descargas externas. Para usar un `.glb` real:

1. Descarga uno desde **Sketchfab**, **Poly Pizza** o **CGTrader Free** (filtra por `CC0` o `CC Attribution`).
2. Optimízalo: `npx gltf-transform optimize input.glb public/models/french-tako.glb --texture-compress webp`
3. En `components/hero/TakoCanvas.tsx` reemplaza `<TakoModel />` por:

```tsx
import { useGLTF } from '@react-three/drei'
const { scene } = useGLTF('/models/french-tako.glb')
<primitive object={scene} scale={1.05} />
```

4. Anota la atribución en `public/CREDITS.md` si la licencia lo exige.

---

## Editar contenido

- **Ofertas / novedades / nav:** `lib/content.ts`.
- **Dirección, horarios, redes:** `lib/site.ts`.
- **Textos legales:** `lib/legal.ts` — se renderizan tal cual en los modales.
- **Tipografía y paleta:** CSS vars en `app/globals.css` (`--uft-*`).
- **Tagline alternativos:** `lib/site.ts` → `taglineAlts`.
- **Link de pedidos:** `lib/site.ts` → `orderUrl`.

---

## Microinteracciones clave

- Cursor custom: añade `data-cursor="VER"` (o `"PEDIR"`, `"ARRASTRA"`, etc.) a cualquier elemento clicable.
- Reveal en scroll: envuelve en `<Reveal>` o añade clase `.reveal-clip` y mete `is-in` al entrar.
- Botón "se sirve el plato": clase `btn-fill` + `bg-[var(--uft-yellow)]`.
- Smooth scroll Lenis: cualquier `<a href="#id">` se anima automáticamente.

---

## Accesibilidad y rendimiento

- Skip-link en `layout.tsx`.
- `prefers-reduced-motion`: desactiva cursor, smooth scroll, marquee, parallax y rota a fallback estático para el taco.
- Conexiones limitadas (`Save-Data`) o viewport < 380px → no se monta el Canvas WebGL.
- Fuentes con `display: swap`.
- Imágenes en AVIF + WebP (auto vía `next/image` + `next.config.ts`).

---

## Deploy en Vercel

1. **GitHub**

```bash
git init
git add .
git commit -m "feat: urban french takos premium website"
git branch -M main
git remote add origin https://github.com/Andreh33/frenchtacos.git
git push -u origin main
```

2. **Vercel** — entra en https://vercel.com/new, importa el repo, deploy. Detecta Next 16 automáticamente, no toques configuración.

3. **Dominio:** Settings → Domains → añade `urbanfrenchtakos.com` y configura los DNS que indique Vercel.

4. **Env vars (opcional):** si conectas Formspree, Analytics o similar, replica `.env.local` en Vercel Dashboard → Settings → Environment Variables.

---

## Sustituir el envío del form

`Franchise.tsx` usa `mailto:` como fallback. Para producción real:

- **Formspree:** crea form, sustituye el `onSubmit` por `fetch('https://formspree.io/f/XXXX', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })`.
- **API Route:** crea `app/api/franquicia/route.ts` que envíe email con Resend o similar, y haz `fetch('/api/franquicia', …)`.

---

## Notas de Next 16

- `params` y `searchParams` ahora son `async` (no afecta a este proyecto porque no usa rutas dinámicas).
- ESLint ya no se ejecuta en `next build`. Para validar manualmente: `npx eslint .`.
- `AGENTS.md` y `CLAUDE.md` generados por `create-next-app` son safe to delete.

---

Hecho con cariño. 🌮
