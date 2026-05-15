'use client';

import Link from 'next/link';
import UnitConverter from '@components/UnitConverter';
import { Zap, Info, BookOpen } from 'lucide-react';

export default function DataClient() {
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
          href="/units/cooking" 
          className="inline-block px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors font-medium"
        >
          Cooking Converter
        </Link>
      </nav>

      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight flex items-center gap-3">
          <Zap className="text-emerald-600" size={36} />
          Digital Storage Converter
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          Convert between bits, bytes, decimal (KB/MB/GB) and binary (KiB/MiB/GiB) storage units. Useful for engineering, storage planning, and network calculations.
        </p>
      </header>

      <div className="mb-16">
        <UnitConverter 
          category="data" 
          title="Computer Storage Units" 
          description="Supports both decimal (KB = 1000 bytes) and binary (KiB = 1024 bytes) scales."
        />
      </div>

      <section className="prose prose-slate max-w-none mb-16 space-y-12 border-t pt-12 border-slate-100">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <BookOpen className="text-emerald-600" size={24} /> Decimal vs Binary
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Storage sizes are expressed in both decimal (powers of 10) and binary (powers of 2) units. This converter makes it easy to move between these conventions and avoid common sizing mistakes.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Info className="text-emerald-600" size={24} /> Practical Use
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Use decimal units for marketing/storage-provider labels (e.g., 1 TB = 1,000,000,000,000 bytes) and binary units when dealing with OS-level reporting (e.g., 1 TiB = 1,099,511,627,776 bytes).
            </p>
          </div>
        </div>
      </section>

      <footer className="pt-8 border-t border-slate-100">
        <Link 
          href="/units" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full hover:bg-emerald-600 transition-all font-bold shadow-lg"
        >
          ← Units Hub
        </Link>
      </footer>
    </div>
  );
}
