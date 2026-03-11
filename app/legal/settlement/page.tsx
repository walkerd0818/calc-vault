'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export default function SettlementCalculator() {
  const [injurySeverity, setInjurySeverity] = useState<'minor' | 'moderate' | 'severe' | 'catastrophic'>('moderate');
  const [medicalExpenses, setMedicalExpenses] = useState(15000);
  const [lostWages, setLostWages] = useState(8000);
  const [propertyDamage, setPropertyDamage] = useState(5000);
  const [futureMedical, setFutureMedical] = useState(0);
  const [permanentImpairment, setPermanentImpairment] = useState(false);
  const [liabilityPercentage, setLiabilityPercentage] = useState(100);
  const [insuranceLimits, setInsuranceLimits] = useState(250000);

  const severityMultipliers: Record<string, number> = {
    minor: 1.5,
    moderate: 3.0,
    severe: 5.0,
    catastrophic: 7.5,
  };

  const calculations = useMemo(() => {
    // Economic damages
    const totalEconomicDamages = medicalExpenses + lostWages + propertyDamage + futureMedical;

    // Pain and suffering multiplier
    const baseMultiplier = severityMultipliers[injurySeverity];
    const adjustedMultiplier = permanentImpairment ? baseMultiplier * 1.5 : baseMultiplier;
    const painAndSuffering = totalEconomicDamages * adjustedMultiplier;

    // Total value before liability and caps
    const totalClaimValue = totalEconomicDamages + painAndSuffering;

    // Apply liability percentage
    const adjustedClaimValue = totalClaimValue * (liabilityPercentage / 100);

    // Cap at insurance limits
    const settlementValue = Math.min(adjustedClaimValue, insuranceLimits);

    // Estimate attorney fees (typically 33% contingency)
    const attorneyFees = settlementValue * 0.33;
    const netToClient = settlementValue - attorneyFees;

    // By category breakdown
    const economicPortion = (totalEconomicDamages / totalClaimValue) * settlementValue;
    const painSufferingPortion = settlementValue - economicPortion;

    return {
      totalEconomicDamages,
      painAndSuffering,
      totalClaimValue,
      adjustedClaimValue,
      settlementValue,
      attorneyFees,
      netToClient,
      economicPortion,
      painSufferingPortion,
      multiplierUsed: adjustedMultiplier,
    };
  }, [injurySeverity, medicalExpenses, lostWages, propertyDamage, futureMedical, permanentImpairment, liabilityPercentage, insuranceLimits]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Navigation */}
      <div className="mb-6 flex gap-4">
        <Link 
          href="/legal" 
          className="inline-block px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors font-medium"
        >
          ← Back to Legal
        </Link>
        <Link 
          href="/legal/workers-comp" 
          className="inline-block px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors font-medium"
        >
          Workers' Comp Calculator
        </Link>
      </div>

      <section className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Personal Injury Settlement Calculator</h1>
        <p className="text-slate-600">
          Estimate the value of a personal injury or car accident settlement. This calculator considers economic and non-economic damages.
        </p>
      </section>

      {/* Ad Slot */}
      <div className="w-full h-24 bg-slate-100 mb-8 flex items-center justify-center border-dashed border-2 border-slate-300">
        <span className="text-slate-400 text-xs">Advertisement</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Economic Damages */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold mb-4">Economic Damages</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Medical Expenses ($)</label>
              <input 
                type="number"
                value={medicalExpenses}
                onChange={(e) => setMedicalExpenses(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Lost Wages ($)</label>
              <input 
                type="number"
                value={lostWages}
                onChange={(e) => setLostWages(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Property Damage ($)</label>
              <input 
                type="number"
                value={propertyDamage}
                onChange={(e) => setPropertyDamage(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Future Medical Costs ($)</label>
              <input 
                type="number"
                value={futureMedical}
                onChange={(e) => setFutureMedical(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Non-Economic Factors */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold mb-4">Non-Economic Factors</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Injury Severity</label>
              <select 
                value={injurySeverity}
                onChange={(e) => setInjurySeverity(e.target.value as any)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="minor">Minor (sprains, bruises)</option>
                <option value="moderate">Moderate (fractures, lacerations)</option>
                <option value="severe">Severe (multiple injuries, surgery)</option>
                <option value="catastrophic">Catastrophic (permanent disability)</option>
              </select>
              <p className="text-xs text-slate-500 mt-1">Multiplier: {calculations.multiplierUsed}x economic damages</p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <input 
                  type="checkbox"
                  checked={permanentImpairment}
                  onChange={(e) => setPermanentImpairment(e.target.checked)}
                  className="rounded"
                />
                Permanent Impairment/Scarring
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Defendant Liability (%)</label>
              <input 
                type="number"
                value={liabilityPercentage}
                onChange={(e) => setLiabilityPercentage(Math.min(100, Math.max(0, Number(e.target.value))))}
                max={100}
                min={0}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <p className="text-xs text-slate-500 mt-1">Adjusts for comparative negligence</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Insurance Limits ($)</label>
              <input 
                type="number"
                value={insuranceLimits}
                onChange={(e) => setInsuranceLimits(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Settlement Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
          <h3 className="font-semibold text-slate-900 mb-3">Damages Breakdown</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-700">Economic Damages:</span>
              <span className="font-semibold">${calculations.totalEconomicDamages.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700">Pain & Suffering:</span>
              <span className="font-semibold">${calculations.painAndSuffering.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="border-t border-blue-300 pt-2 flex justify-between">
              <span className="font-semibold">Total Claim Value:</span>
              <span className="font-bold text-blue-700">${calculations.totalClaimValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl">
          <h3 className="font-semibold text-slate-900 mb-3">Estimated Settlement</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-700">Settlement Offer:</span>
              <span className="text-2xl font-bold text-emerald-600">${calculations.settlementValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="text-xs text-slate-600 mt-1">
              {liabilityPercentage < 100 && `Adjusted for ${liabilityPercentage}% liability`}
              {calculations.settlementValue === insuranceLimits && ` • Capped at policy limits`}
            </div>
          </div>
        </div>
      </div>

      {/* Attorney Fees */}
      <div className="bg-slate-900 text-white p-6 rounded-xl mb-6">
        <h3 className="font-semibold mb-3">Net to Client (After Attorney Fees)</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-slate-300">Settlement</div>
            <div className="text-2xl font-bold">${calculations.settlementValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
          </div>
          <div>
            <div className="text-sm text-slate-300">Attorney Fees (33%)</div>
            <div className="text-2xl font-bold text-red-400">-${calculations.attorneyFees.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
          </div>
          <div>
            <div className="text-sm text-slate-300">Net to You</div>
            <div className="text-2xl font-bold text-emerald-400">${calculations.netToClient.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <section className="bg-amber-50 border border-amber-200 p-6 rounded-xl">
        <h2 className="text-lg font-semibold mb-3 text-slate-900">Important Disclaimer</h2>
        <p className="text-sm text-slate-700">
          This calculator provides estimates only and is not legal advice. Actual settlement values depend on many factors including jurisdiction, evidence, insurance coverage, and the specific details of your case. Consult with a personal injury attorney for accurate legal advice and representation.
        </p>
      </section>
    </div>
  );
}
