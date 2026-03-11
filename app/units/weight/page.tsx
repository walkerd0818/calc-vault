'use client';

import React from 'react';
import Link from 'next/link';
import UnitConverter from '@components/UnitConverter';

export default function WeightPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Navigation Links */}
      <div className="mb-6 flex gap-4">
        <Link 
          href="/units" 
          className="inline-block px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors font-medium"
        >
          ← Back to Units
        </Link>
        <Link 
          href="/units/length" 
          className="inline-block px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors font-medium"
        >
          Length Converter
        </Link>
        <Link 
          href="/units/temperature" 
          className="inline-block px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors font-medium"
        >
          Temperature Converter
        </Link>
      </div>

      {/* Introduction */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Weight & Mass Converter</h1>
        <p className="text-slate-600">
          Effortlessly convert between kilograms, grams, pounds, ounces, and other weight units for cooking, shipping, fitness, or science.
        </p>
      </section>

      {/* Ad Slot - Top */}
      <div className="w-full h-24 bg-slate-100 mb-8 flex items-center justify-center border-dashed border-2 border-slate-300">
        <span className="text-slate-400 text-xs">Advertisement</span>
      </div>

      {/* Converter Component */}
      <UnitConverter 
        category="weight" 
        title="Weight & Mass Converter" 
        description="Convert between kilograms, grams, pounds, ounces, and more for cooking, travel, or commerce."
      />
    </div>
  );
}
