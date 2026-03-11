'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

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
      isWorthIt: totalSavings > 0 && monthsToBreakEven < newTerm * 12 - monthsPaid,
    };
  }, [originalPayment, newPayment, closingCosts, monthsPaid, newTerm]);

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
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Mortgage Refinance Calculator</h1>
        <p className="text-slate-600">
          Determine if refinancing your mortgage is the right financial decision. Calculate break-even points and potential savings.
        </p>
      </section>

      {/* Ad Slot - Top */}
      <div className="w-full h-24 bg-slate-100 mb-8 flex items-center justify-center border-dashed border-2 border-slate-300">
        <span className="text-slate-400 text-xs">Advertisement</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Current Loan Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold mb-4">Current Loan</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Original Loan Amount ($)</label>
              <input 
                type="number" 
                value={currentLoanAmount} 
                onChange={(e) => setCurrentLoanAmount(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Current Interest Rate (%)</label>
              <input 
                type="number" step="0.1"
                value={currentRate} 
                onChange={(e) => setCurrentRate(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Original Loan Term (Years)</label>
              <select 
                value={currentTerm} 
                onChange={(e) => setCurrentTerm(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value={15}>15 Years</option>
                <option value={30}>30 Years</option>
                <option value={10}>10 Years</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Months Paid</label>
              <input 
                type="number" 
                value={monthsPaid}
                onChange={(e) => setMonthsPaid(Math.min(Number(e.target.value), currentTerm * 12))}
                max={currentTerm * 12}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Refinance Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold mb-4">Refinance Plan</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">New Interest Rate (%)</label>
              <input 
                type="number" step="0.1"
                value={newRate} 
                onChange={(e) => setNewRate(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">New Loan Term (Years)</label>
              <select 
                value={newTerm} 
                onChange={(e) => setNewTerm(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value={15}>15 Years</option>
                <option value={20}>20 Years</option>
                <option value={25}>25 Years</option>
                <option value={30}>30 Years</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Closing Costs ($)</label>
              <input 
                type="number" 
                value={closingCosts}
                onChange={(e) => setClosingCosts(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-xs text-slate-500 mt-1">Typically 2-5% of loan amount</p>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 p-6 rounded-xl border-2 ${
        analysis.isWorthIt 
          ? 'bg-emerald-50 border-emerald-200' 
          : 'bg-orange-50 border-orange-200'
      }`}>
        <div>
          <h3 className="font-semibold text-slate-900 mb-3">Monthly Savings</h3>
          <div className={`text-4xl font-bold ${analysis.monthlyPaymentSavings > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            ${Math.abs(analysis.monthlyPaymentSavings).toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Current: ${originalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
          <p className="text-sm text-slate-600">
            New: ${newPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900 mb-3">Break-Even Analysis</h3>
          {analysis.monthlyPaymentSavings > 0 ? (
            <>
              <div className="text-3xl font-bold text-amber-600 mb-2">
                {analysis.yearsToBreakEven.toLocaleString(undefined, { maximumFractionDigits: 1 })} years
              </div>
              <p className="text-sm text-slate-600">
                ~{analysis.monthsToBreakEven} months to recover closing costs
              </p>
            </>
          ) : (
            <div className="text-sm text-slate-600">
              High interest rate - refinancing may not be beneficial
            </div>
          )}
        </div>
      </div>

      {/* Total Savings */}
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
        <h3 className="font-semibold text-slate-900 mb-3">Total Savings Over Loan Life</h3>
        <div className={`text-3xl font-bold ${analysis.totalSavings > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
          ${analysis.totalSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </div>
        <p className="text-sm text-slate-600 mt-2">
          {analysis.isWorthIt 
            ? '✓ Refinancing appears to be a good financial decision'
            : '✗ Consider if refinancing makes sense for your situation'
          }
        </p>
      </div>

      {/* Information Section */}
      <section className="mt-12 bg-slate-50 p-8 rounded-xl border border-slate-200">
        <h2 className="text-xl font-semibold mb-4 text-slate-900">Understanding Refinancing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700">
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">What is Refinancing?</h3>
            <p>
              Refinancing means replacing your existing mortgage with a new loan, usually at a different interest rate or term. It can help you save money or change your payment schedule.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Break-Even Point</h3>
            <p>
              The break-even point is when your monthly savings equal the closing costs you pay. If you plan to stay in the home longer than this point, refinancing typically makes sense.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
