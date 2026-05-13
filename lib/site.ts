export const site = {
  name: "CLM French Tacos",
  nameLong: "French Tacos by CLM",
  tagline: "Tacos urbanos, 100% franceses, en Ciudad Real.",
  manifesto:
    "Nacido en Francia, criado en la calle. El tacos francés no tiene nada que ver con el mexicano: aquí hablamos de carne jugosa, patatas fritas dentro, quesazo fundido y tus salsas favoritas. Un solo bocado y entiendes por qué es tendencia en toda Europa.",
  url: "https://frenchtacos.es",
  orderUrl:
    "https://glovoapp.com/es/es/ciudad-real/stores/clm-french-tacos-ciudad-real",
  menuQrUrl: "https://frenchtacos.es/menuqr.html",
  pages: {
    aboutUs: "https://frenchtacos.es/index.php/about-us/",
    fullMenu: "https://frenchtacos.es/index.php/elementor-3492/",
    contact: "https://frenchtacos.es/index.php/contact-us/",
    faq: "https://frenchtacos.es/index.php/faq/",
    account: "https://frenchtacos.es/index.php/my-account/",
  },
  phone: "+34926966574",
  phoneDisplay: "(+34) 926 966 574",
  email: "hola@frenchtacos.es",
  socials: {
    instagram: "https://www.instagram.com/clmfrenchtacos",
    instagramHandle: "@clmfrenchtacos",
  },
  location: {
    address: "Calle Ciruela, 28",
    city: "Ciudad Real",
    region: "Castilla-La Mancha",
    postalCode: "13001",
    country: "España",
    lat: 38.9854,
    lng: -3.9272,
    mapsUrl:
      "https://maps.google.com/?q=Calle+Ciruela+28,+13001+Ciudad+Real",
    embedUrl:
      "https://www.google.com/maps?q=Calle+Ciruela+28,+13001+Ciudad+Real&output=embed",
    hours: [
      { day: "Lunes", time: "Cerrado" },
      { day: "Mar — Jue", time: "13:00 – 16:00 · 20:00 – 00:00" },
      { day: "Vie — Sáb", time: "13:00 – 16:00 · 20:00 – 01:00" },
      { day: "Domingo", time: "13:00 – 16:00 · 20:00 – 00:00" },
    ],
  },
  nav: [
    { href: "#top", label: "Inicio" },
    { href: "#carta", label: "Carta" },
    { href: "#local", label: "Local" },
    { href: "https://frenchtacos.es/index.php/contact-us/", label: "Contacto", external: true },
  ],
} as const;
