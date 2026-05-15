'use client';

import Link from 'next/link';
import UnitConverter from '@components/UnitConverter';
import { BookOpen, Info, Coffee } from 'lucide-react';

export default function CookingClient() {
  return (
    <div className="max-w-4xl mx-auto px-4 pb-20">
      <nav className="mb-8 flex flex-wrap gap-3 pt-6">
        <Link 
          href="/units" 
          className="inline-block px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors font-medium"
        >
          ← Units Hub
        </Link>
        <Link 
          href="/units/length" 
          className="inline-block px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors font-medium"
        >
          Length Converter
        </Link>
        <Link 
          href="/units/weight" 
          className="inline-block px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors font-medium"
        >
          Weight Converter
        </Link>
        <Link 
          href="/units/data" 
          className="inline-block px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors font-medium"
        >
          Digital Storage
        </Link>
      </nav>

      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight flex items-center gap-3">
          <Coffee className="text-amber-600" size={36} />
          Cooking Unit Converter
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          Convert between common cooking measurements: teaspoons, tablespoons, cups, pints, quarts, gallons, milliliters and liters.
        </p>
      </header>

      <div className="mb-16">
        <UnitConverter 
          category="cooking" 
          title="Cooking Volume Units" 
          description="US customary cooking volumes mapped to milliliters for easy metric conversions." 
        />
      </div>

      <section className="prose prose-slate max-w-none mb-16 space-y-12 border-t pt-12 border-slate-100">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <BookOpen className="text-amber-600" size={24} /> Common Equivalencies
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Quick reference: 1 tbsp = 3 tsp; 1 fl oz = 2 tbsp; 1 cup = 8 fl oz; 1 pint = 2 cups; 1 quart = 2 pints; 1 gallon = 4 quarts.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Info className="text-amber-600" size={24} /> Metric Conversions
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              The converter uses US customary measures where 1 teaspoon ≈ 4.92892 mL. Use the tool to convert to metric liters and milliliters for precise recipes.
            </p>
          </div>
        </div>
      </section>

      <section className="prose prose-slate max-w-none mb-16 space-y-12 border-t pt-12 border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900">Quick Examples & FAQ</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold">Common Equivalencies</h3>
            <ul className="list-disc ml-5 text-sm text-slate-600 mt-2">
              <li>1 tablespoon = 3 teaspoons</li>
              <li>1 fluid ounce = 2 tablespoons</li>
              <li>1 cup = 8 fluid ounces</li>
              <li>1 pint = 2 cups</li>
              <li>1 quart = 2 pints</li>
              <li>1 gallon = 4 quarts = 3,785.41 mL</li>
            </ul>
            <p className="text-xs text-slate-400 mt-3">Note: this converter uses US customary cooking measures (mL base). For precise baking, weigh ingredients when possible — volume can vary by packing and ingredient.</p>
          </div>

          <div>
            <h3 className="font-bold">FAQ</h3>
            <div className="space-y-2 text-sm text-slate-600 mt-2">
              <div>
                <strong>Q:</strong> Are these measurements US or metric?
                <div><strong>A:</strong> The cooking converter maps US customary measures to metric (milliliters/liters) for accurate conversions.</div>
              </div>
              <div>
                <strong>Q:</strong> Can I convert ingredient weights (grams, ounces)?
                <div><strong>A:</strong> This tool focuses on volume units used in recipes. For ingredient-specific weight conversions (e.g., flour to grams), use the `Weight Converter` or consult ingredient density tables.</div>
              </div>
              <div>
                <strong>Q:</strong> What about tablespoons with different regional meanings?
                <div><strong>A:</strong> Tableware sizes can vary internationally; this converter uses the common US tablespoon (~14.79 mL).</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="pt-8 border-t border-slate-100">
        <Link 
          href="/units" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full hover:bg-amber-600 transition-all font-bold shadow-lg"
        >
          ← Units Hub
        </Link>
      </footer>
    </div>
  );
}
