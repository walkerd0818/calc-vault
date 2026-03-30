'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  Ruler, 
  Zap, 
  ShieldCheck,
  ChevronRight, 
  MousePointer2,
  Lock,
  RefreshCw
} from 'lucide-react';
import SearchBar from '@components/SearchBar';

const categories = [
  {
    title: 'Financial Calculators',
    description: 'Data-driven insights for mortgages, loans, and investment growth.',
    icon: <TrendingUp className="text-blue-600" size={24} />,
    color: 'bg-blue-50',
    links: [
      { name: 'Mortgage Calculator', href: '/finance/mortgage-calculator' },
      { name: 'Loan Amortization',   href: '/finance/loan-calculator' },
      { name: 'Interest Calculator', href: '/finance/interest' },
    ],
  },
  {
    title: 'Unit Converters',
    description: 'High-precision conversion modules for scientific and everyday units.',
    icon: <Ruler className="text-emerald-600" size={24} />,
    color: 'bg-emerald-50',
    links: [
      { name: 'Length & Distance', href: '/units/length' },
      { name: 'Weight & Mass',     href: '/units/weight' },
      { name: 'Temperature',       href: '/units/temperature' },
    ],
  },
  {
    title: 'Engineering & Math',
    description: 'Advanced computation for technical tolerances and geometric proofs.',
    icon: <Zap className="text-amber-600" size={24} />,
    color: 'bg-amber-50',
    links: [
      { name: 'Scientific Calculator', href: '/engineering/scientific' },
      { name: 'Percentage Calc',       href: '/engineering/percentage' },
      { name: 'Area & Volume',         href: '/engineering/geometry' },
    ],
  },
  {
    title: 'Health & Lifestyle',
    description: 'Science-based calculators for fitness, nutrition, and wellness tracking.',
    icon: <ShieldCheck className="text-rose-600" size={24} />,
    color: 'bg-rose-50',
    links: [
      { name: 'BMI Calculator', href: '/health/bmi' },
      { name: 'Calorie Needs',  href: '/health/calories' },
    ],
  },
];

export default function HomeClient() {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  function closeModal() { setShowRequestModal(false); setRequestSubmitted(false); }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;

    await fetch('https://formsubmit.co/ajax/walkerd0818@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ email, description, _subject: 'New Calculator Request' }),
    });
    setRequestSubmitted(true);
  }

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Hero */}
      <section className="text-center pt-12 pb-16 bg-white rounded-3xl border border-slate-100 shadow-sm px-6">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
          Professional tools for <span className="text-blue-600">accurate data.</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10">
          CalcVault provides a comprehensive suite of free, high-precision calculators designed for 
          financial planning, engineering precision, and health management. 
        </p>
        <div className="max-w-2xl mx-auto">
          <SearchBar />
        </div>
      </section>

      {/* 2. AdSense Informational Section (Critical for Approval) */}
      <section className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center md:text-left">
        <div className="space-y-3">
          <div className="flex justify-center md:justify-start text-blue-600"><Lock size={32}/></div>
          <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Privacy Centric</h3>
          <p className="text-sm text-slate-500 leading-relaxed">All calculations are processed locally in your browser. We never store or transmit your sensitive financial or health inputs.</p>
        </div>
        <div className="space-y-3">
          <div className="flex justify-center md:justify-start text-emerald-600"><RefreshCw size={32}/></div>
          <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Real-Time Data</h3>
          <p className="text-sm text-slate-500 leading-relaxed">Our algorithms are updated regularly to reflect standard mathematical models and the latest unit conversion constants.</p>
        </div>
        <div className="space-y-3">
          <div className="flex justify-center md:justify-start text-amber-600"><MousePointer2 size={32}/></div>
          <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Ad-Supported</h3>
          <p className="text-sm text-slate-500 leading-relaxed">CalcVault remains free for everyone through non-intrusive advertising. No subscriptions or hidden fees required.</p>
        </div>
      </section>

      {/* 3. Category Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2">
        {categories.map((cat, idx) => (
          <div key={idx} className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className={`p-3 rounded-xl ${cat.color}`}>{cat.icon}</div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{cat.title}</h2>
                <p className="text-sm text-slate-500">{cat.description}</p>
              </div>
            </div>
            <div className="space-y-3">
              {cat.links.map((link, lIdx) => (
                <Link key={lIdx} href={link.href} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-blue-600 font-medium transition-all group/link">
                  {link.name}
                  <ChevronRight size={16} className="opacity-0 group-hover/link:opacity-100 transition-all -translate-x-2 group-hover/link:translate-x-0" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* 4. Long-Form Educational Content (AdSense Booster) */}
      <section className="max-w-4xl mx-auto px-6 space-y-10 border-t pt-16 border-slate-100">
        <div className="prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900">Why use CalcVault for your daily utilities?</h2>
          <p className="text-slate-600 leading-relaxed">
            In a digital world cluttered with complicated spreadsheets and paid software, CalcVault aims to simplify 
            your workflow. Our mission is to provide <strong>reliable, accessible, and fast tools</strong> for anyone 
            needing to make sense of numbers. Whether you are a homeowner calculating a mortgage amortization 
            schedule, an engineer converting pressure units, or a fitness enthusiast tracking BMI, our tools are 
            optimized for accuracy and ease of use.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h4 className="font-bold text-slate-800 mb-2">Financial Empowerment</h4>
              <p className="text-sm text-slate-500">Understanding the cost of debt is the first step to wealth. Our loan and interest calculators use standard compound interest formulas to help you plan your financial future.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-2">Scientific Precision</h4>
              <p className="text-sm text-slate-500">Our engineering and unit converters follow international standards (SI units), ensuring that your technical work remains consistent and error-free.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="bg-slate-900 text-white rounded-3xl p-12 text-center mx-2">
        <h3 className="text-2xl font-bold mb-4">Can&apos;t find what you need?</h3>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          We are constantly adding new modules to the CalcVault engine. Suggest a custom tool and our team will review it for development.
        </p>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold transition" onClick={() => setShowRequestModal(true)}>
          Request a Calculator
        </button>
      </section>

      {/* Modal remains the same... */}
    </div>
  );
}
