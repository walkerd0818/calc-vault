'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  Info, 
  ShieldAlert, 
  Scale, 
  FileText, 
  HelpCircle,
  Clock,
  Stethoscope
} from 'lucide-react';

export default function WorkersCompCalculator() {
  const [avgWeeklyWage, setAvgWeeklyWage] = useState(1500);
  const [disabilityType, setDisabilityType] = useState<'temporary' | 'permanent_partial' | 'permanent_total'>('temporary');
  const [weeksDisabled, setWeeksDisabled] = useState(26);
  const [impairmentRating, setImpairmentRating] = useState(15);
  const [bodyPart, setBodyPart] = useState<'arm' | 'leg' | 'hand' | 'finger' | 'other'>('arm');
  const [medicalTreatment, setMedicalTreatment] = useState(8000);
  const [permanentState, setPermanentState] = useState('CA');

  const benefitPercentage = 0.6667;
  const maxWeeklyBenefit = 1615.50; 
  const maxTemporaryWeeks = 104; 

  const scheduleMultipliers: Record<string, number> = {
    arm: 312,
    leg: 350,
    hand: 342,
    finger: 60,
    other: 200,
  };

  const calculations = useMemo(() => {
    let totalBenefit = 0;
    let weeklyBenefit = 0;
    let permanentDisabilityBenefit = 0;
    let benefitType = '';

    switch (disabilityType) {
      case 'temporary':
        weeklyBenefit = Math.min(avgWeeklyWage * benefitPercentage, maxWeeklyBenefit);
        totalBenefit = weeklyBenefit * Math.min(weeksDisabled, maxTemporaryWeeks);
        benefitType = 'Temporary Total Disability (TTD)';
        break;
      case 'permanent_partial':
        weeklyBenefit = Math.min(avgWeeklyWage * benefitPercentage, maxWeeklyBenefit);
        const weeks = scheduleMultipliers[bodyPart] * (impairmentRating / 100);
        permanentDisabilityBenefit = weeklyBenefit * weeks;
        totalBenefit = permanentDisabilityBenefit;
        benefitType = 'Permanent Partial Disability (PPD)';
        break;
      case 'permanent_total':
        weeklyBenefit = Math.min(avgWeeklyWage * benefitPercentage, maxWeeklyBenefit);
        totalBenefit = weeklyBenefit * 52 * 35; // 35 year estimate
        benefitType = 'Permanent Total Disability (PTD)';
        break;
    }

    return {
      weeklyBenefit,
      totalBenefit,
      medicalTreatment,
      totalWithMedical: totalBenefit + medicalTreatment,
      benefitType,
      benefitPercentage: (benefitPercentage * 100).toFixed(1),
      estimatedWeeks: disabilityType === 'temporary' 
        ? Math.min(weeksDisabled, maxTemporaryWeeks)
        : disabilityType === 'permanent_partial'
        ? (scheduleMultipliers[bodyPart] * (impairmentRating / 100)).toFixed(0)
        : 'Lifelong',
    };
  }, [avgWeeklyWage, disabilityType, weeksDisabled, impairmentRating, bodyPart, medicalTreatment]);

  return (
    <div className="max-w-5xl mx-auto px-4 pb-20">
      {/* Navigation */}
      <nav className="mb-8 flex flex-wrap gap-3 pt-6">
        <Link href="/legal" className="px-4 py-2 bg-purple-50 text-purple-600 rounded-full hover:bg-purple-600 hover:text-white transition-all text-sm font-bold shadow-sm">
          ← Legal Hub
        </Link>
        <Link href="/legal/settlement" className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-all text-sm font-bold shadow-sm">
          Personal Injury Calc
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight flex items-center gap-3">
          <Briefcase className="text-purple-600" size={36} />
          Workers' Comp & Disability Calculator
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          Estimate your <strong>wage replacement benefits</strong> and potential <strong>disability settlements</strong>. 
          Understand the financial impact of work-related injuries based on state-mandated formulas and impairment ratings.
        </p>
      </header>

      {/* Ad Slot - Top */}
      <div className="w-full h-24 bg-slate-50 mb-10 flex flex-col items-center justify-center border border-slate-100 rounded-xl">
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Sponsored Advertisement</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Inputs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
              <FileText size={20} className="text-purple-600" /> Employee Data
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Avg Weekly Wage ($)</label>
                <input type="number" value={avgWeeklyWage} onChange={(e) => setAvgWeeklyWage(Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-purple-500 outline-none transition-all font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Medical Costs Paid ($)</label>
                <input type="number" value={medicalTreatment} onChange={(e) => setMedicalTreatment(Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-purple-500 outline-none transition-all font-medium" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Disability Classification</label>
                <select value={disabilityType} onChange={(e) => setDisabilityType(e.target.value as any)} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-purple-500 outline-none transition-all font-medium bg-white">
                  <option value="temporary">Temporary Total Disability (TTD)</option>
                  <option value="permanent_partial">Permanent Partial Disability (PPD)</option>
                  <option value="permanent_total">Permanent Total Disability (PTD)</option>
                </select>
              </div>
              {disabilityType === 'permanent_partial' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Impairment %</label>
                    <input type="number" value={impairmentRating} onChange={(e) => setImpairmentRating(Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-purple-500 outline-none transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Affected Body Part</label>
                    <select value={bodyPart} onChange={(e) => setBodyPart(e.target.value as any)} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-purple-500 outline-none transition-all font-medium bg-white">
                      <option value="arm">Arm</option>
                      <option value="leg">Leg</option>
                      <option value="hand">Hand</option>
                      <option value="finger">Finger</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-5">
          <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl h-full flex flex-col justify-between border-b-8 border-purple-600">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-2">Estimated Weekly Benefit</h3>
              <div className="text-5xl font-black mb-4">${calculations.weeklyBenefit.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex justify-between text-sm italic">
                  <span className="text-slate-400">Benefit Type:</span>
                  <span className="text-white">{calculations.benefitType}</span>
                </div>
                <div className="flex justify-between text-sm italic">
                  <span className="text-slate-400">Benefit Duration:</span>
                  <span className="text-white">{calculations.estimatedWeeks} Weeks</span>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
               <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Total Projected Value</p>
               <div className="text-3xl font-bold text-emerald-400 font-mono">${calculations.totalWithMedical.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* EDUCATIONAL CONTENT: AdSense Booster */}
      <section className="prose prose-slate max-w-none mb-16 space-y-12">
        <div className="grid md:grid-cols-2 gap-12 border-t pt-12 border-slate-100">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Clock className="text-purple-600" /> TTD vs. PPD
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              <strong>Temporary Total Disability (TTD)</strong> benefits are paid while you are unable to work and recovering from your injury. 
              Once you reach <strong>Maximum Medical Improvement (MMI)</strong>, your status may shift to <strong>Permanent Partial Disability (PPD)</strong> 
              if you have lasting impairments. PPD values are often determined by a state-specific "schedule of benefits" for specific body parts.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Stethoscope className="text-purple-600" /> Medical Coverage
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              In almost all jurisdictions, <strong>Workers' Compensation</strong> covers 100% of reasonable and necessary medical treatment 
              related to the workplace injury. This includes surgery, physical therapy, and prescription medications. Unlike standard 
              health insurance, there are typically <strong>no co-pays or deductibles</strong> for the injured worker.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-6">
            <HelpCircle className="text-purple-600" /> Settlement FAQ
          </h2>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-slate-800 mb-2">What is an Impairment Rating?</h4>
              <p className="text-sm text-slate-600 leading-relaxed">After reaching MMI, a doctor will evaluate your permanent physical loss. This rating (0-100%) is used in a formula against your state's benefit schedule to determine the dollar value of your settlement.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-2">Are benefits taxable?</h4>
              <p className="text-sm text-slate-600 leading-relaxed">In the United States, Workers' Compensation benefits are generally <strong>exempt from federal and state income taxes</strong>, allowing the worker to keep the full 2/3 wage replacement amount.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mandatory Disclaimer */}
      <footer className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl">
        <div className="flex gap-4">
          <ShieldAlert className="text-amber-600 shrink-0" size={24} />
          <p className="text-xs text-amber-800 leading-relaxed font-medium">
            <strong>Legal Disclosure:</strong> Workers' compensation laws vary significantly by state. This calculator uses generalized formulas and 2024 California maximums as a baseline. It is provided for educational purposes and is <strong>not a substitute for legal advice</strong>. Consult with a qualified workers' compensation attorney to determine the exact value of your claim based on local statutes.
          </p>
        </div>
      </footer>
    </div>
  );
}
