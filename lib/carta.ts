export type Tako = {
  num: string;
  name: string;
  subtitle: string;
  ingredients: readonly string[];
  price: { whole: string; decimals: string };
  image: { src: string; alt: string };
};

export const takos: readonly Tako[] = [
  {
    num: "Nº01",
    name: "L'Original",
    subtitle: "El primer beso. El tako que abrió el local.",
    ingredients: ["Pollo marinado 24h", "Salsa argelina", "Queso fundido", "Papas crujientes"],
    price: { whole: "9", decimals: ",90€" },
    image: {
      src: "/images/carta/loriginal.jpg",
      alt: "L'Original — pollo, queso fundido y papas",
    },
  },
  {
    num: "Nº02",
    name: "Le Boucher",
    subtitle: "Carne, carne y más carne. Sin pedir perdón.",
    ingredients: ["Ternera de Ciudad Real", "Bacon ahumado", "Cheddar añejo", "Salsa BBQ casera"],
    price: { whole: "11", decimals: ",50€" },
    image: {
      src: "/images/carta/leboucher.jpg",
      alt: "Le Boucher — ternera, bacon, cheddar",
    },
  },
  {
    num: "Nº03",
    name: "El Manchego",
    subtitle: "Lyon × La Mancha. Casa por todos los lados.",
    ingredients: ["Chorizo manchego", "Queso manchego curado", "Alioli ahumado", "Jalapeño"],
    price: { whole: "10", decimals: ",90€" },
    image: {
      src: "/images/carta/manchego.jpg",
      alt: "El Manchego — chorizo manchego y queso curado",
    },
  },
  {
    num: "Nº04",
    name: "Le Veggie",
    subtitle: "Sin renunciar al sabor de calle.",
    ingredients: ["Falafel crujiente", "Hummus de la casa", "Harissa", "Rúcula fresca"],
    price: { whole: "9", decimals: ",50€" },
    image: {
      src: "/images/carta/leveggie.jpg",
      alt: "Le Veggie — falafel, hummus, rúcula",
    },
  },
];
