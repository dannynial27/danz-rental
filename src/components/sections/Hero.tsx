"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, ArrowRight, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleWhatsApp = () => {
    window.open("https://wa.me/60124516452", "_blank");
  };

  const scrollToFleet = () => {
    document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center">
      {/* Background with slight gradient and animated blob */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 -z-20" />
      
      {/* Decorative Blob */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-400/20 dark:bg-blue-600/10 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/4 -z-10 pointer-events-none" 
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col items-start gap-6 relative z-10"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50/80 dark:bg-blue-900/30 backdrop-blur-sm text-blue-700 dark:text-blue-300 font-medium text-sm border border-blue-100 dark:border-blue-800 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            #1 Car Rental in Penang
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Premium <span className="relative whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Car Rental
              <svg aria-hidden="true" viewBox="0 0 418 42" className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-500/20" preserveAspectRatio="none"><path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path></svg>
            </span> Experience.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
            Discover Penang with comfort and style. Affordable, reliable, and hassle-free vehicle rentals for your perfect journey.
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-xl text-base h-14 px-8 gap-2 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="w-5 h-5" />
              Book via WhatsApp
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group w-full sm:w-auto rounded-xl text-base h-14 px-8 gap-2 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all hover:border-slate-300 dark:hover:border-slate-700"
              onClick={scrollToFleet}
            >
              Browse Fleet
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex items-center gap-6 mt-8"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/100?img=${i + 10}`}
                  alt="Customer"
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-950 relative z-10 shadow-sm"
                />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-950 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-400 relative z-10 shadow-sm">
                +2k
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-0.5">
                Trusted by 2,000+ happy customers
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Content - Image & Floating Cards */}
        <motion.div
          style={{ y, opacity }}
          className="relative lg:h-[600px] w-full flex items-center justify-center lg:justify-end mt-12 lg:mt-0"
        >
          <div className="relative w-full max-w-lg aspect-square lg:aspect-auto lg:h-full lg:w-[120%] z-10">
            {/* Glowing Aura behind image */}
            <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-500/10 blur-[80px] rounded-full scale-90" />
            
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full relative"
            >
              <img
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=2000"
                alt="Premium Car Rental Penang"
                className="object-cover w-full h-full rounded-3xl shadow-2xl lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2"
              />
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/10 dark:ring-white/10" />
            </motion.div>
            
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5, type: "spring", bounce: 0.4 }}
              className="absolute -bottom-6 -left-6 md:-left-12 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 dark:border-slate-700/50 flex items-center gap-4 z-20 hover:scale-105 transition-transform"
            >
              <div className="bg-emerald-100 dark:bg-emerald-900/50 p-3 rounded-full text-emerald-600 dark:text-emerald-400 shadow-inner">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Fully Insured</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Drive with peace of mind</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
