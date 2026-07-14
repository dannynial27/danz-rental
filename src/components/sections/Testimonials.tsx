"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const originalTestimonials = [
  {
    name: "Sarah Jenkins",
    role: "Tourist from UK",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    quote: "Absolutely brilliant service! The car was spotless and the WhatsApp booking was so convenient. They even dropped the car at my hotel in Georgetown. Highly recommend!",
    rating: 5,
  },
  {
    name: "Ahmad Faizal",
    role: "Business Traveler",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    quote: "I frequently travel to Penang for work. DANZ RENTAL is always my go-to. Their cars are reliable, and the rates are very reasonable compared to the big franchise companies.",
    rating: 5,
  },
  {
    name: "Mei Lin",
    role: "Local Resident",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
    quote: "Rented a Honda HR-V for a family weekend trip. The car was in perfect condition and very comfortable. The team is incredibly friendly and professional.",
    rating: 5,
  },
  {
    name: "John Doe",
    role: "Digital Nomad",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    quote: "The easiest car rental experience I've ever had. No hidden fees, clear communication via WhatsApp, and the car drove like a dream.",
    rating: 5,
  },
];

// Duplicate for infinite scroll
const testimonials = [...originalTestimonials, ...originalTestimonials];

export function Testimonials() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden relative">
      {/* Soft gradient edges for smooth marquee cut-off */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 dark:from-slate-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 dark:from-slate-900 to-transparent z-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 mb-16 relative z-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">
            Customer Testimonials
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
            Don't Just Take Our Word For It
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Read what our happy customers have to say about their experience with DANZ RENTAL.
          </p>
        </div>
      </div>

      <div className="relative flex overflow-x-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex whitespace-nowrap items-stretch gap-6 px-3"
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-[350px] md:w-[450px] flex-shrink-0">
              <Card className="h-full border border-slate-200/60 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none bg-white dark:bg-slate-900 relative group hover:shadow-xl hover:-translate-y-1 transition-all duration-500 rounded-3xl">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-primary to-blue-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                  <Quote className="w-5 h-5 fill-current opacity-90" />
                </div>
                <CardContent className="p-8 whitespace-normal h-full flex flex-col">
                  <div className="flex items-center gap-1 text-amber-500 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-8 flex-grow">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20 p-0.5"
                    />
                    <div>
                      <h5 className="font-bold text-slate-900 dark:text-white">
                        {testimonial.name}
                      </h5>
                      <p className="text-sm font-medium text-primary/80">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
