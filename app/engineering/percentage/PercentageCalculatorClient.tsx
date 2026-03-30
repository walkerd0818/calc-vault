'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Percent, 
  ChevronLeft, 
  Info, 
  BookOpen, 
  ShoppingBag, 
  TrendingUp, 
  ShieldCheck 
} from 'lucide-react';

export default function PercentageCalculator() {
  const [amount, setAmount] = useState(100);
  const [percentage, setPercentage] = useState(15);
  const [calculationType, setCalculationType] = useState<'basic' | 'discount' | 'markup' | 'increase' | 'decrease'>('basic');

  const results = useMemo(() => {
    const percentOfAmount = (amount * percentage) / 100;
    return {
      percentOfAmount,
      discountedAmount: amount - percentOfAmount,
      markedUpAmount: amount + percentOfAmount,
      increaseAmount: amount + percentOfAmount,
      decreaseAmount: amount - percentOfAmount,
    };
  }, [amount, percentage]);

  const renderResults = () => {
    const format = (val: number) => val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    switch (calculationType) {
      case 'basic':
        return (
          <div className="space-y-4">
            <p className="text-sm text-slate-500 font-mono uppercase tracking-wider">// basic_result //</p>
            <div className="flex justify-between items-end">
              <span className="text-slate-700">{percentage}% of ${amount.toLocaleString()}:</span>
              <span className="text-3xl font-black text-slate-900">${format(results.percentOfAmount)}</span>
            </div>
          </div>
        );
      case 'discount':
        return (
          <div className="space-y-4">
            <p className="text-sm text-slate-500 font-mono uppercase tracking-wider">// savings_summary //</p>
            <div className="space-y-2">
              <div className="flex justify-between text-slate-600 italic">
                <span>Original Price:</span>
                <span>${amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Discount ({percentage}%):</span>
                <span>-${format(results.percentOfAmount)}</span>
              </div>
              <div className="border-t border-slate-300 pt-4 flex justify-between items-end text-emerald-600">
                <span className="font-bold">Final Price:</span>
                <span className="text-4xl font-black">${format(results.discountedAmount)}</span>
              </div>
            </div>
          </div>
        );
      case 'markup':
        return (
          <div className="space-y-4">
            <p className="text-sm text-slate-500 font-mono uppercase tracking-wider">// profit_margin //</p>
            <div className="space-y-2">
              <div className="flex justify-between text-slate-600 italic">
                <span>Cost Price:</span>
                <span>${amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-blue-600">
                <span>Markup ({percentage}%):</span>
                <span>+${format(results.percentOfAmount)}</span>
              </div>
              <div className="border-t border-slate-300 pt-4 flex justify-between items-end text-slate-900">
                <span className="font-bold">Selling Price:</span>
                <span className="text-4xl font-black">${format(results.markedUpAmount)}</span>
              </div>
            </div>
          </div>
        );
      case 'increase':
      case 'decrease':
        const isInc = calculationType === 'increase';
        return (
          <div className="space-y-4">
            <p className="text-sm text-slate-500 font-mono uppercase tracking-wider">// value_shift //</p>
            <div className="space-y-2">
              <div className="flex justify-between text-slate-600 italic">
                <span>Original Value:</span>
                <span>${amount.toLocaleString()}</span>
              </div>
              <div className={`flex justify-between ${isInc ? 'text-emerald-600' : 'text-red-600'}`}>
                <span>{isInc ? 'Increase' : 'Decrease'} ({percentage}%):</span>
                <span>{isInc ? '+' : '-'}${format(results.percentOfAmount)}</span>
              </div>
              <div className="border-t border-slate-300 pt-4 flex justify-between items-end text-slate-900">
                <span className="font-bold">Adjusted Value:</span>
                <span className="text-4xl font-black">${format(isInc ? results.increaseAmount : results.decreaseAmount)}</span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pb-20">
      {/* Navigation */}
      <nav className="mb-8 flex flex-wrap gap-3 pt-6">
        <Link 
          href="/engineering" 
          className="inline-block px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors font-medium"
        >
          ← Engineering Hub
        </Link>
        <Link 
          href="/engineering/scientific" 
          className="inline-block px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors font-medium"
        >
          Scientific Calculator
        </Link>
        <Link 
          href="/engineering/geometry" 
          className="inline-block px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors font-medium"
        >
          Geometry Calculator
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight flex items-center gap-3">
          <Percent className="text-amber-600" size={36} />
          Percentage Calculator
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          A multi-purpose utility for calculating <strong>percentage changes</strong>, <strong>retail discounts</strong>, 
          and <strong>business markups</strong>. Engineered for precision in technical and commercial workflows.
        </p>
      </header>

      {/* Ad Slot - Top */}
      <div className="w-full h-24 bg-slate-50 mb-10 flex flex-col items-center justify-center border border-slate-100 rounded-xl">
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Sponsored Advertisement</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Inputs */}
        <div className="lg:col-span-4 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2 uppercase tracking-tighter">
            <Info size={20} className="text-amber-600" /> Parameters
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Initial Amount ($)</label>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-amber-500 outline-none transition-all font-medium text-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Percentage (%)</label>
              <input 
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(Number(e.target.value))}
                className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-amber-500 outline-none transition-all font-medium text-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Calculation Type</label>
              <select 
                value={calculationType}
                onChange={(e) => setCalculationType(e.target.value as any)}
                className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-amber-500 outline-none transition-all font-medium bg-white"
              >
                <option value="basic">Find Percentage of Amount</option>
                <option value="discount">Calculate Sale Discount</option>
                <option value="markup">Calculate Business Markup</option>
                <option value="increase">Calculate % Increase</option>
                <option value="decrease">Calculate % Decrease</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Display */}
        <div className="lg:col-span-8 bg-slate-100 p-10 rounded-2xl border-2 border-slate-200 flex flex-col justify-center min-h-[300px] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Percent size={200} />
          </div>
          {renderResults()}
        </div>
      </div>

      {/* EDUCATIONAL CONTENT: AdSense Booster */}
      <section className="prose prose-slate max-w-none space-y-12 border-t pt-16 border-slate-100">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <BookOpen className="text-amber-600" size={24} /> Percentage Formulas
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Understanding the math behind the tools is essential for verified accuracy. 
              To find a <strong>percentage of a number</strong>, you multiply the number by the percentage 
              and then divide by 100. For example: <code>(Value × %) / 100</code>.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <TrendingUp className="text-amber-600" size={24} /> Growth & Decay
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              When calculating a <strong>percentage increase</strong>, the formula becomes: 
              <code>Original Value + (Original Value × % / 100)</code>. This is vital for tracking 
              investment growth, population shifts, or increased overhead costs in <strong>engineering projects</strong>.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-3xl">
          <h3 className="text-amber-500 font-bold mb-4 uppercase tracking-widest text-sm flex items-center gap-2">
            <ShoppingBag size={18} /> Commercial Application
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Retailers and distributors use the <strong>Markup</strong> function to determine selling prices 
            based on wholesale costs. A 20% markup on a $100 cost results in a $120 selling price. 
            Conversely, the <strong>Discount</strong> function helps shoppers identify final prices 
            during seasonal clearances or promotional events.
          </p>
        </div>
      </section>

      {/* Mandatory Disclaimer */}
      <footer className="mt-16 bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl">
        <div className="flex gap-4">
          <ShieldCheck className="text-amber-600 shrink-0" size={24} />
          <p className="text-xs text-amber-800 leading-relaxed font-medium italic">
            <strong>Technical Note:</strong> Percentage calculations provided by SyntixGear are for informational purposes. 
            While we use precise floating-point math, users should always verify results before committing to 
            financial contracts or high-stakes engineering specifications.
          </p>
        </div>
      </footer>
    </div>
  );
}
