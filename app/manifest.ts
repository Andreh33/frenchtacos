import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Urban French Takos",
    short_name: "UFT",
    description: "Street food francés con alma manchega. Valdepeñas.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0612",
    theme_color: "#0A0612",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
