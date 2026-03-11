'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export default function HELOCCalculator() {
  const [homeValue, setHomeValue] = useState(500000);
  const [mortgageBalance, setMortgageBalance] = useState(300000);
  const [ltv, setLTV] = useState(80); // Typical LTV is 80%
  const [helocAmount, setHelocAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [drawPeriodYears, setDrawPeriodYears] = useState(10);
  const [repaymentYears, setRepaymentYears] = useState(20);
  const [useAmount, setUseAmount] = useState(50000);

  const calculations = useMemo(() => {
    // Maximum home equity available
    const maxHomeEquity = homeValue - mortgageBalance;
    
    // HELOC credit limit based on LTV
    const maxHelocByLTV = (homeValue * (ltv / 100)) - mortgageBalance;
    
    // Actual available credit (minimum of the two)
    const availableCredit = Math.min(maxHomeEquity, Math.max(0, maxHelocByLTV));
    
    // During draw period (interest only typically)
    const drawMonthlyRate = interestRate / 100 / 12;
    const drawMonthlyPayment = (useAmount * drawMonthlyRate);
    const drawTotalInterest = drawMonthlyPayment * drawPeriodYears * 12;
    
    // During repayment period (principal + interest)
    const repaymentMonthlyRate = interestRate / 100 / 12;
    const repaymentMonths = repaymentYears * 12;
    const repaymentMonthlyPayment = (useAmount * repaymentMonthlyRate * Math.pow(1 + repaymentMonthlyRate, repaymentMonths)) /
                                   (Math.pow(1 + repaymentMonthlyRate, repaymentMonths) - 1);
    const repaymentTotalInterest = (repaymentMonthlyPayment * repaymentMonths) - useAmount;
    
    // Total interest over full period
    const totalInterest = drawTotalInterest + repaymentTotalInterest;

    return {
      maxHomeEquity,
      maxHelocByLTV,
      availableCredit,
      canBorrow: availableCredit >= helocAmount,
      requestedAmount: helocAmount,
      drawMonthlyPayment,
      drawTotalInterest,
      repaymentMonthlyPayment,
      repaymentTotalInterest,
      totalInterest,
      totalUsed: useAmount,
    };
  }, [homeValue, mortgageBalance, ltv, helocAmount, interestRate, drawPeriodYears, repaymentYears, useAmount]);

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
        <h1 className="text-3xl font-bold text-slate-900 mb-2">HELOC Calculator</h1>
        <p className="text-slate-600">
          Calculate your Home Equity Line of Credit availability, payments, and interest costs. Understand your borrowing options based on your home's equity.
        </p>
      </section>

      {/* Ad Slot - Top */}
      <div className="w-full h-24 bg-slate-100 mb-8 flex items-center justify-center border-dashed border-2 border-slate-300">
        <span className="text-slate-400 text-xs">Advertisement</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Home & Mortgage Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold mb-4">Home Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Home Value ($)</label>
              <input 
                type="number" 
                value={homeValue} 
                onChange={(e) => setHomeValue(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mortgage Balance ($)</label>
              <input 
                type="number" 
                value={mortgageBalance}
                onChange={(e) => setMortgageBalance(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Max LTV (Loan-to-Value) %</label>
              <input 
                type="number" 
                value={ltv}
                onChange={(e) => setLTV(Number(e.target.value))}
                max={90}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-xs text-slate-500 mt-1">Most lenders allow 80-90% LTV</p>
            </div>
          </div>
        </div>

        {/* HELOC Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold mb-4">HELOC Terms</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">HELOC Amount Requested ($)</label>
              <input 
                type="number" 
                value={helocAmount}
                onChange={(e) => setHelocAmount(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Interest Rate (%)</label>
              <input 
                type="number" 
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Draw Period (Years)</label>
              <select 
                value={drawPeriodYears}
                onChange={(e) => setDrawPeriodYears(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value={5}>5 Years</option>
                <option value={10}>10 Years</option>
                <option value={15}>15 Years</option>
              </select>
              <p className="text-xs text-slate-500 mt-1">Period where you can draw funds (interest-only)</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Repayment Period (Years)</label>
              <select 
                value={repaymentYears}
                onChange={(e) => setRepaymentYears(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value={10}>10 Years</option>
                <option value={15}>15 Years</option>
                <option value={20}>20 Years</option>
                <option value={25}>25 Years</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Amount You Plan to Use ($)</label>
              <input 
                type="number" 
                value={useAmount}
                onChange={(e) => setUseAmount(Math.min(Number(e.target.value), helocAmount))}
                max={helocAmount}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Available Credit */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 p-6 rounded-xl border-2 ${
        calculations.canBorrow 
          ? 'bg-emerald-50 border-emerald-200' 
          : 'bg-orange-50 border-orange-200'
      }`}>
        <div>
          <h3 className="font-semibold text-slate-900 mb-3">Home Equity Available</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-700">Home Value:</span>
              <span className="font-semibold">${homeValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700">Mortgage Balance:</span>
              <span className="font-semibold">-${mortgageBalance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t border-current pt-2">
              <span className="font-semibold">Total Equity:</span>
              <span className="text-lg font-bold text-emerald-600">${calculations.maxHomeEquity.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900 mb-3">HELOC Credit Limit</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-700">Available Credit:</span>
              <span className="text-2xl font-bold text-emerald-600">
                ${calculations.availableCredit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="flex justify-between mt-3">
              <span className="text-slate-700">Your Request:</span>
              <span className={calculations.canBorrow ? 'font-semibold text-emerald-600' : 'font-semibold text-orange-600'}>
                ${helocAmount.toLocaleString()}
              </span>
            </div>
            <div className="mt-2 text-xs">
              {calculations.canBorrow 
                ? '✓ Approved amount available'
                : '✗ Exceeds available credit'
              }
            </div>
          </div>
        </div>
      </div>

      {/* Payment Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Draw Period */}
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
          <h3 className="font-semibold text-slate-900 mb-3">Draw Period ({drawPeriodYears} years)</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-700">Monthly Payment (Interest-Only):</span>
              <span className="font-semibold text-slate-900">
                ${calculations.drawMonthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700">Total Interest:</span>
              <span className="font-semibold text-slate-900">
                ${calculations.drawTotalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        </div>

        {/* Repayment Period */}
        <div className="bg-purple-50 border border-purple-200 p-6 rounded-xl">
          <h3 className="font-semibold text-slate-900 mb-3">Repayment Period ({repaymentYears} years)</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-700">Monthly Payment (P&I):</span>
              <span className="font-semibold text-slate-900">
                ${calculations.repaymentMonthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700">Total Interest:</span>
              <span className="font-semibold text-slate-900">
                ${calculations.repaymentTotalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Total Interest */}
      <div className="mt-6 bg-slate-900 text-white p-6 rounded-xl">
        <h3 className="font-semibold mb-3">Total Cost</h3>
        <div className="flex justify-between items-center">
          <span className="text-lg">Total Interest Over Full Term:</span>
          <span className="text-3xl font-bold">
            ${calculations.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </span>
        </div>
      </div>

      {/* Information Section */}
      <section className="mt-12 bg-slate-50 p-8 rounded-xl border border-slate-200">
        <h2 className="text-xl font-semibold mb-4 text-slate-900">Understanding HELOCs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700">
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">What is a HELOC?</h3>
            <p>
              A Home Equity Line of Credit is a revolving credit line secured by your home's equity. You can draw funds as needed during the draw period and pay only interest on what you use.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Draw vs. Repayment Periods</h3>
            <p>
              During the draw period, you make interest-only payments. After the draw period ends, you enter the repayment period where you pay principal and interest until the debt is paid off.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
