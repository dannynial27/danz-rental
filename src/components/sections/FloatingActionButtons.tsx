"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ArrowUp } from "lucide-react";

export function FloatingActionButtons() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 500px (typically past hero section)
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsApp = () => {
    window.open("https://wa.me/60124516452", "_blank");
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col gap-4"
        >
          <button
            onClick={handleScrollTop}
            className="group flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:-translate-y-1"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
