'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

type Gender = 'male' | 'female';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';

export default function CalorieCalculator() {
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');

  const activityMultipliers: Record<ActivityLevel, { multiplier: number; description: string }> = {
    sedentary: { multiplier: 1.2, description: 'Little or no exercise' },
    light: { multiplier: 1.375, description: 'Light exercise 1-3 days/week' },
    moderate: { multiplier: 1.55, description: 'Moderate exercise 3-5 days/week' },
    active: { multiplier: 1.725, description: 'Intense exercise 6-7 days/week' },
    veryActive: { multiplier: 1.9, description: 'Very intense exercise daily' },
  };

  const calories = useMemo(() => {
    // Mifflin-St Jeor Equation
    let bmr: number;
    
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const tdee = bmr * activityMultipliers[activityLevel].multiplier;
    const weightLoss = tdee - 500;
    const weightGain = tdee + 300;

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      weightLoss: Math.round(weightLoss),
      weightGain: Math.round(weightGain),
    };
  }, [gender, age, weight, height, activityLevel]);

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
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Calorie Needs Calculator</h1>
        <p className="text-slate-600">Estimate your daily calorie requirements based on your lifestyle and fitness goals.</p>
      </section>

      {/* Ad Slot */}
      <div className="w-full h-24 bg-slate-100 mb-8 flex items-center justify-center border-dashed border-2 border-slate-300">
        <span className="text-slate-400 text-xs">Advertisement</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Inputs */}
        <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="font-semibold mb-4 text-slate-900">Your Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Gender</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setGender('male')}
                  className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all ${
                    gender === 'male'
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Male
                </button>
                <button
                  onClick={() => setGender('female')}
                  className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all ${
                    gender === 'female'
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <input 
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-rose-500 outline-none"
              />
            </div>

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

            <div>
              <label className="block text-sm font-medium mb-2">Activity Level</label>
              <select 
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-rose-500 outline-none text-sm"
              >
                <option value="sedentary">Sedentary (Little/No Exercise)</option>
                <option value="light">Light (1-3 days/week)</option>
                <option value="moderate">Moderate (3-5 days/week)</option>
                <option value="active">Active (6-7 days/week)</option>
                <option value="veryActive">Very Active (Intense Daily)</option>
              </select>
              <p className="text-xs text-slate-500 mt-1">{activityMultipliers[activityLevel].description}</p>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="md:col-span-2 space-y-4">
          {/* BMR */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
            <h3 className="font-semibold text-slate-900 mb-2">Basal Metabolic Rate (BMR)</h3>
            <div className="text-3xl font-bold text-blue-600 mb-1">{calories.bmr} cal/day</div>
            <p className="text-xs text-slate-600">Calories burned at rest</p>
          </div>

          {/* TDEE */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200">
            <h3 className="font-semibold text-slate-900 mb-2">Total Daily Energy Expenditure (TDEE)</h3>
            <div className="text-3xl font-bold text-emerald-600 mb-1">{calories.tdee} cal/day</div>
            <p className="text-xs text-slate-600">Calories burned with activity level</p>
          </div>

          {/* Goals */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
              <h3 className="font-semibold text-slate-900 mb-2 text-sm">Weight Loss Goal</h3>
              <div className="text-2xl font-bold text-orange-600">{calories.weightLoss} cal/day</div>
              <p className="text-xs text-slate-600 mt-1">~0.5 kg/week loss</p>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-4 rounded-xl border border-rose-200">
              <h3 className="font-semibold text-slate-900 mb-2 text-sm">Weight Gain Goal</h3>
              <div className="text-2xl font-bold text-rose-600">{calories.weightGain} cal/day</div>
              <p className="text-xs text-slate-600 mt-1">~0.3 kg/week gain</p>
            </div>
          </div>
        </div>
      </div>

      {/* Information */}
      <section className="mt-8 bg-slate-50 p-8 rounded-xl border border-slate-200">
        <h2 className="text-lg font-semibold mb-3 text-slate-900">How This Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-700">
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">BMR Calculation</h3>
            <p>Uses the Mifflin-St Jeor equation to calculate your basal metabolic rate - the minimum calories your body needs at rest.</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">TDEE Calculation</h3>
            <p>Multiplies your BMR by an activity factor to estimate total daily energy expenditure based on your lifestyle.</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Weight Goals</h3>
            <p>Uses standard calorie deficits/surpluses (500 cal loss, 300 cal gain) to estimate weight change rates.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
