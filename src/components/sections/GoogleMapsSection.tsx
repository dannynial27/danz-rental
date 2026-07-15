"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function GoogleMapsSection() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">
            Our Locations
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
            Where to Find Us
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Pick up your vehicle at our main headquarters in Nibong Tebal or request a delivery to Penang International Airport.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-6"
          >
            <Card className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden rounded-2xl">
              <div className="bg-primary p-6 text-white">
                <h4 className="text-xl font-bold mb-1">DANZ RENTAL HQ</h4>
                <p className="text-blue-100 text-sm">Nibong Tebal, Penang</p>
              </div>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-900 dark:text-white mb-1">Address</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      123, Jalan Nibong Tebal, 14300 Nibong Tebal, Pulau Pinang, Malaysia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-900 dark:text-white mb-1">Operating Hours</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Monday - Sunday<br/>
                      8:00 AM - 10:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-900 dark:text-white mb-1">Contact</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      +60 12-451 6452
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 relative bg-slate-200 dark:bg-slate-800"
          >
            {/* Free Google Maps Embed iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127533.85871864835!2d100.4184!3d5.1667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304aa57b01b67cc1%3A0xc6cd1217e296c568!2sNibong%20Tebal%2C%20Penang%2C%20Malaysia!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
              title="DANZ RENTAL Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
