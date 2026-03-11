'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Calculator, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { AllCalculators, CalculatorMetadata } from '@/lib/registry';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CalculatorMetadata[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter logic
  useEffect(() => {
    if (query.length > 1) {
      const filtered = AllCalculators.filter(calc =>
        calc.name.toLowerCase().includes(query.toLowerCase()) ||
        calc.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 6); // Limit to top 6 results for UI cleanliness
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  return (
    <div className="relative w-full max-w-xl mx-auto" ref={searchRef}>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search 100+ calculators (e.g., 'mortgage' or 'miles')..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && setIsOpen(true)}
          className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-700"
        />
      </div>

      {/* Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2 border-b border-slate-50 bg-slate-50">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">
              Calculators Found
            </span>
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            {results.map((calc) => (
              <Link
                key={calc.id}
                href={calc.href}
                onClick={() => {setIsOpen(false); setQuery('');}}
                className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Calculator size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-700">{calc.name}</div>
                    <div className="text-xs text-slate-400">{calc.category}</div>
                  </div>
                </div>
                <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {isOpen && query.length > 1 && results.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl p-8 text-center">
          <p className="text-slate-500">No calculator found for "{query}"</p>
          <p className="text-xs text-slate-400 mt-1">Try searching for 'finance' or 'units'</p>
        </div>
      )}
    </div>
  );
}