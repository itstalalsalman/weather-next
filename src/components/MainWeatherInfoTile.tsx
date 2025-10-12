"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useWeatherStore } from "@/lib/store";
import { useEffect } from "react";

export default function MainWeatherInfoTile() {

    const { name, weather,  fetchWeatherByCoords, fetchWeather } = useWeatherStore();
    
    useEffect(() => {
        // Option 1: Use user's current location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
            },
            (err) => {
              console.warn("Geolocation failed:", err);
              // Option 2: Fallback to default city
              fetchWeather("Ankara");
            }
          );
        } else {
          fetchWeather("Ankara"); // fallback default
        }
    }, [fetchWeather, fetchWeatherByCoords]);

    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long", 
      month: "short",
      day: "numeric",
      year: "numeric"
    };
    const formattedDate = today.toLocaleDateString("en-US", options);

  return (
    <main className="w-full relative h-70 bg-neutral-800 rounded-lg p-6 flex justify-between items-center bg-gradient-to-br from-blue-500 to-blue-700 overflow-hidden">
      
      
      <div className="flex flex-col space-y-2.5 z-50">
        <h2 className="text-3xl font-bold text-neutral-0">{name}</h2>
        <p className="text-lg text-neutral-0">{formattedDate}</p>
      </div>
      
      <div className="flex justify-center items-center space-x-4 z-50">
        <Image 
            src="/images/Clear-sunny.svg"
            width={120}
            height={120}
            alt="Current Weather Icon"
        />
        <h1 className="text-8xl text-neutral-0 font-semibold italic text-center -mt-4">{Math.round(weather?.current.temperature)}&deg;</h1>
      </div>
      
      {/* 🌟 Animated Stars */}
      <motion.div
        className="absolute top-10 left-10"
        animate={{ y: [0, -10, 0], opacity: [1, 0.7, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src="/images/OrangeStar.svg" width={20} height={20} alt="Star" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-80"
        animate={{ y: [0, 8, 0], opacity: [1, 0.6, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src="/images/OrangeStar.svg" width={20} height={20} alt="Star" />
      </motion.div>

      <motion.div
        className="absolute top-12 left-80"
        animate={{ y: [0, -12, 0], opacity: [1, 0.5, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src="/images/SilverStar.svg" width={20} height={20} alt="Star" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-28"
        animate={{ y: [0, 10, 0], opacity: [1, 0.8, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src="/images/SilverStar.svg" width={20} height={20} alt="Star" />
      </motion.div>

      {/* ☁️ Animated Clouds */}
      <motion.div
        className="absolute top-0 right-0 z-5"
        animate={{ x: [0, 50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/images/Cloud.svg"
          width={220}
          height={220}
          alt="Cloud"
          priority
        />
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 z-5"
        animate={{ x: [0, -50, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/images/Cloud.svg"
          width={250}
          height={250}
          alt="Cloud"
          priority
        />
      </motion.div>
    </main>
  );
}
