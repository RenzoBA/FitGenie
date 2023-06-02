import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center">
      <HeroSection />
      <HeroSection />
      {/* add more sections... */}
    </main>
  );
}
