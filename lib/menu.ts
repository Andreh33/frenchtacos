export type Product = {
  num: string;
  name: string;
  ingredients: string;
  priceLow: string;
  priceHigh?: string;
  image: { src: string; alt: string };
};

export type CategoryAccent = "copper" | "amber" | "olive" | "cream";

export type Category = {
  slug: string;
  num: string;
  title: string;
  eyebrow: string;
  products: Product[];
  accent: CategoryAccent;
};

export const tacos: Product[] = [
  {
    num: "Nº01",
    name: "Tex-Mex",
    ingredients: "Carne picada, patatas fritas, salsa Cheddar, queso cheddar y bacon crujiente.",
    priceLow: "8,50",
    priceHigh: "14,50",
    image: { src: "/images/tacos/tex-mex.jpg", alt: "Tacos Tex-Mex con queso cheddar" },
  },
  {
    num: "Nº02",
    name: "Cabra & Miel",
    ingredients: "Nuggets, patatas fritas, salsa Brazil, queso de cabra y miel.",
    priceLow: "8,50",
    priceHigh: "14,50",
    image: { src: "/images/tacos/cabra-miel.jpg", alt: "Tacos Cabra y Miel" },
  },
  {
    num: "Nº03",
    name: "Spicy",
    ingredients: "Pollo, patatas fritas, salsa argelina, pimientos y mozzarella gratinada.",
    priceLow: "8,50",
    priceHigh: "14,50",
    image: { src: "/images/tacos/spicy.jpg", alt: "Tacos Spicy con pollo" },
  },
  {
    num: "Nº04",
    name: "Gratipollo",
    ingredients: "Pollo, patatas fritas, salsa Biggy y gratinado de mozzarella.",
    priceLow: "8,50",
    priceHigh: "14,50",
    image: { src: "/images/tacos/gratipollo.jpg", alt: "Tacos Gratipollo gratinado" },
  },
];

export const burgers: Product[] = [
  {
    num: "Nº01",
    name: "Black Premium",
    ingredients: "Carne picada, queso de cabra, lechuga, cebolla crujiente, miel, salsa barbacoa y queso en pan negro.",
    priceLow: "13,90",
    priceHigh: "15,90",
    image: { src: "/images/burgers/black-premium.jpg", alt: "Black Premium Burger" },
  },
  {
    num: "Nº02",
    name: "Smash",
    ingredients: "Doble carne smash, queso cheddar, cebolla caramelizada, bacon, salsas Cheesy y Biggy en pan brioche.",
    priceLow: "12,90",
    priceHigh: "14,90",
    image: { src: "/images/burgers/smash.jpg", alt: "Smash Burger con cheddar" },
  },
  {
    num: "Nº03",
    name: "Testy",
    ingredients: "Carne picada, queso cheddar, lechuga, tomate, cebolla y salsa Testy especial en pan brioche.",
    priceLow: "8,90",
    priceHigh: "10,90",
    image: { src: "/images/burgers/testy.jpg", alt: "Testy Burger clásica" },
  },
  {
    num: "Nº04",
    name: "Crispy",
    ingredients: "Pollo crujiente, queso emmental, lechuga, tomate, cebolla y mayonesa suave en pan brioche.",
    priceLow: "8,50",
    priceHigh: "10,50",
    image: { src: "/images/burgers/crispy.jpg", alt: "Crispy Burger de pollo" },
  },
  {
    num: "Nº05",
    name: "Fish",
    ingredients: "Filete de pescado empanado, queso cheddar, lechuga y salsa tártara en pan brioche.",
    priceLow: "8,50",
    priceHigh: "10,50",
    image: { src: "/images/burgers/fish.jpg", alt: "Fish Burger" },
  },
  {
    num: "Nº06",
    name: "Veggie",
    ingredients: "Carne vegetal, queso emmental, lechuga, tomate, cebolla y mayonesa en pan brioche.",
    priceLow: "8,50",
    priceHigh: "10,50",
    image: { src: "/images/burgers/veggie.jpg", alt: "Veggie Burger" },
  },
];

export const bowls: Product[] = [
  {
    num: "Nº01",
    name: "French Touch",
    ingredients: "Cordon bleu, patatas fritas, salsa de queso y mozzarella gratinada.",
    priceLow: "8,50",
    priceHigh: "10,50",
    image: { src: "/images/bowls/french-touch.jpg", alt: "Bowl French Touch" },
  },
  {
    num: "Nº02",
    name: "Tex-Mex",
    ingredients: "Carne de ternera, bacon, patatas fritas, salsa Cheddar y mozzarella gratinada.",
    priceLow: "8,50",
    priceHigh: "10,50",
    image: { src: "/images/bowls/tex-mex.jpg", alt: "Bowl Tex-Mex con cheddar" },
  },
  {
    num: "Nº03",
    name: "Cabra & Miel",
    ingredients: "Nuggets, patatas fritas, salsa Brazil, miel y queso de cabra gratinado.",
    priceLow: "8,50",
    priceHigh: "10,50",
    image: { src: "/images/bowls/cabra-miel.jpg", alt: "Bowl Cabra y Miel" },
  },
  {
    num: "Nº04",
    name: "Gratipollo",
    ingredients: "Pollo, patatas fritas, salsa de queso cremosa y mozzarella gratinada.",
    priceLow: "7,50",
    priceHigh: "9,50",
    image: { src: "/images/bowls/gratipollo.jpg", alt: "Bowl Gratipollo" },
  },
];

export const ensaladas: Product[] = [
  {
    num: "Nº01",
    name: "Cabra & Miel",
    ingredients: "Lechuga, tomate, queso de cabra, cebolla crujiente y miel.",
    priceLow: "8,90",
    image: { src: "/images/ensaladas/cabra-miel.jpg", alt: "Ensalada Cabra y Miel" },
  },
  {
    num: "Nº02",
    name: "Magic Pollo",
    ingredients: "Lechuga, tomate, pollo, queso parmesano y salsa Magic Onion.",
    priceLow: "7,90",
    image: { src: "/images/ensaladas/magic-pollo.jpg", alt: "Ensalada Magic Pollo" },
  },
];

export const categories: Category[] = [
  { slug: "tacos", num: "Nº01", title: "Tacos", eyebrow: "La receta original", products: tacos, accent: "copper" },
  { slug: "burgers", num: "Nº02", title: "Burgers", eyebrow: "Pan brioche y fuego", products: burgers, accent: "amber" },
  { slug: "bowls", num: "Nº03", title: "Bowls", eyebrow: "Todo en uno", products: bowls, accent: "olive" },
  { slug: "ensaladas", num: "Nº04", title: "Ensaladas", eyebrow: "Fresco pero con carácter", products: ensaladas, accent: "cream" },
];
