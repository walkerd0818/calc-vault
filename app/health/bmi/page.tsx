'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export default function BMICalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(9);
  const [weightPounds, setWeightPounds] = useState(154);

  const bmi = useMemo(() => {
    if (unit === 'metric') {
      const heightInMeters = height / 100;
      return weight / (heightInMeters * heightInMeters);
    } else {
      const totalHeightInches = heightFeet * 12 + heightInches;
      return (weightPounds / (totalHeightInches * totalHeightInches)) * 703;
    }
  }, [unit, weight, height, heightFeet, heightInches, weightPounds]);

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
    if (bmi < 25) return { category: 'Normal Weight', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
    return { category: 'Obese', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
  };

  const categoryInfo = getBMICategory(bmi);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Navigation */}
      <div className="mb-6 flex gap-4">
        <Link 
          href="/health" 
          className="inline-block px-4 py-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors font-medium"
        >
          ← Back to Health
        </Link>
      </div>

      <section className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">BMI Calculator</h1>
        <p className="text-slate-600">Calculate your Body Mass Index and understand your health metrics.</p>
      </section>

      {/* Ad Slot */}
      <div className="w-full h-24 bg-slate-100 mb-8 flex items-center justify-center border-dashed border-2 border-slate-300">
        <span className="text-slate-400 text-xs">Advertisement</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="font-semibold mb-4 text-slate-900">Enter Your Measurements</h2>
          
          {/* Unit Toggle */}
          <div className="mb-6 flex gap-2">
            <button
              onClick={() => setUnit('metric')}
              className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all ${
                unit === 'metric'
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Metric (kg, cm)
            </button>
            <button
              onClick={() => setUnit('imperial')}
              className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all ${
                unit === 'imperial'
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Imperial (lbs, feet)
            </button>
          </div>

          <div className="space-y-4">
            {unit === 'metric' ? (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                  <input 
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Height (cm)</label>
                  <input 
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Weight (lbs)</label>
                  <input 
                    type="number"
                    value={weightPounds}
                    onChange={(e) => setWeightPounds(Number(e.target.value))}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Height (feet)</label>
                  <input 
                    type="number"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(Number(e.target.value))}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Height (inches)</label>
                  <input 
                    type="number"
                    value={heightInches}
                    onChange={(e) => setHeightInches(Number(e.target.value))}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Results */}
        <div className={`${categoryInfo.bg} p-6 rounded-xl border-2 ${categoryInfo.border}`}>
          <h2 className="font-semibold mb-4 text-slate-900">Your BMI</h2>
          <div className="mb-6">
            <div className={`text-5xl font-bold ${categoryInfo.color} mb-2`}>
              {bmi.toLocaleString(undefined, { maximumFractionDigits: 1 })}
            </div>
            <div className={`text-xl font-semibold ${categoryInfo.color}`}>
              {categoryInfo.category}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 mt-6">
            <h3 className="font-semibold mb-3 text-slate-900 text-sm">BMI Categories</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Underweight:</span>
                <span className="font-medium">Below 18.5</span>
              </div>
              <div className="flex justify-between">
                <span>Normal Weight:</span>
                <span className="font-medium">18.5 - 24.9</span>
              </div>
              <div className="flex justify-between">
                <span>Overweight:</span>
                <span className="font-medium">25.0 - 29.9</span>
              </div>
              <div className="flex justify-between">
                <span>Obese:</span>
                <span className="font-medium">30.0+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information */}
      <section className="mt-8 bg-slate-50 p-8 rounded-xl border border-slate-200">
        <h2 className="text-lg font-semibold mb-3 text-slate-900">About BMI</h2>
        <p className="text-slate-700 text-sm">
          Body Mass Index (BMI) is a simple calculation using a person's height and weight. While BMI can be a useful screening tool, it does not directly measure body fat or health status. Consult a healthcare professional for personalized health advice.
        </p>
      </section>
    </div>
  );
}
