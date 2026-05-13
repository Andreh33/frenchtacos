import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/styleguide"] },
    sitemap: "https://frenchtacos.es/sitemap.xml",
    host: "https://frenchtacos.es",
  };
}
