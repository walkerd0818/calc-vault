'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export default function PercentageCalculator() {
  const [amount, setAmount] = useState(100);
  const [percentage, setPercentage] = useState(15);
  const [calculationType, setCalculationType] = useState<'basic' | 'discount' | 'markup' | 'increase' | 'decrease'>('basic');

  const results = useMemo(() => {
    const percentOfAmount = (amount * percentage) / 100;
    const discountedAmount = amount - percentOfAmount;
    const markedUpAmount = amount + percentOfAmount;
    const increaseAmount = amount + (amount * percentage) / 100;
    const decreaseAmount = amount - (amount * percentage) / 100;

    return {
      percentOfAmount,
      discountedAmount,
      markedUpAmount,
      increaseAmount,
      decreaseAmount,
    };
  }, [amount, percentage]);

  const renderResults = () => {
    switch (calculationType) {
      case 'basic':
        return (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-700">{percentage}% of ${amount.toLocaleString()}:</span>
              <span className="font-semibold text-slate-900">${results.percentOfAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        );
      case 'discount':
        return (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-700">Original Price:</span>
              <span className="font-semibold text-slate-900">${amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700">Discount ({percentage}%):</span>
              <span className="font-semibold text-red-600">-${results.percentOfAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between">
              <span className="font-semibold text-slate-900">Final Price:</span>
              <span className="text-lg font-bold text-emerald-600">${results.discountedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        );
      case 'markup':
        return (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-700">Cost:</span>
              <span className="font-semibold text-slate-900">${amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700">Markup ({percentage}%):</span>
              <span className="font-semibold text-blue-600">+${results.percentOfAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between">
              <span className="font-semibold text-slate-900">Selling Price:</span>
              <span className="text-lg font-bold text-emerald-600">${results.markedUpAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        );
      case 'increase':
        return (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-700">Original Value:</span>
              <span className="font-semibold text-slate-900">${amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700">Increase ({percentage}%):</span>
              <span className="font-semibold text-emerald-600">+${results.percentOfAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between">
              <span className="font-semibold text-slate-900">New Value:</span>
              <span className="text-lg font-bold text-emerald-600">${results.increaseAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        );
      case 'decrease':
        return (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-700">Original Value:</span>
              <span className="font-semibold text-slate-900">${amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700">Decrease ({percentage}%):</span>
              <span className="font-semibold text-red-600">-${results.percentOfAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between">
              <span className="font-semibold text-slate-900">New Value:</span>
              <span className="text-lg font-bold text-emerald-600">${results.decreaseAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Navigation */}
      <div className="mb-6 flex gap-4">
        <Link 
          href="/engineering" 
          className="inline-block px-4 py-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors font-medium"
        >
          ← Back to Engineering
        </Link>
      </div>

      <section className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Percentage Calculator</h1>
        <p className="text-slate-600">Calculate percentages, discounts, markups, and value changes.</p>
      </section>

      {/* Ad Slot */}
      <div className="w-full h-24 bg-slate-100 mb-8 flex items-center justify-center border-dashed border-2 border-slate-300">
        <span className="text-slate-400 text-xs">Advertisement</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Inputs */}
        <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="font-semibold mb-4 text-slate-900">Calculator</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Amount ($)</label>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Percentage (%)</label>
              <input 
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select 
                value={calculationType}
                onChange={(e) => setCalculationType(e.target.value as any)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none text-sm"
              >
                <option value="basic">Basic Percentage</option>
                <option value="discount">Discount</option>
                <option value="markup">Markup</option>
                <option value="increase">Percentage Increase</option>
                <option value="decrease">Percentage Decrease</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="md:col-span-2 bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl border border-amber-200">
          <h2 className="font-semibold mb-4 text-slate-900">Results</h2>
          {renderResults()}
        </div>
      </div>
    </div>
  );
}
