'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Activity, Info, ShieldCheck, Heart, Scale, BookOpen } from 'lucide-react';

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
      return heightInMeters > 0 ? weight / (heightInMeters * heightInMeters) : 0;
    } else {
      const totalHeightInches = heightFeet * 12 + heightInches;
      return totalHeightInches > 0 ? (weightPounds / (totalHeightInches * totalHeightInches)) * 703 : 0;
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
    <div className="max-w-5xl mx-auto px-4 pb-20">
      {/* Navigation */}
      <nav className="mb-8 flex flex-wrap gap-3 pt-6">
        <Link 
          href="/health" 
          className="inline-block px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors font-medium"
        >
          ← Wellness Hub
        </Link>
        <Link 
          href="/health/calories" 
          className="inline-block px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors font-medium"
        >
          Calorie Calculator
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight flex items-center gap-3">
          <Activity className="text-rose-600" size={36} />
          Body Mass Index (BMI) Calculator
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          Quickly assess your <strong>weight-to-height ratio</strong> using our precision BMI tool. 
          Understand your body composition category based on <strong>World Health Organization (WHO)</strong> standards.
        </p>
      </header>

      {/* Ad Slot - Top */}
      <div className="w-full h-24 bg-slate-50 mb-10 flex flex-col items-center justify-center border border-slate-100 rounded-xl">
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Sponsored Advertisement</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Inputs */}
        <div className="lg:col-span-5 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2 uppercase tracking-tighter">
            <Scale size={20} className="text-rose-600" /> Measurements
          </h2>
          
          <div className="mb-6 flex gap-2 p-1 bg-slate-100 rounded-xl">
            <button onClick={() => setUnit('metric')} className={`flex-1 py-2 rounded-lg font-bold transition-all ${unit === 'metric' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Metric</button>
            <button onClick={() => setUnit('imperial')} className={`flex-1 py-2 rounded-lg font-bold transition-all ${unit === 'imperial' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Imperial</button>
          </div>

          <div className="space-y-6">
            {unit === 'metric' ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Weight (kg)</label>
                  <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-rose-500 outline-none transition-all font-medium text-lg" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Height (cm)</label>
                  <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-rose-500 outline-none transition-all font-medium text-lg" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Weight (lbs)</label>
                  <input type="number" value={weightPounds} onChange={(e) => setWeightPounds(Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-rose-500 outline-none transition-all font-medium text-lg" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Feet</label>
                    <input type="number" value={heightFeet} onChange={(e) => setHeightFeet(Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-rose-500 outline-none transition-all font-medium text-lg" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Inches</label>
                    <input type="number" value={heightInches} onChange={(e) => setHeightInches(Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-rose-500 outline-none transition-all font-medium text-lg" />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className={`${categoryInfo.bg} p-10 rounded-2xl border-4 ${categoryInfo.border} flex flex-col justify-center items-center text-center relative overflow-hidden`}>
             <div className="absolute top-0 right-0 p-4 opacity-5"><Heart size={150} /></div>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 font-mono">// calculated_index //</p>
             <div className={`text-7xl font-black ${categoryInfo.color} mb-2`}>{bmi.toFixed(1)}</div>
             <div className={`text-2xl font-bold ${categoryInfo.color} uppercase tracking-tight`}>{categoryInfo.category}</div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Official Classifications</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100"><p className="text-[10px] text-blue-400 font-bold mb-1 underline uppercase italic">Under</p><p className="text-sm font-black text-blue-700">&lt; 18.5</p></div>
              <div className="p-3 rounded-xl bg-green-50 border border-green-100"><p className="text-[10px] text-green-400 font-bold mb-1 underline uppercase italic">Normal</p><p className="text-sm font-black text-green-700">18.5-24.9</p></div>
              <div className="p-3 rounded-xl bg-orange-50 border border-orange-100"><p className="text-[10px] text-orange-400 font-bold mb-1 underline uppercase italic">Over</p><p className="text-sm font-black text-orange-700">25-29.9</p></div>
              <div className="p-3 rounded-xl bg-red-50 border border-red-100"><p className="text-[10px] text-red-400 font-bold mb-1 underline uppercase italic">Obese</p><p className="text-sm font-black text-red-700">30+</p></div>
            </div>
          </div>
        </div>
      </div>

      {/* EDUCATIONAL CONTENT: AdSense Booster */}
      <section className="prose prose-slate max-w-none space-y-12 border-t pt-16 border-slate-100">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <BookOpen className="text-rose-600" size={24} /> The Science of BMI
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              The <strong>Body Mass Index</strong> is a screening tool used to estimate whether a person 
              is at a healthy weight for their height. Developed in the 19th century by Adolphe Quetelet, 
              it provides a <strong>numeric value</strong> that categorizes individuals into underweight, 
              normal weight, overweight, or obese.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Info className="text-rose-600" size={24} /> Beyond the Number
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              While BMI is a useful <strong>population-level metric</strong>, it has limitations. 
              It does not distinguish between <strong>muscle mass</strong> and body fat. Athletes or 
              bodybuilders may have a high BMI but low body fat. Conversely, older adults may have 
              a normal BMI while carrying excess visceral fat.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800">
           <h3 className="text-rose-500 font-bold mb-4 uppercase tracking-widest text-xs flex items-center gap-2 font-mono italic">
             // calculation_formula_terminal //
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[11px] font-mono tracking-tighter uppercase">
             <div className="bg-white/5 p-4 rounded-xl border border-white/10 italic leading-relaxed">Metric Protocol:<br/>Weight (kg) / [Height (m)]²</div>
             <div className="bg-white/5 p-4 rounded-xl border border-white/10 italic leading-relaxed">Imperial Protocol:<br/>703 × Weight (lbs) / [Height (in)]²</div>
           </div>
        </div>
      </section>

      {/* MANDATORY MEDICAL DISCLAIMER */}
      <footer className="mt-16 bg-rose-50 border-l-4 border-rose-400 p-6 rounded-r-xl">
        <div className="flex gap-4">
          <ShieldCheck className="text-rose-600 shrink-0" size={24} />
          <p className="text-xs text-rose-800 leading-relaxed font-medium italic">
            <strong>Medical Disclaimer:</strong> BMI results are intended as a general guide and 
            should not be used as the sole indicator of health. Factors such as bone density, 
            age, sex, and ethnicity are not factored into this calculation. Consult a 
            <strong> licensed healthcare provider</strong> before making significant changes 
            to your diet, exercise, or lifestyle based on these metrics.
          </p>
        </div>
      </footer>
    </div>
  );
}
