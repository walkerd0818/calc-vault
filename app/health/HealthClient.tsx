'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ChevronRight } from 'lucide-react';

const healthCalculators = [
  { name: 'BMI Calculator', href: '/health/bmi', description: 'Calculate your Body Mass Index and understand your health metrics' },
  { name: 'Calorie Needs', href: '/health/calories', description: 'Estimate daily calorie requirements based on activity level' },
];

export default function HealthPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="text-rose-600" size={28} />
          <h1 className="text-3xl font-bold text-slate-900">Health & Lifestyle</h1>
        </div>
        <p className="text-slate-600">
          Tools for daily living, fitness, and health tracking to help you achieve your wellness goals.
        </p>
      </section>

      {/* Ad Slot */}
      <div className="w-full h-24 bg-slate-100 mb-8 flex items-center justify-center border-dashed border-2 border-slate-300">
        <span className="text-slate-400 text-xs">Advertisement</span>
      </div>

      {/* Calculators Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {healthCalculators.map((calc, idx) => (
          <Link
            key={idx}
            href={calc.href}
            className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-rose-400 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-semibold text-slate-900 group-hover:text-rose-600 transition-colors">
                {calc.name}
              </h2>
              <ChevronRight size={20} className="text-slate-300 group-hover:text-rose-600 transition-colors" />
            </div>
            <p className="text-sm text-slate-600">{calc.description}</p>
          </Link>
        ))}
      </section>

      {/* Navigation Link */}
      <Link 
        href="/" 
        className="inline-block px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
