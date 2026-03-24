'use client';

import React from 'react';
import { ShieldCheck, Zap, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-black text-slate-900 mb-6">About CalcVault</h1>
      
      <div className="prose prose-slate lg:prose-lg">
        <p className="text-xl text-slate-600 leading-relaxed mb-8">
          CalcVault was founded with a single mission: to provide the world’s most accurate, 
          accessible, and professional-grade calculation tools for everyone, everywhere.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
          <div className="text-center p-6 bg-blue-50 rounded-2xl">
            <ShieldCheck className="mx-auto text-blue-600 mb-4" size={32} />
            <h3 className="font-bold mb-2">Precision</h3>
            <p className="text-sm text-slate-600">Every formula is verified against industry standards.</p>
          </div>
          <div className="text-center p-6 bg-emerald-50 rounded-2xl">
            <Zap className="mx-auto text-emerald-600 mb-4" size={32} />
            <h3 className="font-bold mb-2">Speed</h3>
            <p className="text-sm text-slate-600">Instant results with zero server-side lag.</p>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-2xl">
            <Globe className="mx-auto text-purple-600 mb-4" size={32} />
            <h3 className="font-bold mb-2">Free</h3>
            <p className="text-sm text-slate-600">100% free tools supported by non-intrusive ads.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-4">Our Technology</h2>
        <p>
          CalcVault is built on a modern high-performance stack using Next.js and Tailwind CSS. 
          Unlike older calculator sites, we process all calculations on your device (client-side), 
          ensuring your financial data never leaves your computer.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">Contact Us</h2>
        <p>
          Have a suggestion for a new calculator? We’d love to hear from you. 
          Reach out to our engineering team at <span className="font-bold text-blue-600">support@calcvault.com</span>.
        </p>
      </div>
    </div>
  );
}