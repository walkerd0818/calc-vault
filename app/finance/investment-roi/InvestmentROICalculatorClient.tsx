'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  Percent, 
  ShieldCheck, 
  Info, 
  HelpCircle, 
  Briefcase, 
  Coins, 
  Receipt 
} from 'lucide-react';

type CapitalGainsType = 'shortterm' | 'longterm';

export default function InvestmentROICalculator() {
  const [investmentType, setInvestmentType] = useState<'stock' | 'crypto' | 'general'>('crypto');
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [currentValue, setCurrentValue] = useState(25000);
  const [holdingDays, setHoldingDays] = useState(180);
  const [taxBracket, setTaxBracket] = useState(0.24);
  const [capitalGainsType, setCapitalGainsType] = useState<CapitalGainsType>('longterm');
  const [includeStateTax, setIncludeStateTax] = useState(false);
  const [stateTaxRate, setStateTaxRate] = useState(0.05);

  const calculations = useMemo(() => {
    const gain = currentValue - initialInvestment;
    const roiPercentage = (gain / initialInvestment) * 100;
    const isLongTerm = holdingDays > 365;
    
    let federalTaxRate = 0;
    if (capitalGainsType === 'shortterm' || !isLongTerm) {
      federalTaxRate = taxBracket;
    } else {
      if (taxBracket <= 0.12) federalTaxRate = 0.0;
      else if (taxBracket <= 0.22) federalTaxRate = 0.15;
      else federalTaxRate = 0.20;
    }

    const federalTaxOnGain = gain > 0 ? gain * federalTaxRate : 0;
    const stateTaxOnGain = (includeStateTax && gain > 0) ? gain * stateTaxRate : 0;
    const totalTaxes = federalTaxOnGain + stateTaxOnGain;
    const netGain = gain - totalTaxes;
    const netValue = currentValue - totalTaxes;
    const netROI = (netGain / initialInvestment) * 100;

    return {
      gain,
      roiPercentage,
      isLongTerm,
      federalTaxRate,
      federalTaxOnGain,
      stateTaxOnGain,
      totalTaxes,
      netGain,
      netValue,
      netROI,
      daysHeld: holdingDays,
      yearsHeld: (holdingDays / 365.25).toFixed(2),
    };
  }, [initialInvestment, currentValue, holdingDays, taxBracket, capitalGainsType, includeStateTax, stateTaxRate]);

  return (
    <div className="max-w-4xl mx-auto px-4 pb-20">
      {/* Navigation */}
      <nav className="mb-8 flex gap-4 pt-6">
        <Link href="/finance" className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all font-bold text-sm">
          ← Finance Hub
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight flex items-center gap-3">
          <TrendingUp className="text-blue-600" size={36} />
          Investment & Crypto ROI Calculator
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          Evaluate your portfolio performance with precision. Our tool calculates <strong>Gross ROI</strong>, 
          estimates <strong>Capital Gains Tax</strong>, and provides your <strong>Net Profit</strong> after federal and state liabilities.
        </p>
      </header>

      {/* Ad Slot - Top */}
      <div className="w-full h-24 bg-slate-50 mb-10 flex flex-col items-center justify-center border border-slate-100 rounded-xl">
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Sponsored Advertisement</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Input Details */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
            <Briefcase size={20} className="text-slate-400" /> Portfolio Input
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Asset Class</label>
              <select value={investmentType} onChange={(e) => setInvestmentType(e.target.value as any)} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none transition-all font-medium bg-white">
                <option value="stock">Stock / ETF</option>
                <option value="crypto">Cryptocurrency</option>
                <option value="general">Real Estate / Other</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Initial ($)</label>
                <input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none transition-all font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Current ($)</label>
                <input type="number" value={currentValue} onChange={(e) => setCurrentValue(Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none transition-all font-medium" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Holding Period (Days)</label>
              <input type="number" value={holdingDays} onChange={(e) => setHoldingDays(Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none transition-all font-medium" />
              <p className={`text-[10px] mt-2 font-bold uppercase ${calculations.isLongTerm ? 'text-emerald-600' : 'text-orange-500'}`}>
                Status: {calculations.isLongTerm ? 'Long-Term Asset' : 'Short-Term Asset'}
              </p>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Net Profit After Tax</h3>
            <div className="text-5xl font-black mb-2">${calculations.netGain.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <div className="inline-block bg-blue-500/20 text-blue-400 px-3 py-1 rounded text-sm font-bold mt-2">
              {calculations.netROI.toFixed(2)}% Net ROI
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 mt-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400 italic">Total Tax Liability:</span>
              <span className="font-mono text-rose-400">-${calculations.totalTaxes.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400 italic">Effective Federal Rate:</span>
              <span className="font-mono">{(calculations.federalTaxRate * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* EDUCATIONAL CONTENT: AdSense Booster */}
      <section className="prose prose-slate max-w-none mb-16 space-y-12">
        <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
          <h2 className="text-blue-900 text-2xl font-bold flex items-center gap-2 mb-4">
            <Receipt size={24} className="text-blue-600" /> Capital Gains Tax Explained
          </h2>
          <p className="text-blue-800 text-sm leading-relaxed mb-6">
            When you sell an asset for more than you paid for it, the profit is considered a <strong>Capital Gain</strong>. 
            The IRS categorizes these gains based on how long you held the asset before selling:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <h4 className="text-orange-600 font-bold mb-2 flex items-center gap-2">Short-Term (≤ 1 Year)</h4>
              <p className="text-xs text-slate-600">Taxed as ordinary income. Your rate is determined by your total annual income bracket, ranging from 10% to 37%.</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <h4 className="text-emerald-600 font-bold mb-2 flex items-center gap-2">Long-Term (&gt; 1 Year)</h4>
              <p className="text-xs text-slate-600">Enjoy preferential rates. Most investors pay 0%, 15%, or 20% depending on their taxable income level.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-6">
            <Coins size={24} className="text-blue-600" /> Crypto vs. Traditional Assets
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            In many jurisdictions, including the US, <strong>Cryptocurrencies</strong> are treated as property for tax purposes. 
            This means every "trade" (Crypto-to-Crypto or Crypto-to-Fiat) is a taxable event. Using a 
            dedicated ROI calculator helps you track <strong>cost basis</strong> and avoid surprises during tax season.
          </p>
        </div>

        <div className="border-t pt-10">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-6">
            <HelpCircle size={24} className="text-blue-600" /> ROI Strategy FAQ
          </h2>
          <div className="space-y-6">
            <div className="pb-4">
              <h4 className="font-bold text-slate-800 mb-2">What is a "Good" ROI?</h4>
              <p className="text-sm text-slate-600">While subjective, many long-term investors benchmark against the S&P 500, which has historically averaged roughly 7-10% annually after inflation.</p>
            </div>
            <div className="pb-4">
              <h4 className="font-bold text-slate-800 mb-2">Does this include slippage and fees?</h4>
              <p className="text-sm text-slate-600">This basic model assumes a clean buy/sell price. For high-precision tracking, you should subtract trading fees from your initial investment amount.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mandatory Disclaimer */}
      <footer className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl">
        <div className="flex gap-4">
          <ShieldCheck className="text-amber-600 shrink-0" size={24} />
          <p className="text-xs text-amber-800 leading-relaxed font-medium">
            <strong>Financial Disclosure:</strong> ROI calculations are for educational purposes and do not account for wash sales, specific state tax nuances, or the Net Investment Income Tax (NIIT). Investing involves risk, including the loss of principal. SyntixGear does not provide professional tax or investment advice. Consult a certified CPA or financial advisor for your specific tax situation.
          </p>
        </div>
      </footer>
    </div>
  );
}
