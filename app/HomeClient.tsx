'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  Ruler, 
  Zap, 
  ShieldCheck,
  ChevronRight, 
} from 'lucide-react';
import SearchBar from '@components/SearchBar';

const categories = [
  {
    title: 'Financial Calculators',
    description: 'Manage your wealth with mortgage, loan, and investment tools.',
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
    description: 'Precise conversions for length, weight, and temperature.',
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
    description: 'Advanced tools for technical calculations and geometry.',
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
    description: 'Tools for daily living, fitness, and health tracking.',
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

  function closeModal() {
    setShowRequestModal(false);
    setRequestSubmitted(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email       = (form.elements.namedItem('email')       as HTMLInputElement).value;
    const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;

    await fetch('https://formsubmit.co/ajax/walkerd0818@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        email,
        description,
        _subject: 'New Calculator Request from CalcVault',
      }),
    });

    setRequestSubmitted(true);
  }

  return (
    <div className="space-y-16 pb-20">

      {/* 1. Hero */}
      <section className="text-center pt-10 pb-12 bg-white rounded-3xl border border-slate-100 shadow-sm px-6">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
          Precision tools for <span className="text-blue-600">every calculation.</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10">
          Access hundreds of free, professional-grade calculators. Fast, accurate, and ready for work or personal use.
        </p>
        <div className="max-w-2xl mx-auto">
          <SearchBar />
        </div>
      </section>

      {/* 2. Top Ad Slot */}
      <div className="w-full h-[90px] bg-slate-50 border-y border-slate-100 flex items-center justify-center">
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Sponsored Advertisement</span>
      </div>

      {/* 3. Category Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className={`p-3 rounded-xl ${cat.color}`}>
                {cat.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {cat.title}
                </h2>
                <p className="text-sm text-slate-500">{cat.description}</p>
              </div>
            </div>

            <div className="space-y-3">
              {cat.links.map((link, lIdx) => (
                <Link
                  key={lIdx}
                  href={link.href}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-blue-600 font-medium transition-all group/link"
                >
                  {link.name}
                  <ChevronRight
                    size={16}
                    className="opacity-0 group-hover/link:opacity-100 transition-all -translate-x-2 group-hover/link:translate-x-0"
                  />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* 4. CTA */}
      <section className="bg-slate-900 text-white rounded-3xl p-12 text-center">
        <h3 className="text-2xl font-bold mb-4">Can&apos;t find what you need?</h3>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          We are constantly adding new tools to CalcVault. Suggest a new calculator and we&apos;ll build it.
        </p>
        <button
          className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold transition"
          onClick={() => setShowRequestModal(true)}
        >
          Request a Calculator
        </button>
      </section>

      {/* 5. Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative">

            <button
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl font-bold"
              onClick={closeModal}
            >
              ✕
            </button>

            {requestSubmitted ? (
              <div className="text-center py-6">
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Thanks!</h2>
                <p className="text-slate-500 mb-8">We received your request and will get to work on it.</p>
                <button
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-full transition"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Request a Calculator</h2>
                <p className="text-slate-500 text-sm mb-6">Tell us what you need and we&apos;ll build it.</p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Your Email</label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Describe the Calculator</label>
                    <textarea
                      name="description"
                      required
                      rows={4}
                      placeholder="e.g. A mortgage amortization calculator with extra payment support..."
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-full transition"
                  >
                    Submit Request
                  </button>
                  <button
                    type="button"
                    className="w-full mt-3 text-slate-500 hover:text-slate-700 font-semibold py-2 transition"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
