import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LovableBackground from "@/components/LovableBackground";
import DestinationsCarousel from "@/components/DestinationsCarousel";
import GuidesCarousel from "@/components/GuidesCarousel";
import ToursCarousel from "@/components/ToursCarousel";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <LovableBackground />
      <Header />
      <main className="min-h-screen">
        <Hero />
        <DestinationsCarousel />
        <GuidesCarousel />
        <ToursCarousel />
      </main>
    </div>
  );
}

