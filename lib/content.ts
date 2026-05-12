import { site } from "./site";

export type Offer = {
  id: string;
  label: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  accent: "yellow" | "purple" | "cream";
};

export const offers: Offer[] = [
  {
    id: "flash",
    label: "Oferta flash",
    title: "Tako + Bebida + Postre",
    body: "Combo cerrado, precio reventado. Sólo mientras dure la ronda.",
    cta: "Aprovecharla",
    href: site.orderUrl,
    accent: "yellow",
  },
  {
    id: "martes",
    label: "Martes de Takos",
    title: "2 × 1 todos los martes",
    body: "El día más cruel de la semana lo arreglamos con dos takos por uno.",
    cta: "Pedir martes",
    href: site.orderUrl,
    accent: "purple",
  },
  {
    id: "smart",
    label: "Smart Takos",
    title: "Menú smart por menos de 10€",
    body: "Tako, patatas y bebida. Inteligente y reventado.",
    cta: "Coger el smart",
    href: site.orderUrl,
    accent: "cream",
  },
];

export type News = {
  id: string;
  title: string;
  caption: string;
  size: "lg" | "md" | "sm" | "wide";
};

export const news: News[] = [
  {
    id: "n1",
    title: "Nueva salsa de la casa",
    caption: "Receta secreta. Sabor que no perdona.",
    size: "lg",
  },
  {
    id: "n2",
    title: "Tako vegetal",
    caption: "Sin renunciar al sabor de calle.",
    size: "md",
  },
  {
    id: "n3",
    title: "Síguenos en Instagram",
    caption: "Detrás del comal.",
    size: "sm",
  },
  {
    id: "n4",
    title: "Edición limitada · Chorizo manchego",
    caption: "Cuando Lyon se encuentra con La Mancha.",
    size: "wide",
  },
];

export const navLinks = [
  { href: "#ofertas", label: "Ofertas" },
  { href: "#actualidad", label: "Actualidad" },
  { href: "#local", label: "Local" },
  { href: "#franquicia", label: "Franquicia" },
  { href: "#app", label: "App" },
] as const;
