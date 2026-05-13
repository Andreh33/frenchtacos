import type { Metadata, Viewport } from "next";
import { clash, general, mono, italic } from "./fonts";
import "./globals.css";
import { Loader } from "@/components/system/Loader";
import { SmoothScroll } from "@/components/system/SmoothScroll";
import { Cursor } from "@/components/system/Cursor";
import { ScrollIndicator } from "@/components/system/ScrollIndicator";
import { SoundProvider } from "@/components/system/SoundProvider";
import { KonamiMode } from "@/components/system/KonamiMode";
import { NeonMode } from "@/components/system/NeonMode";
import { WarpFilter } from "@/components/system/WarpFilter";
import { ServiceWorker } from "@/components/system/ServiceWorker";
import { InstallPrompt } from "@/components/system/InstallPrompt";
import { LocaleProvider } from "@/components/system/LocaleProvider";
import { DebugPanel } from "@/components/system/DebugPanel";
import { RestaurantJsonLd } from "@/components/system/RestaurantJsonLd";

const siteUrl = "https://frenchtacos.es";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CLM French Tacos · Tacos urbanos 100% franceses en Ciudad Real",
    template: "%s · CLM French Tacos",
  },
  description:
    "Carne jugosa, patatas fritas dentro, quesazo fundido. El auténtico tacos francés, en Calle Ojos del Guadiana 3, Ciudad Real. Pide ya por Glovo.",
  applicationName: "CLM French Tacos",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    siteName: "CLM French Tacos",
    title: "CLM French Tacos · Tacos urbanos 100% franceses",
    description:
      "Carne jugosa, patatas dentro, quesazo fundido. En Ciudad Real. Pide por Glovo.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "CLM French Tacos" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CLM French Tacos",
    description: "Tacos urbanos, 100% franceses, en Ciudad Real.",
    images: ["/og.jpg"],
  },
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true },
  appleWebApp: {
    capable: true,
    title: "CLM Tacos",
    statusBarStyle: "black-translucent",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: "#070707",
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
        <LocaleProvider>
        <SoundProvider>
          <Loader />
          <SmoothScroll />
          <Cursor />
          <ScrollIndicator />
          <NeonMode />
          <KonamiMode />
          <WarpFilter />
          <ServiceWorker />
          <InstallPrompt />
          <DebugPanel />
          <main id="main" className="flex-1">
            {children}
          </main>
          <RestaurantJsonLd />
        </SoundProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
