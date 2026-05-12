import localFont from "next/font/local";
import { JetBrains_Mono, Playfair_Display } from "next/font/google";

export const clash = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    { path: "../public/fonts/clash-display-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/clash-display-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/clash-display-700.woff2", weight: "700", style: "normal" },
  ],
});

export const general = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    { path: "../public/fonts/general-sans-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/general-sans-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/general-sans-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/general-sans-700.woff2", weight: "700", style: "normal" },
  ],
});

export const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const italic = Playfair_Display({
  variable: "--font-italic",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["italic"],
});
