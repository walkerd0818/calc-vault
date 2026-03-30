'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Activity, Info, ShieldCheck, Heart, Zap, BookOpen } from 'lucide-react';

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
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const tdee = bmr * activityMultipliers[activityLevel].multiplier;
    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      weightLoss: Math.round(tdee - 500),
      weightGain: Math.round(tdee + 300),
    };
  }, [gender, age, weight, height, activityLevel]);

  return (
    <div className="max-w-5xl mx-auto px-4 pb-20">
      {/* Navigation */}
      <nav className="mb-8 flex flex-wrap gap-3 pt-6">
        <Link 
          href="/health" 
          className="inline-block px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors font-medium"
        >
          ← Health Hub
        </Link>
        <Link 
          href="/health/bmi" 
          className="inline-block px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors font-medium"
        >
          BMI Calculator
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight flex items-center gap-3">
          <Activity className="text-rose-600" size={36} />
          Calorie & TDEE Calculator
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          Estimate your <strong>Total Daily Energy Expenditure (TDEE)</strong> using the 
          <strong> Mifflin-St Jeor Equation</strong>. Calculate the calories required for maintenance, 
          weight loss, or muscle gain based on your specific activity profile.
        </p>
      </header>

      {/* Ad Slot - Top */}
      <div className="w-full h-24 bg-slate-50 mb-10 flex flex-col items-center justify-center border border-slate-100 rounded-xl">
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Sponsored Advertisement</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Inputs */}
        <div className="lg:col-span-4 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2 uppercase tracking-tighter">
            <Info size={20} className="text-rose-600" /> Biometrics
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Gender</label>
              <div className="flex gap-2">
                {['male', 'female'].map((g) => (
                  <button key={g} onClick={() => setGender(g as Gender)} className={`flex-1 py-2 rounded-xl font-bold capitalize transition-all ${gender === g ? 'bg-rose-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Age</label>
                <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-rose-500 outline-none transition-all font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Weight (kg)</label>
                <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-rose-500 outline-none transition-all font-medium" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Height (cm)</label>
              <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-rose-500 outline-none transition-all font-medium" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Activity Level</label>
              <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-rose-500 outline-none transition-all font-medium bg-white">
                <option value="sedentary">Sedentary</option>
                <option value="light">Lightly Active</option>
                <option value="moderate">Moderately Active</option>
                <option value="active">Very Active</option>
                <option value="veryActive">Extra Active</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 text-white p-10 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5"><Zap size={150} /></div>
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-xs font-bold uppercase tracking-widest text-rose-500 mb-2 font-mono">// daily_maintenance //</h3>
              <div className="text-6xl font-black text-white">{calories.tdee}</div>
              <p className="text-slate-400 mt-2 italic">Calories per day to maintain weight</p>
            </div>
            <div className="bg-white/10 p-6 rounded-2xl border border-white/10 w-full md:w-auto">
              <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Basal Metabolic Rate</h4>
              <div className="text-3xl font-bold font-mono">{calories.bmr}</div>
              <p className="text-[10px] opacity-50">Base calories at rest</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-orange-50 border-2 border-orange-100 p-8 rounded-2xl flex flex-col justify-center">
              <h3 className="text-orange-900 font-bold mb-1 uppercase text-xs tracking-widest italic font-mono">Weight_Loss_Mode</h3>
              <div className="text-4xl font-black text-orange-600">{calories.weightLoss} <span className="text-xs text-orange-400 font-normal">cal/day</span></div>
              <p className="text-xs text-orange-700/60 mt-2 italic font-medium">Calculated at a -500 calorie deficit</p>
            </div>
            <div className="bg-emerald-50 border-2 border-emerald-100 p-8 rounded-2xl flex flex-col justify-center">
              <h3 className="text-emerald-900 font-bold mb-1 uppercase text-xs tracking-widest italic font-mono">Weight_Gain_Mode</h3>
              <div className="text-4xl font-black text-emerald-600">{calories.weightGain} <span className="text-xs text-emerald-400 font-normal">cal/day</span></div>
              <p className="text-xs text-emerald-700/60 mt-2 italic font-medium">Calculated at a +300 calorie surplus</p>
            </div>
          </div>
        </div>
      </div>

      {/* EDUCATIONAL CONTENT: AdSense Booster */}
      <section className="prose prose-slate max-w-none space-y-12 border-t pt-16 border-slate-100">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <BookOpen className="text-rose-600" size={24} /> BMR vs. TDEE
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Your <strong>Basal Metabolic Rate (BMR)</strong> is the number of calories your body needs to 
              perform basic life-sustaining functions at rest. Your <strong>Total Daily Energy Expenditure (TDEE)</strong> 
              factors in your physical activity level. Understanding both is critical for effective 
              <strong> nutritional planning</strong> and metabolic health.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Heart className="text-rose-600" size={24} /> Sustainable Goals
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              For healthy weight management, experts typically recommend a <strong>deficit or surplus</strong> 
              of 300 to 500 calories per day. Rapid weight change can lead to muscle loss and nutrient 
              deficiencies. Use this calculator to identify a <strong>consistent baseline</strong> for 
              long-term success.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
          <h3 className="text-slate-900 font-bold mb-4 uppercase tracking-widest text-xs flex items-center gap-2">
            <Info size={18} className="text-rose-600" /> The Mifflin-St Jeor Formula
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">
            This tool uses the <strong>Mifflin-St Jeor equation</strong>, widely regarded as the most 
            accurate method for estimating metabolic rates in healthy adults. 
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[10px] font-mono font-bold uppercase tracking-tight text-slate-400">
            <div className="bg-white p-4 rounded-xl border border-slate-100 italic">Male: (10 × wt) + (6.25 × ht) - (5 × age) + 5</div>
            <div className="bg-white p-4 rounded-xl border border-slate-100 italic">Female: (10 × wt) + (6.25 × ht) - (5 × age) - 161</div>
          </div>
        </div>
      </section>

      {/* MANDATORY MEDICAL DISCLAIMER */}
      <footer className="mt-16 bg-rose-50 border-l-4 border-rose-400 p-6 rounded-r-xl">
        <div className="flex gap-4">
          <ShieldCheck className="text-rose-600 shrink-0" size={24} />
          <p className="text-xs text-rose-800 leading-relaxed font-medium italic">
            <strong>Medical Disclaimer:</strong> Calorie estimates are for informational purposes only. 
            Factors such as muscle mass, genetics, and underlying health conditions can affect your 
            actual metabolic rate. Consult a <strong>licensed dietitian or healthcare professional</strong> 
            before starting any intensive restrictive diet or fitness program.
          </p>
        </div>
      </footer>
    </div>
  );
}
