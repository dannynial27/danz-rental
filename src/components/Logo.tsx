import React from "react";
import { Car } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  isScrolled?: boolean;
}

export function Logo({ className, isScrolled = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2 group", className)}>
      <div className={cn(
        "flex items-center justify-center rounded-xl p-2 transition-colors duration-300",
        isScrolled ? "bg-primary text-white" : "bg-primary/10 text-primary dark:bg-primary dark:text-white"
      )}>
        <Car className="w-6 h-6" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold leading-none tracking-tight">DANZ</span>
        <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase leading-none mt-1">
          Rental
        </span>
      </div>
    </div>
  );
}
