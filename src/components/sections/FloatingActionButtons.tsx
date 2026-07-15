"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingActionButtons() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show buttons after scrolling down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hi DANZ RENTAL, I would like to make an inquiry.");
    window.location.href = `https://wa.me/60124516452?text=${message}`;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
          >
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-primary hover:bg-white"
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Button
              onClick={handleWhatsApp}
              size="icon"
              className="h-14 w-14 rounded-full shadow-xl bg-emerald-500 hover:bg-emerald-600 text-white relative group"
            >
              <MessageCircle className="w-6 h-6" />
              {/* Tooltip */}
              <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Chat with us
                <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-slate-900" />
              </div>
            </Button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
