'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { calculateMortgage } from '@/lib/mortgage-logic';
import AmortizationTable from '@components/AmortizationTable';

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTerm, setLoanTerm] = useState(5);

  const { monthlyPayment, schedule } = useMemo(() => {
    return calculateMortgage(loanAmount, interestRate, loanTerm);
  }, [loanAmount, interestRate, loanTerm]);

  return (
    <div className="max-w-4xl mx-auto">
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
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Loan Amortization Calculator</h1>
        <p className="text-slate-600">
          Create a detailed amortization schedule for any personal or business loan. 
          See how much of each payment goes toward principal versus interest.
        </p>
      </section>

      {/* Ad Slot - Top */}
      <div className="w-full h-24 bg-slate-100 mb-8 flex items-center justify-center border-dashed border-2 border-slate-300">
        <span className="text-slate-400 text-xs">Advertisement</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Input Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold mb-4">Loan Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Loan Amount ($)</label>
              <input 
                type="number" 
                value={loanAmount} 
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Interest Rate (%)</label>
              <input 
                type="number" step="0.1"
                value={interestRate} 
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Loan Term (Years)</label>
              <select 
                value={loanTerm} 
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value={2}>2 Years</option>
                <option value={3}>3 Years</option>
                <option value={5}>5 Years</option>
                <option value={7}>7 Years</option>
                <option value={10}>10 Years</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg flex flex-col justify-center items-center text-center">
          <h2 className="text-xl opacity-90 mb-2">Monthly Payment</h2>
          <div className="text-5xl font-bold mb-4">
            ${monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-sm opacity-80">
            Total of {(loanTerm * 12)} payments over the life of the loan.
          </p>
        </div>
      </div>

      {/* Amortization Component */}
      <AmortizationTable 
        data={schedule} 
        loanAmount={loanAmount} 
        calculatorName="Personal Loan" 
      />
    </div>
  );
}
