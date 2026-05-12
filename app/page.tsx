import { Hero } from "@/components/sections/Hero";
import { Offers } from "@/components/sections/Offers";
import { News } from "@/components/sections/News";
import { Location } from "@/components/sections/Location";
import { Franchise } from "@/components/sections/Franchise";
import { AppTeaser } from "@/components/sections/App";

export default function Home() {
  return (
    <>
      <Hero />
      <Offers />
      <News />
      <Location />
      <Franchise />
      <AppTeaser />
    </>
  );
}
