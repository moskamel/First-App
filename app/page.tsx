import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import AIScanFeature from "@/components/sections/AIScanFeature";
import PriceCompareFeature from "@/components/sections/PriceCompareFeature";
import Categories from "@/components/sections/Categories";
import Rewards from "@/components/sections/Rewards";
import Stores from "@/components/sections/Stores";
import Reviews from "@/components/sections/Reviews";
import DownloadCTA from "@/components/sections/DownloadCTA";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <AIScanFeature />
      <PriceCompareFeature />
      <Categories />
      <Rewards />
      <Stores />
      <Reviews />
      <DownloadCTA />
      <Footer />
    </main>
  );
}
