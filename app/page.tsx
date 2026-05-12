import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { Carta } from "@/components/sections/Carta";
import { Ofertas } from "@/components/sections/Ofertas";
import { Local } from "@/components/sections/Local";
import { Franquicia } from "@/components/sections/Franquicia";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Statement />
      <Carta />
      <Ofertas />
      <Local />
      <Franquicia />
      <Footer />
    </>
  );
}
