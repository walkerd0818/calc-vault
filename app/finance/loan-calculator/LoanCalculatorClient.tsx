'use client';

'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { calculateMortgage } from '@/lib/mortgage-logic';
import AmortizationTable from '@components/AmortizationTable';
import { 
  Calculator, 
  Info, 
  BookOpen, 
  ShieldCheck, 
  BarChart3, 
  ArrowRightLeft 
} from 'lucide-react';

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTerm, setLoanTerm] = useState(5);

  const { monthlyPayment, schedule } = useMemo(() => {
    return calculateMortgage(loanAmount, interestRate, loanTerm);
  }, [loanAmount, interestRate, loanTerm]);

  return (
    <div className="max-w-4xl mx-auto px-4 pb-20">
      {/* Navigation */}
      <nav className="mb-8 flex flex-wrap gap-3 pt-6">
        <Link 
          href="/finance" 
          className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full hover:bg-blue-600 hover:text-white transition-all text-sm font-bold shadow-sm"
        >
          ← Finance Hub
        </Link>
        <Link 
          href="/finance/interest" 
          className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-all text-sm font-bold shadow-sm"
        >
          Interest Calculator
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight flex items-center gap-3">
          <Calculator className="text-blue-600" size={36} />
          Loan Amortization Calculator
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          Understand your debt repayment strategy with precision. Generate a complete 
          <strong> loan amortization schedule</strong> to visualize how each monthly installment 
          chips away at your principal balance.
        </p>
      </header>

      {/* Ad Slot - Top */}
      <div className="w-full h-24 bg-slate-50 mb-10 flex flex-col items-center justify-center border border-slate-100 rounded-xl">
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Advertisement</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Input Form */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen size={20} className="text-blue-600" />
            <h2 className="text-xl font-bold text-slate-800">Loan Input</h2>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Total Loan Amount ($)</label>
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
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Repayment Term (Years)</label>
              <select 
                value={loanTerm} 
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 focus:ring-0 outline-none transition-all text-lg font-medium bg-white"
              >
                <option value={2}>2 Years</option>
                <option value={3}>3 Years</option>
                <option value={5}>5 Years</option>
                <option value={7}>7 Years</option>
                <option value={10}>10 Years</option>
                <option value={15}>15 Years</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
          <h2 className="text-xl font-medium opacity-70 mb-4 uppercase tracking-widest">Fixed Monthly Payment</h2>
          <div className="text-6xl font-black mb-6 text-blue-400">
            ${monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="bg-white/5 px-6 py-4 rounded-xl border border-white/10 w-full">
            <p className="text-sm opacity-80 leading-relaxed italic">
              A total of {(loanTerm * 12)} installments will be required to settle the balance.
            </p>
          </div>
        </div>
      </div>

      {/* EDUCATIONAL CONTENT: AdSense Booster */}
      <section className="prose prose-slate max-w-none mb-16 space-y-12 border-t pt-12 border-slate-100">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <BarChart3 className="text-blue-600" /> What is Amortization?
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              Amortization is the process of spreading out a loan into a series of fixed payments. 
              Over time, the ratio of your payment shifts: initially, a larger portion goes toward 
              <strong> interest</strong>. As the principal decreases, more of your monthly 
              payment is applied to the <strong>principal balance</strong>.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <ArrowRightLeft className="text-blue-600" /> Strategic Repayment
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              By reviewing an amortization table, you can identify how much total interest 
              you will pay over the life of the loan. Understanding this allows you to 
              compare different interest rates and terms to find the most cost-effective 
              borrowing solution.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
          <h3 className="text-lg font-bold text-blue-900 mb-2">Key Calculation Factors</h3>
          <p className="text-sm text-blue-800 leading-relaxed mb-4">
            Our tool uses standard mathematical models to ensure your repayment schedule is accurate 
            to the cent. We factor in:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold text-blue-700 uppercase tracking-tight list-none p-0">
            <li className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm italic border border-blue-200">
              <span className="text-blue-400">01.</span> Periodic Interest Rate
            </li>
            <li className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm italic border border-blue-200">
              <span className="text-blue-400">02.</span> Compounding Frequency
            </li>
            <li className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm italic border border-blue-200">
              <span className="text-blue-400">03.</span> Principal Reduction
            </li>
          </ul>
        </div>
      </section>

      {/* Amortization Component */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 italic font-mono">// Payment_Schedule_Terminal</h2>
        <AmortizationTable 
          data={schedule} 
          loanAmount={loanAmount} 
          calculatorName="Personal Loan" 
        />
      </div>

      {/* Mandatory Disclaimer */}
      <footer className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl">
        <div className="flex gap-4">
          <ShieldCheck className="text-amber-600 shrink-0" size={24} />
          <p className="text-xs text-amber-800 leading-relaxed font-medium">
            <strong>Financial Disclosure:</strong> This amortization schedule is provided for 
            educational and illustrative purposes only. Actual lender calculations may vary based 
            on specific compounding rules, origination fees, or insurance requirements. Consult with 
            a certified financial professional before entering into any credit agreement.
          </p>
        </div>
      </footer>
    </div>
  );
}
