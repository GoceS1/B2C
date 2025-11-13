import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LovableBackground from "@/components/LovableBackground";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <LovableBackground />
      <Header />
      <main className="min-h-screen">
        <Hero />
      </main>
    </div>
  );
}

