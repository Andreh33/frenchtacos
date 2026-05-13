import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { Carta } from "@/components/sections/Carta";
import { Local } from "@/components/sections/Local";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Statement />
      <Carta />
      <Local />
      <Footer />
    </>
  );
}
