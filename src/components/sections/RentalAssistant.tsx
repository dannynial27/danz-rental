"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "Which car is cheapest?",
  "Recommend a family car?",
  "Is insurance included?",
  "Can I pick up at the airport?",
];

export function RentalAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm the DANZ RENTAL AI Assistant. How can I help you find the perfect car for your trip in Penang today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: data.text,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: "I apologize, but I'm having trouble connecting right now. Please contact our team via WhatsApp for immediate assistance!",
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Network error occurred. Please contact us on WhatsApp: +60 12-451 6452",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppClick = () => {
    window.location.href = "https://wa.me/60124516452";
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
            className="fixed bottom-24 right-4 md:right-8 w-[calc(100vw-32px)] md:w-[400px] h-[600px] max-h-[80vh] z-50 flex flex-col bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] border border-white/40 dark:border-slate-800/60 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-blue-600 p-4 md:p-5 flex justify-between items-center text-white shrink-0 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm md:text-base">DANZ RENTAL AI</h3>
                  <p className="text-xs text-blue-100 opacity-90">Premium Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 md:p-4 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-white rounded-br-none shadow-md"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200/50 dark:border-slate-700/50 shadow-sm"
                    }`}
                  >
                    {msg.content.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line.split(/(\*\*.*?\*\*)/g).map((part, j) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={j}>{part.slice(2, -2)}</strong>;
                          }
                          return <span key={j}>{part}</span>;
                        })}
                        {i !== msg.content.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                    
                    {/* Render WhatsApp button if AI suggests booking */}
                    {msg.role === "assistant" && (msg.content.toLowerCase().includes("book via whatsapp") || msg.content.includes("https://wa.me/")) && (
                      <Button
                        onClick={handleWhatsAppClick}
                        className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg shadow-green-500/20 gap-2 h-10"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Book on WhatsApp
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-bl-none p-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div className="px-4 pb-2 pt-2 shrink-0 overflow-x-auto whitespace-nowrap hide-scrollbar border-t border-slate-100 dark:border-slate-800/50">
              <div className="flex gap-2">
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="text-xs md:text-sm bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-300 px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-colors border border-blue-100 dark:border-blue-800/50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 shrink-0 bg-white/50 dark:bg-slate-900/50">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend(input);
                  }}
                  placeholder="Ask anything..."
                  className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-full pl-5 pr-14 py-3 md:py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-200/50 dark:border-slate-700/50 text-sm md:text-base placeholder:text-slate-400"
                />
                <button
                  onClick={() => handleSend(input)}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 w-10 h-10 md:w-11 md:h-11 bg-primary text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-md"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" /> : <Send className="w-4 h-4 md:w-5 md:h-5 ml-1" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 md:bottom-8 md:right-8 z-50 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary to-blue-600 text-white rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-shadow group"
      >
        <div className="absolute inset-0 bg-white/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
        {isOpen ? <X className="w-6 h-6 md:w-8 md:h-8 relative z-10" /> : <Bot className="w-6 h-6 md:w-8 md:h-8 relative z-10" />}
      </motion.button>
    </>
  );
}
