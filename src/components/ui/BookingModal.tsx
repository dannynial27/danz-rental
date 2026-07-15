"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar as CalendarIcon, MapPin, User, Phone, Mail, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Car } from "@/data/cars";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { eachDayOfInterval, format, parseISO } from "date-fns";
import { LocationPicker } from "@/components/ui/LocationPicker";

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
    pickupLocation: "",
    returnLocation: "",
  });
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);
  const [isLoadingDates, setIsLoadingDates] = useState(false);
  const [activeMap, setActiveMap] = useState<"pickup" | "return" | null>(null);
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error" | "clash">("idle");

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        pickupLocation: initialData?.pickupLocation || "",
        returnLocation: initialData?.returnLocation || "",
      }));
      
      if (initialData?.pickupDate) {
        setDateRange({
          from: new Date(initialData.pickupDate),
          to: initialData.returnDate ? new Date(initialData.returnDate) : undefined
        });
      } else {
        setDateRange(undefined);
      }
      
      setStatus("idle");
      
      if (car) {
        fetchBookedDates(car.id);
      }
    }
  }, [isOpen, initialData, car]);

  const fetchBookedDates = async (carId: number) => {
    setIsLoadingDates(true);
    try {
      const bookingsRef = collection(db, "bookings");
      const q = query(
        bookingsRef,
        where("carId", "==", carId),
        where("status", "in", ["Pending", "Approved"])
      );
      
      const querySnapshot = await getDocs(q);
      let blocked: Date[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.pickupDate && data.returnDate) {
          const start = new Date(data.pickupDate);
          const end = new Date(data.returnDate);
          
          const datesInInterval = eachDayOfInterval({ start, end });
          blocked = [...blocked, ...datesInInterval];
        }
      });
      
      setDisabledDates(blocked);
    } catch (error) {
      console.error("Error fetching booked dates:", error);
    } finally {
      setIsLoadingDates(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!car || !dateRange?.from || !dateRange?.to) return;
    
    setStatus("submitting");
    
    // Format dates to string
    const pickupDateStr = format(dateRange.from, "yyyy-MM-dd");
    const returnDateStr = format(dateRange.to, "yyyy-MM-dd");
    
    try {
      // Re-verify clash detection on submit just in case
      const reqStart = dateRange.from.getTime();
      const reqEnd = dateRange.to.getTime();
      let isClash = false;
      
      // Quick check against our loaded disabledDates
      for (const d of disabledDates) {
        const dTime = d.getTime();
        if (dTime >= reqStart && dTime <= reqEnd) {
          isClash = true;
          break;
        }
      }
      
      if (isClash) {
        setStatus("clash");
        return;
      }

      await addDoc(collection(db, "bookings"), {
        ...formData,
        pickupDate: pickupDateStr,
        returnDate: returnDateStr,
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
          className="relative w-full max-w-4xl bg-white dark:bg-slate-950 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
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
              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
                
                {/* Left Column: Form Details */}
                <div className="flex-1 space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900 dark:text-white text-lg border-b border-slate-100 dark:border-slate-800 pb-2">Personal Details</h3>
                    
                    <div className="space-y-4">
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
                    
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                          <Mail className="w-4 h-4 text-slate-400" /> Email Address
                        </label>
                        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="john@example.com" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900 dark:text-white text-lg border-b border-slate-100 dark:border-slate-800 pb-2">Locations</h3>
                    
                    <div className="space-y-6">
                      {activeMap === "pickup" ? (
                        <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-300">
                          <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-primary" /> Select Pickup on Map
                            </label>
                            <button type="button" onClick={() => setActiveMap(null)} className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">Cancel</button>
                          </div>
                          <div className="h-[350px]">
                            <LocationPicker 
                              initialLocation={formData.pickupLocation} 
                              onLocationSelect={(loc) => { 
                                setFormData(prev => ({...prev, pickupLocation: loc})); 
                                setActiveMap(null); 
                              }} 
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-slate-400" /> Pickup Location
                          </label>
                          <div 
                            onClick={() => setActiveMap("pickup")}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 cursor-pointer flex justify-between items-center text-slate-900 dark:text-white hover:border-primary/50 transition-colors"
                          >
                            <span className="truncate">{formData.pickupLocation || "Tap to select on map"}</span>
                            <MapPin className="w-4 h-4 text-primary" />
                          </div>
                          {/* Hidden input for HTML validation if required */}
                          <input type="hidden" required name="pickupLocation" value={formData.pickupLocation} />
                        </div>
                      )}
                      
                      {activeMap === "return" ? (
                        <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-300">
                          <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-primary" /> Select Return on Map
                            </label>
                            <button type="button" onClick={() => setActiveMap(null)} className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">Cancel</button>
                          </div>
                          <div className="h-[350px]">
                            <LocationPicker 
                              initialLocation={formData.returnLocation} 
                              onLocationSelect={(loc) => { 
                                setFormData(prev => ({...prev, returnLocation: loc})); 
                                setActiveMap(null); 
                              }} 
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-slate-400" /> Return Location
                          </label>
                          <div 
                            onClick={() => setActiveMap("return")}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 cursor-pointer flex justify-between items-center text-slate-900 dark:text-white hover:border-primary/50 transition-colors"
                          >
                            <span className="truncate">{formData.returnLocation || "Tap to select on map"}</span>
                            <MapPin className="w-4 h-4 text-primary" />
                          </div>
                          <input type="hidden" required name="returnLocation" value={formData.returnLocation} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column: Calendar */}
                <div className="flex-1 space-y-4 md:border-l md:border-slate-100 md:dark:border-slate-800 md:pl-8">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-lg border-b border-slate-100 dark:border-slate-800 pb-2">Select Rental Dates</h3>
                  
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-center">
                    {isLoadingDates ? (
                      <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                        <Loader2 className="w-8 h-8 animate-spin mb-2" />
                        <p>Checking availability...</p>
                      </div>
                    ) : (
                      <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={setDateRange}
                        disabled={[{ before: new Date() }, ...disabledDates]}
                        numberOfMonths={1}
                        className="bg-transparent"
                      />
                    )}
                  </div>

                  <div className="space-y-2 mt-4 text-sm text-slate-600 dark:text-slate-400">
                    <p className="flex justify-between">
                      <span>Pickup:</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {dateRange?.from ? format(dateRange.from, "PPP") : "Select date"}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span>Return:</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {dateRange?.to ? format(dateRange.to, "PPP") : "Select date"}
                      </span>
                    </p>
                  </div>

                  {status === "error" && (
                    <div className="p-4 mt-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
                      An error occurred while submitting your booking. Please try again or contact us directly.
                    </div>
                  )}
                  {status === "clash" && (
                    <div className="p-4 mt-4 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-xl text-sm font-medium border border-amber-200 dark:border-amber-800">
                      Sorry, your selected dates overlap with an existing booking. Please choose different dates.
                    </div>
                  )}

                  <div className="pt-6 mt-auto">
                    <Button 
                      type="submit" 
                      disabled={status === "submitting" || !dateRange?.from || !dateRange?.to} 
                      className="w-full rounded-xl h-14 text-lg font-bold shadow-xl shadow-primary/20"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...
                        </>
                      ) : (
                        "Confirm Booking Request"
                      )}
                    </Button>
                    <p className="text-center text-xs text-slate-500 mt-4">
                      By submitting this request, you agree to our terms of service. No payment is required right now.
                    </p>
                  </div>
                </div>

              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
