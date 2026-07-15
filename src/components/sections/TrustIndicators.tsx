"use client";

import React from "react";
import { ShieldCheck, Clock, CheckCircle2, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

const indicators = [
  { icon: BadgeCheck, text: "Verified Business" },
  { icon: Clock, text: "24/7 Support" },
  { icon: ShieldCheck, text: "Fully Insured" },
  { icon: CheckCircle2, text: "No Hidden Charges" },
];

export function TrustIndicators() {
  return (
    <div className="w-full bg-slate-900 border-y border-slate-800 text-white overflow-hidden py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {indicators.map((indicator, index) => {
            const Icon = indicator.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-2"
              >
                <Icon className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-semibold tracking-wide text-slate-200">
                  {indicator.text}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
