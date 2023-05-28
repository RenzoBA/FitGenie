import Image from "next/image";

export default function Home() {
  return (
    <main className="absolute inset-0 py-36 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-8xl font-black text-primary">
        FitGenie<span className="text-4xl align-top">&reg;</span>
      </h1>
      <p className="text-xl font-light text-muted-foreground">
        Your fitness Coach app of customized workouts.
      </p>
      <div className="mt-12 space-y-3">
        <p className="text-base uppercase font-extralight text-primary text-center">
          Powered by
        </p>
        <div className="flex flex-wrap gap-5">
          <Image
            src="/assets/oai-logo.svg"
            alt="openai-logo"
            width={130}
            height={130}
            className=""
          />
        </div>
      </div>
    </main>
  );
}
