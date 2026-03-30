'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Delete, Calculator, BookOpen, Info, ShieldCheck } from 'lucide-react';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display);
    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }
    setOperation(op);
    setWaitingForNewValue(true);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+': return prev + current;
      case '-': return prev - current;
      case '*': return prev * current;
      case '/': return prev / current;
      case '^': return Math.pow(prev, current);
      default: return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const currentValue = parseFloat(display);
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handleScientific = (func: string) => {
    const current = parseFloat(display);
    let result: number;
    switch (func) {
      case 'sqrt': result = Math.sqrt(current); break;
      case 'square': result = current * current; break;
      case 'sin': result = Math.sin((current * Math.PI) / 180); break;
      case 'cos': result = Math.cos((current * Math.PI) / 180); break;
      case 'tan': result = Math.tan((current * Math.PI) / 180); break;
      case 'log': result = Math.log10(current); break;
      case 'ln': result = Math.log(current); break;
      case 'abs': result = Math.abs(current); break;
      default: result = current;
    }
    setDisplay(String(result));
    setWaitingForNewValue(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const button = 'px-4 py-3 rounded-lg font-medium transition-all border';
  const numberBtn = button + ' bg-white border-slate-300 hover:bg-slate-50 text-slate-900 shadow-sm';
  const operationBtn = button + ' bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700 font-semibold';
  const scientificBtn = button + ' bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-700 font-semibold';
  const equalsBtn = button + ' bg-emerald-600 border-emerald-600 hover:bg-emerald-700 text-white font-semibold';

  return (
    <div className="max-w-4xl mx-auto px-4 pb-20">
      {/* Navigation */}
      <nav className="mb-8 flex flex-wrap gap-3 pt-6">
        <Link 
          href="/engineering" 
          className="inline-block px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors font-medium"
        >
          ← Engineering Hub
        </Link>
        <Link 
          href="/engineering/percentage" 
          className="inline-block px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors font-medium"
        >
          Percentage Calculator
        </Link>
        <Link 
          href="/engineering/geometry" 
          className="inline-block px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors font-medium"
        >
          Geometry Calculator
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight flex items-center gap-3">
          <Calculator className="text-amber-600" size={36} />
          Scientific Calculator
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          High-precision <strong>online scientific calculator</strong> designed for engineering students and technical professionals. Solve complex <strong>trigonometric</strong>, <strong>logarithmic</strong>, and <strong>algebraic</strong> equations with zero latency.
        </p>
      </header>

      {/* Ad Slot - Top */}
      <div className="w-full h-24 bg-slate-50 mb-10 flex flex-col items-center justify-center border border-slate-100 rounded-xl">
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Sponsored Advertisement</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Calculator Widget */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900 p-6 rounded-2xl shadow-2xl border-4 border-slate-800">
            <div className="bg-slate-800 text-emerald-400 p-6 rounded-xl mb-6 text-right shadow-inner border border-slate-700">
              <div className="text-4xl font-mono break-words">{display}</div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <button onClick={handleClear} className="col-span-4 bg-red-600 border-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-700 mb-2 flex items-center justify-center gap-2 transition-all shadow-sm">
                <Delete size={18} /> CLEAR TERMINAL
              </button>

              <button onClick={() => handleScientific('sqrt')} className={scientificBtn}>√</button>
              <button onClick={() => handleScientific('square')} className={scientificBtn}>x²</button>
              <button onClick={() => handleScientific('sin')} className={scientificBtn}>sin</button>
              <button onClick={() => handleScientific('cos')} className={scientificBtn}>cos</button>
              <button onClick={() => handleScientific('tan')} className={scientificBtn}>tan</button>
              <button onClick={() => handleScientific('log')} className={scientificBtn}>log</button>
              <button onClick={() => handleScientific('ln')} className={scientificBtn}>ln</button>
              <button onClick={() => handleScientific('abs')} className={scientificBtn}>|x|</button>

              <button onClick={() => handleNumber('7')} className={numberBtn}>7</button>
              <button onClick={() => handleNumber('8')} className={numberBtn}>8</button>
              <button onClick={() => handleNumber('9')} className={numberBtn}>9</button>
              <button onClick={() => handleOperation('/')} className={operationBtn}>÷</button>

              <button onClick={() => handleNumber('4')} className={numberBtn}>4</button>
              <button onClick={() => handleNumber('5')} className={numberBtn}>5</button>
              <button onClick={() => handleNumber('6')} className={numberBtn}>6</button>
              <button onClick={() => handleOperation('*')} className={operationBtn}>×</button>

              <button onClick={() => handleNumber('1')} className={numberBtn}>1</button>
              <button onClick={() => handleNumber('2')} className={numberBtn}>2</button>
              <button onClick={() => handleNumber('3')} className={numberBtn}>3</button>
              <button onClick={() => handleOperation('-')} className={operationBtn}>−</button>

              <button onClick={() => handleNumber('0')} className={numberBtn + ' col-span-2'}>0</button>
              <button onClick={handleDecimal} className={numberBtn}>.</button>
              <button onClick={() => handleOperation('+')} className={operationBtn}>+</button>

              <button onClick={() => handleOperation('^')} className={operationBtn + ' col-span-2'}>x^y</button>
              <button onClick={handleEquals} className={equalsBtn + ' col-span-2'}>=</button>
            </div>
          </div>
        </div>

        {/* EDUCATIONAL CONTENT */}
        <aside className="lg:col-span-5 space-y-8">
          <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <BookOpen className="text-amber-600" size={20} /> Advanced Functions
            </h2>
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p><strong>Trigonometry:</strong> Solve for Sine, Cosine, and Tangent. This tool operates in <strong>Degrees</strong> by default.</p>
              <p><strong>Logarithms:</strong> Includes common logs (base-10) and natural logs (base-<em>e</em>) for advanced calculus and physics.</p>
              <p><strong>Exponents:</strong> Calculate square roots, squares, and custom power functions using the <em>x^y</em> operator.</p>
            </div>
          </section>

          <section className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Info className="text-amber-600" size={20} /> User Guide
            </h2>
            <ul className="text-sm text-slate-700 space-y-3 list-disc ml-4 font-medium">
              <li>Calculations are performed <strong>locally</strong> in your browser for maximum privacy.</li>
              <li>Enter the numerical value first before selecting a scientific function (e.g., √ or sin).</li>
              <li>Use the Clear button to reset the terminal for a new session.</li>
            </ul>
          </section>
        </aside>
      </div>

      {/* SEO BREAKDOWN */}
      <section className="mt-16 prose prose-slate max-w-none border-t pt-12 border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900">Why Use a Scientific Calculator?</h2>
        <p className="text-slate-600 leading-relaxed">
          While basic calculators handle simple arithmetic, a <strong>scientific calculator</strong> is essential for tasks requiring <strong>trigonometry</strong>, <strong>logarithms</strong>, and <strong>scientific notation</strong>. These tools are critical in fields like civil engineering, mechanical design, and academic research. SyntixGear provides a distraction-free, terminal-style interface to ensure your <strong>technical calculations</strong> are accurate and fast.
        </p>
      </section>

      {/* Mandatory Disclaimer */}
      <footer className="mt-12 bg-slate-100 p-6 rounded-xl flex gap-4">
        <ShieldCheck className="text-slate-400 shrink-0" size={24} />
        <p className="text-xs text-slate-500 leading-relaxed italic font-medium">
          <strong>Accuracy Disclaimer:</strong> While we strive for absolute precision, SyntixGear is not responsible for errors resulting from mathematical rounding or user input. For life-critical engineering or medical calculations, results should always be verified across multiple platforms.
        </p>
      </footer>
    </div>
  );
}
