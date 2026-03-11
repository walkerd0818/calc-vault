'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export default function DateCalculator() {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

  const dateInfo = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start > end) {
      return {
        days: 0,
        weeks: 0,
        months: 0,
        years: 0,
        isPast: false,
        error: true,
      };
    }

    const diffTime = end.getTime() - start.getTime();
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;
    
    // Calculate months and years
    let years = 0;
    let months = 0;
    let day = start.getDate();
    let month = start.getMonth();
    let year = start.getFullYear();

    while (new Date(year, month, day) < end) {
      if (month === 11) {
        year++;
        month = 0;
      } else {
        month++;
      }
      months++;
    }

    years = Math.floor(months / 12);
    months = months % 12;

    const isPast = start <= end;
    const isToday = days === 0;
    const isTomorrow = days === 1;

    return {
      days,
      weeks,
      remainingDays,
      months,
      years,
      isPast,
      isToday,
      isTomorrow,
      error: false,
    };
  }, [startDate, endDate]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Navigation */}
      <div className="mb-6 flex gap-4">
        <Link 
          href="/" 
          className="inline-block px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
        >
          ← Back to Home
        </Link>
      </div>

      <section className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Date to Date Calculator</h1>
        <p className="text-slate-600">Calculate the number of days, weeks, months, and years between two dates.</p>
      </section>

      {/* Ad Slot */}
      <div className="w-full h-24 bg-slate-100 mb-8 flex items-center justify-center border-dashed border-2 border-slate-300">
        <span className="text-slate-400 text-xs">Advertisement</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="font-semibold mb-4 text-slate-900">Select Dates</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input 
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-slate-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input 
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-slate-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border-2 border-slate-200">
          <h2 className="font-semibold mb-4 text-slate-900">Time Difference</h2>
          
          {dateInfo.error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
              Start date must be before end date
            </div>
          ) : (
            <div className="space-y-4">
              {dateInfo.isToday && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-700 text-sm font-medium">
                  The dates are the same
                </div>
              )}

              {dateInfo.isTomorrow && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-700 text-sm font-medium">
                  Exactly 1 day apart
                </div>
              )}

              <div className="bg-white rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-700">Total Days:</span>
                  <span className="text-2xl font-bold text-slate-900">{dateInfo.days}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Total Weeks:</span>
                  <span className="text-lg font-semibold text-slate-900">{dateInfo.weeks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Remaining Days:</span>
                  <span className="font-semibold text-slate-900">{dateInfo.remainingDays}</span>
                </div>
              </div>

              {(dateInfo.years > 0 || dateInfo.months > 0) && (
                <div className="bg-white rounded-lg p-4 space-y-3 border-t border-slate-200">
                  {dateInfo.years > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-700">Years:</span>
                      <span className="font-semibold text-slate-900">{dateInfo.years}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-700">Months:</span>
                    <span className="font-semibold text-slate-900">{dateInfo.months}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-2">
                    Total: {dateInfo.years} {dateInfo.years === 1 ? 'year' : 'years'} and {dateInfo.months} {dateInfo.months === 1 ? 'month' : 'months'}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Common Use Cases */}
      <section className="mt-8 bg-slate-50 p-8 rounded-xl border border-slate-200">
        <h2 className="text-lg font-semibold mb-4 text-slate-900">Common Uses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-700">
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Project Planning</h3>
            <p>Calculate the duration of projects from start to completion date.</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Event Countdown</h3>
            <p>Determine how many days until an upcoming event or important date.</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Age Calculation</h3>
            <p>Calculate your exact age in years, months, and days.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
