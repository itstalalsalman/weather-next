"use client";

import { useState } from "react";
import { Check, ChevronDown, Settings } from "lucide-react";
import { useWeatherStore } from "@/lib/store";

export default function UnitDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  // Zustand store values + setter
  const { units, setUnits } = useWeatherStore();

  return (
    <div className="relative inline-block text-left">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 bg-neutral-800 px-3 py-2 rounded-md text-white hover:bg-neutral-700"
      >
        <Settings className="w-4 h-4" />
        Units
        <ChevronDown className="w-4 h-4" />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-54 h-103 bg-neutral-800 text-white pt-3 pb-2 rounded-xl shadow-lg space-y-2.5 z-50 border-2 border-neutral-600">
          {/* Header */}
          <h3 className="text-sm font-medium text-gray-300 px-4">
            Switch to {units.temperature === "celsius" ? "Imperial" : "Metric"}
          </h3>

          {/* Temperature Section */}
          <div className="mx-1.5 border-b border-neutral-600 pb-2">
            <p className="text-xs text-gray-400 mb-1.5 px-2.5">Temperature</p>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setUnits({ temperature: "celsius" })}
                className={`hover:cursor-pointer flex items-center justify-between px-2.5 py-2 rounded-md ${
                  units.temperature === "celsius"
                    ? "bg-neutral-700"
                    : "hover:bg-neutral-700"
                }`}
              >
                Celsius (°C)
                {units.temperature === "celsius" && (
                  <Check className="w-4 h-4 text-accent" />
                )}
              </button>
              <button
                onClick={() => setUnits({ temperature: "fahrenheit" })}
                className={`hover:cursor-pointer flex items-center justify-between px-3 py-2 rounded-md ${
                  units.temperature === "fahrenheit"
                    ? "bg-neutral-700"
                    : "hover:bg-neutral-700"
                }`}
              >
                Fahrenheit (°F)
                {units.temperature === "fahrenheit" && (
                  <Check className="w-4 h-4 text-accent" />
                )}
              </button>
            </div>
          </div>

          {/* Wind Speed Section */}
          <div className="mx-1.5 border-b border-neutral-600 pb-2">
            <p className="text-xs text-gray-400 mb-1.5 px-2.5">Wind Speed</p>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setUnits({ wind: "kmh" })}
                className={`hover:cursor-pointer flex items-center justify-between px-3 py-2 rounded-md ${
                  units.wind === "kmh"
                    ? "bg-neutral-700"
                    : "hover:bg-neutral-700"
                }`}
              >
                km/h
                {units.wind === "kmh" && (
                  <Check className="w-4 h-4 text-accent" />
                )}
              </button>
              <button
                onClick={() => setUnits({ wind: "mph" })}
                className={`hover:cursor-pointer flex items-center justify-between px-3 py-2 rounded-md ${
                  units.wind === "mph"
                    ? "bg-neutral-700"
                    : "hover:bg-neutral-700"
                }`}
              >
                mph
                {units.wind === "mph" && (
                  <Check className="w-4 h-4 text-accent" />
                )}
              </button>
            </div>
          </div>

          {/* Precipitation Section */}
          <div className="mx-1.5">
            <p className="text-xs text-gray-400 mb-1.5 px-2.5">Precipitation</p>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setUnits({ precipitation: "mm" })}
                className={`hover:cursor-pointer flex items-center justify-between px-3 py-2 rounded-md ${
                  units.precipitation === "mm"
                    ? "bg-neutral-700"
                    : "hover:bg-neutral-700"
                }`}
              >
                Millimeters (mm)
                {units.precipitation === "mm" && (
                  <Check className="w-4 h-4 text-accent" />
                )}
              </button>
              <button
                onClick={() => setUnits({ precipitation: "in" })}
                className={`hover:cursor-pointer flex items-center justify-between px-3 py-2 rounded-md ${
                  units.precipitation === "in"
                    ? "bg-neutral-700"
                    : "hover:bg-neutral-700"
                }`}
              >
                Inches (in)
                {units.precipitation === "in" && (
                  <Check className="w-4 h-4 text-accent" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
