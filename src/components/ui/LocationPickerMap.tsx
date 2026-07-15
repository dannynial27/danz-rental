"use client";

import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Search, Navigation, Loader2 } from "lucide-react";

// Fix Leaflet's default icon path issues in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface LocationPickerMapProps {
  onLocationSelect: (location: string) => void;
  initialLocation?: string;
}

// Component to handle clicks on the map
function MapEvents({ setPosition }: { setPosition: (p: L.LatLng) => void }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return null;
}

// Component to fly to new locations
function MapUpdater({ center }: { center: L.LatLng }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function LocationPickerMap({ onLocationSelect, initialLocation }: LocationPickerMapProps) {
  // Default to Penang
  const [position, setPosition] = useState<L.LatLng>(new L.LatLng(5.4141, 100.3288));
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(initialLocation || "Select a location");
  
  // Geocode when position changes
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}`);
        const data = await response.json();
        if (data && data.display_name) {
          // Clean up the long address a bit
          const shortAddress = data.display_name.split(",").slice(0, 3).join(",");
          setCurrentAddress(shortAddress);
          onLocationSelect(shortAddress);
        }
      } catch (error) {
        console.error("Geocoding error:", error);
      }
    };
    
    // Debounce geocoding to avoid rate limits
    const timeout = setTimeout(() => {
      fetchAddress();
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [position, onLocationSelect]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      // Prioritize Penang/Malaysia in search
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&countrycodes=my`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        const newPos = new L.LatLng(parseFloat(data[0].lat), parseFloat(data[0].lon));
        setPosition(newPos);
      } else {
        alert("Location not found. Please try a different search term.");
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsSearching(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition(new L.LatLng(pos.coords.latitude, pos.coords.longitude));
          setIsSearching(false);
        },
        (err) => {
          console.error("Geolocation error:", err);
          alert("Could not access your location. Please check your browser permissions.");
          setIsSearching(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="flex flex-col space-y-4 h-full">
      <div className="flex gap-2 relative z-[1000]">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a place or address..."
            className="w-full px-4 py-2 pl-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <button type="submit" className="hidden">Search</button>
        </form>
        <button
          onClick={useCurrentLocation}
          title="Use Current Location"
          className="p-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-colors shrink-0"
        >
          {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Navigation className="w-5 h-5" />}
        </button>
      </div>
      
      <div className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-primary" />
        <span className="truncate">{currentAddress}</span>
      </div>

      <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 relative z-0">
        <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} />
          <MapEvents setPosition={setPosition} />
          <MapUpdater center={position} />
        </MapContainer>
      </div>
      <p className="text-xs text-slate-500 text-center">Click anywhere on the map to place a pin</p>
    </div>
  );
}
