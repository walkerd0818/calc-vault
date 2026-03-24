'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

type ShapeType = 'circle' | 'rectangle' | 'triangle' | 'sphere' | 'cube' | 'cylinder';

export default function GeometryCalculator() {
  const [shapeType, setShapeType] = useState<ShapeType>('circle');
  const [values, setValues] = useState({ a: 0, b: 0, c: 0, r: 0, h: 0 });

  const results = useMemo(() => {
    const { a, b, c, r, h } = values;
    
    switch (shapeType) {
      case 'circle':
        return {
          area: Math.PI * r * r,
          perimeter: 2 * Math.PI * r,
          label: 'Radius'
        };
      case 'rectangle':
        return {
          area: a * b,
          perimeter: 2 * (a + b),
          label: 'Length × Width'
        };
      case 'triangle':
        const s = (a + b + c) / 2;
        return {
          area: Math.sqrt(s * (s - a) * (s - b) * (s - c)),
          perimeter: a + b + c,
          label: 'Sides (a, b, c)'
        };
      case 'sphere':
        return {
          area: 4 * Math.PI * r * r,
          volume: (4 / 3) * Math.PI * r * r * r,
          label: 'Radius'
        };
      case 'cube':
        return {
          area: 6 * a * a,
          volume: a * a * a,
          label: 'Side Length'
        };
      case 'cylinder':
        return {
          area: 2 * Math.PI * r * (r + h),
          volume: Math.PI * r * r * h,
          label: 'Radius & Height'
        };
    }
  }, [shapeType, values]);

  const handleInputChange = (key: string, value: number) => {
    setValues(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Navigation */}
      <div className="mb-6 flex gap-4">
        <Link 
          href="/engineering" 
          className="inline-block px-4 py-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors font-medium"
        >
          ← Back to Engineering
        </Link>
      </div>

      <section className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Area & Volume Calculator</h1>
        <p className="text-slate-600">Calculate areas and volumes of common 2D and 3D shapes.</p>
      </section>

      {/* Ad Slot */}
      <div className="w-full h-24 bg-slate-100 mb-8 flex items-center justify-center border-dashed border-2 border-slate-300">
        <span className="text-slate-400 text-xs">Advertisement</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Shape Selection */}
        <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="font-semibold mb-4 text-slate-900">Select Shape</h2>
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
                className={`w-full p-3 rounded-lg text-left font-medium transition-all border ${
                  shapeType === shape.value
                    ? 'bg-amber-100 border-amber-400 text-amber-900'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {shape.label} <span className="text-xs opacity-60">({shape.type})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Inputs and Results */}
        <div className="md:col-span-2">
          {/* Inputs */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
            <h2 className="font-semibold mb-4 text-slate-900">Dimensions</h2>
            <div className="space-y-3">
              {shapeType === 'circle' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Radius</label>
                  <input 
                    type="number"
                    value={values.r}
                    onChange={(e) => handleInputChange('r', Number(e.target.value))}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
              )}
              {shapeType === 'rectangle' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Length</label>
                    <input 
                      type="number"
                      value={values.a}
                      onChange={(e) => handleInputChange('a', Number(e.target.value))}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Width</label>
                    <input 
                      type="number"
                      value={values.b}
                      onChange={(e) => handleInputChange('b', Number(e.target.value))}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </>
              )}
              {shapeType === 'triangle' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Side A</label>
                    <input 
                      type="number"
                      value={values.a}
                      onChange={(e) => handleInputChange('a', Number(e.target.value))}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Side B</label>
                    <input 
                      type="number"
                      value={values.b}
                      onChange={(e) => handleInputChange('b', Number(e.target.value))}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Side C</label>
                    <input 
                      type="number"
                      value={values.c}
                      onChange={(e) => handleInputChange('c', Number(e.target.value))}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </>
              )}
              {shapeType === 'sphere' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Radius</label>
                  <input 
                    type="number"
                    value={values.r}
                    onChange={(e) => handleInputChange('r', Number(e.target.value))}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
              )}
              {shapeType === 'cube' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Side Length</label>
                  <input 
                    type="number"
                    value={values.a}
                    onChange={(e) => handleInputChange('a', Number(e.target.value))}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
              )}
              {shapeType === 'cylinder' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Radius</label>
                    <input 
                      type="number"
                      value={values.r}
                      onChange={(e) => handleInputChange('r', Number(e.target.value))}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Height</label>
                    <input 
                      type="number"
                      value={values.h}
                      onChange={(e) => handleInputChange('h', Number(e.target.value))}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl border border-amber-200">
            <h2 className="font-semibold mb-4 text-slate-900">Results</h2>
            <div className="space-y-3">
              {'area' in results && (
                <div className="flex justify-between">
                  <span className="text-slate-700">Area:</span>
                  <span className="font-semibold text-slate-900">{Number(results.area).toLocaleString(undefined, { maximumFractionDigits: 2 })} units²</span>
                </div>
              )}
              {'perimeter' in results && (
                <div className="flex justify-between">
                  <span className="text-slate-700">Perimeter:</span>
                  <span className="font-semibold text-slate-900">{Number(results.perimeter).toLocaleString(undefined, { maximumFractionDigits: 2 })} units</span>
                </div>
              )}
              {'volume' in results && (
                <div className="flex justify-between">
                  <span className="text-slate-700">Volume:</span>
                  <span className="font-semibold text-slate-900">{Number(results.volume).toLocaleString(undefined, { maximumFractionDigits: 2 })} units³</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
