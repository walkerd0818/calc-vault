'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ChevronRight, Activity, Heart, Info, Lock } from 'lucide-react';

const healthCalculators = [
  { 
    name: 'BMI Calculator', 
    href: '/health/bmi', 
    icon: <Activity size={20} />,
    description: 'Calculate your Body Mass Index (BMI) to assess weight categories and associated health risks.' 
  },
  { 
    name: 'Calorie Needs', 
    href: '/health/calories', 
    icon: <Heart size={20} />,
    description: 'Estimate your Total Daily Energy Expenditure (TDEE) based on age, gender, and activity levels.' 
  },
];

export default function HealthPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 pb-20">
      {/* Header */}
      <section className="mb-12 pt-6">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="text-rose-600" size={32} />
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Wellness Hub</h1>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
          Science-based utilities for <strong>fitness tracking</strong>, <strong>nutritional planning</strong>, 
          and <strong>biometric analysis</strong>. Our tools provide a structured way to visualize your 
          physical data and set achievable wellness milestones.
        </p>
      </section>

      {/* Ad Slot */}
      <div className="w-full h-24 bg-slate-50 mb-12 flex flex-col items-center justify-center border border-slate-100 rounded-xl">
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Sponsored Advertisement</span>
        <div className="text-slate-200 italic text-[10px] select-none">SyntixGear_Health_Ad_Placement</div>
      </div>

      {/* Calculators Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {healthCalculators.map((calc, idx) => (
          <Link
            key={idx}
            href={calc.href}
            className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-rose-500 hover:shadow-xl hover:shadow-rose-500/5 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-rose-50 text-rose-600 rounded-xl group-hover:bg-rose-600 group-hover:text-white transition-all">
                {calc.icon}
              </div>
              <ChevronRight size={20} className="text-slate-300 group-hover:text-rose-600 group-hover:translate-x-1 transition-all" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-rose-600 transition-colors">
              {calc.name}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">{calc.description}</p>
          </Link>
        ))}
      </section>

      {/* NEW CONTENT: Educational & SEO Context Section */}
      <section className="prose prose-slate max-w-none mb-16 space-y-12 border-t pt-12 border-slate-100">
        <div className="grid md:grid-cols-2 gap-12 text-slate-600 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4 text-rose-700">
              <Info size={24} />
              Data-Driven Wellness
            </h2>
            <p className="text-sm">
              In the pursuit of physical health, <strong>quantifiable metrics</strong> are essential. 
              Our tools use standardized formulas like the <strong>Mifflin-St Jeor Equation</strong> 
              and <strong>BMI scaling</strong> to help you understand your body’s unique 
              requirements for maintenance, weight loss, or muscle gain.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4 text-rose-700">
              <Lock size={24} />
              Privacy by Architecture
            </h2>
            <p className="text-sm">
              Your health data is personal. Unlike many fitness apps, SyntixGear <strong>does not 
              transmit or store</strong> your biometric inputs. Every calculation is performed 
              locally within your browser's terminal, ensuring that your weight, age, and 
              activity levels remain entirely private.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 text-slate-300 p-8 rounded-3xl border border-slate-800">
          <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-sm font-mono italic">
            // wellness_protocol_v1.0 //
          </h3>
          <p className="text-sm mb-6 opacity-80 leading-relaxed">
            Our wellness hub focuses on the primary pillars of metabolic tracking. 
            By identifying your baseline metrics, you can make more informed decisions 
            regarding nutrition and physical activity.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 list-none p-0 text-xs font-mono tracking-tight uppercase">
            <li className="flex gap-2">
              <span className="text-rose-500 font-bold">01.</span>
              <span><strong>Metabolic Rate:</strong> Understanding your TDEE and BMR.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-rose-500 font-bold">02.</span>
              <span><strong>Biometrics:</strong> Analyzing BMI for general health screening.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-rose-500 font-bold">03.</span>
              <span><strong>Nutrition:</strong> Identifying calorie targets for specific goals.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-rose-500 font-bold">04.</span>
              <span><strong>Activity:</strong> Adjusting metrics based on physical intensity.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* MANDATORY MEDICAL DISCLAIMER (Required for AdSense/YMYL) */}
      <footer className="bg-rose-50 border-l-4 border-rose-400 p-6 rounded-r-xl mb-12">
        <div className="flex gap-4">
          <ShieldCheck className="text-rose-600 shrink-0" size={24} />
          <p className="text-xs text-rose-800 leading-relaxed font-medium">
            <strong>Medical Disclaimer:</strong> The information and tools provided by SyntixGear are for 
            informational and educational purposes only. They are not a substitute for professional 
            medical advice, diagnosis, or treatment. Always seek the advice of your physician or 
            other qualified health provider with any questions you may have regarding a medical 
            condition or fitness program. Never disregard professional medical advice because of 
            something you have read on this website.
          </p>
        </div>
      </footer>

      {/* Navigation Link */}
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full hover:bg-rose-600 transition-all font-bold shadow-lg shadow-slate-200"
      >
        ← Calc Vault
      </Link>
    </div>
  );
}
