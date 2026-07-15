"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, X } from "lucide-react";

export function PromotionBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-gradient-to-r from-primary to-blue-600 text-white relative z-50"
      >
        <div className="container mx-auto px-4 py-2 sm:py-3 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm">
          <div className="flex items-center gap-2 font-medium text-center sm:text-left">
            <span className="bg-white/20 px-2 py-0.5 rounded text-xs uppercase tracking-wider font-bold">Limited Offer</span>
            <span>Get 15% OFF all Premium SUVs this weekend!</span>
          </div>
          
          <div className="flex items-center gap-2 font-bold bg-black/20 px-3 py-1 rounded-full">
            <Timer className="w-4 h-4 text-blue-200" />
            <span className="w-6 text-center">{timeLeft.hours.toString().padStart(2, '0')}</span>:
            <span className="w-6 text-center">{timeLeft.minutes.toString().padStart(2, '0')}</span>:
            <span className="w-6 text-center">{timeLeft.seconds.toString().padStart(2, '0')}</span>
          </div>

          <button 
            onClick={() => setIsVisible(false)}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
