import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CLM French Tacos",
    short_name: "CLM Tacos",
    description: "Tacos urbanos, 100% franceses, en Ciudad Real.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: ["standalone", "minimal-ui"],
    orientation: "portrait-primary",
    background_color: "#070707",
    theme_color: "#070707",
    categories: ["food", "lifestyle"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon-maskable.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Ver carta",
        short_name: "Carta",
        url: "/#carta",
        description: "Ver la carta editorial",
      },
      {
        name: "Historia",
        short_name: "Historia",
        url: "/story",
        description: "Cómo un tacos francés acabó en Ciudad Real",
      },
    ],
  };
}
