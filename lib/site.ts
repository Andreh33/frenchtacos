export const site = {
  name: "Urban French Takos",
  tagline: "El french tako, reventado a la calle.",
  url: "https://urbanfrenchtakos.com",
  orderUrl:
    "https://www.portalrest.com/index.html?data=%3DATPrNXYmETPtZCOxEjN4MTP0NXZSRWa",
  socials: {
    instagram: "https://instagram.com/urban_french_takos",
    facebook:
      "https://www.facebook.com/people/Urban-French-Takos/61561534463204/",
  },
  location: {
    address: "Calle de la Virgen, 60. Local 2",
    city: "Valdepeñas",
    region: "Ciudad Real",
    postalCode: "13300",
    country: "España",
    lat: 38.7626,
    lng: -3.3856,
    mapsUrl: "https://maps.google.com/?q=Calle+de+la+Virgen+60+Valdepe%C3%B1as",
    embedUrl:
      "https://www.google.com/maps?q=Calle+de+la+Virgen+60+Local+2,+Valdepe%C3%B1as&output=embed",
    hours: [
      { day: "Lunes", time: "Cerrado" },
      { day: "Mar — Jue", time: "13:00 – 16:00 · 20:00 – 00:00" },
      { day: "Vie — Sáb", time: "13:00 – 16:00 · 20:00 – 01:00" },
      { day: "Domingo", time: "13:00 – 16:00 · 20:00 – 00:00" },
    ],
  },
  nav: [
    { href: "#carta", label: "Carta" },
    { href: "#ofertas", label: "Ofertas" },
    { href: "#local", label: "Local" },
    { href: "#franquicia", label: "Franquicia" },
  ],
} as const;
