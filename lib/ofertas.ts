export type Oferta = {
  num: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  image: { src: string; alt: string };
  align: "left" | "right" | "center";
  width: string; // tailwind width class
};

export const ofertas: readonly Oferta[] = [
  {
    num: "Nº01",
    eyebrow: "Oferta · Flash",
    title: "Tako + bebida + postre.",
    body: "Combo cerrado, precio reventado. Sólo mientras dure la ronda.",
    cta: "Aprovecharla",
    image: { src: "/images/ofertas/flash.webp", alt: "Oferta Flash — combo completo" },
    align: "left",
    width: "w-full md:w-[72%]",
  },
  {
    num: "Nº02",
    eyebrow: "Martes · 2×1",
    title: "Dos takos. El precio de uno.",
    body: "El día más cruel de la semana lo arreglamos servido.",
    cta: "Pedir martes",
    image: { src: "/images/ofertas/martes.webp", alt: "Martes de Takos — 2×1" },
    align: "right",
    width: "w-full md:w-[66%] md:ml-auto",
  },
  {
    num: "Nº03",
    eyebrow: "Smart · Menú",
    title: "Smart Takos por menos de 10€.",
    body: "Tako, patatas y bebida. Inteligente. Y reventado.",
    cta: "Coger el smart",
    image: { src: "/images/ofertas/smart.webp", alt: "Smart Takos — menú inteligente" },
    align: "center",
    width: "w-full md:w-[80%] md:mx-auto",
  },
];
