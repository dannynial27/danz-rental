"use client";

import React, { useState } from "react";
import { Search, Info } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What documents do I need to rent a car?",
    answer: "You will need a valid driving license (local or international), your identity card (IC) or passport, and a utility bill or flight itinerary as proof of address/travel.",
  },
  {
    question: "Is there a deposit required?",
    answer: "Yes, a refundable security deposit is required upon vehicle collection. The amount ranges from RM100 to RM300 depending on the vehicle type. It will be fully refunded upon returning the car in its original condition.",
  },
  {
    question: "Do you offer airport pick-up and drop-off?",
    answer: "Absolutely! We offer convenient delivery and collection services at Penang International Airport, hotels, or any specific location within Penang Island and mainland (subject to terms).",
  },
  {
    question: "What happens in case of a breakdown or accident?",
    answer: "All our vehicles are well-maintained and fully insured. In the unlikely event of a breakdown, we provide 24/7 roadside assistance. In case of an accident, contact us immediately and we will guide you through the necessary police report and insurance claim procedures.",
  },
  {
    question: "Can I drive the rental car out of Penang?",
    answer: "Yes, you can! However, please inform us during booking if you plan to travel outside of Penang. Additional surcharges may apply for very long-distance travel.",
  },
  {
    question: "How do I make payment?",
    answer: "We accept Online Bank Transfer, DuitNow QR, e-Wallets (Touch 'n Go), and cash. Full payment of the rental fee plus the security deposit is required before or upon car collection.",
  },
];

export function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">
            Got Questions?
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Find answers to common questions about our car rental services.
          </p>
          
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search for an answer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
            />
          </div>
        </div>

        {filteredFaqs.length > 0 ? (
          <Accordion className="w-full space-y-4">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="group border border-slate-200/80 dark:border-slate-800 rounded-2xl px-6 md:px-8 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-800/50 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <AccordionTrigger className="text-left font-bold text-lg text-slate-900 dark:text-white hover:text-primary transition-colors py-5 [&[data-state=open]]:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 dark:text-slate-400 text-base leading-relaxed pb-6 pt-1">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-12 text-center flex flex-col items-center justify-center border border-slate-100 dark:border-slate-800">
            <div className="bg-white dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm">
              <Info className="w-8 h-8 text-slate-400" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No results found</h4>
            <p className="text-slate-500 dark:text-slate-400">
              We couldn't find any questions matching "{searchQuery}". Please try another search term or contact our support team.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
