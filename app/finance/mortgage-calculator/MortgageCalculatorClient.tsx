'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { calculateMortgage } from '@/lib/mortgage-logic';
import AmortizationTable from '@components/AmortizationTable';
import { Info, HelpCircle, BookOpen, ShieldCheck } from 'lucide-react';

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const { monthlyPayment, schedule } = useMemo(() => {
    return calculateMortgage(loanAmount, interestRate, loanTerm);
  }, [loanAmount, interestRate, loanTerm]);

  return (
    <div className="max-w-4xl mx-auto px-4 pb-20">
      {/* Navigation Links */}
      <nav className="mb-8 flex flex-wrap gap-3 pt-6">
        <Link 
          href="/finance" 
          className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full hover:bg-blue-600 hover:text-white transition-all text-sm font-bold shadow-sm"
        >
          ← Finance Hub
        </Link>
        <Link 
          href="/finance/refinance-calculator" 
          className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full hover:bg-emerald-600 hover:text-white transition-all text-sm font-bold shadow-sm"
        >
          Refinance Calculator
        </Link>
        <Link 
          href="/finance/heloc-calculator" 
          className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full hover:bg-emerald-600 hover:text-white transition-all text-sm font-bold shadow-sm"
        >
          HELOC Calculator
        </Link>
      </nav>

      {/* Introduction */}
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Mortgage Payment Calculator</h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          Plan your home purchase with precision. Our mortgage tool calculates your <strong>estimated monthly principal and interest</strong> payments based on current market rates and loan terms. 
        </p>
      </header>

      {/* Ad Slot - Top */}
      <div className="w-full h-24 bg-slate-50 mb-10 flex flex-col items-center justify-center border border-slate-100 rounded-xl">
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Advertisement</span>
        <div className="text-slate-300 italic text-xs px-4 text-center select-none">AdSense Slot: Mortgage_Top_Placement</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Input Form */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen size={20} className="text-blue-600" />
            <h2 className="text-xl font-bold text-slate-800">Loan Parameters</h2>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Home Loan Amount ($)</label>
              <input 
                type="number" 
                value={loanAmount} 
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 focus:ring-0 outline-none transition-all text-lg font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Annual Interest Rate (%)</label>
              <input 
                type="number" step="0.1"
                value={interestRate} 
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 focus:ring-0 outline-none transition-all text-lg font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Loan Term</label>
              <select 
                value={loanTerm} 
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 focus:ring-0 outline-none transition-all text-lg font-medium bg-white"
              >
                <option value={30}>30 Year Fixed</option>
                <option value={20}>20 Year Fixed</option>
                <option value={15}>15 Year Fixed</option>
                <option value={10}>10 Year Fixed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="bg-blue-600 text-white p-8 rounded-2xl shadow-xl flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-white/20"></div>
          <h2 className="text-xl font-medium opacity-90 mb-4 uppercase tracking-widest">Monthly P&I Payment</h2>
          <div className="text-6xl font-black mb-6">
            ${monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="space-y-2 text-sm font-medium">
            <p className="bg-white/10 px-4 py-1 rounded-full">Total Term: {loanTerm} Years</p>
            <p className="opacity-70 italic text-xs">Total of {(loanTerm * 12)} installments</p>
          </div>
        </div>
      </div>

      {/* NEW SECTION: Educational Content (The "AdSense Booster") */}
      <section className="prose prose-slate max-w-none mb-16 space-y-12">
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
            <Info className="text-blue-600" /> Understanding Your Mortgage Breakdown
          </h2>
          <p className="text-slate-600 leading-relaxed">
            A mortgage payment is more than just a single number. Most monthly payments consist of four main components, often referred to as <strong>PITI</strong>: Principal, Interest, Taxes, and Insurance. While this calculator focuses on the <strong>Principal and Interest (P&I)</strong>, it is crucial to factor in property taxes and homeowners insurance for a complete budget.
          </p>
          <ul className="grid md:grid-cols-2 gap-4 list-none p-0 mt-6">
            <li className="bg-white p-4 rounded-lg border border-slate-200">
              <strong className="text-blue-600 block mb-1">Principal:</strong> The actual amount you borrowed from the lender that goes toward paying off the house balance.
            </li>
            <li className="bg-white p-4 rounded-lg border border-slate-200">
              <strong className="text-blue-600 block mb-1">Interest:</strong> The fee charged by the lender for the privilege of borrowing the money, typically expressed as an APR.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-6">
            <HelpCircle className="text-blue-600" /> Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h4 className="font-bold text-slate-800 mb-2 text-lg">Should I choose a 15-year or 30-year term?</h4>
              <p className="text-slate-600">A 30-year mortgage offers lower monthly payments but results in significantly higher interest paid over time. A 15-year mortgage builds equity faster and has lower interest rates, but requires a higher monthly cash flow.</p>
            </div>
            <div className="border-b border-slate-100 pb-4">
              <h4 className="font-bold text-slate-800 mb-2 text-lg">How does the interest rate affect my buying power?</h4>
              <p className="text-slate-600">Even a 1% difference in interest rates can change your monthly payment by hundreds of dollars and increase the total cost of the home by tens of thousands over the life of the loan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Amortization Component */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 italic font-mono">// Amortization_Schedule</h2>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded">V 1.0_PRO</span>
        </div>
        <AmortizationTable 
          data={schedule} 
          loanAmount={loanAmount} 
          calculatorName="Mortgage Loan" 
        />
      </div>

      {/* Mandatory Disclaimer */}
      <footer className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl">
        <div className="flex gap-4">
          <ShieldCheck className="text-amber-600 shrink-0" size={24} />
          <p className="text-xs text-amber-800 leading-relaxed font-medium">
            <strong>Financial Disclosure:</strong> Calculations provided by SyntixGear are for illustrative and educational purposes only. This tool does not take into account Private Mortgage Insurance (PMI), property taxes, or HOA fees. Always verify final figures with a licensed mortgage professional or financial advisor before signing loan documents.
          </p>
        </div>
      </footer>
    </div>
  );
}
