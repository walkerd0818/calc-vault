"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useUnitPreference } from '@/lib/unit-context';
import Link from 'next/link';
import { 
  Shapes, 
  Info, 
  BookOpen, 
  ShieldCheck, 
  ChevronLeft, 
  Maximize, 
  Box 
} from 'lucide-react';

import { convertUnits } from '@/lib/unit-logic';

type ShapeType = 'circle' | 'rectangle' | 'triangle' | 'sphere' | 'cube' | 'cylinder';

export default function GeometryCalculator() {
  const [shapeType, setShapeType] = useState<ShapeType>('circle');
  const { unit, setUnit } = useUnitPreference();
  const prevUnitRef = useRef(unit);
  const [values, setValues] = useState({ a: 0, b: 0, c: 0, r: 0, h: 0 });

  // convert when unit toggles so displayed numbers remain meaningful
  useEffect(() => {
    const prev = prevUnitRef.current;
    if (prev !== unit) {
      if (unit === 'imperial') {
        setValues(v => ({
          a: convertUnits(v.a, 'meter', 'ft', 'length'),
          b: convertUnits(v.b, 'meter', 'ft', 'length'),
          c: convertUnits(v.c, 'meter', 'ft', 'length'),
          r: convertUnits(v.r, 'meter', 'ft', 'length'),
          h: convertUnits(v.h, 'meter', 'ft', 'length'),
        }));
      } else {
        setValues(v => ({
          a: convertUnits(v.a, 'ft', 'meter', 'length'),
          b: convertUnits(v.b, 'ft', 'meter', 'length'),
          c: convertUnits(v.c, 'ft', 'meter', 'length'),
          r: convertUnits(v.r, 'ft', 'meter', 'length'),
          h: convertUnits(v.h, 'ft', 'meter', 'length'),
        }));
      }
      prevUnitRef.current = unit;
    }
  }, [unit]);

  const results = useMemo(() => {
    const { a, b, c, r, h } = values;

    // Helper: interpret user-entered length value into meters for internal calculation
    const toMeters = (v: number) => unit === 'metric' ? v : convertUnits(v, 'ft', 'meter', 'length');

    // Compute using metric base (meters)
    const r_m = toMeters(r);
    const a_m = toMeters(a);
    const b_m = toMeters(b);
    const c_m = toMeters(c);
    const h_m = toMeters(h);

    switch (shapeType) {
      case 'circle':
        return { area_m2: Math.PI * r_m * r_m, perimeter_m: 2 * Math.PI * r_m, label: 'Radius' };
      case 'rectangle':
        return { area_m2: a_m * b_m, perimeter_m: 2 * (a_m + b_m), label: 'Length × Width' };
      case 'triangle':
        const s = (a_m + b_m + c_m) / 2;
        const area_m2 = a_m + b_m > c_m && a_m + c_m > b_m && b_m + c_m > a_m ? Math.sqrt(s * (s - a_m) * (s - b_m) * (s - c_m)) : 0;
        return { area_m2, perimeter_m: a_m + b_m + c_m, label: 'Sides (a, b, c)' };
      case 'sphere':
        return { area_m2: 4 * Math.PI * r_m * r_m, volume_m3: (4 / 3) * Math.PI * r_m * r_m * r_m, label: 'Radius' };
      case 'cube':
        return { area_m2: 6 * a_m * a_m, volume_m3: a_m * a_m * a_m, label: 'Side Length' };
      case 'cylinder':
        return { area_m2: 2 * Math.PI * r_m * (r_m + h_m), volume_m3: Math.PI * r_m * r_m * h_m, label: 'Radius & Height' };
    }
  }, [shapeType, values, unit]);

  const handleInputChange = (key: string, value: number) => {
    setValues(prev => ({ ...prev, [key]: value }));
  };

  const format = (val: number) => val.toLocaleString(undefined, { maximumFractionDigits: 4 });

  const m3ToFt3 = 35.3146667;

  // Prepare display-ready values based on selected unit
  const displayArea = ('area_m2' in results)
    ? (unit === 'metric' ? (results as any).area_m2 : convertUnits((results as any).area_m2, 'square_meter', 'square_ft', 'area'))
    : null;

  const displayPerimeter = ('perimeter_m' in results)
    ? (unit === 'metric' ? (results as any).perimeter_m : convertUnits((results as any).perimeter_m, 'meter', 'ft', 'length'))
    : null;

  const displayVolume = ('volume_m3' in results)
    ? (unit === 'metric' ? (results as any).volume_m3 : (results as any).volume_m3 * m3ToFt3)
    : null;

  const areaUnitLabel = unit === 'metric' ? 'm²' : 'ft²';
  const lengthUnitLabel = unit === 'metric' ? 'm' : 'ft';
  const volumeUnitLabel = unit === 'metric' ? 'm³' : 'ft³';

  return (
    <div className="max-w-5xl mx-auto px-4 pb-20">
     {/* Navigation */}
      <nav className="mb-8 flex flex-wrap gap-3 pt-6">
        <Link 
          href="/engineering" 
          className="inline-block px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors font-medium"
        >
          ← Engineering Hub
        </Link>
        <Link 
          href="/engineering/scientific" 
          className="inline-block px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors font-medium"
        >
          Scientific Calculator
        </Link>
        <Link 
          href="/engineering/percentage" 
          className="inline-block px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors font-medium"
        >
          Percentage Calculator
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight flex items-center gap-3">
          <Shapes className="text-amber-600" size={36} />
          Area & Volume Calculator
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          A high-precision utility for <strong>spatial analysis</strong>. Calculate the surface area, 
          perimeter, and volume of common 2D and 3D geometric shapes with <strong>floating-point accuracy</strong>.
        </p>
      </header>

      {/* Ad Slot - Top */}
      <div className="w-full h-24 bg-slate-50 mb-10 flex flex-col items-center justify-center border border-slate-100 rounded-xl">
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Sponsored Advertisement</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Shape Selection */}
        <div className="lg:col-span-4 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2 uppercase tracking-tighter">
            <Info size={20} className="text-amber-600" /> Select Shape
          </h2>
          <div className="space-y-2">
            {[
              { value: 'circle', label: 'Circle', type: '2D' },
              { value: 'rectangle', label: 'Rectangle', type: '2D' },
              { value: 'triangle', label: 'Triangle', type: '2D' },
              { value: 'sphere', label: 'Sphere', type: '3D' },
              { value: 'cube', label: 'Cube', type: '3D' },
              { value: 'cylinder', label: 'Cylinder', type: '3D' },
            ].map((shape) => (
              <button
                key={shape.value}
                onClick={() => setShapeType(shape.value as ShapeType)}
                className={`w-full p-3 rounded-xl text-left font-bold transition-all border-2 ${
                  shapeType === shape.value
                    ? 'bg-amber-600 border-amber-600 text-white shadow-lg'
                    : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-amber-200 hover:bg-white'
                }`}
              >
                {shape.label} <span className="text-[10px] opacity-60 ml-1 tracking-widest uppercase">[{shape.type}]</span>
              </button>
            ))}
          </div>
        </div>

        {/* Inputs and Results */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-6 text-slate-800 uppercase tracking-tighter">Input Dimensions</h2>
            <div className="mb-4 flex gap-2 p-1 bg-slate-100 rounded-xl">
              <button onClick={() => setUnit('metric')} className={`flex-1 py-2 rounded-lg font-bold transition-all ${unit === 'metric' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Metric (m)</button>
              <button onClick={() => setUnit('imperial')} className={`flex-1 py-2 rounded-lg font-bold transition-all ${unit === 'imperial' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Imperial (ft)</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(shapeType === 'circle' || shapeType === 'sphere' || shapeType === 'cylinder') && (
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">Radius</label>
                  <input type="number" value={values.r} onChange={(e) => handleInputChange('r', Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-amber-500 outline-none transition-all font-medium text-lg" />
                </div>
              )}
              {shapeType === 'cylinder' && (
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">Height</label>
                  <input type="number" value={values.h} onChange={(e) => handleInputChange('h', Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-amber-500 outline-none transition-all font-medium text-lg" />
                </div>
              )}
              {(shapeType === 'rectangle' || shapeType === 'triangle' || shapeType === 'cube') && (
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">{shapeType === 'cube' ? 'Side Length' : 'Side A (Length)'}</label>
                  <input type="number" value={values.a} onChange={(e) => handleInputChange('a', Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-amber-500 outline-none transition-all font-medium text-lg" />
                </div>
              )}
              {(shapeType === 'rectangle' || shapeType === 'triangle') && (
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">{shapeType === 'rectangle' ? 'Side B (Width)' : 'Side B'}</label>
                  <input type="number" value={values.b} onChange={(e) => handleInputChange('b', Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-amber-500 outline-none transition-all font-medium text-lg" />
                </div>
              )}
              {shapeType === 'triangle' && (
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">Side C</label>
                  <input type="number" value={values.c} onChange={(e) => handleInputChange('c', Number(e.target.value))} className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-amber-500 outline-none transition-all font-medium text-lg" />
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row gap-8 items-center justify-around relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Maximize size={150} />
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1 italic font-mono">// surface_area //</p>
              <div className="text-4xl font-black">{displayArea !== null ? `${format(displayArea)} ${areaUnitLabel}` : '-'}</div>
            </div>
              {displayVolume !== null && (
              <div className="text-center md:text-left">
                <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1 italic font-mono">// volume //</p>
                  <div className="text-4xl font-black text-white">{displayVolume !== null ? `${format(displayVolume)} ${volumeUnitLabel}` : '-'}</div>
              </div>
            )}
              {displayPerimeter !== null && (
              <div className="text-center md:text-left">
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1 italic font-mono">// perimeter //</p>
                  <div className="text-4xl font-black text-white">{displayPerimeter !== null ? `${format(displayPerimeter)} ${lengthUnitLabel}` : '-'}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* EDUCATIONAL CONTENT: AdSense Booster */}
      <section className="prose prose-slate max-w-none space-y-12 border-t pt-16 border-slate-100">
        <div className="grid md:grid-cols-2 gap-12 text-slate-600 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <BookOpen className="text-amber-600" size={24} /> Understanding Spatial Math
            </h2>
            <p className="text-sm">
              In engineering and <strong>technical drafting</strong>, calculating <strong>volume and area</strong> 
              is fundamental. Whether you are determining the amount of concrete needed for a <strong>cylindrical column</strong> 
              or calculating the surface tension on a <strong>sphere</strong>, these mathematical models 
              provide the baseline for resource estimation and structural integrity.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Box className="text-amber-600" size={24} /> 2D vs. 3D Geometry
            </h2>
            <p className="text-sm">
              While 2D shapes like <strong>rectangles and circles</strong> focus on area (the space inside a boundary), 
              3D shapes like <strong>cubes and cylinders</strong> add a third dimension: <strong>Volume</strong>. 
              Our calculator also provides <strong>Surface Area</strong> for 3D objects, which is critical for 
              estimating materials like paint, thermal coatings, or electrical shielding.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
          <h3 className="text-slate-900 font-bold mb-4 uppercase tracking-widest text-xs flex items-center gap-2">
            <Info size={18} className="text-amber-600" /> Technical Formulas
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 text-[10px] font-mono tracking-tight text-slate-500 uppercase font-bold">
            <li className="bg-white p-4 rounded-xl border border-slate-200">Circle Area: π × r²</li>
            <li className="bg-white p-4 rounded-xl border border-slate-200">Sphere Volume: 4/3 × π × r³</li>
            <li className="bg-white p-4 rounded-xl border border-slate-200">Cylinder Volume: π × r² × h</li>
            <li className="bg-white p-4 rounded-xl border border-slate-200">Triangle: Heron's Formula</li>
            <li className="bg-white p-4 rounded-xl border border-slate-200">Cube Area: 6 × side²</li>
            <li className="bg-white p-4 rounded-xl border border-slate-200">Rectangle: l × w</li>
          </ul>
        </div>
      </section>

      {/* Mandatory Disclaimer */}
      <footer className="mt-16 bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl">
        <div className="flex gap-4">
          <ShieldCheck className="text-amber-600 shrink-0" size={24} />
          <p className="text-xs text-amber-800 leading-relaxed font-medium italic">
            <strong>Technical Note:</strong> Geometric calculations provided by SyntixGear use <strong>Pi (π)</strong> rounded to 15 decimal places. 
            While we provide industrial-grade accuracy, results should always be verified by a <strong>licensed engineer</strong> 
            before committing to high-stakes architectural or manufacturing specifications.
          </p>
        </div>
      </footer>
    </div>
  );
}
