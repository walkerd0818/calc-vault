'use client';

import Link from 'next/link';
import UnitConverter from '@components/UnitConverter';
import { Ruler, Info, HelpCircle, BookOpen, Compass } from 'lucide-react';

export default function LengthPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 pb-20">
      {/* Navigation */}
      <nav className="mb-8 flex flex-wrap gap-3 pt-6">
        <Link 
          href="/units" 
          className="inline-block px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors font-medium"
        >
          ← Units Hub
        </Link>
        <Link 
          href="/units/weight" 
          className="inline-block px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors font-medium"
        >
          Weight Converter
        </Link>
        <Link 
          href="/units/temperature" 
          className="inline-block px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors font-medium"
        >
          Temperature Converter
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight flex items-center gap-3">
          <Ruler className="text-emerald-600" size={36} />
          Length & Distance Converter
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          Precision scaling for spatial measurements. Instantly convert between <strong>Metric and Imperial</strong> standards including meters, kilometers, feet, inches, and miles for professional and everyday use.
        </p>
      </header>

      {/* Ad Slot - Top */}
      <div className="w-full h-24 bg-slate-50 mb-10 flex flex-col items-center justify-center border border-slate-100 rounded-xl shadow-sm">
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Sponsored Advertisement</span>
      </div>

      {/* Main Converter Component */}
      <div className="mb-16">
        <UnitConverter 
          category="length" 
          title="Spatial Unit Processor" 
          description="High-precision conversion between all major linear measurement scales."
        />
      </div>

      {/* EDUCATIONAL CONTENT: AdSense Booster */}
      <section className="prose prose-slate max-w-none mb-16 space-y-12 border-t pt-12 border-slate-100">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <BookOpen className="text-emerald-600" size={24} /> Metric vs. Imperial
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              The <strong>Metric system</strong> (SI) is based on powers of ten, making it the global standard for science and manufacturing. The <strong>Imperial system</strong>, primarily used in the United States, relies on historically significant units like the foot and inch. Converting between these systems requires precise multipliers to maintain <strong>architectural and engineering integrity</strong>.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Compass className="text-emerald-600" size={24} /> Geodetic Distance
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              When measuring large-scale distances, such as <strong>kilometers to miles</strong> for travel or navigation, precision is paramount. Our tool uses the <strong>International Yard and Pound agreement</strong> constants to ensure that every conversion meets modern regulatory and technical standards.
            </p>
          </div>
        </div>

        {/* Quick Reference Table (SEO & User Value) */}
        <div className="bg-slate-900 text-slate-300 p-8 rounded-3xl border border-slate-800">
          <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
            <Info className="text-emerald-500" size={20} />
            Standard Conversion Constants
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono text-center">
            <div className="p-3 border border-slate-800 rounded bg-slate-900/50">
              <div className="text-emerald-500 mb-1">1 Inch</div>
              <div>2.54 Centimeters</div>
            </div>
            <div className="p-3 border border-slate-800 rounded bg-slate-900/50">
              <div className="text-emerald-500 mb-1">1 Meter</div>
              <div>3.28084 Feet</div>
            </div>
            <div className="p-3 border border-slate-800 rounded bg-slate-900/50">
              <div className="text-emerald-500 mb-1">1 Mile</div>
              <div>1.60934 Kilometers</div>
            </div>
            <div className="p-3 border border-slate-800 rounded bg-slate-900/50">
              <div className="text-emerald-500 mb-1">1 Nautical Mile</div>
              <div>1.852 Kilometers</div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-6">
            <HelpCircle className="text-emerald-600" size={24} /> Practical Applications
          </h2>
          <div className="space-y-4 text-sm text-slate-600">
            <p><strong>Architecture & Construction:</strong> Transition seamlessly between blueprints designed in different unit systems without losing dimensional accuracy.</p>
            <p><strong>International Travel:</strong> Convert road distances and speed limits between miles and kilometers to safely navigate foreign transit systems.</p>
            <p><strong>Scientific Research:</strong> Scale astronomical or microscopic measurements into manageable units for documentation and peer review.</p>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="pt-8 border-t border-slate-100">
        <Link 
          href="/units" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full hover:bg-emerald-600 transition-all font-bold shadow-lg"
        >
          ← Units Hub
        </Link>
      </footer>
    </div>
  );
}
