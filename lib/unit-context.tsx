"use client";

import React, { createContext, useContext, useState } from 'react';
import { convertUnits } from './unit-logic';

type UnitSystem = 'metric' | 'imperial';

interface UnitContextValue {
  unit: UnitSystem;
  setUnit: (u: UnitSystem) => void;
  toggleUnit: () => void;
  // helper to convert between length units (meters <-> feet)
  toDisplayLength: (meters: number) => number;
  toInternalLength: (value: number) => number; // returns meters
}

const UnitContext = createContext<UnitContextValue | null>(null);

export function UnitProvider({ children }: { children: React.ReactNode }) {
  const getInitialUnit = (): UnitSystem => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('calcvault_unit');
        if (stored === 'metric' || stored === 'imperial') return stored as UnitSystem;

        const lang = navigator.language || (navigator as any).userLanguage || '';
        // Default to imperial for en-US, else metric
        if (lang.startsWith('en-US')) return 'imperial';
      }
    } catch (e) {
      // ignore and fallback
    }
    return 'metric';
  };

  const [unit, setUnit] = useState<UnitSystem>(getInitialUnit);

  React.useEffect(() => {
    try {
      localStorage.setItem('calcvault_unit', unit);
    } catch (e) {
      // ignore storage errors
    }
  }, [unit]);

  const toggleUnit = () => setUnit(prev => prev === 'metric' ? 'imperial' : 'metric');

  const toDisplayLength = (meters: number) => unit === 'metric' ? meters : convertUnits(meters, 'meter', 'ft', 'length');
  const toInternalLength = (value: number) => unit === 'metric' ? value : convertUnits(value, 'ft', 'meter', 'length');

  return (
    <UnitContext.Provider value={{ unit, setUnit, toggleUnit, toDisplayLength, toInternalLength }}>
      {children}
    </UnitContext.Provider>
  );
}

export function useUnit() {
  const ctx = useContext(UnitContext);
  if (!ctx) throw new Error('useUnit must be used within UnitProvider');
  return ctx;
}

// Alias for clearer naming in some components
export function useUnitPreference() {
  return useUnit();
}
