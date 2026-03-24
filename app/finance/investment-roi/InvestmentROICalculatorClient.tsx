'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

type CapitalGainsType = 'shortterm' | 'longterm';

export default function InvestmentROICalculator() {
  const [investmentType, setInvestmentType] = useState<'stock' | 'crypto' | 'general'>('crypto');
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [currentValue, setCurrentValue] = useState(25000);
  const [holdingDays, setHoldingDays] = useState(180);
  const [taxBracket, setTaxBracket] = useState(0.24); // 24% federal bracket
  const [capitalGainsType, setCapitalGainsType] = useState<CapitalGainsType>('longterm');
  const [includeStateTax, setIncludeStateTax] = useState(false);
  const [stateTaxRate, setStateTaxRate] = useState(0.05);

  const calculations = useMemo(() => {
    const gain = currentValue - initialInvestment;
    const roiPercentage = (gain / initialInvestment) * 100;
    const isLongTerm = holdingDays > 365;
    
    // Determine tax rate based on long-term vs short-term
    let federalTaxRate = 0;
    if (capitalGainsType === 'shortterm' || !isLongTerm) {
      // Short-term capital gains = ordinary income tax rates
      federalTaxRate = taxBracket;
    } else {
      // Long-term capital gains = preferential rates
      if (taxBracket <= 0.12) {
        federalTaxRate = 0.0; // 0% for lowest brackets
      } else if (taxBracket <= 0.22) {
        federalTaxRate = 0.15; // 15% for middle brackets
      } else {
        federalTaxRate = 0.20; // 20% for highest bracket
      }
    }

    // Calculate taxes
    const federalTaxOnGain = gain * federalTaxRate;
    const stateTaxOnGain = includeStateTax ? gain * stateTaxRate : 0;
    const totalTaxes = federalTaxOnGain + stateTaxOnGain;
    const netGain = gain - totalTaxes;
    const netValue = currentValue - totalTaxes;
    const netROI = (netGain / initialInvestment) * 100;

    // Additional metrics
    const daysHeld = holdingDays;
    const monthsHeld = (holdingDays / 30.44).toFixed(1);
    const yearsHeld = (holdingDays / 365.25).toFixed(2);
    const dailyROI = roiPercentage / holdingDays;

    return {
      gain,
      roiPercentage,
      isLongTerm,
      actualCapitalGainsType: capitalGainsType === 'longterm' && isLongTerm ? 'longterm' : 'shortterm',
      federalTaxRate,
      federalTaxOnGain,
      stateTaxOnGain,
      totalTaxes,
      netGain,
      netValue,
      netROI,
      daysHeld,
      monthsHeld,
      yearsHeld,
      dailyROI,
    };
  }, [initialInvestment, currentValue, holdingDays, taxBracket, capitalGainsType, includeStateTax, stateTaxRate]);

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
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Investment & Crypto ROI Calculator</h1>
        <p className="text-slate-600">
          Calculate your return on investment, understand capital gains taxes, and see your net profit after taxes. Perfect for stocks, crypto, and other investments.
        </p>
      </section>

      {/* Ad Slot - Top */}
      <div className="w-full h-24 bg-slate-100 mb-8 flex items-center justify-center border-dashed border-2 border-slate-300">
        <span className="text-slate-400 text-xs">Advertisement</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Investment Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold mb-4">Investment Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Investment Type</label>
              <select 
                value={investmentType}
                onChange={(e) => setInvestmentType(e.target.value as any)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="stock">Stock/ETF</option>
                <option value="crypto">Cryptocurrency</option>
                <option value="general">Other Investment</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Initial Investment ($)</label>
              <input 
                type="number" 
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Current Value ($)</label>
              <input 
                type="number" 
                value={currentValue}
                onChange={(e) => setCurrentValue(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Days Held</label>
              <input 
                type="number" 
                value={holdingDays}
                onChange={(e) => setHoldingDays(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-xs text-slate-500 mt-1">
                {calculations.daysHeld > 365 ? '✓ Qualifies for long-term capital gains' : '✗ Short-term capital gains'}
              </p>
            </div>
          </div>
        </div>

        {/* Tax Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold mb-4">Tax Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Federal Tax Bracket (%)</label>
              <select 
                value={(taxBracket * 100).toString()}
                onChange={(e) => setTaxBracket(Number(e.target.value) / 100)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="10">10% - $11,600 or less</option>
                <option value="12">12% - $11,601 to $47,150</option>
                <option value="22">22% - $47,151 to $100,525</option>
                <option value="24">24% - $100,526 to $191,950</option>
                <option value="32">32% - $191,951 to $243,725</option>
                <option value="35">35% - $243,726 to $609,350</option>
                <option value="37">37% - Over $609,350</option>
              </select>
              <p className="text-xs text-slate-500 mt-1">2024 single filer income brackets</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Capital Gains Type</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setCapitalGainsType('shortterm')}
                  className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all ${
                    capitalGainsType === 'shortterm'
                      ? 'bg-orange-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Short-term
                </button>
                <button
                  onClick={() => setCapitalGainsType('longterm')}
                  className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all ${
                    capitalGainsType === 'longterm'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Long-term
                </button>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <input 
                  type="checkbox"
                  checked={includeStateTax}
                  onChange={(e) => setIncludeStateTax(e.target.checked)}
                  className="rounded"
                />
                Include State Tax
              </label>
            </div>

            {includeStateTax && (
              <div>
                <label className="block text-sm font-medium mb-1">State Tax Rate (%)</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={(stateTaxRate * 100).toFixed(1)}
                  onChange={(e) => setStateTaxRate(Number(e.target.value) / 100)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ROI Summary */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 p-6 rounded-xl border-2 ${
        calculations.gain > 0 
          ? 'bg-emerald-50 border-emerald-200' 
          : 'bg-red-50 border-red-200'
      }`}>
        <div>
          <h3 className="font-semibold text-slate-900 mb-3">Return on Investment</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-700">Gross Gain:</span>
              <span className={`text-2xl font-bold ${calculations.gain > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                ${calculations.gain.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700">ROI %:</span>
              <span className={`text-lg font-bold ${calculations.roiPercentage > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {calculations.roiPercentage.toLocaleString(undefined, { maximumFractionDigits: 2 })}%
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-600 mt-2">
              <span>Daily ROI:</span>
              <span>{calculations.dailyROI.toLocaleString(undefined, { maximumFractionDigits: 3 })}%/day</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900 mb-3">Holding Period</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-700">Time Held:</span>
              <span className="font-semibold">{calculations.monthsHeld} months</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700">Or:</span>
              <span className="font-semibold">{calculations.yearsHeld} years</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-slate-700">Capital Gains:</span>
              <span className={`font-semibold px-2 py-1 rounded text-xs ${
                calculations.actualCapitalGainsType === 'longterm'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {calculations.actualCapitalGainsType === 'longterm' ? 'Long-term' : 'Short-term'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tax Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-slate-100 p-6 rounded-xl">
          <h3 className="font-semibold text-slate-900 mb-3">Tax Liability</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-700">Federal Tax ({(calculations.federalTaxRate * 100).toFixed(0)}%):</span>
              <span className="font-semibold text-red-600">
                -${calculations.federalTaxOnGain.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
            {includeStateTax && (
              <div className="flex justify-between">
                <span className="text-slate-700">State Tax ({(stateTaxRate * 100).toFixed(1)}%):</span>
                <span className="font-semibold text-red-600">
                  -${calculations.stateTaxOnGain.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
            )}
            <div className="border-t border-slate-300 pt-2 flex justify-between">
              <span className="font-semibold">Total Taxes:</span>
              <span className="text-lg font-bold text-red-600">
                -${calculations.totalTaxes.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-emerald-100 p-6 rounded-xl">
          <h3 className="font-semibold text-slate-900 mb-3">Net Profit</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-700">Net Gain:</span>
              <span className="font-semibold text-emerald-700">
                +${calculations.netGain.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700">Net ROI %:</span>
              <span className="font-semibold text-emerald-700">
                {calculations.netROI.toLocaleString(undefined, { maximumFractionDigits: 2 })}%
              </span>
            </div>
            <div className="border-t border-emerald-300 pt-2 flex justify-between">
              <span className="font-semibold">Net Value:</span>
              <span className="text-lg font-bold text-emerald-700">
                ${calculations.netValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <section className="bg-slate-50 p-8 rounded-xl border border-slate-200">
        <h2 className="text-xl font-semibold mb-4 text-slate-900">Capital Gains Tax Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700">
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Short-term Capital Gains</h3>
            <p>
              Profits from investments held for one year or less are taxed as ordinary income at your marginal tax rate (10-37%). This typically results in higher taxes.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Long-term Capital Gains</h3>
            <p>
              Profits from investments held for more than one year are taxed at preferential rates: 0%, 15%, or 20% depending on your income. This can result in significant tax savings.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

