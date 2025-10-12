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
  loading: boolean;
  error: string | null;


  setUnits: (units: Partial<UnitSettings>) => void;
  setName: (name: string | null) => void;
  fetchWeather: (city: string) => Promise<void>;
  fetchWeatherByCoords: (lat: number, lon: number) => Promise<void>;
};

export const useWeatherStore = create<WeatherStore>((set, get) => ({
  units: {
    temperature: "celsius",
    wind: "kmh",
    precipitation: "mm",
  },

  weather: null,
  name: null,
  loading: false,
  error: null,

  
  setName: (name) => set({ name }),

  setUnits: (units) =>
    set((state) => ({
      units: { ...state.units, ...units },
    })),

  fetchWeather: async (city: string) => {
    try {
      set({ loading: true, error: null });
      
      const geoRes = await axios.get(`/api/geocode`, {
        params: { name: city },
      });

      if (!geoRes.data.results?.length) {
        throw new Error("City not found");
      }

      const { latitude, longitude } = geoRes.data.results[0];
      const reverseRes = await axios.get(`/api/reverse-geocode`, {
        params: { latitude, longitude },
      });

      let locationName = null;
      if (reverseRes.data) {
        const { city, country } = reverseRes.data;
        console.log("Reverse geocoding location:", { city, country });
        locationName = `${city}, ${country}`;
        set({ name: locationName });
      } 
      
      await get().fetchWeatherByCoords(latitude, longitude);

    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  },

  fetchWeatherByCoords: async (lat: number, lon: number) => {
    try {
      set({ loading: true, error: null });

      // 🔸 Reverse geocode to get readable city name
      const reverseRes = await axios.get(`/api/reverse-geocode`, {
        params: { latitude: lat, longitude: lon },
      });

      let locationName = null;
      if (reverseRes.data) {
        const { city, country } = reverseRes.data;
        console.log("Reverse geocoding location:", { city, country });
        locationName = `${city}, ${country}`;
        set({ name: locationName });
      }

      // 🔸 Now fetch actual weather
      const { units } = get();
      const res = await axios.get(`/api/weather`, {
        params: {
          latitude: lat,
          longitude: lon,
          temperature_unit: units.temperature,
          windspeed_unit: units.wind,
          precipitation_unit: units.precipitation === "in" ? "inch" : "mm",
        },
      });
      
      console.log("Fetched weather data:", res.data);
      set({ weather: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch weather", loading: false });
    }
  },
}));
