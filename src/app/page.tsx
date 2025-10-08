import MainHeader from "@/components/MainHeader";
import MainWeatherInfoTile from "@/components/MainWeatherInfoTile";
import Navbar from "@/components/Navbar";
import SearchCityWeather from "@/components/SearchCityWeather";

export default function Home() {
  return (
    <main
      className="flex flex-col items-center px-4 pt-4 sm:pt-6 sm:px-6 md:pt-12 md:px-29 justify-start min-h-screen"
    >
      <Navbar />
      <header>
        <MainHeader />
      </header>
      <SearchCityWeather />
      <section
        className="mt-15 text-neutral-300 w-full flex flex-col lg:flex-row justify-start items-center"
      >
        <div className="w-[64%] flex flex-col justify-start items-start">
          <MainWeatherInfoTile />
        </div>
      </section>
    </main>
  );
}
