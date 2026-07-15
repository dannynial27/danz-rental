"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Car } from '@/data/cars';

interface CarsContextType {
  cars: Car[];
  loading: boolean;
  error: string | null;
}

const CarsContext = createContext<CarsContextType>({ cars: [], loading: true, error: null });

export const CarsProvider = ({ children }: { children: React.ReactNode }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cars"));
        const carsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any)) as Car[];
        carsData.sort((a, b) => Number(a.id) - Number(b.id));
        setCars(carsData);
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError("Failed to load cars from database");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <CarsContext.Provider value={{ cars, loading, error }}>
      {children}
    </CarsContext.Provider>
  );
};

export const useCars = () => useContext(CarsContext);
