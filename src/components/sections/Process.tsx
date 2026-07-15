"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Car, MessageCircle, CheckCircle2, Key, Map } from "lucide-react";

const steps = [
  {
    icon: Car,
    title: "Choose Vehicle",
    description: "Browse our premium fleet and select the perfect car for your journey in Penang.",
  },
  {
    icon: MessageCircle,
    title: "Contact via WhatsApp",
    description: "Send us a message with your rental dates and chosen vehicle.",
  },
  {
    icon: CheckCircle2,
    title: "Confirm Booking",
    description: "We will quickly verify availability and finalize your reservation.",
  },
  {
    icon: Key,
    title: "Pick Up Car",
    description: "Collect your clean and fully inspected vehicle at your convenience.",
  },
  {
    icon: Map,
    title: "Enjoy Your Journey",
    description: "Drive safely and explore all the beautiful destinations in Penang.",
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Background line vs Active line
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="py-24 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">
            How It Works
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Simple & Fast Booking Process
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We've streamlined our rental process so you can get on the road faster. No complicated forms, just direct and friendly service.
          </p>
        </div>

        <div className="relative" ref={containerRef}>
          {/* Base Background Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-slate-100 dark:bg-slate-800 -translate-x-1/2 rounded-full" />
          
          {/* Animated Active Line */}
          <motion.div 
            className="absolute left-8 md:left-1/2 top-0 w-1 bg-gradient-to-b from-primary/50 to-primary -translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)] origin-top"
            style={{ height: lineHeight }}
          />

          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative flex items-center gap-8 md:gap-0 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Dot */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5, delay: 0.3 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="absolute left-8 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white dark:bg-slate-900 border-[3px] border-primary flex items-center justify-center z-10 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                  >
                    <div className="text-primary font-bold text-lg">{index + 1}</div>
                  </motion.div>

                  {/* Content */}
                  <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? "md:pr-16 text-left md:text-right" : "md:pl-16 text-left"}`}>
                    <div className="group bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/30 dark:shadow-none hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-200 dark:hover:border-blue-800/50 transition-all duration-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className={`relative z-10 flex flex-col ${isEven ? "md:items-end" : "md:items-start"} items-start`}>
                        <div className={`w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm`}>
                          <Icon className="w-7 h-7" />
                        </div>
                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                          {step.title}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
