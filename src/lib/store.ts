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
  name: string | null;
  weather: WeatherData | null;
  setUnits: (units: Partial<UnitSettings>) => void;
  setName: (name: string | null) => void;
  fetchWeather: (city: string) => Promise<void>;
};

export const useWeatherStore = create<WeatherStore>((set, get) => ({
  units: {
    temperature: "celsius",
    wind: "kmh",
    precipitation: "mm",
  },
  weather: null,

  name: null,

  setName: (name) => set({ name }),

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
      console.log("Geocoding result:", geoRes.data);

      const { latitude, longitude } = geoRes.data.results[0];
      const { admin1, country } = geoRes.data.results[0];
      const cityName = `${admin1}, ${country}`;
      set({ name: cityName });
      
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
            hourly: "temperature_2m,precipitation,weathercode,windspeed_10m",
            daily: "temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode",
            forecast_days: 7,
            current_weather: true,
            temperature_unit: tempUnit,
            windspeed_unit: windUnit,
            precipitation_unit: precUnit,
          },
        }
      );
      console.log("Weather result:", weatherRes.data);
      set({ weather: weatherRes.data });
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  },
}));
