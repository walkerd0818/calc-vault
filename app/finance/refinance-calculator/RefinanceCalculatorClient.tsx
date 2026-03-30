'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Info, 
         HelpCircle, 
         CheckCircle2, 
         AlertTriangle, 
         ArrowRightLeft, 
         Landmark, 
         RefreshCw } from 'lucide-react';

export default function RefinanceCalculator() {
  const [currentLoanAmount, setCurrentLoanAmount] = useState(300000);
  const [currentRate, setCurrentRate] = useState(6.5);
  const [currentTerm, setCurrentTerm] = useState(30);
  const [monthsPaid, setMonthsPaid] = useState(24);
  const [newRate, setNewRate] = useState(5.5);
  const [newTerm, setNewTerm] = useState(30);
  const [closingCosts, setClosingCosts] = useState(3000);

  const originalPayment = useMemo(() => {
    const monthlyRate = currentRate / 100 / 12;
    const numberOfPayments = currentTerm * 12;
    return (currentLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
           (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  }, [currentLoanAmount, currentRate, currentTerm]);

  const remainingBalance = useMemo(() => {
    const monthlyRate = currentRate / 100 / 12;
    const numberOfPayments = currentTerm * 12;
    const totalPayments = currentTerm * 12 - monthsPaid;
    return (originalPayment * (Math.pow(1 + monthlyRate, totalPayments) - 1)) /
           (monthlyRate * Math.pow(1 + monthlyRate, totalPayments));
  }, [originalPayment, currentRate, currentTerm, monthsPaid]);

  const newPayment = useMemo(() => {
    const monthlyRate = newRate / 100 / 12;
    const numberOfPayments = newTerm * 12;
    return (remainingBalance * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
           (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  }, [remainingBalance, newRate, newTerm]);

  const analysis = useMemo(() => {
    const monthlyPaymentSavings = originalPayment - newPayment;
    const monthsToBreakEven = monthlyPaymentSavings > 0 ? Math.ceil(closingCosts / monthlyPaymentSavings) : 999;
    const totalSavings = (monthlyPaymentSavings * (newTerm * 12 - monthsPaid)) - closingCosts;
    const yearsToBreakEven = monthsToBreakEven / 12;

    return {
      monthlyPaymentSavings,
      monthsToBreakEven,
      yearsToBreakEven,
      totalSavings,
      isWorthIt: totalSavings > 0 && monthsToBreakEven < (newTerm * 12 - monthsPaid),
    };
  }, [originalPayment, newPayment, closingCosts, monthsPaid, newTerm]);

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
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight flex items-center gap-3">
          <ArrowRightLeft className="text-blue-600" size={36} />
          Mortgage Refinance Calculator
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          Should you refinance? Use our precision tool to calculate your <strong>break-even point</strong> and see how much 
          a lower interest rate could save you over the remaining life of your loan.
        </p>
      </header>

      {/* Ad Slot - Top */}
      <div className="w-full h-24 bg-slate-50 mb-10 flex flex-col items-center justify-center border border-slate-100 rounded-xl">
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Sponsored Advertisement</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Current Loan Details */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
            <Landmark size={20} className="text-slate-400" /> Current Loan
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Original Loan Amount ($)</label>
              <input type="number" value={currentLoanAmount} onChange={(e) => setCurrentLoanAmount(Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none transition-all font-medium" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Rate (%)</label>
                <input type="number" step="0.1" value={currentRate} onChange={(e) => setCurrentRate(Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none transition-all font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Term (Yrs)</label>
                <select value={currentTerm} onChange={(e) => setCurrentTerm(Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none transition-all font-medium bg-white">
                  <option value={15}>15 Years</option>
                  <option value={30}>30 Years</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Months Already Paid</label>
              <input type="number" value={monthsPaid} onChange={(e) => setMonthsPaid(Math.min(Number(e.target.value), currentTerm * 12))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none transition-all font-medium" />
            </div>
          </div>
        </div>

        {/* Refinance Details */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
            <RefreshCw size={20} className="text-blue-600" /> New Plan
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">New Interest Rate (%)</label>
              <input type="number" step="0.1" value={newRate} onChange={(e) => setNewRate(Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none transition-all font-medium" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">New Loan Term</label>
              <select value={newTerm} onChange={(e) => setNewTerm(Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none transition-all font-medium bg-white">
                <option value={15}>15 Years</option>
                <option value={20}>20 Years</option>
                <option value={30}>30 Years</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Estimated Closing Costs ($)</label>
              <input type="number" value={closingCosts} onChange={(e) => setClosingCosts(Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none transition-all font-medium" />
              <p className="text-[10px] text-slate-400 mt-2 italic font-mono">Typically 2% - 5% of loan amount</p>
            </div>
          </div>
        </div>
      </div>

      {/* Results Analysis */}
      <section className={`p-8 rounded-2xl border-2 mb-12 ${analysis.isWorthIt ? 'bg-emerald-50 border-emerald-200' : 'bg-orange-50 border-orange-200'}`}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Monthly Savings</h3>
            <div className={`text-5xl font-black ${analysis.monthlyPaymentSavings > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              ${Math.abs(analysis.monthlyPaymentSavings).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
          </div>
          <div className="bg-white/50 p-4 rounded-xl border border-white/80">
            <h3 className="text-xs font-bold text-slate-500 uppercase mb-2 tracking-tighter">Break-Even Point</h3>
            <div className="text-2xl font-bold text-slate-800">{analysis.yearsToBreakEven.toFixed(1)} Years</div>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest italic font-bold font-mono">Status: {analysis.isWorthIt ? 'POSITIVE_ROI' : 'NEGATIVE_ROI'}</p>
          </div>
        </div>
      </section>

      {/* EDUCATIONAL CONTENT: AdSense Booster */}
      <section className="prose prose-slate max-w-none mb-16 space-y-12">
        <div className="bg-slate-900 text-white p-8 rounded-2xl">
          <h2 className="text-white text-2xl font-bold flex items-center gap-2 mb-6">
            <Info size={24} className="text-blue-400" /> Understanding Refinance Economics
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-slate-300 text-sm leading-relaxed">
            <div>
              <h4 className="text-blue-400 font-bold mb-2 uppercase text-xs">The Break-Even Principle</h4>
              <p>Refinancing isn't just about a lower rate; it's about the time it takes for your monthly savings to cover the upfront <strong>closing costs</strong>. If you plan to sell your home before reaching the break-even point, a refinance may actually cost you more than it saves.</p>
            </div>
            <div>
              <h4 className="text-blue-400 font-bold mb-2 uppercase text-xs">Term Extension Risks</h4>
              <p>Be cautious when resetting a 30-year mortgage if you have already paid into your current one for several years. Extending the term may lower your payment, but you could end up paying significantly more in <strong>total interest</strong> over the long run.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-6">
            <HelpCircle size={24} className="text-blue-600" /> Refinance Checklist
          </h2>
          <ul className="grid md:grid-cols-2 gap-4 list-none p-0">
            <li className="flex gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-sm text-slate-600 leading-snug">
              <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
              Verify your current credit score to ensure you qualify for the lowest advertised rates.
            </li>
            <li className="flex gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-sm text-slate-600 leading-snug">
              <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
              Factor in appraisal fees, title insurance, and lender origination charges.
            </li>
          </ul>
        </div>
      </section>

      {/* Mandatory Disclaimer */}
      <footer className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl">
        <div className="flex gap-4">
          <AlertTriangle className="text-amber-600 shrink-0" size={24} />
          <p className="text-xs text-amber-800 leading-relaxed font-medium">
            <strong>Financial Disclosure:</strong> Mortgage refinance outcomes vary based on creditworthiness, property equity, and fluctuating market rates. CalcVault provides these estimates for educational purposes only. This is not a commitment to lend. Always consult with a licensed mortgage professional or certified financial planner before finalizing any loan agreement.
          </p>
        </div>
      </footer>
    </div>
  );
}
