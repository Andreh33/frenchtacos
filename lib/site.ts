export const site = {
  name: "Urban French Takos",
  shortName: "UFT",
  tagline: "El french tako, reventado a la calle.",
  taglineAlts: [
    "French takos. Recién sacados de la calle.",
    "Calle de Lyon, alma manchega.",
  ],
  url: "https://urbanfrenchtakos.com",
  orderUrl:
    "https://www.portalrest.com/index.html?data=%3DATPrNXYmETPtZCOxEjN4MTP0NXZSRWa",
  socials: {
    instagram: "https://instagram.com/urban_french_takos",
    facebook:
      "https://www.facebook.com/people/Urban-French-Takos/61561534463204/",
  },
  location: {
    name: "Urban French Takos — Valdepeñas",
    address: "Calle de la Virgen, 60, Local 2",
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
      { day: "Martes a Jueves", time: "13:00 – 16:00 · 20:00 – 00:00" },
      { day: "Viernes y Sábado", time: "13:00 – 16:00 · 20:00 – 01:00" },
      { day: "Domingo", time: "13:00 – 16:00 · 20:00 – 00:00" },
    ],
  },
} as const;

export type Site = typeof site;
