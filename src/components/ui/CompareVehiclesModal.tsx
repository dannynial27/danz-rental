"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Car } from "@/data/cars";

interface CompareVehiclesModalProps {
  cars: Car[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (carId: number) => void;
  onBook?: (car: Car) => void;
}

export function CompareVehiclesModal({ cars, isOpen, onClose, onRemove, onBook }: CompareVehiclesModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Compare Vehicles</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-auto p-6">
            {cars.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🚗</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No vehicles selected</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                  Select up to 3 vehicles from our fleet to compare their features and specifications side-by-side.
                </p>
                <Button onClick={onClose} className="mt-6 rounded-xl">Back to Fleet</Button>
              </div>
            ) : (
              <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
                {cars.map((car) => (
                  <div key={car.id} className="min-w-[280px] w-full max-w-[350px] shrink-0 snap-center border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800/30 flex flex-col relative">
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full shadow-lg"
                      onClick={() => onRemove(car.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="aspect-[4/3] w-full relative">
                      <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{car.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{car.type}</p>
                      
                      <div className="text-3xl font-black text-primary mb-6">
                        RM{car.price}<span className="text-base text-slate-500 font-medium">/day</span>
                      </div>

                      <div className="space-y-3 flex-1 mb-6">
                        <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                          <span className="text-slate-500 dark:text-slate-400 text-sm">Transmission</span>
                          <span className="font-semibold text-slate-900 dark:text-white text-sm">{car.transmission}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                          <span className="text-slate-500 dark:text-slate-400 text-sm">Fuel Type</span>
                          <span className="font-semibold text-slate-900 dark:text-white text-sm">{car.fuel}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                          <span className="text-slate-500 dark:text-slate-400 text-sm">Seats</span>
                          <span className="font-semibold text-slate-900 dark:text-white text-sm">{car.seats}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                          <span className="text-slate-500 dark:text-slate-400 text-sm">Luggage</span>
                          <span className="font-semibold text-slate-900 dark:text-white text-sm">{car.luggage} bags</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                          <span className="text-slate-500 dark:text-slate-400 text-sm">Deposit</span>
                          <span className="font-semibold text-slate-900 dark:text-white text-sm">RM{car.deposit}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                          <span className="text-slate-500 dark:text-slate-400 text-sm">Weekly Discount</span>
                          <span className="font-semibold text-emerald-500 text-sm">{car.weeklyDiscount}% Off</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                          <span className="text-slate-500 dark:text-slate-400 text-sm">Monthly Discount</span>
                          <span className="font-semibold text-emerald-500 text-sm">{car.monthlyDiscount}% Off</span>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Key Features</h4>
                        <ul className="space-y-1 mb-6">
                          {car.features.slice(0, 4).map((f, i) => (
                            <li key={i} className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                              <Check className="w-4 h-4 text-primary mr-2 shrink-0 mt-0.5" />
                              <span className="truncate">{f}</span>
                            </li>
                          ))}
                        </ul>

                        <Button 
                          className="w-full rounded-xl" 
                          onClick={() => {
                            if (onBook) onBook(car);
                          }}
                          disabled={car.availability === "Booked"}
                        >
                          {car.availability === "Booked" ? "Unavailable" : "Book Now"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
