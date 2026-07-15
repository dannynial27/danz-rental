"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, MapPin, CarFront, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCars } from "@/context/CarsContext";
import { BookingProgressIndicator } from "@/components/ui/BookingProgressIndicator";

export function QuickBookingWidget() {
  const { cars, loading } = useCars();
  const [isVisible, setIsVisible] = useState(false);
  
  // Show widget after scrolling down slightly (except on very top)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [selectedCar, setSelectedCar] = useState<string>("");
  const [pickupDate, setPickupDate] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");
  const [pickupLocation, setPickupLocation] = useState<string>("Penang International Airport (PEN)");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleBookNow = () => {
    if (!selectedCar || !pickupDate || !returnDate) {
      alert("Please select a car, pickup date, and return date.");
      return;
    }
    
    setIsRedirecting(true);
  };

  const handleContinueToWhatsApp = () => {
    const carName = cars.find(c => c.name === selectedCar)?.name || "a car";
    const message = encodeURIComponent(`Hi DANZ RENTAL, I would like to book:\n\n🚗 Vehicle: ${carName}\n📅 Pickup: ${pickupDate}\n📅 Return: ${returnDate}\n📍 Location: ${pickupLocation}\n\nPlease let me know if it's available.`);
    window.open(`https://wa.me/60124516452?text=${message}`, "_blank");
    setIsRedirecting(false);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-4 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:bottom-8 z-[60] w-auto"
          >
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl p-4 md:p-3 flex flex-col md:flex-row gap-4 md:gap-3 items-center mx-auto max-w-5xl">
              
              {/* Location */}
              <div className="w-full md:w-auto flex-1 relative flex items-center bg-slate-50 dark:bg-slate-800 rounded-xl px-3 py-2 border border-slate-100 dark:border-slate-700">
                <MapPin className="w-5 h-5 text-primary absolute left-3" />
                <select 
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-transparent pl-8 pr-4 py-1 text-sm outline-none text-slate-700 dark:text-slate-200 appearance-none font-medium"
                >
                  <option value="Penang International Airport (PEN)">Penang Airport</option>
                  <option value="Nibong Tebal">Nibong Tebal (HQ)</option>
                  <option value="Georgetown">Georgetown</option>
                  <option value="Bayan Lepas">Bayan Lepas</option>
                </select>
              </div>

              {/* Dates */}
              <div className="w-full md:w-auto flex gap-2 flex-1">
                <div className="flex-1 relative flex items-center bg-slate-50 dark:bg-slate-800 rounded-xl px-3 py-2 border border-slate-100 dark:border-slate-700">
                  <input 
                    type="date" 
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none text-slate-700 dark:text-slate-200 font-medium"
                  />
                </div>
                <div className="flex-1 relative flex items-center bg-slate-50 dark:bg-slate-800 rounded-xl px-3 py-2 border border-slate-100 dark:border-slate-700">
                  <input 
                    type="date" 
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none text-slate-700 dark:text-slate-200 font-medium"
                  />
                </div>
              </div>

              {/* Car Selection */}
              <div className="w-full md:w-auto flex-1 relative flex items-center bg-slate-50 dark:bg-slate-800 rounded-xl px-3 py-2 border border-slate-100 dark:border-slate-700">
                <CarFront className="w-5 h-5 text-primary absolute left-3" />
                <select 
                  value={selectedCar}
                  onChange={(e) => setSelectedCar(e.target.value)}
                  className="w-full bg-transparent pl-8 pr-4 py-1 text-sm outline-none text-slate-700 dark:text-slate-200 appearance-none font-medium"
                >
                  <option value="" disabled>Select Vehicle...</option>
                  {cars.map(car => (
                    <option key={car.id} value={car.name}>{car.name} (RM{car.price}/day)</option>
                  ))}
                </select>
              </div>

              {/* Action */}
              <Button 
                onClick={handleBookNow}
                className="w-full md:w-auto rounded-xl px-6 py-5 shadow-lg shadow-primary/20 gap-2 whitespace-nowrap"
              >
                <MessageCircle className="w-5 h-5" />
                Book Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BookingProgressIndicator 
        isVisible={isRedirecting} 
        onComplete={handleContinueToWhatsApp} 
      />
    </>
  );
}
