"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings2, Users, Fuel, MessageCircle, Info, Plus, Scale, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car } from "@/data/cars";
import { VehicleDetailsModal } from "@/components/ui/VehicleDetailsModal";
import { CompareVehiclesModal } from "@/components/ui/CompareVehiclesModal";
import { useCars } from "@/context/CarsContext";

export function Fleet() {
  const { cars, loading } = useCars();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [compareIds, setCompareIds] = useState<number[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const toggleCompare = (e: React.MouseEvent, carId: number) => {
    e.stopPropagation();
    if (compareIds.includes(carId)) {
      setCompareIds(prev => prev.filter(id => id !== carId));
    } else {
      if (compareIds.length >= 3) {
        alert("You can only compare up to 3 vehicles at a time.");
        return;
      }
      setCompareIds(prev => [...prev, carId]);
    }
  };

  const handleWhatsApp = (e: React.MouseEvent, carName: string) => {
    e.stopPropagation();
    const message = encodeURIComponent(`Hi DANZ RENTAL, I am interested in renting the ${carName}. Is it available?`);
    window.location.href = `https://wa.me/60124516452?text=${message}`;
  };

  const categories = ["All", ...Array.from(new Set(cars.map(car => car.type)))];
  
  const filteredCars = selectedCategory === "All" 
    ? cars 
    : cars.filter(car => car.type === selectedCategory);

  if (loading) {
    return (
      <section id="fleet" className="py-24 bg-slate-50 dark:bg-slate-900/50 relative">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex justify-center items-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium animate-pulse">Loading premium fleet...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="fleet" className="py-24 bg-slate-50 dark:bg-slate-900/50 relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
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
          
          {/* Desktop Compare Trigger */}
          {compareIds.length > 0 && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="hidden md:flex">
              <Button onClick={() => setIsCompareOpen(true)} className="gap-2 rounded-xl h-12 px-6 shadow-xl shadow-primary/20 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
                <Scale className="w-5 h-5" />
                Compare ({compareIds.length})
              </Button>
            </motion.div>
          )}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                  : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="cursor-pointer"
              onClick={() => setSelectedCar(car)}
            >
              <Card className={`overflow-hidden border-2 bg-white dark:bg-slate-900 group hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-blue-900/20 transition-all duration-500 rounded-2xl relative ${compareIds.includes(car.id) ? 'border-primary shadow-lg shadow-primary/10' : 'border-slate-100 dark:border-slate-800/60'}`}>
                
                {/* Compare Checkbox Toggle */}
                <div 
                  className="absolute top-4 right-4 z-30"
                  onClick={(e) => toggleCompare(e, car.id)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md backdrop-blur-md border ${compareIds.includes(car.id) ? 'bg-primary text-white border-primary' : 'bg-white/70 text-slate-400 border-white hover:bg-white hover:text-slate-900'}`}>
                    {compareIds.includes(car.id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </div>

                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                    {car.popular && (
                      <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 border-none text-white font-semibold px-3 py-1.5 text-[10px] uppercase tracking-widest shadow-lg">
                        Most Popular
                      </Badge>
                    )}
                    <Badge className={`border-none font-semibold px-3 py-1.5 text-[10px] uppercase tracking-widest shadow-lg ${
                      car.availability === "Available" ? "bg-emerald-500 text-white" :
                      car.availability === "Limited" ? "bg-amber-500 text-white" :
                      "bg-rose-500 text-white"
                    }`}>
                      {car.availability}
                    </Badge>
                  </div>
                  
                  <img
                    src={car.image}
                    alt={car.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-[0.33,1,0.68,1]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Hover Buttons on Image */}
                  <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.33,1,0.68,1] z-20 hidden md:flex gap-3">
                    <Button 
                      className="flex-1 rounded-xl h-12 text-sm font-semibold shadow-xl"
                      variant="secondary"
                      onClick={(e) => { e.stopPropagation(); setSelectedCar(car); }}
                    >
                      <Info className="w-4 h-4 mr-2" /> Details
                    </Button>
                    <Button 
                      className="flex-1 rounded-xl h-12 text-sm font-semibold shadow-xl shadow-primary/30"
                      onClick={(e) => handleWhatsApp(e, car.name)}
                      disabled={car.availability === "Booked"}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" /> Book
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
                <CardFooter className="p-6 pt-0 md:group-hover:hidden transition-all duration-300 bg-white dark:bg-slate-900 relative z-10 flex gap-3">
                  <Button 
                    className="flex-1 rounded-xl h-11 text-sm font-semibold border border-slate-200 dark:border-slate-800 shadow-sm"
                    variant="outline"
                    onClick={(e) => { e.stopPropagation(); setSelectedCar(car); }}
                  >
                    Details
                  </Button>
                  <Button 
                    className="flex-1 rounded-xl h-11 text-sm font-semibold shadow-sm"
                    onClick={(e) => handleWhatsApp(e, car.name)}
                    disabled={car.availability === "Booked"}
                  >
                    Book
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile Compare Floating Button */}
      <AnimatePresence>
        {compareIds.length > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0, x: "-50%" }} 
            animate={{ y: 0, opacity: 1, x: "-50%" }} 
            exit={{ y: 100, opacity: 0, x: "-50%" }}
            className="fixed bottom-24 left-1/2 z-40 md:hidden"
          >
            <Button onClick={() => setIsCompareOpen(true)} className="gap-2 rounded-full h-14 px-8 shadow-2xl shadow-primary/40 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 font-bold text-base border-2 border-white/10">
              <Scale className="w-5 h-5" />
              Compare ({compareIds.length})
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <VehicleDetailsModal 
        car={selectedCar} 
        isOpen={!!selectedCar} 
        onClose={() => setSelectedCar(null)} 
      />

      <CompareVehiclesModal
        cars={cars.filter(c => compareIds.includes(c.id))}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onRemove={(id) => setCompareIds(prev => prev.filter(cId => cId !== id))}
      />

    </section>
  );
}
