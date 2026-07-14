"use client";

import React from "react";
import { motion } from "framer-motion";
import { Settings2, Users, Fuel, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const cars = [
  {
    id: 1,
    name: "Perodua Bezza",
    type: "Compact Sedan",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800", // placeholder luxury car as requested
    transmission: "Auto",
    fuel: "Petrol",
    seats: 5,
    price: "120",
    popular: true,
  },
  {
    id: 2,
    name: "Honda Civic",
    type: "Luxury Sedan",
    image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=800",
    transmission: "Auto",
    fuel: "Petrol",
    seats: 5,
    price: "250",
    popular: false,
  },
  {
    id: 3,
    name: "Toyota Vellfire",
    type: "Premium MPV",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800",
    transmission: "Auto",
    fuel: "Petrol",
    seats: 7,
    price: "450",
    popular: true,
  },
  {
    id: 4,
    name: "Honda HR-V",
    type: "Compact SUV",
    image: "https://images.unsplash.com/photo-1566274360936-ce019688b139?auto=format&fit=crop&q=80&w=800",
    transmission: "Auto",
    fuel: "Hybrid",
    seats: 5,
    price: "180",
    popular: false,
  },
  {
    id: 5,
    name: "Mercedes C-Class",
    type: "Luxury",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800",
    transmission: "Auto",
    fuel: "Petrol",
    seats: 5,
    price: "600",
    popular: false,
  },
  {
    id: 6,
    name: "Perodua Myvi",
    type: "Hatchback",
    image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=800",
    transmission: "Auto",
    fuel: "Petrol",
    seats: 5,
    price: "100",
    popular: true,
  },
];

export function Fleet() {
  const handleWhatsApp = (carName: string) => {
    const message = encodeURIComponent(`Hi DANZ RENTAL, I am interested in renting the ${carName}. Is it available?`);
    window.open(`https://wa.me/60124516452?text=${message}`, "_blank");
  };

  return (
    <section id="fleet" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">
              Our Premium Fleet
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              Find the Perfect Ride
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              From economical city cars to luxurious SUVs, our diverse fleet is guaranteed to meet your travel needs in Penang.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Card className="overflow-hidden border border-slate-100 dark:border-slate-800/60 bg-white dark:bg-slate-900 group hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-blue-900/20 transition-all duration-500 rounded-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 z-20" />
                
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {car.popular && (
                    <div className="absolute top-4 left-4 z-20">
                      <Badge className="bg-primary/90 backdrop-blur-md hover:bg-primary text-white font-medium px-3 py-1 text-xs uppercase tracking-wider shadow-lg">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <img
                    src={car.image}
                    alt={car.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-[0.33,1,0.68,1]"
                  />
                  {/* Glossy Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Hover Button Reveal on Image */}
                  <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.33,1,0.68,1] z-20 hidden md:block">
                    <Button 
                      className="w-full gap-2 rounded-xl h-12 text-base font-semibold shadow-xl shadow-primary/30"
                      onClick={() => handleWhatsApp(car.name)}
                    >
                      <MessageCircle className="w-5 h-5" />
                      Quick Book
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-6 relative z-10 bg-white dark:bg-slate-900">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{car.name}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{car.type}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">From</span>
                      <div className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors">RM{car.price}</div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">/day</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                    <div className="flex flex-col items-center justify-center gap-1.5 text-slate-600 dark:text-slate-300">
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                        <Settings2 className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                      </div>
                      <span className="text-xs font-medium">{car.transmission}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1.5 text-slate-600 dark:text-slate-300">
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                        <Fuel className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                      </div>
                      <span className="text-xs font-medium">{car.fuel}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1.5 text-slate-600 dark:text-slate-300">
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                        <Users className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                      </div>
                      <span className="text-xs font-medium">{car.seats} Seats</span>
                    </div>
                  </div>
                </CardContent>
                
                {/* Mobile Button (Hidden on Desktop hover) */}
                <CardFooter className="p-6 pt-0 md:group-hover:hidden transition-all duration-300 bg-white dark:bg-slate-900 relative z-10">
                  <Button 
                    className="w-full gap-2 rounded-xl h-12 text-base font-semibold border border-slate-200 dark:border-slate-800 shadow-sm"
                    variant="outline"
                    onClick={() => handleWhatsApp(car.name)}
                  >
                    <MessageCircle className="w-5 h-5" />
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
