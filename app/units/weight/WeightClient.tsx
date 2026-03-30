'use client';

import Link from 'next/link';
import UnitConverter from '@components/UnitConverter';
import { Scale, Info, HelpCircle, BookOpen, CheckCircle2 } from 'lucide-react';

export default function WeightPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 pb-20">
      {/* Navigation */}
      <nav className="mb-6 flex gap-4">
        <Link 
          href="/units" 
          className="inline-block px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors font-medium"
        >
          ← Units Hub
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
      </nav>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight flex items-center gap-3">
          <Scale className="text-emerald-600" size={36} />
          Weight & Mass Converter
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          Convert between <strong>Imperial and Metric</strong> mass units with high-precision floating-point accuracy. 
          Ideal for logistics, scientific research, fitness tracking, and international commerce.
        </p>
      </header>

      {/* Ad Slot - Top */}
      <div className="w-full h-24 bg-slate-50 mb-10 flex flex-col items-center justify-center border border-slate-100 rounded-xl">
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Sponsored Advertisement</span>
      </div>

      {/* Main Converter Component */}
      <div className="mb-16">
        <UnitConverter 
          category="weight" 
          title="Unit Processor" 
          description="Instant translation between kilograms, grams, pounds, ounces, and more."
        />
      </div>

      {/* EDUCATIONAL CONTENT: AdSense Booster */}
      <section className="prose prose-slate max-w-none mb-16 space-y-12 border-t pt-12 border-slate-100">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <BookOpen className="text-emerald-600" /> Weight vs. Mass
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              While often used interchangeably in daily life, <strong>mass</strong> is the amount of matter in an object, while <strong>weight</strong> is the force of gravity acting on that mass. Our tool provides standard conversions used on Earth, where 1 kilogram is approximately equal to 2.20462 pounds.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <CheckCircle2 className="text-emerald-600" /> Precision Standards
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Whether you are converting <strong>grams to ounces</strong> for a recipe or <strong>metric tons to US tons</strong> for industrial shipping, accuracy matters. We use the latest international constants to ensure your calculations meet professional standards.
            </p>
          </div>
        </div>

        {/* Common Conversion Table (Google loves tables for SEO) */}
        <div className="bg-slate-900 text-slate-300 p-8 rounded-3xl border border-slate-800">
          <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
            <Info className="text-emerald-500" size={20} />
            Common Reference Values
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 border border-slate-800 rounded bg-slate-900/50">
              <div className="text-emerald-500 mb-1">1 kg</div>
              <div>1,000 Grams</div>
            </div>
            <div className="p-3 border border-slate-800 rounded bg-slate-900/50">
              <div className="text-emerald-500 mb-1">1 kg</div>
              <div>2.2046 lbs</div>
            </div>
            <div className="p-3 border border-slate-800 rounded bg-slate-900/50">
              <div className="text-emerald-500 mb-1">1 lb</div>
              <div>16 Ounces</div>
            </div>
            <div className="p-3 border border-slate-800 rounded bg-slate-900/50">
              <div className="text-emerald-500 mb-1">1 Stone</div>
              <div>6.3502 kg</div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-6">
            <HelpCircle className="text-emerald-600" /> Conversion Use Cases
          </h2>
          <div className="space-y-4 text-sm text-slate-600">
            <p><strong>Shipping & Logistics:</strong> Quickly calculate air freight costs by converting package weights between kilograms and pounds to meet international carrier requirements.</p>
            <p><strong>Fitness & Health:</strong> Track your progress by converting body weight measurements if your scale uses a different unit system than your fitness tracking app.</p>
            <p><strong>Culinary Arts:</strong> Convert baking ingredients from grams (mass) to ounces for precision results in professional recipes.</p>
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
