'use client';

import Link from 'next/link';
import { Scale, ChevronRight } from 'lucide-react';

const legalCalculators = [
  { name: 'Personal Injury Settlement', href: '/legal/settlement', description: 'Estimate settlement value for car accidents and personal injury claims' },
  { name: 'Workers\' Comp & Disability', href: '/legal/workers-comp', description: 'Calculate workers\' compensation and disability benefits' },
];

export default function LegalPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Scale className="text-purple-600" size={28} />
          <h1 className="text-3xl font-bold text-slate-900">Legal & Settlement</h1>
        </div>
        <p className="text-slate-600">
          Tools to help estimate settlement values, benefits, and damages for legal cases and compensation claims.
        </p>
      </section>

      {/* Ad Slot */}
      <div className="w-full h-24 bg-slate-100 mb-8 flex items-center justify-center border-dashed border-2 border-slate-300">
        <span className="text-slate-400 text-xs">Advertisement</span>
      </div>

      {/* Calculators Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {legalCalculators.map((calc, idx) => (
          <Link
            key={idx}
            href={calc.href}
            className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-semibold text-slate-900 group-hover:text-purple-600 transition-colors">
                {calc.name}
              </h2>
              <ChevronRight size={20} className="text-slate-300 group-hover:text-purple-600 transition-colors" />
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
