'use client';
import { Ruler, ChevronRight, Scale, Thermometer, Globe, Zap, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useUnitPreference } from '@/lib/unit-context';

const unitConverters = [
  { 
    name: 'Length & Distance', 
    href: '/units/length', 
    icon: <Ruler size={20} />,
    description: 'Convert between Imperial and Metric systems including meters, feet, miles, and kilometers.' 
  },
  { 
    name: 'Weight & Mass', 
    href: '/units/weight', 
    icon: <Scale size={20} />,
    description: 'Accurate conversions for kilograms, pounds, ounces, and grams for shipping or science.' 
  },
  { 
    name: 'Temperature', 
    href: '/units/temperature', 
    icon: <Thermometer size={20} />,
    description: 'Instant scaling between Celsius, Fahrenheit, and Kelvin for weather or lab work.' 
  },
];

export default function UnitsPage() {
  const { unit, setUnit } = useUnitPreference();

  return (
    <div className="max-w-4xl mx-auto px-4 pb-20">
      <div className="flex justify-end mb-6">
        <div className="inline-flex gap-2">
          <button onClick={() => setUnit('metric')} className={`px-3 py-2 rounded-lg font-bold ${unit === 'metric' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}>Metric</button>
          <button onClick={() => setUnit('imperial')} className={`px-3 py-2 rounded-lg font-bold ${unit === 'imperial' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}>Imperial</button>
        </div>
      </div>
      {/* Header */}
      <section className="mb-12 pt-6">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="text-emerald-600" size={32} />
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Unit Conversion Hub</h1>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
          Precision-engineered utilities for global measurement standards. Whether you are working in 
          <strong> Metric (SI)</strong> or <strong>Imperial</strong> units, our terminal provides 
          zero-latency conversions for technical, professional, and everyday applications.
        </p>
      </section>

      {/* Ad Slot */}
      <div className="w-full h-24 bg-slate-50 mb-12 flex flex-col items-center justify-center border border-slate-100 rounded-xl">
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Sponsored Advertisement</span>
        <div className="text-slate-200 italic text-[10px] select-none">SyntixGear_Unit_Ad_Placement</div>
      </div>

      {/* Converters Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {unitConverters.map((converter, idx) => (
          <Link
            key={idx}
            href={converter.href}
            className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-all">
                {converter.icon}
              </div>
              <ChevronRight size={20} className="text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
              {converter.name}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">{converter.description}</p>
          </Link>
        ))}
      </section>

      {/* NEW CONTENT: Educational & SEO Context Section */}
      <section className="prose prose-slate max-w-none mb-16 space-y-12 border-t pt-12 border-slate-100">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Zap className="text-emerald-600" size={24} />
              The Importance of Precision
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              In engineering and global logistics, even a minor rounding error in <strong>unit conversion</strong> can lead to significant 
              operational failures. Our tools use high-precision floating-point math to ensure that 
              your conversions between <strong>kilograms to pounds</strong> or <strong>meters to feet</strong> 
              remain accurate to the eighth decimal place.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Globe className="text-emerald-600" size={24} />
              Metric vs. Imperial
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              While the majority of the world uses the <strong>International System of Units (SI)</strong>, 
              the United States and a few other regions still rely on the <strong>Imperial system</strong>. 
              SyntixGear bridges this gap, providing a seamless translation layer for international trade, 
              scientific research, and travel.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 text-slate-300 p-8 rounded-3xl border border-slate-800">
          <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="text-emerald-500" size={20} />
            Conversion Protocol Guide
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 list-none p-0 text-xs font-mono tracking-tight">
            <li className="flex gap-2">
              <span className="text-emerald-500 font-bold">01.</span>
              <span><strong>Length:</strong> Vital for architecture and DIY projects (cm, in, ft, m, km).</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-500 font-bold">02.</span>
              <span><strong>Mass:</strong> Essential for cooking, chemistry, and weightlifting (kg, lb, g, oz).</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-500 font-bold">03.</span>
              <span><strong>Temperature:</strong> Key for weather, HVAC, and industrial processes (C, F, K).</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-500 font-bold">04.</span>
              <span><strong>Calculations:</strong> All logic is processed locally for instant response times.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Navigation Link */}
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full hover:bg-emerald-600 transition-all font-bold shadow-lg shadow-slate-200"
      >
        ← Calc Vault
      </Link>
    </div>
  );
}
