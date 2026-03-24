'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Delete } from 'lucide-react';

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
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '*':
        return prev * current;
      case '/':
        return prev / current;
      case '^':
        return Math.pow(prev, current);
      default:
        return current;
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
      case 'sqrt':
        result = Math.sqrt(current);
        break;
      case 'square':
        result = current * current;
        break;
      case 'sin':
        result = Math.sin((current * Math.PI) / 180);
        break;
      case 'cos':
        result = Math.cos((current * Math.PI) / 180);
        break;
      case 'tan':
        result = Math.tan((current * Math.PI) / 180);
        break;
      case 'log':
        result = Math.log10(current);
        break;
      case 'ln':
        result = Math.log(current);
        break;
      case 'abs':
        result = Math.abs(current);
        break;
      default:
        result = current;
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
  const numberBtn = button + ' bg-white border-slate-300 hover:bg-slate-50 text-slate-900';
  const operationBtn = button + ' bg-blue-50 border-blue-300 hover:bg-blue-100 text-blue-700 font-semibold';
  const scientificBtn = button + ' bg-amber-50 border-amber-300 hover:bg-amber-100 text-amber-700 font-semibold';
  const equalsBtn = button + ' bg-emerald-600 border-emerald-600 hover:bg-emerald-700 text-white font-semibold col-span-2';

  return (
    <div className="max-w-3xl mx-auto">
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
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Scientific Calculator</h1>
        <p className="text-slate-600">Advanced calculations with trigonometric functions, logarithms, and more.</p>
      </section>

      {/* Ad Slot */}
      <div className="w-full h-24 bg-slate-100 mb-8 flex items-center justify-center border-dashed border-2 border-slate-300">
        <span className="text-slate-400 text-xs">Advertisement</span>
      </div>

      {/* Calculator */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        {/* Display */}
        <div className="bg-slate-900 text-white p-4 rounded-lg mb-6 text-right">
          <div className="text-4xl font-bold break-words">{display}</div>
        </div>

        {/* Clear Button */}
        <div className="mb-4">
          <button
            onClick={handleClear}
            className={equalsBtn + ' bg-red-600 border-red-600 hover:bg-red-700'}
          >
            <Delete className="inline mr-2" size={18} /> Clear
          </button>
        </div>

        {/* Scientific Functions */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <button onClick={() => handleScientific('sqrt')} className={scientificBtn}>√</button>
          <button onClick={() => handleScientific('square')} className={scientificBtn}>x²</button>
          <button onClick={() => handleScientific('sin')} className={scientificBtn}>sin</button>
          <button onClick={() => handleScientific('cos')} className={scientificBtn}>cos</button>
          <button onClick={() => handleScientific('tan')} className={scientificBtn}>tan</button>
          <button onClick={() => handleScientific('log')} className={scientificBtn}>log</button>
          <button onClick={() => handleScientific('ln')} className={scientificBtn}>ln</button>
          <button onClick={() => handleScientific('abs')} className={scientificBtn}>|x|</button>
        </div>

        {/* Main Calculator Grid */}
        <div className="grid grid-cols-4 gap-2">
          {/* Row 1 */}
          <button onClick={() => handleNumber('7')} className={numberBtn}>7</button>
          <button onClick={() => handleNumber('8')} className={numberBtn}>8</button>
          <button onClick={() => handleNumber('9')} className={numberBtn}>9</button>
          <button onClick={() => handleOperation('/')} className={operationBtn}>÷</button>

          {/* Row 2 */}
          <button onClick={() => handleNumber('4')} className={numberBtn}>4</button>
          <button onClick={() => handleNumber('5')} className={numberBtn}>5</button>
          <button onClick={() => handleNumber('6')} className={numberBtn}>6</button>
          <button onClick={() => handleOperation('*')} className={operationBtn}>×</button>

          {/* Row 3 */}
          <button onClick={() => handleNumber('1')} className={numberBtn}>1</button>
          <button onClick={() => handleNumber('2')} className={numberBtn}>2</button>
          <button onClick={() => handleNumber('3')} className={numberBtn}>3</button>
          <button onClick={() => handleOperation('-')} className={operationBtn}>−</button>

          {/* Row 4 */}
          <button onClick={() => handleNumber('0')} className={numberBtn + ' col-span-2'}>0</button>
          <button onClick={handleDecimal} className={numberBtn}>.</button>
          <button onClick={() => handleOperation('+')} className={operationBtn}>+</button>

          {/* Row 5 */}
          <button onClick={() => handleOperation('^')} className={operationBtn + ' col-span-2'}>x^y</button>
          <button onClick={handleEquals} className={equalsBtn}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}
