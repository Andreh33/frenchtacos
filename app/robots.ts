import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://urbanfrenchtakos.com/sitemap.xml",
    host: "https://urbanfrenchtakos.com",
  };
}
