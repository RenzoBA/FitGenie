import { NextPage } from "next";
import React from "react";

const HowWorksPage: NextPage = () => {
  return (
    <div className="absolute inset-x-0 py-36 flex flex-col justify-start items-center text-center px-10">
      <div>
        <h1 className="text-6xl font-black text-primary">
          FitGenie<span className="text-2xl align-top">&reg;</span>
        </h1>
        <p className="text-2xl font-light text-muted-foreground mt-5 tracking-widest">
          HOW WORKS
        </p>
      </div>
      <div className="font-light text-muted-foreground mt-3 leading-relaxed space-y-5 max-w-3xl"></div>
    </div>
  );
};

export default HowWorksPage;
