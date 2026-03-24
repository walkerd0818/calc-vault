'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

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
  // Simple Interest: I = P * R * T / 100
  const simpleInterest = (principal * rate * time) / 100;
  const simpleFinal = principal + simpleInterest;

  // Compound Interest (Annual): A = P(1 + r/100)^t
  const compoundInterestAnnual = simpleFinal - principal;
  const compoundFinalAnnual = principal * Math.pow(1 + rate / 100, time);
  const actualCompoundAnnual = compoundFinalAnnual - principal;

  // Compound Interest (Monthly): A = P(1 + r/100/12)^(12*t)
  const compoundFinalMonthly = principal * Math.pow(1 + rate / 100 / 12, 12 * time);
  const actualCompoundMonthly = compoundFinalMonthly - principal;

  // Compound Interest (Daily): A = P(1 + r/100/365)^(365*t)
  const compoundFinalDaily = principal * Math.pow(1 + rate / 100 / 365, 365 * time);
  const actualCompoundDaily = compoundFinalDaily - principal;

  return {
    principal,
    rate,
    time,
    simpleInterest,
    simpleFinal,
    compoundInterestAnnual: actualCompoundAnnual,
    compoundFinalAnnual,
    compoundInterestMonthly: actualCompoundMonthly,
    compoundFinalMonthly,
    compoundInterestDaily: actualCompoundDaily,
    compoundFinalDaily,
  };
};

export default function InterestCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(5);
  const [time, setTime] = useState(5);

  const result = useMemo(() => {
    return calculateInterest(principal, rate, time);
  }, [principal, rate, time]);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Navigation Links */}
      <div className="mb-6 flex gap-4">
        <Link 
          href="/finance" 
          className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
        >
          ← Back to Finance
        </Link>
        <Link 
          href="/finance/mortgage-calculator" 
          className="inline-block px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors font-medium"
        >
          Mortgage Calculator
        </Link>
      </div>

      {/* Introduction */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Interest Calculator</h1>
        <p className="text-slate-600">
          Calculate simple and compound interest. Compare how different compounding periods affect your money.
        </p>
      </section>

      {/* Ad Slot - Top */}
      <div className="w-full h-24 bg-slate-100 mb-8 flex items-center justify-center border-dashed border-2 border-slate-300">
        <span className="text-slate-400 text-xs">Advertisement</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Input Form */}
        <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold mb-4">Calculator</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Principal ($)</label>
              <input 
                type="number" 
                value={principal} 
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Interest Rate (%)</label>
              <input 
                type="number" step="0.1"
                value={rate} 
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time (Years)</label>
              <input 
                type="number" step="0.5"
                value={time} 
                onChange={(e) => setTime(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Results - Simple Interest */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <h3 className="text-lg font-semibold mb-4 text-blue-900">Simple Interest</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-700">Interest Earned:</span>
              <span className="font-semibold text-blue-900">${result.simpleInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Final Amount:</span>
              <span className="font-semibold text-blue-900">${result.simpleFinal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Results - Compound Interest (Annual) */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <h3 className="text-lg font-semibold mb-4 text-green-900">Compound (Annual)</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-green-700">Interest Earned:</span>
              <span className="font-semibold text-green-900">${result.compoundInterestAnnual.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Final Amount:</span>
              <span className="font-semibold text-green-900">${result.compoundFinalAnnual.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Compounding Periods */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Compound (Monthly) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold mb-4 text-slate-900">Compound Interest (Monthly)</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-700">Interest Earned:</span>
              <span className="font-semibold text-slate-900">${result.compoundInterestMonthly.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700">Final Amount:</span>
              <span className="font-semibold text-slate-900">${result.compoundFinalMonthly.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-200">
              Compounds 12 times per year
            </div>
          </div>
        </div>

        {/* Compound (Daily) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold mb-4 text-slate-900">Compound Interest (Daily)</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-700">Interest Earned:</span>
              <span className="font-semibold text-slate-900">${result.compoundInterestDaily.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700">Final Amount:</span>
              <span className="font-semibold text-slate-900">${result.compoundFinalDaily.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-200">
              Compounds 365 times per year
            </div>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="mt-12 bg-slate-50 p-8 rounded-xl border border-slate-200">
        <h2 className="text-xl font-semibold mb-4 text-slate-900">Understanding Interest</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700">
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Simple Interest</h3>
            <p>
              Simple interest is calculated only on the principal amount. It's the most basic type of interest calculation. 
              Formula: I = P × R × T ÷ 100
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Compound Interest</h3>
            <p>
              Compound interest is calculated on both the principal and accumulated interest. It grows exponentially based on 
              how often it's compounded (annually, monthly, or daily).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
