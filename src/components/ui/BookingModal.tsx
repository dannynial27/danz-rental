"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, User, Phone, Mail, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Car } from "@/data/cars";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface BookingData {
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  returnLocation: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: Car | null;
  initialData?: BookingData | null;
}

export function BookingModal({ isOpen, onClose, car, initialData }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    pickupDate: "",
    returnDate: "",
    pickupLocation: "",
    returnLocation: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error" | "clash">("idle");

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        pickupDate: initialData?.pickupDate || "",
        returnDate: initialData?.returnDate || "",
        pickupLocation: initialData?.pickupLocation || "",
        returnLocation: initialData?.returnLocation || "",
      }));
      setStatus("idle");
    }
  }, [isOpen, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!car) return;
    
    setStatus("submitting");
    
    try {
      // Clash Detection
      const bookingsRef = collection(db, "bookings");
      const q = query(
        bookingsRef,
        where("carId", "==", car.id),
        where("status", "in", ["Pending", "Approved"])
      );
      
      const querySnapshot = await getDocs(q);
      const reqStart = new Date(formData.pickupDate).getTime();
      const reqEnd = new Date(formData.returnDate).getTime();
      
      let isClash = false;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const existingStart = new Date(data.pickupDate).getTime();
        const existingEnd = new Date(data.returnDate).getTime();
        
        // Check overlap: Start A <= End B && End A >= Start B
        if (reqStart <= existingEnd && reqEnd >= existingStart) {
          isClash = true;
        }
      });
      
      if (isClash) {
        setStatus("clash");
        return;
      }

      await addDoc(collection(db, "bookings"), {
        ...formData,
        carId: car.id,
        carName: car.name,
        pricePerDay: car.price,
        status: "Pending",
        createdAt: serverTimestamp(),
      });
      setStatus("success");
    } catch (error) {
      console.error("Error submitting booking:", error);
      setStatus("error");
    }
  };

  if (!isOpen || !car) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-950 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Book {car.name}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">RM{car.price} / day</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <div className="overflow-y-auto p-6">
            {status === "success" ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Booking Received!</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
                  Thank you, {formData.name}. We have received your booking request for the {car.name}. Our team will contact you shortly to confirm availability and arrange payment.
                </p>
                <Button onClick={onClose} className="w-full sm:w-auto px-8 rounded-xl h-12">
                  Done
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-lg border-b border-slate-100 dark:border-slate-800 pb-2">Personal Details</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-400" /> Full Name
                      </label>
                      <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="John Doe" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-slate-400" /> Phone Number
                      </label>
                      <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="+60 12-345 6789" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" /> Email Address
                    </label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-lg border-b border-slate-100 dark:border-slate-800 pb-2">Rental Schedule</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" /> Pickup Date
                      </label>
                      <input required type="date" name="pickupDate" value={formData.pickupDate} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" /> Return Date
                      </label>
                      <input required type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" /> Pickup Location
                      </label>
                      <select required name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white">
                        <option value="">Select location</option>
                        <option value="Penang International Airport">Penang International Airport</option>
                        <option value="Georgetown">Georgetown</option>
                        <option value="Bayan Lepas">Bayan Lepas</option>
                        <option value="Batu Ferringhi">Batu Ferringhi</option>
                        <option value="Mainland (Butterworth)">Mainland (Butterworth)</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" /> Return Location
                      </label>
                      <select required name="returnLocation" value={formData.returnLocation} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white">
                        <option value="">Select location</option>
                        <option value="Penang International Airport">Penang International Airport</option>
                        <option value="Georgetown">Georgetown</option>
                        <option value="Bayan Lepas">Bayan Lepas</option>
                        <option value="Batu Ferringhi">Batu Ferringhi</option>
                        <option value="Mainland (Butterworth)">Mainland (Butterworth)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {status === "error" && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
                    An error occurred while submitting your booking. Please try again or contact us directly.
                  </div>
                )}
                {status === "clash" && (
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-xl text-sm font-medium border border-amber-200 dark:border-amber-800">
                    Sorry, this vehicle is already booked for the selected dates. Please choose different dates or another vehicle.
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Button type="submit" disabled={status === "submitting"} className="w-full rounded-xl h-14 text-lg font-bold shadow-xl shadow-primary/20">
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...
                      </>
                    ) : (
                      "Confirm Booking Request"
                    )}
                  </Button>
                  <p className="text-center text-xs text-slate-500 mt-4">
                    By submitting this request, you agree to our terms of service and cancellation policy. No payment is required right now.
                  </p>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
