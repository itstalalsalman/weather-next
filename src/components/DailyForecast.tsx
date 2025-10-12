"use client";
import { useWeatherStore } from "@/lib/store";
import Image from "next/image";

const weatherIcons: Record<number, string> = {
  0: "/images/Clear-sunny.svg", // Clear sky
  1: "/images/Clear-sunny.svg", // Mainly clear
  2: "/images/Partly Cloudy.svg",
  3: "/images/Overcast.svg",
  45: "/images/fog.svg",
  48: "/images/fog.svg",
  51: "/images/drizzle.svg",
  53: "/images/drizzle.svg",
  55: "/images/drizzle.svg",
  61: "/images/rain.svg",
  63: "/images/rain.svg",
  65: "/images/rain.svg",
  71: "/images/snow.svg",
  73: "/images/snow.svg",
  75: "/images/snow.svg",
  80: "/images/showers.svg",
  81: "/images/showers.svg",
  82: "/images/showers.svg",
  95: "/images/Thunderstorms.svg",
  96: "/images/Thunderstorms.svg",
  99: "/images/Thunderstorms.svg",
};

export default function DailyForecast() {
  const { weather } = useWeatherStore();

  if (!weather?.daily) return null;

  const daily = weather.daily;
  const today = new Date();

  return (
    <section className="w-full mt-12 flex justify-between gap-4 flex-wrap">
      
      {daily.times?.slice(0, 7).map((time: string, i: number) => {
        const date = new Date(time);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
        const max = Math.round(daily.temperature_max[i]);
        const min = Math.round(daily.temperature_min[i]);
        const code = daily.weathercode[i];
        const icon = weatherIcons[code];
        return (
          <div
            key={i}
            className="flex flex-col items-center justify-between bg-neutral-800 rounded-xl w-25 h-41 px-2.5 py-4 text-white shadow-md"
          >
            <p className="text-lg font-medium">{dayName}</p>
            <div className="relative w-15 h-15">
              <Image src={icon} alt="weather icon" fill sizes="60px" />
            </div>
            <div className="flex justify-between w-full text-[16px] font-semibold">
              <span>{max}°</span>
              <span className="opacity-70">{min}°</span>
            </div>
          </div>
        );
      })}
    </section>
  );
}
