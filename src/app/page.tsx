export default function Home() {
  return (
    <main className="absolute inset-0 flex flex-col justify-center items-center">
      <h1 className="text-8xl font-black bg-clip-text text-opacity-0 text-white bg-gradient-to-r from-red-400 to-green-400">
        FitGenie<span className="text-4xl align-top">&reg;</span>
      </h1>
      <p className="text-xl font-light text-zinc-500">
        Your fitness Coach app of custom workouts.
      </p>
    </main>
  );
}
