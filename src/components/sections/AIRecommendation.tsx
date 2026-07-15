"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Wallet, Briefcase, CarFront, Sparkles, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car } from "@/data/cars";
import { VehicleDetailsModal } from "@/components/ui/VehicleDetailsModal";
import { useCars } from "@/context/CarsContext";

export function AIRecommendation() {
  const { cars, loading } = useCars();
  const [step, setStep] = useState(0);
  const [passengers, setPassengers] = useState<number | null>(null);
  const [budget, setBudget] = useState<string | null>(null); // "low", "medium", "high"
  const [luggage, setLuggage] = useState<number | null>(null);
  const [recommendedCar, setRecommendedCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateRecommendation = () => {
    // Basic recommendation engine
    let bestMatch = cars[0];
    let highestScore = -1;

    cars.forEach(car => {
      let score = 0;
      
      // Passenger match
      if (passengers && car.seats >= passengers) score += 10;
      if (passengers && car.seats === passengers) score += 5; // Perfect fit

      // Luggage match
      if (luggage && car.luggage >= luggage) score += 10;

      // Budget match
      if (budget === "low" && car.price <= 150) score += 15;
      if (budget === "medium" && car.price > 150 && car.price <= 300) score += 15;
      if (budget === "high" && car.price > 300) score += 15;

      if (score > highestScore) {
        highestScore = score;
        bestMatch = car;
      }
    });

    setRecommendedCar(bestMatch);
    setStep(4);
  };

  const handleNext = () => {
    if (step === 0 && !passengers) return;
    if (step === 1 && !budget) return;
    if (step === 2 && !luggage) return;
    
    if (step === 2) {
      calculateRecommendation();
    } else {
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setPassengers(null);
    setBudget(null);
    setLuggage(null);
    setRecommendedCar(null);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h4 className="text-xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" /> How many passengers?
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[2, 4, 5, 7].map(num => (
                <button 
                  key={num}
                  onClick={() => setPassengers(num)}
                  className={`p-4 rounded-xl border-2 transition-all font-semibold ${passengers === num ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 dark:border-slate-700 hover:border-primary/50 text-slate-700 dark:text-slate-300'}`}
                >
                  {num} People
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h4 className="text-xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
              <Wallet className="w-6 h-6 text-primary" /> What's your daily budget?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              <button onClick={() => setBudget("low")} className={`p-4 rounded-xl border-2 transition-all font-semibold ${budget === "low" ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 dark:border-slate-700 hover:border-primary/50 text-slate-700 dark:text-slate-300'}`}>
                Economy<br/><span className="text-sm font-normal opacity-70">Under RM150</span>
              </button>
              <button onClick={() => setBudget("medium")} className={`p-4 rounded-xl border-2 transition-all font-semibold ${budget === "medium" ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 dark:border-slate-700 hover:border-primary/50 text-slate-700 dark:text-slate-300'}`}>
                Standard<br/><span className="text-sm font-normal opacity-70">RM150 - RM300</span>
              </button>
              <button onClick={() => setBudget("high")} className={`p-4 rounded-xl border-2 transition-all font-semibold ${budget === "high" ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 dark:border-slate-700 hover:border-primary/50 text-slate-700 dark:text-slate-300'}`}>
                Premium<br/><span className="text-sm font-normal opacity-70">Above RM300</span>
              </button>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h4 className="text-xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-primary" /> How much luggage?
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[1, 2, 3, 4].map(num => (
                <button 
                  key={num}
                  onClick={() => setLuggage(num)}
                  className={`p-4 rounded-xl border-2 transition-all font-semibold flex flex-col items-center gap-2 ${luggage === num ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 dark:border-slate-700 hover:border-primary/50 text-slate-700 dark:text-slate-300'}`}
                >
                  {num} {num === 1 ? 'Bag' : 'Bags'}
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mb-6">
              <Sparkles className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">We Found Your Perfect Match!</h4>
            <p className="text-slate-600 dark:text-slate-400 mb-8">Based on your requirements, we highly recommend the <strong>{recommendedCar?.name}</strong>.</p>
            
            {recommendedCar && (
              <div className="max-w-sm mx-auto bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xl text-left mb-8">
                <img src={recommendedCar.image} alt={recommendedCar.name} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h5 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{recommendedCar.name}</h5>
                  <div className="flex justify-between items-center text-sm text-slate-500 mb-4">
                    <span>{recommendedCar.seats} Seats • {recommendedCar.luggage} Bags</span>
                    <span className="font-bold text-primary">RM{recommendedCar.price}/day</span>
                  </div>
                  <Button className="w-full" onClick={() => setIsModalOpen(true)}>
                    <CarFront className="w-4 h-4 mr-2" /> View Details & Book
                  </Button>
                </div>
              </div>
            )}
            
            <button onClick={reset} className="text-sm font-medium text-slate-500 hover:text-primary transition-colors flex items-center justify-center gap-2 mx-auto">
              <RotateCcw className="w-4 h-4" /> Start Over
            </button>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50/50 to-white dark:from-slate-900/50 dark:to-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl relative z-20">
        <div className="text-center mb-12">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none mb-4 py-1.5 px-4 font-semibold uppercase tracking-widest text-xs">AI Assistant</Badge>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Not sure which car to choose?
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Let our smart recommendation engine find the perfect vehicle for your trip in 3 simple steps.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-6 md:p-10 min-h-[400px] flex flex-col relative overflow-hidden">
          
          {/* Progress Bar */}
          {step < 4 && (
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mb-8 overflow-hidden">
              <motion.div 
                className="bg-primary h-full rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}

          <div className="flex-1">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
          </div>

          {step < 4 && (
            <div className="mt-8 flex justify-end">
              <Button 
                onClick={handleNext} 
                className="rounded-xl px-8 shadow-lg shadow-primary/20 gap-2"
                disabled={(step === 0 && !passengers) || (step === 1 && !budget) || (step === 2 && !luggage)}
              >
                {step === 2 ? "Find My Car" : "Next Step"}
                {step !== 2 && <ArrowRight className="w-4 h-4" />}
                {step === 2 && <Sparkles className="w-4 h-4" />}
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <VehicleDetailsModal car={recommendedCar} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
