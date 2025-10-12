"use client";

import { useWeatherStore } from "@/lib/store";



export default function WeatherInfoTiles() {
    const { weather } = useWeatherStore();
    const dailyInfo = {
        feelsLike: {
            label: "Feels Like",
            value: weather ? `${Math.round(weather.current.apparent_temperature)}°` : "--",
        },
        humidity: {
            label: "Humidity",
            value: weather ? `${weather.current.humidity}%` : "--",
        },
        windSpeed: {
            label: "Wind Speed",
            value: weather ? `${Math.round(weather.current.windspeed)} ${weather.units.wind}` : "--",
        },
        precipitation: {
            label: "Precipitation",
            value: weather ? `${weather.current.precipitation} ${weather.units.precipitation}` : "--",
        },
    }
  return (
    <section
        className="w-full grid grid-col-2 lg:grid-cols-4 gap-4 mt-8"
    >
        {Object.entries(dailyInfo).map(([key, info]) => (
            <div
                key={key}
                className="flex flex-col justify-start items-start bg-neutral-800 rounded-lg p-5 w-full"
            >
                <h3 className="text-lg text-neutral-200 mb-4">{info.label}</h3>
                <p className="text-3xl font-semibold text-neutral-0">{info.value}</p>
            </div>
        ))}
    </section>
  )
}

