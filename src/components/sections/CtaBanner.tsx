"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  const handleWhatsApp = () => {
    window.location.href = "https://wa.me/60124516452";
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-900 dark:bg-slate-950 -z-20" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 dark:opacity-30 mix-blend-overlay -z-10" />
      
      {/* Animated gradient orbs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[100px] -z-10 pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }} 
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10 pointer-events-none" 
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 p-10 md:p-16 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Ready to Explore Penang?
          </h2>
          <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Your premium ride is just a message away. Get in touch with us today and secure the best vehicle for your unforgettable trip.
          </p>
          
          <div className="relative inline-block group/btn">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full blur opacity-40 group-hover/btn:opacity-75 transition duration-500 group-hover/btn:duration-200 animate-pulse" />
            <Button
              size="lg"
              className="relative rounded-full text-lg h-16 px-10 gap-3 bg-white text-slate-900 hover:bg-slate-50 hover:scale-[1.02] active:scale-[0.98] transition-all"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="w-6 h-6 text-green-500" />
              <span className="font-bold">Book via WhatsApp Now</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
