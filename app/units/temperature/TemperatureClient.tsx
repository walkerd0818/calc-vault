'use client';

import Link from 'next/link';
import UnitConverter from '@components/UnitConverter';
import { Thermometer, Info, HelpCircle, BookOpen, Wind } from 'lucide-react';

export default function TemperaturePage() {
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
          href="/units/weight" 
          className="inline-block px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors font-mediumm"
        >
          Weight Converter
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight flex items-center gap-3">
          <Thermometer className="text-emerald-600" size={36} />
          Temperature Converter
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          Precision scaling for global temperature standards. Instantly translate between <strong>Celsius, Fahrenheit, and Kelvin</strong> for scientific research, international weather tracking, and culinary precision.
        </p>
      </header>

      {/* Ad Slot - Top */}
      <div className="w-full h-24 bg-slate-50 mb-10 flex flex-col items-center justify-center border border-slate-100 rounded-xl">
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Sponsored Advertisement</span>
      </div>

      {/* Main Converter Component */}
      <div className="mb-16">
        <UnitConverter 
          category="temperature" 
          title="Thermal Unit Processor" 
          description="High-precision conversion between all major temperature measurement scales."
        />
      </div>

      {/* EDUCATIONAL CONTENT: AdSense Booster */}
      <section className="prose prose-slate max-w-none mb-16 space-y-12 border-t pt-12 border-slate-100">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <BookOpen className="text-emerald-600" size={24} /> Understanding the Scales
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Temperature is the measure of hotness or coldness expressed in terms of any of several scales. 
              The <strong>Celsius</strong> scale is used globally for most applications, while <strong>Fahrenheit</strong> 
              remains the standard in the United States. <strong>Kelvin</strong> is the primary unit for thermodynamics 
              and physical sciences, where 0K represents absolute zero.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Wind className="text-emerald-600" size={24} /> Thermal Precision
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Unlike length or weight, temperature scales do not all start at zero. For example, the freezing 
              point of water is <strong>0°C</strong> but <strong>32°F</strong>. This requires precise mathematical 
              formulas to ensure accuracy when converting for critical HVAC, lab, or cooking tasks.
            </p>
          </div>
        </div>

        {/* Reference Table (SEO Booster) */}
        <div className="bg-slate-900 text-slate-300 p-8 rounded-3xl border border-slate-800">
          <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
            <Info className="text-emerald-500" size={20} />
            Common Reference Points
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono text-center">
            <div className="p-3 border border-slate-800 rounded bg-slate-900/50">
              <div className="text-emerald-500 mb-1 italic">Absolute Zero</div>
              <div>-273.15°C / 0K</div>
            </div>
            <div className="p-3 border border-slate-800 rounded bg-slate-900/50">
              <div className="text-emerald-500 mb-1 italic">Water Freezes</div>
              <div>0°C / 32°F</div>
            </div>
            <div className="p-3 border border-slate-800 rounded bg-slate-900/50">
              <div className="text-emerald-500 mb-1 italic">Body Temp</div>
              <div>37°C / 98.6°F</div>
            </div>
            <div className="p-3 border border-slate-800 rounded bg-slate-900/50">
              <div className="text-emerald-500 mb-1 italic">Water Boils</div>
              <div>100°C / 212°F</div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-6">
            <HelpCircle className="text-emerald-600" size={24} /> Application Use Cases
          </h2>
          <div className="space-y-4 text-sm text-slate-600">
            <p><strong>Science & Research:</strong> Convert laboratory findings from Celsius to Kelvin for absolute temperature calculations in physics and chemistry.</p>
            <p><strong>Travel & Meteorology:</strong> Plan your international trips by converting local weather forecasts from Celsius to Fahrenheit to better understand the climate.</p>
            <p><strong>Culinary Precision:</strong> Ensure perfect results in baking and meat preparation when following international recipes that use different thermal standards.</p>
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
