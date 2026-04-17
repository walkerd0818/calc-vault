'use client';

import React, { useState, useEffect } from 'react';
import { UnitRegistry, convertUnits, UnitCategory } from '@/lib/unit-logic';
import { ArrowRightLeft } from 'lucide-react';
import { useUnitPreference } from '@/lib/unit-context';

interface Props {
  category: UnitCategory;
  title: string;
  description: string;
}

export default function UnitConverter({ category, title, description }: Props) {
  const { unit, setUnit } = useUnitPreference();

  const [val, setVal] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState(UnitRegistry[category].units[0].value);
  const [toUnit, setToUnit] = useState(UnitRegistry[category].units[1].value);
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    setResult(convertUnits(val, fromUnit, toUnit, category));
  }, [val, fromUnit, toUnit, category]);

  // sensible defaults when global unit preference changes
  useEffect(() => {
    const defaults: Record<UnitCategory, { metric: string; imperial: string }> = {
      length: { metric: 'meter', imperial: 'ft' },
      weight: { metric: 'kg', imperial: 'lb' },
      temperature: { metric: 'celsius', imperial: 'fahrenheit' },
      area: { metric: 'square_meter', imperial: 'square_ft' },
    };

    const def = defaults[category] || { metric: UnitRegistry[category].units[0].value, imperial: UnitRegistry[category].units[0].value };
    const newFrom = unit === 'metric' ? def.metric : def.imperial;
    setFromUnit(newFrom);
    const alt = UnitRegistry[category].units.find(u => u.value !== newFrom);
    if (alt) setToUnit(alt.value);
  }, [unit, category]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
      <div className="mb-4 flex gap-2">
        <button onClick={() => setUnit('metric')} className={`px-3 py-2 rounded-lg font-bold ${unit === 'metric' ? 'bg-white text-slate-900 shadow-sm' : 'bg-slate-100 text-slate-600'}`}>Metric</button>
        <button onClick={() => setUnit('imperial')} className={`px-3 py-2 rounded-lg font-bold ${unit === 'imperial' ? 'bg-white text-slate-900 shadow-sm' : 'bg-slate-100 text-slate-600'}`}>Imperial</button>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="text-slate-500 text-sm mt-1">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">From</label>
          <input 
            type="number" 
            value={val} 
            onChange={(e) => setVal(Number(e.target.value))}
            className="w-full p-3 bg-slate-50 border rounded-lg mb-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <select 
            value={fromUnit} 
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full p-2 border rounded-lg text-sm bg-white"
          >
            {UnitRegistry[category].units.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
          </select>
        </div>

        <button onClick={swapUnits} className="p-3 mb-2 rounded-full bg-slate-100 hover:bg-blue-100 text-blue-600 transition">
          <ArrowRightLeft size={20} />
        </button>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Result</label>
          <div className="w-full p-3 bg-blue-50 border border-blue-100 rounded-lg mb-2 font-bold text-blue-700">
            {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
          </div>
          <select 
            value={toUnit} 
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full p-2 border rounded-lg text-sm bg-white"
          >
            {UnitRegistry[category].units.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
          </select>
        </div>
      </div>

      {/* Static Ad Slot for Unit Pages */}
      <div className="mt-10 pt-6 border-t border-slate-100 text-center">
        <div className="inline-block w-full h-[90px] bg-slate-50 border-dashed border-2 border-slate-200 leading-[90px] text-slate-400 text-xs">
          ADVERTISEMENT
        </div>
      </div>
    </div>
  );
}