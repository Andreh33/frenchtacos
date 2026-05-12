# Créditos y atribuciones

Todos los assets externos son sustituibles. Cuando el cliente tenga fotos
propias del local, producto y oferta visual, se reemplazan los archivos
en `public/images/` manteniendo nombres o actualizando las rutas en `lib/`.

## Vídeo del hero

- **Archivo:** `public/video/hero.mp4` + `hero.webm` + `hero-poster.jpg`
- **Origen:** Pexels — vídeo `5528074`, *"Person Making a Burrito"* por sadiq Padela
- **URL:** https://www.pexels.com/video/person-making-a-burrito-5528074/
- **Licencia:** Pexels License (libre uso comercial, sin atribución obligatoria)

## Fotografía de la carta editorial (placeholders top-down)

| Archivo | Pexels ID | URL |
|---|---|---|
| `carta/loriginal.jpg` | 5848076 | https://www.pexels.com/photo/burritos-and-mayonnaise-on-white-surface-5848076/ |
| `carta/leboucher.jpg` | 32291149 | https://www.pexels.com/photo/gourmet-vegetarian-burrito-with-sauces-32291149/ |
| `carta/manchego.jpg` | 18007687 | https://www.pexels.com/photo/meal-with-meat-18007687/ |
| `carta/leveggie.jpg` | 5848036 | https://www.pexels.com/photo/burrito-on-white-table-5848036/ |

Licencia Pexels en todos.

## Foto del local

- **Archivo:** `public/images/local/facade.jpg`
- **Origen:** Pexels — foto `2840651`
- **URL:** https://www.pexels.com/photo/black-and-purple-neon-signage-of-a-building-during-nighttime-2840651/
- **Nota:** placeholder. Sustituir por foto real del local en Calle de la Virgen 60.

## Imágenes de ofertas

- **Archivos:** `public/images/ofertas/{flash,martes,smart}.webp`
- **Origen:** descargados del dominio actual `urbanfrenchtakos.com` (propiedad del cliente)
- **Procesado:** convertidos de PNG (~2MB cada uno) a WebP escalado a 1600px (~140KB cada uno) con `ffmpeg`

## Tipografía

- **Clash Display** (Indian Type Foundry) — auto-hospedada vía Fontshare CDN
- **General Sans** (Indian Type Foundry) — auto-hospedada vía Fontshare CDN
- Ambas: SIL Open Font License (uso comercial permitido)
- **JetBrains Mono** — Apache 2.0 (Google Fonts)
- **Playfair Display Italic** — SIL OFL (Google Fonts)

## Iconografía

Sin librerías de iconos. Todos los SVG son inline en los componentes.
Logos App Store / Google Play: no se muestran (botones disabled solo texto).

---

*Cuando el cliente entregue assets propios, se actualiza este archivo retirando las atribuciones de los placeholders sustituidos.*
