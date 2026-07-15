"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Fleet", href: "#fleet" },
  { name: "Why Us", href: "#features" },
  { name: "Process", href: "#process" },
  { name: "FAQ", href: "#faq" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsApp = () => {
    window.location.href = "https://wa.me/60124516452";
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-500 ${
        isScrolled
          ? "bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-[0_4px_30px_rgba(0,0,0,0.05)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between relative z-[80]">
        <Logo isScrolled={isScrolled} />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: "easeOut" }}
              className={`text-sm font-medium transition-colors hover:text-primary relative group ${
                isScrolled ? "text-slate-600 dark:text-slate-300" : "text-slate-800 dark:text-slate-200"
              }`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="hidden md:block"
        >
          <Button
            size="lg"
            className="rounded-full gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            onClick={handleWhatsApp}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Book via WhatsApp</span>
          </Button>
        </motion.div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-slate-800 dark:text-slate-200 z-[90] relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav - Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[75] bg-white/95 dark:bg-slate-950/95 backdrop-blur-3xl flex flex-col items-center justify-center min-h-screen"
          >
            <div className="flex flex-col items-center gap-8 w-full px-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="text-3xl font-bold text-slate-900 dark:text-white relative group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="w-full max-w-sm mt-8"
              >
                <Button size="lg" className="w-full h-14 rounded-2xl gap-2 text-lg shadow-xl shadow-blue-500/20" onClick={handleWhatsApp}>
                  <MessageCircle className="w-5 h-5" />
                  <span>Book via WhatsApp</span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
