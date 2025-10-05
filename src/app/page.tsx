import Navbar from "@/components/Navbar";
import SearchCityWeather from "@/components/SearchCityWeather";

export default function Home() {
  return (
    <main
      className="flex flex-col items-center px-4 pt-4 sm:pt-6 sm:px-6 md:pt-12 md:px-29 justify-start min-h-screen"
    >
      <Navbar />
      <header>
        <h2 className="text-4xl 3xl:text-5xl font-bold text-neutral-0 mb-10">How’s the sky looking today?</h2>
      </header>
      <SearchCityWeather />
    </main>
  );
}
