import { create } from "zustand";
import axios from "axios";

type UnitSettings = {
  temperature: "celsius" | "fahrenheit";
  wind: "kmh" | "mph";
  precipitation: "mm" | "in";
};

type WeatherData = any; // you can define a stricter type

type WeatherStore = {
  units: UnitSettings;
  weather: WeatherData | null;
  setUnits: (units: Partial<UnitSettings>) => void;
  fetchWeather: (city: string) => Promise<void>;
};

export const useWeatherStore = create<WeatherStore>((set, get) => ({
  units: {
    temperature: "celsius",
    wind: "kmh",
    precipitation: "mm",
  },
  weather: null,

  setUnits: (units) =>
    set((state) => ({
      units: { ...state.units, ...units },
    })),

  fetchWeather: async (city: string) => {
    try {
      // 1. Geocoding API call
      const geoRes = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      );

      if (!geoRes.data.results || geoRes.data.results.length === 0) {
        console.error("City not found");
        return;
      }

      const { latitude, longitude } = geoRes.data.results[0];

      // 2. Read units from store
      const { units } = get();
      const tempUnit = units.temperature === "celsius" ? "celsius" : "fahrenheit";
      const windUnit = units.wind === "kmh" ? "kmh" : "mph";
      const precUnit = units.precipitation === "mm" ? "mm" : "inch";

      // 3. Weather API call
      const weatherRes = await axios.get(
        `https://api.open-meteo.com/v1/forecast`,
        {
          params: {
            latitude,
            longitude,
            current_weather: true,
            temperature_unit: tempUnit,
            windspeed_unit: windUnit,
            precipitation_unit: precUnit,
          },
        }
      );

      set({ weather: weatherRes.data });
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  },
}));
