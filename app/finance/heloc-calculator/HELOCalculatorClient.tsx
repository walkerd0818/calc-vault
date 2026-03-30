'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Home, 
  Wallet, 
  Info, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRightLeft, 
  Calculator 
} from 'lucide-react';

export default function HELOCCalculator() {
  const [homeValue, setHomeValue] = useState(500000);
  const [mortgageBalance, setMortgageBalance] = useState(300000);
  const [ltv, setLTV] = useState(80); 
  const [helocAmount, setHelocAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [drawPeriodYears, setDrawPeriodYears] = useState(10);
  const [repaymentYears, setRepaymentYears] = useState(20);
  const [useAmount, setUseAmount] = useState(50000);

  const calculations = useMemo(() => {
    const maxHomeEquity = homeValue - mortgageBalance;
    const maxHelocByLTV = (homeValue * (ltv / 100)) - mortgageBalance;
    const availableCredit = Math.max(0, Math.min(maxHomeEquity, maxHelocByLTV));
    
    const drawMonthlyRate = interestRate / 100 / 12;
    const drawMonthlyPayment = (useAmount * drawMonthlyRate);
    
    const repaymentMonths = repaymentYears * 12;
    const repaymentMonthlyPayment = (useAmount * drawMonthlyRate * Math.pow(1 + drawMonthlyRate, repaymentMonths)) /
                                   (Math.pow(1 + drawMonthlyRate, repaymentMonths) - 1);
    
    const totalInterest = (drawMonthlyPayment * drawPeriodYears * 12) + 
                          ((repaymentMonthlyPayment * repaymentMonths) - useAmount);

    return {
      availableCredit,
      drawMonthlyPayment,
      repaymentMonthlyPayment,
      totalInterest,
      isOverLimit: helocAmount > availableCredit
    };
  }, [homeValue, mortgageBalance, ltv, helocAmount, interestRate, drawPeriodYears, repaymentYears, useAmount]);

  return (
    <div className="max-w-4xl mx-auto px-4 pb-20">
      {/* Navigation */}
      <nav className="mb-8 flex gap-4 pt-6">
        <Link href="/finance" className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all font-bold text-sm">
          ← Finance Hub
        </Link>
        <Link href="/finance/mortgage-calculator" className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all font-bold text-sm">
          Mortgage Calculator
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight flex items-center justify-center md:justify-start gap-3">
          <Home className="text-blue-600" size={36} />
          HELOC Calculator
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          Estimate your <strong>Home Equity Line of Credit</strong> limit and payments. 
          Calculate borrowing power based on your current <strong>Loan-to-Value (LTV)</strong> ratio and home equity.
        </p>
      </header>

      {/* Ad Slot - Top */}
      <div className="w-full h-24 bg-slate-50 mb-10 flex flex-col items-center justify-center border border-slate-100 rounded-xl">
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Sponsored Advertisement</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Input: Home Info */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
            <Calculator size={20} className="text-slate-400" /> Asset Assessment
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Estimated Home Value ($)</label>
              <input type="number" value={homeValue} onChange={(e) => setHomeValue(Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none transition-all font-medium" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Existing Mortgage Balance ($)</label>
              <input type="number" value={mortgageBalance} onChange={(e) => setMortgageBalance(Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none transition-all font-medium" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Lender LTV Limit (%)</label>
              <input type="number" value={ltv} onChange={(e) => setLTV(Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none transition-all font-medium" />
              <p className="text-[10px] text-slate-400 mt-2 italic font-mono">Standard range: 80% - 90%</p>
            </div>
          </div>
        </div>

        {/* Results: Credit Capacity */}
        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl flex flex-col justify-between border-b-8 border-blue-600">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Estimated Available Credit</h3>
            <div className="text-5xl font-black mb-2">${calculations.availableCredit.toLocaleString()}</div>
            <p className="text-sm text-slate-400 italic leading-snug">This is the maximum line of credit a lender may offer based on your LTV.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl mt-6">
            <h4 className="text-[10px] uppercase font-bold text-blue-300 mb-2 tracking-widest">Draw Phase Payment (Interest-Only)</h4>
            <div className="text-2xl font-bold font-mono">${calculations.drawMonthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}<span className="text-xs opacity-50">/mo</span></div>
          </div>
        </div>
      </div>

      {/* EDUCATIONAL CONTENT: AdSense Booster */}
      <section className="prose prose-slate max-w-none mb-16 space-y-12">
        <div className="grid md:grid-cols-2 gap-12 border-t pt-12 border-slate-100">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Info className="text-blue-600" /> HELOC vs. Home Equity Loan
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              A <strong>Home Equity Line of Credit (HELOC)</strong> functions like a revolving credit card secured by your home. You only pay interest on what you actually spend. In contrast, a <strong>Home Equity Loan</strong> provides a lump sum with a fixed interest rate and fixed monthly payments from day one.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <ArrowRightLeft className="text-blue-600" /> Draw vs. Repayment
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Most HELOCs have two distinct phases. During the <strong>Draw Period</strong> (usually 10 years), you can spend the funds and often make interest-only payments. Once the <strong>Repayment Period</strong> begins, you can no longer withdraw funds and must pay back both principal and interest.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-6">
            <HelpCircle className="text-blue-600" /> HELOC Strategy FAQ
          </h2>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-slate-800 mb-2">What is the "Combined Loan-to-Value" (CLTV)?</h4>
              <p className="text-sm text-slate-600 leading-relaxed">Lenders use CLTV to determine how much equity you have across all loans. Our calculator helps you find this by adding your current mortgage balance to the proposed HELOC amount and comparing it to your home's appraisal value.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-2">Are HELOC interest rates fixed or variable?</h4>
              <p className="text-sm text-slate-600 leading-relaxed">Most HELOCs have variable interest rates tied to the prime rate. This means your monthly payment could increase if market rates rise during your draw or repayment periods.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mandatory Disclaimer */}
      <footer className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl">
        <div className="flex gap-4">
          <ShieldCheck className="text-amber-600 shrink-0" size={24} />
          <p className="text-xs text-amber-800 leading-relaxed font-medium">
            <strong>Financial Disclosure:</strong> A HELOC is secured by your home; failure to make payments can result in foreclosure. Calculations provided by SyntixGear are estimates and do not include closing costs, annual fees, or appraisal fees. SyntixGear is not a lender or financial advisor. Consult with a qualified professional before leveraging your home equity.
          </p>
        </div>
      </footer>
    </div>
  );
}
