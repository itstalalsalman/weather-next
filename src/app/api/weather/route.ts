// src/app/api/weather/route.ts
import { NextResponse } from "next/server";
import { fetchWeatherApi } from "openmeteo";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("latitude");
    const lon = searchParams.get("longitude");
    const tempUnit = searchParams.get("temperature_unit") || "celsius";
    const windUnit = searchParams.get("windspeed_unit") || "km/h";
    const precUnit = searchParams.get("precipitation_unit") || "mm";

    if (!lat || !lon)
      return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });

    const params = {
      latitude: Number(lat),
      longitude: Number(lon),
      current: [
        "temperature_2m",
        "apparent_temperature",
        "precipitation",
        "relative_humidity_2m",
        "weathercode",
        "windspeed_10m",
      ],
      hourly: [
        "temperature_2m",
        "apparent_temperature",
        "precipitation",
        "relative_humidity_2m",
        "weathercode",
        "windspeed_10m",
      ],
      daily: [
        "temperature_2m_max",
        "temperature_2m_min",
        "precipitation_sum",
        "weathercode",
      ],
      temperature_unit: tempUnit,
      windspeed_unit: windUnit,
      precipitation_unit: precUnit,
      timezone: "auto",
      forecast_days: 7,
    };

    const [response] = await fetchWeatherApi(
      "https://api.open-meteo.com/v1/forecast",
      params
    );

    // Extract values
    const utcOffset = response.utcOffsetSeconds();
    const current = response.current();
    const hourly = response.hourly();
    const daily = response.daily();

    if (!current) {
      return NextResponse.json({ error: "No current weather data available" }, { status: 500 });
    }

    if (!hourly || !daily) {
      return NextResponse.json({ error: "No hourly or daily weather data available" }, { status: 500 });
    }

    const toDateArray = (start: bigint, end: bigint, step: number) => {
      const startNum = Number(start);
      const endNum = Number(end);
      return Array.from(
        { length: (endNum - startNum) / step },
        (_, i) => new Date((startNum + i * step + utcOffset) * 1000)
      );
    };

    const weatherData = {
      current: {
        time: new Date((Number(current.time()) + utcOffset) * 1000),
        temperature: current.variables(0)?.value(),
        apparent_temperature: current.variables(1)?.value(),
        precipitation: current.variables(2)?.value(),
        humidity: current.variables(3)?.value(),
        weathercode: current.variables(4)?.value(),
        windspeed: current.variables(5)?.value(),
      },
      hourly: {
        times: toDateArray(hourly.time(), hourly.timeEnd(), hourly.interval()),
        temperature: hourly.variables(0)?.valuesArray(),
        apparent_temperature: hourly.variables(1)?.valuesArray(),
        precipitation: hourly.variables(2)?.valuesArray(),
        humidity: hourly.variables(3)?.valuesArray(),
        weathercode: hourly.variables(4)?.valuesArray(),
        windspeed: hourly.variables(5)?.valuesArray(),
      },
      daily: {
        times: toDateArray(daily.time(), daily.timeEnd(), daily.interval()),
        temperature_max: daily.variables(0)?.valuesArray(),
        temperature_min: daily.variables(1)?.valuesArray(),
        precipitation_sum: daily.variables(2)?.valuesArray(),
        weathercode: daily.variables(3)?.valuesArray(),
      },
      units: { temperature: tempUnit, wind: windUnit, precipitation: precUnit },
    };

    console.log("Constructed weather data:", weatherData);  
    return NextResponse.json(weatherData, { status: 200 });
  } catch (err) {
    console.error("Weather API Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
