import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/system/SmoothScroll";
import { Cursor } from "@/components/system/Cursor";
import { Loader } from "@/components/system/Loader";
import { RestaurantJsonLd } from "@/components/system/RestaurantJsonLd";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

const siteUrl = "https://urbanfrenchtakos.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Urban French Takos · Street food francés en Valdepeñas",
    template: "%s · Urban French Takos",
  },
  description:
    "French takos recién sacados de la calle. Pide online, encuéntranos en Calle de la Virgen 60, Valdepeñas.",
  applicationName: "Urban French Takos",
  authors: [{ name: "Urban French Takos" }],
  keywords: [
    "french tako",
    "french tacos",
    "Valdepeñas",
    "street food",
    "comida a domicilio",
    "Urban French Takos",
  ],
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
    description:
      "French takos recién sacados de la calle. Valdepeñas, desde el corazón.",
  },
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#2A0F3D",
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
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col grain bg-[var(--uft-purple-deep)] text-[var(--uft-cream)]">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:bg-[var(--uft-yellow)] focus:text-[var(--uft-purple-deep)] focus:px-4 focus:py-2 focus:font-mono focus:text-sm"
        >
          Saltar al contenido
        </a>
        <Loader />
        <SmoothScroll />
        <Cursor />
        <Header />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
        <RestaurantJsonLd />
      </body>
    </html>
  );
}
