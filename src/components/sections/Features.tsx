"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wallet, Car, Clock, CalendarRange, Smile, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Wallet,
    title: "Affordable Rates",
    description: "Premium vehicles at competitive prices with no hidden fees.",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
  },
  {
    icon: Car,
    title: "Well Maintained Cars",
    description: "Our fleet is regularly serviced and meticulously cleaned.",
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",
  },
  {
    icon: Zap,
    title: "Easy Booking",
    description: "Book your perfect car in seconds via our streamlined WhatsApp process.",
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",
  },
  {
    icon: CalendarRange,
    title: "Flexible Duration",
    description: "Daily, weekly, or monthly rentals tailored to your specific needs.",
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400",
  },
  {
    icon: Smile,
    title: "Friendly Support",
    description: "24/7 dedicated local support team ready to assist you anytime.",
    color: "bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-400",
  },
  {
    icon: Clock,
    title: "Fast Pick-Up & Return",
    description: "Zero waiting time with our expedited handover process.",
    color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400",
  },
];

const containerVariants: any = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Features() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">
            Why Choose Us
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
            The Premium Choice for Car Rental in Penang
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            We deliver an exceptional experience from booking to return. Discover why thousands of travelers trust DANZ RENTAL.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={index} variants={itemVariants} whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="group h-full border border-slate-100 dark:border-slate-800 shadow-lg shadow-slate-200/40 dark:shadow-none dark:bg-slate-900/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-8 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${feature.color}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
