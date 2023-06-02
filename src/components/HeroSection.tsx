import Image from "next/image";
import React from "react";
import ChatbotDisabled from "./ChatbotDisabled";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen sm:h-screen relative px-5">
      <h1 className="text-6xl sm:text-8xl font-black text-primary">
        FitGenie<span className="text-4xl align-top">&reg;</span>
      </h1>
      <p className="text-base sm:text-xl font-light text-center text-muted-foreground">
        Your Fitness Coach app of customized workouts
      </p>
      <div className="mt-12 space-y-3">
        <p className="invisible sm:visible text-base uppercase font-extralight text-primary text-center">
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
          <Image
            src="/assets/oai-logo.svg"
            alt="openai-logo"
            width={120}
            height={120}
            className="scale-90 sm:scale-100"
          />
        </div>
      </div>
      <ChatbotDisabled />
    </div>
  );
};

export default HeroSection;
