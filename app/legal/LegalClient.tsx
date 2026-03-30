'use client';

import React from 'react';
import Link from 'next/link';
import { Scale, ChevronRight, Gavel, ShieldAlert, Info, Briefcase, FileText, UserX } from 'lucide-react';

const legalCalculators = [
  { 
    name: 'Personal Injury Settlement', 
    href: '/legal/settlement', 
    icon: <Gavel size={20} />,
    description: 'Estimate potential recovery values for car accidents, slips, and falls using the multiplier method.' 
  },
  { 
    name: 'Workers\' Comp & Disability', 
    href: '/legal/workers-comp', 
    icon: <Briefcase size={20} />,
    description: 'Calculate projected weekly benefits and permanent disability ratings based on state formulas.' 
  },
  { 
    name: 'Wrongful Termination', 
    href: '/legal/wrongful-termination', 
    icon: <UserX size={20} />,
    description: 'Estimate damages for lost back-pay, front-pay, and emotional distress following illegal discharge.' 
  },
];

export default function LegalPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 pb-20">
      {/* Header */}
      <section className="mb-12 pt-6">
        <div className="flex items-center gap-3 mb-4">
          <Scale className="text-purple-600" size={32} />
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Legal Claims Hub</h1>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
          Data-driven utilities for estimating <strong>damages, settlements, and statutory benefits</strong>. 
          Our tools provide a structured framework to help individuals and professionals visualize the 
          potential financial components of a legal claim.
        </p>
      </section>

      {/* Ad Slot */}
      <div className="w-full h-24 bg-slate-50 mb-12 flex flex-col items-center justify-center border border-slate-100 rounded-xl">
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Sponsored Advertisement</span>
        <div className="text-slate-200 italic text-[10px] select-none">SyntixGear_Legal_Ad_Placement</div>
      </div>

      {/* Calculators Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {legalCalculators.map((calc, idx) => (
          <Link
            key={idx}
            href={calc.href}
            className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-all">
                {calc.icon}
              </div>
              <ChevronRight size={20} className="text-slate-300 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
              {calc.name}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">{calc.description}</p>
          </Link>
        ))}
      </section>

      {/* NEW CONTENT: Educational & SEO Context Section */}
      <section className="prose prose-slate max-w-none mb-16 space-y-12 border-t pt-12 border-slate-100">
        <div className="grid md:grid-cols-2 gap-12 text-slate-600 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4 text-purple-700">
              <Info size={24} />
              Understanding Damages
            </h2>
            <p className="text-sm">
              Legal settlements are typically divided into <strong>economic</strong> and <strong>non-economic 
              damages</strong>. Economic damages include quantifiable losses like medical bills and lost wages. 
              Non-economic damages cover intangible losses like pain and suffering, often calculated using 
              the <strong>multiplier method</strong> or a <strong>per diem</strong> approach.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4 text-purple-700">
              <FileText size={24} />
              Statutory Frameworks
            </h2>
            <p className="text-sm">
              Unlike personal injury, <strong>Workers' Compensation</strong> and <strong>Employment Law</strong> are governed by strict state 
              and federal statutes. Benefits are often calculated based on lost earnings, mitigation of damages, and statutory caps. Our 
              calculators help estimate these variables based on standard legal frameworks.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 text-slate-300 p-8 rounded-3xl border border-slate-800">
          <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-sm font-mono italic">
            // legal_assessment_protocol //
          </h3>
          <p className="text-sm mb-6 opacity-80 leading-relaxed">
            Estimating a claim value requires analyzing several variables. While no tool can 
            predict a jury verdict, our terminal helps organize the primary pillars of 
            compensation analysis.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 list-none p-0 text-xs font-mono tracking-tight uppercase">
            <li className="flex gap-2">
              <span className="text-purple-500 font-bold">01.</span>
              <span><strong>Special Damages:</strong> Direct financial losses and medical costs.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-500 font-bold">02.</span>
              <span><strong>General Damages:</strong> Pain, suffering, and loss of enjoyment of life.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-500 font-bold">03.</span>
              <span><strong>Liability:</strong> Determining fault percentages and comparative negligence.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-500 font-bold">04.</span>
              <span><strong>Policy Limits:</strong> Factoring in insurance coverage maximums.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* MANDATORY LEGAL DISCLAIMER (Required for AdSense/YMYL) */}
      <footer className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-r-xl mb-12">
        <div className="flex gap-4">
          <ShieldAlert className="text-purple-600 shrink-0" size={24} />
          <p className="text-xs text-purple-800 leading-relaxed font-medium">
            <strong>Legal Disclaimer:</strong> The information and tools provided by SyntixGear are for 
            informational and educational purposes only. They do not constitute legal advice or an 
            attorney-client relationship. Every case is unique, and settlement values depend on 
            jurisdiction, evidence, and insurance policy terms. <strong>Always consult with a 
            licensed attorney</strong> in your area before making decisions regarding a legal claim 
            or signing settlement documents.
          </p>
        </div>
      </footer>

      {/* Navigation Link */}
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full hover:bg-purple-600 transition-all font-bold shadow-lg shadow-slate-200"
      >
        ← Calc Vault
      </Link>
    </div>
  );
}
