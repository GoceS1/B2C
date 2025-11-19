"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedSwitchingText() {
  const [currentWord, setCurrentWord] = useState<"tour" | "guide">("tour");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev === "tour" ? "guide" : "tour"));
    }, 5000); // Switch every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block text-left">
      {/* Invisible text to set layout width and baseline */}
      <span className="invisible opacity-0">guide</span>
      
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWord}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
          className="absolute left-0 top-0 whitespace-nowrap"
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

