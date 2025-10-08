"use client";   

import { motion } from "framer-motion";

export default function MainHeader() {
  return (
    <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="text-5xl 3xl:text-6xl font-bold text-neutral-0 mb-15"
    >
        How’s the sky looking today?
    </motion.h2>
  )
}

