"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Car, Users, Calendar, Star } from "lucide-react";

interface CounterProps {
  value: number;
  suffix?: string;
  decimals?: number;
}

function AnimatedCounter({ value, suffix = "", decimals = 0 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // 2 seconds
      const increment = value / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-black text-white">
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const stats = [
  {
    icon: Car,
    value: 50,
    suffix: "+",
    label: "Cars Available",
  },
  {
    icon: Users,
    value: 2000,
    suffix: "+",
    label: "Happy Customers",
  },
  {
    icon: Calendar,
    value: 5,
    suffix: "+",
    label: "Years of Experience",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "",
    decimals: 1,
    label: "Average Rating",
  },
];

export function Statistics() {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="currentColor" strokeWidth="2" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 300 }}
                viewport={{ once: true }}
                className="group flex flex-col items-center justify-center p-8 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 backdrop-blur-md shadow-2xl transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white mb-6 shadow-[0_0_30px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_40px_rgba(59,130,246,0.8)] transition-all duration-500 z-10">
                  <Icon className="w-10 h-10 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex flex-col items-center z-10">
                  <div className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.6)] transition-all duration-500">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                  </div>
                  <span className="text-blue-100 font-semibold mt-3 text-sm md:text-base uppercase tracking-widest group-hover:text-white transition-colors duration-300">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
