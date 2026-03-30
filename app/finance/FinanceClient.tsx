'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, ChevronRight, Calculator, PieChart, ShieldCheck, Info } from 'lucide-react';

const financeCalculators = [
  { name: 'Mortgage Calculator', href: '/finance/mortgage-calculator', description: 'Estimate monthly principal and interest payments for home loans with full amortization tables.' },
  { name: 'Mortgage Refinance', href: '/finance/refinance-calculator', description: 'Analyze potential savings by switching to a lower interest rate or shorter loan term.' },
  { name: 'HELOC Calculator', href: '/finance/heloc-calculator', description: 'Determine available borrowing power based on your current home equity and LTV ratios.' },
  { name: 'Investment & Crypto ROI', href: '/finance/investment-roi', description: 'Track capital gains, calculate compound growth, and project future portfolio value.' },
  { name: 'Loan Amortization', href: '/finance/loan-calculator', description: 'Detailed breakdown of every payment over the life of a personal, auto, or student loan.' },
  { name: 'Interest Calculator', href: '/finance/interest', description: 'Compare simple vs. compound interest growth for savings accounts and fixed deposits.' },
];

export default function FinancePage() {
  return (
    <div className="max-w-4xl mx-auto pb-20 px-4">
      {/* 1. Enhanced Header */}
      <section className="mb-12 pt-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="text-blue-600" size={32} />
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Financial Planning Hub</h1>
        </div>
        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
          Make data-driven decisions with our suite of precision financial utilities. From home ownership 
          planning to investment tracking, our tools use industry-standard formulas to help you 
          visualize your long-term wealth strategy.
        </p>
      </section>

      {/* 2. Ad Slot */}
      <div className="w-full h-24 bg-slate-50 mb-12 flex items-center justify-center border border-slate-100 rounded-xl">
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Sponsored Advertisement</span>
      </div>

      {/* 3. Calculators Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {financeCalculators.map((calc, idx) => (
          <Link
            key={idx}
            href={calc.href}
            className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Calculator size={20} />
              </div>
              <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
              {calc.name}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">{calc.description}</p>
          </Link>
        ))}
      </section>

      {/* 4. NEW: Educational Guide Content (Critical for AdSense) */}
      <section className="bg-slate-50 rounded-3xl p-8 mb-12 border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <PieChart className="text-blue-600" size={24} />
          How to use these tools effectively
        </h2>
        <div className="grid md:grid-cols-2 gap-8 text-sm text-slate-600 leading-relaxed">
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 text-base">Understand Amortization</h3>
            <p>
              Most long-term loans, like mortgages, are front-loaded with interest. Use our 
              <strong> Loan Amortization</strong> tool to see exactly how much of your monthly 
              payment goes toward the principal balance vs. the lender's interest over time.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 text-base">Compound Interest Power</h3>
            <p>
              The <strong>Interest Calculator</strong> demonstrates the "snowball effect." By 
              visualizing compound growth, you can better understand why starting an investment 
              portfolio early—even with small amounts—is critical for retirement planning.
            </p>
          </div>
        </div>
      </section>

      {/* 5. NEW: Expertise and Transparency Block */}
      <div className="prose prose-slate max-w-none mb-12 border-t pt-12 border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Precision and Accuracy</h3>
        <p className="text-slate-600 mb-6">
          The financial calculators on CalcVault are built using standard mathematical formulas 
          recognized by major financial institutions. We prioritize browser-based (client-side) 
          processing to ensure your sensitive financial figures are never transmitted to our servers.
        </p>
        <div className="flex flex-wrap gap-4">
          <span className="flex items-center gap-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <ShieldCheck size={14} className="text-emerald-500" /> Secure Processing
          </span>
          <span className="flex items-center gap-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Info size={14} className="text-blue-500" /> Updated for 2026
          </span>
        </div>
      </div>

      {/* 6. Important Disclaimer (Mandatory for Finance niches) */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-12">
        <p className="text-xs text-amber-800 leading-relaxed italic">
          <strong>Disclaimer:</strong> The results provided by these calculators are intended for 
          illustrative purposes only and do not constitute professional financial advice. Estimates 
          are based on user-provided data and may not reflect actual lender terms or market changes. 
          Consult with a qualified financial advisor before making major investment or borrowing decisions.
        </p>
      </div>

      {/* Navigation Link */}
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full hover:bg-blue-600 transition-all font-bold shadow-lg shadow-slate-200"
      >
        ← Calc Vault
      </Link>
    </div>
  );
}
