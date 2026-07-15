"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Dynamically import the map component with SSR disabled
// Leaflet uses the window object heavily, which causes errors during server-side rendering
const LocationPickerMap = dynamic(
  () => import("./LocationPickerMap"),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-80 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin mb-2" />
        <p>Loading Map...</p>
      </div>
    )
  }
);

interface LocationPickerProps {
  onLocationSelect: (location: string) => void;
  initialLocation?: string;
}

export function LocationPicker({ onLocationSelect, initialLocation }: LocationPickerProps) {
  return <LocationPickerMap onLocationSelect={onLocationSelect} initialLocation={initialLocation} />;
}
