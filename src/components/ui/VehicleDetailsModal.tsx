"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, CalendarDays, Wallet, CarFront, MessageCircle, Info, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car } from "@/data/cars";

interface VehicleDetailsModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
  onBook?: () => void;
}

export function VehicleDetailsModal({ car, isOpen, onClose, onBook }: VehicleDetailsModalProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [days, setDays] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  useEffect(() => {
    if (car) {
      let baseTotal = car.price * days;
      if (days >= 30) {
        baseTotal = baseTotal * (1 - car.monthlyDiscount / 100);
      } else if (days >= 7) {
        baseTotal = baseTotal * (1 - car.weeklyDiscount / 100);
      }
      setTotalPrice(baseTotal + car.deposit);
    }
  }, [car, days]);

  if (!car) return null;

  const nextImage = () => setActiveImage((prev) => (prev + 1) % car.gallery.length);
  const prevImage = () => setActiveImage((prev) => (prev === 0 ? car.gallery.length - 1 : prev - 1));

  const handleBook = () => {
    if (onBook) {
      onBook();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 right-4 z-50 bg-black/10 hover:bg-black/20 text-white rounded-full h-8 w-8 backdrop-blur-md"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Left: Gallery */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-slate-100 dark:bg-slate-800">
              <img 
                src={car.gallery[activeImage]} 
                alt={car.name} 
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
              
              <div className="absolute top-6 left-6 flex gap-2">
                <Badge className={
                  car.availability === "Available" ? "bg-emerald-500 hover:bg-emerald-600" :
                  car.availability === "Limited" ? "bg-amber-500 hover:bg-amber-600" :
                  "bg-rose-500 hover:bg-rose-600"
                }>
                  {car.availability}
                </Badge>
              </div>

              {/* Gallery Controls */}
              <div className="absolute inset-y-0 left-0 flex items-center">
                <Button variant="ghost" size="icon" onClick={prevImage} className="ml-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md">
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center">
                <Button variant="ghost" size="icon" onClick={nextImage} className="mr-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md">
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>

              {/* Thumbnails */}
              <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2 px-4">
                {car.gallery.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-white scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Details & Calculator */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-[90vh] overflow-y-auto p-6 md:p-8 flex flex-col">
              <div className="mb-6">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">{car.name}</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium">{car.type}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl flex flex-col items-center justify-center text-center">
                  <CarFront className="w-5 h-5 text-primary mb-1" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{car.transmission}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl flex flex-col items-center justify-center text-center">
                  <Info className="w-5 h-5 text-primary mb-1" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{car.fuel}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl flex flex-col items-center justify-center text-center">
                  <Info className="w-5 h-5 text-primary mb-1" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{car.seats} Seats</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl flex flex-col items-center justify-center text-center">
                  <Wallet className="w-5 h-5 text-primary mb-1" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">RM{car.price}/d</span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Premium Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {car.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Calculator */}
              <div className="mt-auto bg-slate-50 dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" /> Price Calculator
                </h3>
                
                <div className="flex items-center gap-4 mb-4">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex-1">Rental Duration (Days)</label>
                  <div className="flex items-center bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <button onClick={() => setDays(Math.max(1, days - 1))} className="px-3 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition">-</button>
                    <input type="number" value={days} onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))} className="w-12 text-center bg-transparent font-semibold text-slate-900 dark:text-white outline-none" min="1" />
                    <button onClick={() => setDays(days + 1)} className="px-3 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition">+</button>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Base Rate (RM{car.price} &times; {days})</span>
                    <span>RM{car.price * days}</span>
                  </div>
                  {days >= 30 ? (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                      <span>Monthly Discount ({car.monthlyDiscount}%)</span>
                      <span>-RM{Math.round(car.price * days * (car.monthlyDiscount / 100))}</span>
                    </div>
                  ) : days >= 7 ? (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                      <span>Weekly Discount ({car.weeklyDiscount}%)</span>
                      <span>-RM{Math.round(car.price * days * (car.weeklyDiscount / 100))}</span>
                    </div>
                  ) : null}
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Refundable Deposit</span>
                    <span>RM{car.deposit}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-700 pt-4 mb-6">
                  <span className="text-base font-bold text-slate-900 dark:text-white">Estimated Total</span>
                  <span className="text-2xl font-black text-primary">RM{Math.round(totalPrice)}</span>
                </div>

                <Button 
                  onClick={handleBook}
                  className="w-full h-12 text-base font-semibold shadow-xl shadow-primary/20 gap-2"
                  disabled={car.availability === "Booked"}
                >
                  <CarFront className="w-5 h-5" />
                  {car.availability === "Booked" ? "Currently Unavailable" : "Book Now"}
                </Button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
