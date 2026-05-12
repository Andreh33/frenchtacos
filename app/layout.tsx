import type { Metadata, Viewport } from "next";
import { clash, general, mono, italic } from "./fonts";
import "./globals.css";
import { Loader } from "@/components/system/Loader";
import { SmoothScroll } from "@/components/system/SmoothScroll";
import { Cursor } from "@/components/system/Cursor";
import { RestaurantJsonLd } from "@/components/system/RestaurantJsonLd";

const siteUrl = "https://urbanfrenchtakos.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Urban French Takos · Street food francés en Valdepeñas",
    template: "%s · Urban French Takos",
  },
  description:
    "French takos recién sacados de la calle. Pide online en Calle de la Virgen 60, Valdepeñas.",
  applicationName: "Urban French Takos",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    siteName: "Urban French Takos",
    title: "Urban French Takos · Street food francés en Valdepeñas",
    description:
      "French takos recién sacados de la calle. Pide online en Valdepeñas.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Urban French Takos",
    description: "French takos recién sacados de la calle.",
  },
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0612",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${clash.variable} ${general.variable} ${mono.variable} ${italic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col grain">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:bg-[var(--yellow)] focus:text-[var(--ink)] focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:tracking-widest"
        >
          Saltar al contenido
        </a>
        <Loader />
        <SmoothScroll />
        <Cursor />
        <main id="main" className="flex-1">
          {children}
        </main>
        <RestaurantJsonLd />
      </body>
    </html>
  );
}
