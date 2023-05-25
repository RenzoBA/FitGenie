import React from "react";

const HowWorksPage = () => {
  return (
    <div className="absolute inset-x-0 py-36 flex flex-col justify-start items-center text-center px-10">
      <div>
        <h1 className="text-6xl font-black bg-clip-text text-opacity-0 text-white bg-gradient-to-r from-red-400 to-green-400">
          FitGenie<span className="text-2xl align-top">&reg;</span>
        </h1>
        <p className="text-2xl font-medium text-white mt-5">HOW WORKS</p>
      </div>
      <div className="font-light text-zinc-500 mt-3 leading-relaxed space-y-5 max-w-5xl"></div>
    </div>
  );
};

export default HowWorksPage;
