import HeroSection from "@/components/HeroSection";
import { NextPage } from "next";

const page: NextPage = () => {
  return (
    <main className="flex flex-col justify-center items-center">
      <HeroSection />
      {/* add more sections... */}
    </main>
  );
};

export default page;
