import { site } from "@/lib/site";

export function RestaurantJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    url: site.url,
    image: `${site.url}/opengraph-image`,
    servesCuisine: ["French Tacos", "Street food"],
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.location.address,
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      postalCode: site.location.postalCode,
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.location.lat,
      longitude: site.location.lng,
    },
    sameAs: [site.socials.instagram, site.socials.facebook],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Sunday"],
        opens: "13:00",
        closes: "00:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday", "Saturday"],
        opens: "13:00",
        closes: "01:00",
      },
    ],
    acceptsReservations: "False",
    hasMenu: site.orderUrl,
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
