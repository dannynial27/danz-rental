"use client";

import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { Logo } from "@/components/Logo";

const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
  </svg>
);

const Twitter = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 pt-20 pb-10 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Logo />
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
              DANZ RENTAL provides affordable, reliable, and hassle-free car rental services in Penang. Experience premium travel with our well-maintained fleet.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-200/50 dark:bg-slate-800/50 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-200/50 dark:bg-slate-800/50 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-200/50 dark:bg-slate-800/50 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-primary rounded-full"></span>
            </h4>
            <ul className="space-y-4">
              {["Home", "Fleet", "Why Us", "Process", "FAQ", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="group flex items-center text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 ease-out text-primary">
                      →
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-6 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-primary rounded-full"></span>
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300 shrink-0">
                  <MapPin className="w-4 h-4 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-slate-600 dark:text-slate-400 text-sm mt-1.5 leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  Nibong Tebal, Penang, Malaysia
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300 shrink-0">
                  <Phone className="w-4 h-4 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <a href="tel:+60124516452" className="text-slate-600 dark:text-slate-400 text-sm group-hover:text-primary transition-colors">
                  +60 12-451 6452
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300 shrink-0">
                  <Mail className="w-4 h-4 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <a href="mailto:hello@danzrental.com" className="text-slate-600 dark:text-slate-400 text-sm group-hover:text-primary transition-colors">
                  hello@danzrental.com
                </a>
              </li>
            </ul>
          </div>

          {/* Map/Business Hours */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-6 relative inline-block">
              Business Hours
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-primary rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <li className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="font-medium">Mon - Fri</span>
                <span className="font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md text-xs">8 AM - 10 PM</span>
              </li>
              <li className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="font-medium">Sat - Sun</span>
                <span className="font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md text-xs">9 AM - 11 PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium">Public Hol.</span>
                <span className="font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md text-xs animate-pulse">Open 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 pb-4 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} DANZ RENTAL. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
            <a href="#" className="hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-primary after:transition-all">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-primary after:transition-all">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
