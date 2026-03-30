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
    const totalEconomicDamages = medicalExpenses + lostWages + propertyDamage + futureMedical;
    const baseMultiplier = severityMultipliers[injurySeverity];
    const adjustedMultiplier = permanentImpairment ? baseMultiplier * 1.5 : baseMultiplier;
    const painAndSuffering = totalEconomicDamages * adjustedMultiplier;
    const totalClaimValue = totalEconomicDamages + painAndSuffering;
    const adjustedClaimValue = totalClaimValue * (liabilityPercentage / 100);
    const settlementValue = Math.min(adjustedClaimValue, insuranceLimits);
    const attorneyFees = settlementValue * 0.33;
    const netToClient = settlementValue - attorneyFees;
    
    return {
      totalEconomicDamages,
      painAndSuffering,
      totalClaimValue,
      adjustedClaimValue,
      settlementValue,
      attorneyFees,
      netToClient,
      multiplierUsed: adjustedMultiplier,
    };
  }, [injurySeverity, medicalExpenses, lostWages, propertyDamage, futureMedical, permanentImpairment, liabilityPercentage, insuranceLimits]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
       {/* Navigation */}
      <nav className="mb-8 flex flex-wrap gap-3 pt-6">
        <Link href="/legal" className="px-4 py-2 bg-purple-50 text-purple-600 rounded-full hover:bg-purple-600 hover:text-white transition-all text-sm font-bold shadow-sm">
          ← Legal Claims Hub
        </Link>
        <Link href="/legal/workers-comp" className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-all text-sm font-bold shadow-sm">
          Worker's Comp Calculator
        </Link>
       <Link href="/legal/wrongful-termination" className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-all text-sm font-bold shadow-sm">
          Wrongful Termination
        </Link>
      </nav>


      <section className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Personal Injury Settlement Calculator</h1>
        <p className="text-lg text-slate-600">
          Estimate the potential value of a personal injury claim using industry-standard formulas for economic and non-economic damages.
        </p>
      </section>

      {/* Ad Slot - Top */}
      <div className="w-full h-24 bg-slate-50 mb-8 flex items-center justify-center border-dashed border-2 border-slate-200 rounded-lg">
        <span className="text-slate-400 text-xs uppercase tracking-widest">Advertisement</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Input Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-semibold mb-4 text-slate-800">1. Economic Damages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Medical Expenses ($)</label>
                <input type="number" value={medicalExpenses} onChange={(e) => setMedicalExpenses(Number(e.target.value))} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Lost Wages ($)</label>
                <input type="number" value={lostWages} onChange={(e) => setLostWages(Number(e.target.value))} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Property Damage ($)</label>
                <input type="number" value={propertyDamage} onChange={(e) => setPropertyDamage(Number(e.target.value))} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Future Medical Costs ($)</label>
                <input type="number" value={futureMedical} onChange={(e) => setFutureMedical(Number(e.target.value))} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-semibold mb-4 text-slate-800">2. Case Factors</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Injury Severity</label>
                <select value={injurySeverity} onChange={(e) => setInjurySeverity(e.target.value as any)} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none">
                  <option value="minor">Minor (sprains, bruises, soft tissue)</option>
                  <option value="moderate">Moderate (fractures, simple surgery)</option>
                  <option value="severe">Severe (multiple surgeries, chronic pain)</option>
                  <option value="catastrophic">Catastrophic (TBI, paralysis, permanent loss)</option>
                </select>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <input type="checkbox" id="permanent" checked={permanentImpairment} onChange={(e) => setPermanentImpairment(e.target.checked)} className="w-4 h-4 text-purple-600 rounded" />
                <label htmlFor="permanent" className="text-sm font-medium text-slate-700 cursor-pointer">Permanent Impairment or Visible Scarring</label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Liability (%)</label>
                  <input type="number" value={liabilityPercentage} onChange={(e) => setLiabilityPercentage(Math.min(100, Math.max(0, Number(e.target.value))))} className="w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Insurance Limit ($)</label>
                  <input type="number" value={insuranceLimits} onChange={(e) => setInsuranceLimits(Number(e.target.value))} className="w-full p-2 border rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 bg-slate-900 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-6 border-b border-slate-700 pb-2">Estimated Value</h2>
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between"><span className="text-slate-400">Gross Claim:</span><span>${calculations.totalClaimValue.toLocaleString()}</span></div>
              <div className="flex justify-between items-end pt-2">
                <span className="text-slate-300 font-medium">Est. Settlement:</span>
                <span className="text-2xl font-bold text-purple-400">${calculations.settlementValue.toLocaleString()}</span>
              </div>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg space-y-3 mb-6">
              <div className="flex justify-between text-xs"><span className="text-slate-400">Attorney Fees (33%):</span><span className="text-red-400">-${calculations.attorneyFees.toLocaleString()}</span></div>
              <div className="flex justify-between font-bold border-t border-slate-700 pt-2 text-emerald-400"><span>Net to Client:</span><span>${calculations.netToClient.toLocaleString()}</span></div>
            </div>
            <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors">Free Case Evaluation</button>
          </div>
        </div>
      </div>

      {/* YMYL Disclaimer */}
      <section className="mb-12 p-5 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-900 leading-relaxed shadow-sm">
        <h3 className="font-bold mb-1">⚠️ Important Legal Disclaimer</h3>
        <p>
          This calculator provides estimates based on models like the "multiplier method" and is for informational purposes only. It <strong>does not constitute legal advice</strong>. Actual settlement amounts are influenced by local laws, specific evidence, and insurance policy limits.
        </p>
      </section>

      {/* Educational Content Section */}
      <section className="mt-12 space-y-12 text-slate-700 max-w-3xl border-t pt-12">
        <article className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-900">How Personal Injury Settlements Are Calculated</h2>
          <p>Calculating a fair settlement involves totaling quantifiable financial losses (Economic Damages) and applying a multiplier to account for intangible losses (Non-Economic Damages).</p>

          <h3 className="text-xl font-bold text-slate-800 mt-8">The "Multiplier Method" Explained</h3>
          <p>Insurance companies often multiply your medical bills by a factor (usually 1.5 to 5) to estimate pain and suffering. Severe injuries with permanent impacts warrant higher multipliers, while minor tissue injuries typically use the lower end of the scale.</p>

          <h3 className="text-xl font-bold text-slate-800 mt-8">Key Factors That Affect Your Final Payout</h3>
          <ul className="list-disc pl-5 space-y-4">
            <li><strong>Comparative Negligence:</strong> If you are partially at fault, your settlement is reduced by your percentage of liability.</li>
            <li><strong>Insurance Policy Limits:</strong> Recovery is often capped by the defendant's insurance coverage unless you have underinsured motorist protection.</li>
            <li><strong>Maximum Medical Improvement (MMI):</strong> Settlements should ideally occur only after you reach MMI to ensure all future medical needs are accounted for.</li>
          </ul>
        </article>

        <section className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Settlement FAQ</h2>
          <div className="space-y-6">
            <details className="group" open>
              <summary className="font-bold text-slate-800 cursor-pointer flex justify-between">Are settlements taxable?<span className="text-purple-500">▼</span></summary>
              <p className="mt-2 text-sm">Most physical injury settlements are <strong>not taxable</strong> by the IRS, though interest or punitive damages may be.</p>
            </details>
            <details className="group border-t pt-6">
              <summary className="font-bold text-slate-800 cursor-pointer flex justify-between">Should I accept the first offer?<span className="text-purple-500">▼</span></summary>
              <p className="mt-2 text-sm">First offers are often low-ball attempts to settle quickly. Consulting an attorney can help you realize the true value of your non-economic damages.</p>
            </details>
          </div>
        </section>
      </section>

      {/* Footer Ad Slot */}
      <div className="w-full h-48 bg-slate-50 mt-12 flex items-center justify-center border-dashed border-2 border-slate-200 rounded-lg">
        <span className="text-slate-400 text-xs uppercase tracking-widest">Advertisement</span>
      </div>
    </div>
  );
}
