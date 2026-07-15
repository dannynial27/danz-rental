"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, UserCheck, CreditCard, Droplets, CarFront, FileText, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const requirements = [
  {
    icon: <UserCheck className="w-8 h-8 text-primary" />,
    title: "Minimum Age",
    description: "Drivers must be at least 21 years old with a minimum of 2 years driving experience. A young driver surcharge may apply for under 25s."
  },
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: "Driving License",
    description: "A valid Malaysian driving license or International Driving Permit (IDP) is required. Probationary (P) licenses are not accepted."
  },
  {
    icon: <CreditCard className="w-8 h-8 text-primary" />,
    title: "Security Deposit",
    description: "A refundable security deposit ranging from RM200 to RM1500 (depending on vehicle class) is required upon vehicle collection."
  },
  {
    icon: <Droplets className="w-8 h-8 text-primary" />,
    title: "Fuel Policy",
    description: "Same-to-same policy. The vehicle must be returned with the same amount of fuel as when it was collected to avoid refueling charges."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Insurance Coverage",
    description: "All vehicles include standard comprehensive insurance. Collision Damage Waiver (CDW) is available as an optional add-on."
  },
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: "Late Returns",
    description: "A grace period of 1 hour is given. Subsequent hours are charged at 10% of the daily rate per hour. Exceeding 5 hours incurs a full day's charge."
  }
];

export function RentalRequirements() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">
            Important Information
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
            Rental Requirements
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Please read our essential rental guidelines before making a booking to ensure a smooth and hassle-free experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {requirements.map((req, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Card className="h-full bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="mb-6 bg-white dark:bg-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                    {req.icon}
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {req.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {req.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
