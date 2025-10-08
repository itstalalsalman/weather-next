"use client";

import { useState } from "react";
import { useWeatherStore } from "@/lib/store";
import { Search } from "lucide-react";

export default function SearchCityWeather() {
  const [query, setQuery] = useState("");
  const fetchWeather = useWeatherStore((state) => state.fetchWeather);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    console.log("Searching for:", query);
    fetchWeather(query);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-150 items-center justify-between gap-5 overflow-hidden"
    >
      <div className="w-[80%] flex items-center justify-start gap-2.5 rounded-lg text-gray-400 bg-neutral-800 px-5">
        <Search className="w-5 h-5" />
        <input
            type="text"
            placeholder="Search for a place..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-neutral-800 py-2.5 text-white placeholder-gray-400 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="px-5 py-2.5 bg-blue-500 hover:bg-blue-700 rounded-lg text-white font-medium cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}
