'use client';
import { Ruler, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const unitConverters = [
  { name: 'Length & Distance', href: '/units/length', description: 'Convert between meters, feet, miles, kilometers, and more' },
  { name: 'Weight & Mass', href: '/units/weight', description: 'Convert between kilograms, pounds, ounces, and other units' },
  { name: 'Temperature', href: '/units/temperature', description: 'Convert between Celsius, Fahrenheit, and Kelvin' },
];

export default function UnitsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Ruler className="text-emerald-600" size={28} />
          <h1 className="text-3xl font-bold text-slate-900">Unit Converters</h1>
        </div>
        <p className="text-slate-600">
          Precise unit conversion tools for length, weight, temperature, and more. Quick and accurate conversions for everyday use.
        </p>
      </section>

      {/* Ad Slot */}
      <div className="w-full h-24 bg-slate-100 mb-8 flex items-center justify-center border-dashed border-2 border-slate-300">
        <span className="text-slate-400 text-xs">Advertisement</span>
      </div>

      {/* Converters Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {unitConverters.map((converter, idx) => (
          <Link
            key={idx}
            href={converter.href}
            className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-emerald-400 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                {converter.name}
              </h2>
              <ChevronRight size={20} className="text-slate-300 group-hover:text-emerald-600 transition-colors" />
            </div>
            <p className="text-sm text-slate-600">{converter.description}</p>
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
