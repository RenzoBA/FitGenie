import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center min-h-screen sm:h-screen relative px-5">
      <div>
        <h1 className="text-6xl sm:text-8xl font-black text-primary text-center">
          FitGenie<span className="text-4xl align-top">&reg;</span>
        </h1>
        <p className="text-base sm:text-xl font-light text-center text-muted-foreground">
          Your Fitness Coach app of customized workouts
        </p>
      </div>
      <div className="mt-12 space-y-3">
        <p className="visible text-sm sm:text-base uppercase font-extralight text-primary text-center">
          Powered by
        </p>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-10">
          <Image
            src="/assets/oai-logo.svg"
            alt="openai-logo"
            width={120}
            height={120}
            className="scale-90 sm:scale-100"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
