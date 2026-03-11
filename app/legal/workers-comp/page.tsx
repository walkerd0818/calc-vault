'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export default function WorkersCompCalculator() {
  const [avgWeeklyWage, setAvgWeeklyWage] = useState(1500);
  const [disabilityType, setDisabilityType] = useState<'temporary' | 'permanent_partial' | 'permanent_total'>('temporary');
  const [weeksDisabled, setWeeksDisabled] = useState(26);
  const [impairmentRating, setImpairmentRating] = useState(15);
  const [bodyPart, setBodyPart] = useState<'arm' | 'leg' | 'hand' | 'finger' | 'other'>('arm');
  const [medicalTreatment, setMedicalTreatment] = useState(8000);
  const [permanentState, setPermanentState] = useState('CA');

  // Most workers' comp benefits are 66.67% (2/3) of average weekly wage
  const benefitPercentage = 0.6667;

  // Maximum benefit limits vary by state - using CA as baseline
  const maxWeeklyBenefit = 1615.50; // 2024 CA max
  const maxTemporaryWeeks = 104; // CA typical max

  // Body part schedules (typical multipliers for permanent partial disability)
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
    let compensationBreakdown = '';
    let benefitType = '';

    switch (disabilityType) {
      case 'temporary':
        // Temporary Total Disability (TTD)
        weeklyBenefit = Math.min(avgWeeklyWage * benefitPercentage, maxWeeklyBenefit);
        totalBenefit = weeklyBenefit * Math.min(weeksDisabled, maxTemporaryWeeks);
        benefitType = 'Temporary Total Disability (TTD)';
        break;

      case 'permanent_partial':
        // Permanent Partial Disability (PPD)
        weeklyBenefit = Math.min(avgWeeklyWage * benefitPercentage, maxWeeklyBenefit);
        const weeks = scheduleMultipliers[bodyPart] * (impairmentRating / 100);
        permanentDisabilityBenefit = weeklyBenefit * weeks;
        totalBenefit = permanentDisabilityBenefit;
        benefitType = 'Permanent Partial Disability (PPD)';
        break;

      case 'permanent_total':
        // Permanent Total Disability (PTD) - lifelong benefits
        weeklyBenefit = Math.min(avgWeeklyWage * benefitPercentage, maxWeeklyBenefit);
        // Estimate for 35 years life expectancy
        totalBenefit = weeklyBenefit * 52 * 35;
        benefitType = 'Permanent Total Disability (PTD)';
        break;
    }

    const totalWithMedical = totalBenefit + medicalTreatment;

    return {
      weeklyBenefit,
      totalBenefit,
      permanentDisabilityBenefit,
      medicalTreatment,
      totalWithMedical,
      benefitType,
      benefitPercentage: (benefitPercentage * 100).toFixed(1),
      estimatedWeeks: disabilityType === 'temporary' 
        ? Math.min(weeksDisabled, maxTemporaryWeeks)
        : disabilityType === 'permanent_partial'
        ? (scheduleMultipliers[bodyPart] * (impairmentRating / 100)).toFixed(0)
        : '1,820+ (lifelong)',
    };
  }, [avgWeeklyWage, disabilityType, weeksDisabled, impairmentRating, bodyPart, medicalTreatment]);

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
          href="/legal/settlement" 
          className="inline-block px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors font-medium"
        >
          Settlement Calculator
        </Link>
      </div>

      <section className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Workers' Comp & Disability Calculator</h1>
        <p className="text-slate-600">
          Estimate workers' compensation benefits for temporary, permanent partial, or permanent total disability. Includes medical treatment coverage.
        </p>
      </section>

      {/* Ad Slot */}
      <div className="w-full h-24 bg-slate-100 mb-8 flex items-center justify-center border-dashed border-2 border-slate-300">
        <span className="text-slate-400 text-xs">Advertisement</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Wage & Medical Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold mb-4">Employee Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Average Weekly Wage ($)</label>
              <input 
                type="number"
                value={avgWeeklyWage}
                onChange={(e) => setAvgWeeklyWage(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <p className="text-xs text-slate-500 mt-1">Based on last 52 weeks of earnings</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Medical Treatment Costs ($)</label>
              <input 
                type="number"
                value={medicalTreatment}
                onChange={(e) => setMedicalTreatment(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <p className="text-xs text-slate-500 mt-1">Usually covered in full by workers' comp</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">State</label>
              <select 
                value={permanentState}
                onChange={(e) => setPermanentState(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="CA">California</option>
                <option value="TX">Texas</option>
                <option value="NY">New York</option>
                <option value="FL">Florida</option>
                <option value="IL">Illinois</option>
                <option value="OTHER">Other</option>
              </select>
              <p className="text-xs text-slate-500 mt-1">Benefits vary by state</p>
            </div>
          </div>
        </div>

        {/* Disability Type & Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold mb-4">Disability Type</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Classification</label>
              <select 
                value={disabilityType}
                onChange={(e) => setDisabilityType(e.target.value as any)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="temporary">Temporary Total Disability (TTD)</option>
                <option value="permanent_partial">Permanent Partial Disability (PPD)</option>
                <option value="permanent_total">Permanent Total Disability (PTD)</option>
              </select>
            </div>

            {disabilityType === 'temporary' && (
              <div>
                <label className="block text-sm font-medium mb-1">Weeks Disabled</label>
                <input 
                  type="number"
                  value={weeksDisabled}
                  onChange={(e) => setWeeksDisabled(Number(e.target.value))}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
                />
                <p className="text-xs text-slate-500 mt-1">Max 104 weeks in most states</p>
              </div>
            )}

            {disabilityType === 'permanent_partial' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Body Part Affected</label>
                  <select 
                    value={bodyPart}
                    onChange={(e) => setBodyPart(e.target.value as any)}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
                  >
                    <option value="arm">Arm</option>
                    <option value="leg">Leg</option>
                    <option value="hand">Hand</option>
                    <option value="finger">Finger</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Impairment Rating (%)</label>
                  <input 
                    type="number"
                    value={impairmentRating}
                    onChange={(e) => setImpairmentRating(Math.min(100, Math.max(0, Number(e.target.value))))}
                    max={100}
                    min={0}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                  <p className="text-xs text-slate-500 mt-1">Determined by medical exam</p>
                </div>
              </>
            )}

            {disabilityType === 'permanent_total' && (
              <div className="bg-red-50 border border-red-200 p-3 rounded-lg text-sm text-red-700">
                <p className="font-semibold">Permanent Total Disability</p>
                <p className="text-xs mt-1">Lifelong benefits estimated based on 35-year life expectancy</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Weekly Benefit */}
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl mb-6">
        <h3 className="font-semibold text-slate-900 mb-3">Weekly Benefit Rate</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-slate-700">Weekly Wage</div>
            <div className="text-2xl font-bold">${avgWeeklyWage.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-slate-700">Weekly Benefit ({calculations.benefitPercentage}%)</div>
            <div className="text-2xl font-bold text-blue-600">${calculations.weeklyBenefit.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
          </div>
        </div>
      </div>

      {/* Benefit Calculation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-purple-50 border border-purple-200 p-6 rounded-xl">
          <h3 className="font-semibold text-slate-900 mb-3">{calculations.benefitType}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-700">Weekly Rate:</span>
              <span className="font-semibold">${calculations.weeklyBenefit.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700">Duration:</span>
              <span className="font-semibold">{calculations.estimatedWeeks} weeks</span>
            </div>
            <div className="border-t border-purple-300 pt-2 flex justify-between">
              <span className="font-semibold">Total Benefits:</span>
              <span className="text-lg font-bold text-purple-600">
                ${calculations.totalBenefit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl">
          <h3 className="font-semibold text-slate-900 mb-3">Total Compensation</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-700">Wage Benefits:</span>
              <span className="font-semibold">${calculations.totalBenefit.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700">Medical Coverage:</span>
              <span className="font-semibold">${calculations.medicalTreatment.toLocaleString()}</span>
            </div>
            <div className="border-t border-emerald-300 pt-2 flex justify-between">
              <span className="font-semibold">Total Package:</span>
              <span className="text-lg font-bold text-emerald-600">
                ${calculations.totalWithMedical.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <section className="bg-amber-50 border border-amber-200 p-6 rounded-xl">
        <h2 className="text-lg font-semibold mb-3 text-slate-900">Important Disclaimer</h2>
        <p className="text-sm text-slate-700 mb-2">
          This calculator provides estimates only and is not legal or medical advice. Workers' compensation benefits vary significantly by state, employer, and specific circumstances. This calculation is based on California guidelines.
        </p>
        <p className="text-sm text-slate-700">
          Consult with a workers' compensation attorney or your state's Workers' Compensation Appeals Board for accurate information about your specific case.
        </p>
      </section>
    </div>
  );
}
