'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  Info, 
  TrendingUp, 
  ShieldCheck, 
  BookOpen, 
  HelpCircle 
} from 'lucide-react';

interface InterestResult {
  principal: number;
  rate: number;
  time: number;
  simpleInterest: number;
  simpleFinal: number;
  compoundInterestAnnual: number;
  compoundFinalAnnual: number;
  compoundInterestMonthly: number;
  compoundFinalMonthly: number;
  compoundInterestDaily: number;
  compoundFinalDaily: number;
}

const calculateInterest = (
  principal: number,
  rate: number,
  time: number
): InterestResult => {
  const simpleInterest = (principal * rate * time) / 100;
  const simpleFinal = principal + simpleInterest;

  const compoundFinalAnnual = principal * Math.pow(1 + rate / 100, time);
  const actualCompoundAnnual = compoundFinalAnnual - principal;

  const compoundFinalMonthly = principal * Math.pow(1 + rate / 100 / 12, 12 * time);
  const actualCompoundMonthly = compoundFinalMonthly - principal;

  const compoundFinalDaily = principal * Math.pow(1 + rate / 100 / 365, 365 * time);
  const actualCompoundDaily = compoundFinalDaily - principal;

  return {
    principal, rate, time,
    simpleInterest, simpleFinal,
    compoundInterestAnnual: actualCompoundAnnual, compoundFinalAnnual,
    compoundInterestMonthly: actualCompoundMonthly, compoundFinalMonthly,
    compoundInterestDaily: actualCompoundDaily, compoundFinalDaily,
  };
};

export default function InterestCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(5);
  const [time, setTime] = useState(5);

  const result = useMemo(() => calculateInterest(principal, rate, time), [principal, rate, time]);

  return (
    <div className="max-w-5xl mx-auto px-4 pb-20">
      {/* Navigation */}
      <nav className="mb-8 flex gap-4 pt-6">
        <Link href="/finance" className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all font-bold text-sm">
          ← Finance Hub
        </Link>
        <Link href="/finance/loan-calculator" className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all font-bold text-sm">
          Loan Calculator
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight flex items-center gap-3">
          <Calculator className="text-blue-600" size={36} />
          Interest Calculator
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          Compare <strong>simple</strong> and <strong>compound interest</strong> models side-by-side. 
          See how compounding frequency (daily vs. monthly) drastically changes your long-term returns.
        </p>
      </header>

      {/* Ad Slot - Top */}
      <div className="w-full h-24 bg-slate-50 mb-10 flex flex-col items-center justify-center border border-slate-100 rounded-xl">
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Sponsored Advertisement</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Input Form */}
        <div className="md:col-span-1 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
            <BookOpen size={20} className="text-blue-600" /> Parameters
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">Principal ($)</label>
              <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none transition-all font-medium" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">Annual Rate (%)</label>
              <input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none transition-all font-medium" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">Years</label>
              <input type="number" step="0.5" value={time} onChange={(e) => setTime(Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none transition-all font-medium" />
            </div>
          </div>
        </div>

        {/* Results - Simple Interest */}
        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl flex flex-col justify-between border-b-4 border-blue-500">
          <h3 className="text-lg font-bold uppercase tracking-widest text-blue-400">Simple Model</h3>
          <div className="my-6 text-center">
             <div className="text-sm opacity-60">Interest Earned</div>
             <div className="text-4xl font-black text-white">${result.simpleInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
          </div>
          <div className="border-t border-white/10 pt-4 text-center">
            <div className="text-xs opacity-60">Total Value</div>
            <div className="text-xl font-bold">${result.simpleFinal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
          </div>
        </div>

        {/* Results - Compound Interest */}
        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl flex flex-col justify-between border-b-4 border-emerald-500">
          <h3 className="text-lg font-bold uppercase tracking-widest text-emerald-400">Compound (Annual)</h3>
          <div className="my-6 text-center">
             <div className="text-sm opacity-60">Interest Earned</div>
             <div className="text-4xl font-black text-white">${result.compoundInterestAnnual.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
          </div>
          <div className="border-t border-white/10 pt-4 text-center">
            <div className="text-xs opacity-60">Total Value</div>
            <div className="text-xl font-bold">${result.compoundFinalAnnual.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
          </div>
        </div>
      </div>

      {/* EDUCATIONAL CONTENT: AdSense Booster */}
      <section className="prose prose-slate max-w-none mb-16 space-y-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Info className="text-blue-600" /> Simple vs. Compound
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              <strong>Simple interest</strong> is calculated solely on the principal amount. It remains constant throughout the duration of the investment. 
              <strong> Compound interest</strong>, however, is calculated on the principal <em>plus</em> any accumulated interest from previous periods. 
              This "interest on interest" effect allows your wealth to grow exponentially over time.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <TrendingUp className="text-emerald-600" /> Compound Frequency
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              The more frequently interest is compounded, the faster your balance grows. Daily compounding 
              will always yield a higher return than monthly or annual compounding, even if the nominal 
              interest rate remains the same. This is why credit cards (compounding daily) grow debt 
              faster than savings accounts (often monthly).
            </p>
          </div>
        </div>

        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-6">
            <HelpCircle className="text-blue-600" /> Rule of 72
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            A common shortcut for investors is the <strong>Rule of 72</strong>. To find out approximately how many years 
            it takes for an investment to double with compound interest, divide 72 by the annual interest rate. 
            For example, at a 6% return, your money doubles in roughly 12 years (72 / 6).
          </p>
        </div>
      </section>

      {/* Mandatory Disclaimer */}
      <footer className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl">
        <div className="flex gap-4">
          <ShieldCheck className="text-amber-600 shrink-0" size={24} />
          <p className="text-xs text-amber-800 leading-relaxed font-medium">
            <strong>Financial Disclosure:</strong> These calculations are for illustrative purposes and do not 
            account for taxes, inflation, or account fees. Actual returns may vary based on specific banking 
            regulations or changes in market conditions. SyntixGear does not provide professional financial advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
