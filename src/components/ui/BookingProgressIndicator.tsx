"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BookingProgressIndicator({ isVisible, onComplete }: { isVisible: boolean, onComplete: () => void }) {
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 text-center"
        >
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-10 h-10" />
          </div>
          
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Redirecting to WhatsApp</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            You will now be securely redirected to our WhatsApp to finalize your booking directly with our team.
          </p>

          <div className="space-y-4 mb-8 text-left text-sm text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>No payment required yet</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>Instant confirmation from human agent</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>Secure and private</span>
            </div>
          </div>

          <Button 
            className="w-full h-12 text-base font-bold bg-emerald-500 hover:bg-emerald-600 shadow-xl shadow-emerald-500/20"
            onClick={onComplete}
          >
            Continue to WhatsApp
          </Button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
