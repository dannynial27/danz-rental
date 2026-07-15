"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, ShieldCheck, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const originalTestimonials = [
  {
    name: "Sarah Jenkins",
    date: "2 weeks ago",
    quote: "Absolutely brilliant service! The car was spotless and the WhatsApp booking was so convenient. They even dropped the car at my hotel in Georgetown. Highly recommend!",
    rating: 5,
  },
  {
    name: "Ahmad Faizal",
    date: "1 month ago",
    quote: "I frequently travel to Penang for work. DANZ RENTAL is always my go-to. Their cars are reliable, and the rates are very reasonable compared to the big franchise companies.",
    rating: 5,
  },
  {
    name: "Mei Lin",
    date: "3 months ago",
    quote: "Rented a Honda HR-V for a family weekend trip. The car was in perfect condition and very comfortable. The team is incredibly friendly and professional.",
    rating: 5,
  },
  {
    name: "John Doe",
    date: "4 months ago",
    quote: "The easiest car rental experience I've ever had. No hidden fees, clear communication via WhatsApp, and the car drove like a dream.",
    rating: 5,
  },
  {
    name: "Emily Chen",
    date: "5 months ago",
    quote: "Affordable and transparent. Loved the Vellfire for our large group. Very spacious.",
    rating: 4,
  }
];

// Duplicate for infinite scroll
const testimonials = [...originalTestimonials, ...originalTestimonials, ...originalTestimonials];

export function Testimonials() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 mb-12 relative z-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 bg-slate-50 dark:bg-slate-800/30">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
              Excellent
              <span className="flex text-amber-500">
                {[1, 2, 3, 4, 5].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 font-medium">Based on 145 authentic reviews</p>
          </div>
          
          <div className="flex items-center gap-4 text-sm font-semibold bg-white dark:bg-slate-900 px-5 py-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
            <span className="text-slate-700 dark:text-slate-200">100% Verified Customer Reviews</span>
          </div>
        </div>
      </div>

      <div className="relative flex overflow-x-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex whitespace-nowrap items-stretch gap-6 px-3"
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-[320px] md:w-[400px] flex-shrink-0">
              <Card className="h-full border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md bg-white dark:bg-slate-900 relative transition-all duration-300 rounded-2xl">
                <CardContent className="p-6 whitespace-normal h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <User className="w-5 h-5 text-slate-500" />
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-900 dark:text-white text-sm">
                          {testimonial.name}
                        </h5>
                        <p className="text-xs text-slate-500">{testimonial.date}</p>
                      </div>
                    </div>
                    {/* Google G icon approximation */}
                    <div className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] bg-blue-500 text-white">
                      G
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'fill-current' : 'fill-slate-200 dark:fill-slate-700 text-slate-200 dark:text-slate-700'}`} />
                    ))}
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-2">
                    {testimonial.quote}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
