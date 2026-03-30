'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, ChevronRight, Binary, Shapes, Percent, Lightbulb, CheckCircle2 } from 'lucide-react';

const engineeringCalculators = [
  { 
    name: 'Scientific Calculator', 
    href: '/engineering/scientific', 
    icon: <Binary size={20} />,
    description: 'Perform complex logarithmic, trigonometric, and exponential functions with high-precision output.' 
  },
  { 
    name: 'Percentage Calculator', 
    href: '/engineering/percentage', 
    icon: <Percent size={20} />,
    description: 'A versatile tool for finding percentage change, difference, and markups in technical workflows.' 
  },
  { 
    name: 'Area & Volume', 
    href: '/engineering/geometry', 
    icon: <Shapes size={20} />,
    description: 'Calculate spatial dimensions for 2D and 3D shapes including cylinders, spheres, and prisms.' 
  },
];

export default function EngineeringPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 pb-20">
      {/* Header */}
      <section className="mb-12 pt-6">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="text-amber-600" size={32} />
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Engineering Hub</h1>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
          High-precision computational utilities for <strong>technical professionals</strong>, 
          <strong> students</strong>, and <strong>engineers</strong>. Our terminal provides a clean, 
          zero-latency environment for solving complex spatial and mathematical problems.
        </p>
      </section>

      {/* Ad Slot */}
      <div className="w-full h-24 bg-slate-50 mb-12 flex flex-col items-center justify-center border border-slate-100 rounded-xl">
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Sponsored Advertisement</span>
        <div className="text-slate-200 italic text-[10px] select-none">SyntixGear_Engineering_Ad_Placement</div>
      </div>

      {/* Calculators Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {engineeringCalculators.map((calc, idx) => (
          <Link
            key={idx}
            href={calc.href}
            className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl group-hover:bg-amber-600 group-hover:text-white transition-all">
                {calc.icon}
              </div>
              <ChevronRight size={20} className="text-slate-300 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
              {calc.name}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">{calc.description}</p>
          </Link>
        ))}
      </section>

      {/* NEW CONTENT: Educational & SEO Context Section */}
      <section className="prose prose-slate max-w-none mb-16 space-y-12 border-t pt-12 border-slate-100">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Lightbulb className="text-amber-600" size={24} />
              Computational Integrity
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              In technical fields, precision is non-negotiable. Whether you are calculating 
              <strong> stress tolerances</strong> in structural geometry or performing 
              <strong> stoichiometric calculations</strong> in chemistry, our math engine 
              uses standardized floating-point logic to ensure results are accurate and reliable for 
              professional documentation.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Shapes className="text-amber-600" size={24} />
              Geometry & Spatial Analysis
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our spatial tools go beyond simple area math. We provide <strong>volume 
              interpolation</strong> for complex 3D shapes, essential for mechanical 
              design, architecture, and fluid dynamics. By automating these formulas, we 
              reduce the risk of manual calculation errors in the drafting process.
            </p>
          </div>
        </div>

        {/* Technical Features Block */}
        <div className="bg-slate-900 text-slate-300 p-8 rounded-3xl border border-slate-800">
          <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="text-amber-500" size={20} />
            Engineering Logic Standards
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 list-none p-0 text-xs font-mono tracking-tight">
            <li className="flex gap-2">
              <span className="text-amber-500 font-bold">01.</span>
              <span><strong>Trigonometry:</strong> Full support for Sine, Cosine, and Tangent functions.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 font-bold">02.</span>
              <span><strong>Spatial Math:</strong> Radius, diameter, and pi-based area calculations.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 font-bold">03.</span>
              <span><strong>Efficiency:</strong> Instant results with zero server-side latency.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 font-bold">04.</span>
              <span><strong>Privacy:</strong> Technical data remains local to your device terminal.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Navigation Link */}
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full hover:bg-amber-600 transition-all font-bold shadow-lg shadow-slate-200"
      >
        ← Calc Vault
      </Link>
    </div>
  );
}
