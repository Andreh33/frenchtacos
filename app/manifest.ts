import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Urban French Takos",
    short_name: "UFT",
    description: "Street food francés con alma manchega. Valdepeñas.",
    start_url: "/",
    display: "standalone",
    background_color: "#2A0F3D",
    theme_color: "#2A0F3D",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
