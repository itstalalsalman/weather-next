import DailyForecast from "@/components/DailyForecast";
import MainHeader from "@/components/MainHeader";
import MainWeatherInfoTile from "@/components/MainWeatherInfoTile";
import Navbar from "@/components/Navbar";
import SearchCityWeather from "@/components/SearchCityWeather";
import WeatherInfoTiles from "@/components/WeatherInfoTiles";

export default function Home() {
  return (
    <main
      className="flex flex-col items-center px-4 py-4 sm:py-6 sm:px-6 md:py-12 md:px-29 justify-start min-h-screen"
    >
      <Navbar />
      <header>
        <MainHeader />
      </header>
      <SearchCityWeather />
      <section
        className="mt-15 text-neutral-300 w-full flex flex-col lg:flex-row justify-start items-center"
      >
        <div className="w-full lg:w-[64%] flex flex-col justify-start items-start gap">
          <MainWeatherInfoTile />
          <WeatherInfoTiles />
          <DailyForecast /> 
        </div>
      </section>
    </main>
  );
}
