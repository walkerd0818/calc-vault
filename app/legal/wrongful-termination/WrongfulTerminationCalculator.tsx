'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  ShieldAlert,
  FileText,
  HelpCircle,
  Scale,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  Users,
  BookOpen,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
type TerminationType =
  | 'wrongful_termination'
  | 'discrimination'
  | 'retaliation'
  | 'hostile_work_environment'
  | 'breach_of_contract';

type EmploymentDuration = 'less_1' | '1_to_3' | '3_to_5' | '5_to_10' | 'over_10';

type Jurisdiction = 'CA' | 'NY' | 'TX' | 'FL' | 'WA' | 'other';

// ─── Constants ────────────────────────────────────────────────────────────────
const CLAIM_MULTIPLIERS: Record<TerminationType, number> = {
  wrongful_termination: 1.5,
  discrimination: 2.5,
  retaliation: 3.0,
  hostile_work_environment: 2.0,
  breach_of_contract: 1.2,
};

const CLAIM_LABELS: Record<TerminationType, string> = {
  wrongful_termination: 'Wrongful Termination',
  discrimination: 'Discrimination / Harassment',
  retaliation: 'Retaliation (Whistleblower)',
  hostile_work_environment: 'Hostile Work Environment',
  breach_of_contract: 'Breach of Employment Contract',
};

const DURATION_MULTIPLIERS: Record<EmploymentDuration, number> = {
  less_1: 0.75,
  '1_to_3': 1.0,
  '3_to_5': 1.25,
  '5_to_10': 1.5,
  over_10: 2.0,
};

const DURATION_LABELS: Record<EmploymentDuration, string> = {
  less_1: 'Less than 1 year',
  '1_to_3': '1 – 3 years',
  '3_to_5': '3 – 5 years',
  '5_to_10': '5 – 10 years',
  over_10: 'More than 10 years',
};

const PUNITIVE_CAPS: Record<Jurisdiction, number> = {
  CA: 0, // no statutory cap under FEHA
  NY: 0,
  TX: 300_000,
  FL: 300_000,
  WA: 0,
  other: 300_000,
};

const JURISDICTION_LABELS: Record<Jurisdiction, string> = {
  CA: 'California',
  NY: 'New York',
  TX: 'Texas',
  FL: 'Florida',
  WA: 'Washington',
  other: 'Other / Federal',
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function WrongfulTerminationCalculator() {
  // Inputs
  const [annualSalary, setAnnualSalary] = useState(75_000);
  const [terminationType, setTerminationType] = useState<TerminationType>('wrongful_termination');
  const [employmentDuration, setEmploymentDuration] = useState<EmploymentDuration>('1_to_3');
  const [monthsUnemployed, setMonthsUnemployed] = useState(6);
  const [benefitsValue, setBenefitsValue] = useState(8_400); // health, 401k, etc.
  const [emotionalDistress, setEmotionalDistress] = useState(25_000);
  const [hasSeverance, setHasSeverance] = useState(false);
  const [severanceAmount, setSeveranceAmount] = useState(0);
  const [hasWrittenContract, setHasWrittenContract] = useState(false);
  const [seekPunitive, setSeekPunitive] = useState(false);
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>('CA');

  // ── Derived calculations ──────────────────────────────────────────────────
  const calculations = useMemo(() => {
    const monthlyRate = annualSalary / 12;

    // 1. Back pay: wages lost from termination to today
    const backPay = monthlyRate * monthsUnemployed;

    // 2. Lost benefits during unemployment
    const lostBenefits = (benefitsValue / 12) * monthsUnemployed;

    // 3. Front pay: estimated future lost earnings (varies by case)
    //    Use employment-duration factor as proxy for career-impact severity
    const durationFactor = DURATION_MULTIPLIERS[employmentDuration];
    const estimatedFrontPayMonths = Math.round(durationFactor * 12); // 9 – 24 months
    const frontPay = monthlyRate * estimatedFrontPayMonths;

    // 4. Total economic damages
    const totalEconomicDamages = backPay + lostBenefits + frontPay;

    // 5. Non-economic (emotional distress, reputation)
    const nonEconomicDamages =
      emotionalDistress * CLAIM_MULTIPLIERS[terminationType];

    // 6. Punitive damages (if applicable & allowed)
    const rawPunitive = seekPunitive
      ? totalEconomicDamages * (CLAIM_MULTIPLIERS[terminationType] - 1)
      : 0;
    const cap = PUNITIVE_CAPS[jurisdiction];
    const punitiveDamages = cap > 0 ? Math.min(rawPunitive, cap) : rawPunitive;

    // 7. Attorney fee award (Title VII, FEHA, etc. allow fee-shifting)
    const attyFeeAward = hasWrittenContract
      ? 0
      : totalEconomicDamages * 0.35;

    // 8. Gross claim value
    const grossClaimValue =
      totalEconomicDamages + nonEconomicDamages + punitiveDamages + attyFeeAward;

    // 9. Deduct any severance already received
    const netClaimValue = Math.max(grossClaimValue - (hasSeverance ? severanceAmount : 0), 0);

    // 10. Realistic settlement range (60 – 80% of full value is typical)
    const settlementLow = netClaimValue * 0.6;
    const settlementHigh = netClaimValue * 0.8;

    // 11. Attorney contingency (33%)
    const attorneyFee = settlementLow * 0.33;
    const netToClient = settlementLow - attorneyFee;

    return {
      backPay,
      lostBenefits,
      frontPay,
      estimatedFrontPayMonths,
      totalEconomicDamages,
      nonEconomicDamages,
      punitiveDamages,
      attyFeeAward,
      grossClaimValue,
      netClaimValue,
      settlementLow,
      settlementHigh,
      attorneyFee,
      netToClient,
      multiplierUsed: CLAIM_MULTIPLIERS[terminationType],
      durationFactor,
    };
  }, [
    annualSalary,
    terminationType,
    employmentDuration,
    monthsUnemployed,
    benefitsValue,
    emotionalDistress,
    hasSeverance,
    severanceAmount,
    hasWrittenContract,
    seekPunitive,
    jurisdiction,
  ]);

  const fmt = (n: number) =>
    '$' + Math.round(n).toLocaleString();

  return (
    <div className="max-w-5xl mx-auto px-4 pb-20">

       {/* Navigation */}
      <nav className="mb-8 flex flex-wrap gap-3 pt-6">
        <Link href="/legal" className="px-4 py-2 bg-purple-50 text-purple-600 rounded-full hover:bg-purple-600 hover:text-white transition-all text-sm font-bold shadow-sm">
          ← Legal Claims Hub
        </Link>
        <Link href="/legal/settlement" className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-all text-sm font-bold shadow-sm">
          Personal Injury Calc
        </Link>
       <Link href="/legal/workers-comp" className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-all text-sm font-bold shadow-sm">
          Workers' Comp Calculator
        </Link>
      </nav>


      {/* ── Header ────────────────────────────────────────────────────────── */}
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight flex items-center gap-3">
          <Scale className="text-purple-600" size={36} />
          Wrongful Termination & Employment Claim Calculator
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          Estimate the value of an <strong>unlawful termination, workplace discrimination,
          or retaliation claim</strong>. Understand back pay, front pay, emotional distress
          damages, and realistic settlement ranges based on your specific circumstances.
        </p>
      </header>

      {/* ── Ad Slot – Top ─────────────────────────────────────────────────── */}
      <div className="w-full h-24 bg-slate-50 mb-10 flex flex-col items-center justify-center border border-slate-100 rounded-xl">
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
          Sponsored Advertisement
        </span>
      </div>

      {/* ── Main Grid ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

        {/* Left: Inputs */}
        <div className="lg:col-span-7 space-y-6">

          {/* Card 1 – Employment Details */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
              <FileText size={20} className="text-purple-600" /> Employment Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                  Annual Salary at Termination ($)
                </label>
                <input
                  type="number"
                  value={annualSalary}
                  onChange={(e) => setAnnualSalary(Number(e.target.value))}
                  className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-purple-500 outline-none transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                  Annual Benefits Value ($)
                  <span className="ml-1 text-slate-400 normal-case font-normal">
                    (health, 401k, etc.)
                  </span>
                </label>
                <input
                  type="number"
                  value={benefitsValue}
                  onChange={(e) => setBenefitsValue(Number(e.target.value))}
                  className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-purple-500 outline-none transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                  Length of Employment
                </label>
                <select
                  value={employmentDuration}
                  onChange={(e) => setEmploymentDuration(e.target.value as EmploymentDuration)}
                  className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-purple-500 outline-none transition-all font-medium bg-white"
                >
                  {Object.entries(DURATION_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                  Months Unemployed After Termination
                </label>
                <input
                  type="number"
                  value={monthsUnemployed}
                  onChange={(e) => setMonthsUnemployed(Number(e.target.value))}
                  className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-purple-500 outline-none transition-all font-medium"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                  Claim Type
                </label>
                <select
                  value={terminationType}
                  onChange={(e) => setTerminationType(e.target.value as TerminationType)}
                  className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-purple-500 outline-none transition-all font-medium bg-white"
                >
                  {Object.entries(CLAIM_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 mt-1">
                  Damages multiplier: <strong className="text-purple-600">{calculations.multiplierUsed}×</strong> economic damages for non-economic harm
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 – Non-Economic & Options */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
              <TrendingUp size={20} className="text-purple-600" /> Damages & Options
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                  Estimated Emotional Distress ($)
                </label>
                <input
                  type="number"
                  value={emotionalDistress}
                  onChange={(e) => setEmotionalDistress(Number(e.target.value))}
                  className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-purple-500 outline-none transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                  State / Jurisdiction
                </label>
                <select
                  value={jurisdiction}
                  onChange={(e) => setJurisdiction(e.target.value as Jurisdiction)}
                  className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-purple-500 outline-none transition-all font-medium bg-white"
                >
                  {Object.entries(JURISDICTION_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>

              {/* Checkboxes */}
              <div className="md:col-span-2 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={hasWrittenContract}
                    onChange={(e) => setHasWrittenContract(e.target.checked)}
                    className="w-4 h-4 accent-purple-600 rounded"
                  />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                    I had a written employment contract
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={seekPunitive}
                    onChange={(e) => setSeekPunitive(e.target.checked)}
                    className="w-4 h-4 accent-purple-600 rounded"
                  />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                    Seek punitive damages (egregious employer conduct)
                    {PUNITIVE_CAPS[jurisdiction] > 0 && (
                      <span className="ml-2 text-xs text-slate-400 font-normal">
                        — capped at ${PUNITIVE_CAPS[jurisdiction].toLocaleString()} in {JURISDICTION_LABELS[jurisdiction]}
                      </span>
                    )}
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={hasSeverance}
                    onChange={(e) => setHasSeverance(e.target.checked)}
                    className="w-4 h-4 accent-purple-600 rounded"
                  />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                    I received a severance payment
                  </span>
                </label>
                {hasSeverance && (
                  <div className="ml-7">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                      Severance Amount ($)
                    </label>
                    <input
                      type="number"
                      value={severanceAmount}
                      onChange={(e) => setSeveranceAmount(Number(e.target.value))}
                      className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-purple-500 outline-none transition-all font-medium"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-5 flex flex-col gap-4">

          {/* Primary result card */}
          <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl flex-1 border-b-8 border-purple-600">
            <h3 className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-2">
              Estimated Settlement Range
            </h3>
            <div className="text-4xl font-black mb-1 tabular-nums">
              {fmt(calculations.settlementLow)}
            </div>
            <div className="text-lg text-slate-400 font-semibold mb-6">
              – {fmt(calculations.settlementHigh)}
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Back Pay:</span>
                <span className="text-white font-medium">{fmt(calculations.backPay)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Lost Benefits:</span>
                <span className="text-white font-medium">{fmt(calculations.lostBenefits)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Front Pay ({calculations.estimatedFrontPayMonths} mo.):</span>
                <span className="text-white font-medium">{fmt(calculations.frontPay)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Non-Economic Damages:</span>
                <span className="text-white font-medium">{fmt(calculations.nonEconomicDamages)}</span>
              </div>
              {calculations.punitiveDamages > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Punitive Damages:</span>
                  <span className="text-amber-400 font-medium">{fmt(calculations.punitiveDamages)}</span>
                </div>
              )}
              {calculations.attyFeeAward > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Attorney Fee Award:</span>
                  <span className="text-sky-400 font-medium">{fmt(calculations.attyFeeAward)}</span>
                </div>
              )}
              {hasSeverance && severanceAmount > 0 && (
                <div className="flex justify-between border-t border-white/10 pt-2">
                  <span className="text-slate-400">Less Severance Received:</span>
                  <span className="text-red-400 font-medium">− {fmt(severanceAmount)}</span>
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">
                Net to You After Attorney Fees
              </p>
              <div className="text-3xl font-bold text-emerald-400 font-mono">
                {fmt(calculations.netToClient)}
              </div>
              <p className="text-[10px] text-slate-500 mt-1">(based on low-end settlement, 33% contingency)</p>
            </div>
          </div>

          {/* Strength indicator */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
              Claim Strength Factors
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Written contract present', met: hasWrittenContract },
                { label: 'Punitive damages applicable', met: seekPunitive },
                { label: `${monthsUnemployed}+ months of documented wage loss`, met: monthsUnemployed >= 3 },
                { label: 'High-multiplier claim type', met: calculations.multiplierUsed >= 2.5 },
                { label: 'Long tenure (stronger wrongful firing claim)', met: ['5_to_10', 'over_10'].includes(employmentDuration) },
              ].map(({ label, met }) => (
                <li key={label} className="flex items-center gap-2">
                  {met
                    ? <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    : <AlertCircle size={16} className="text-slate-300 shrink-0" />}
                  <span className={met ? 'text-slate-700' : 'text-slate-400'}>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Ad Slot – Mid ─────────────────────────────────────────────────── */}
      <div className="w-full h-24 bg-slate-50 mb-12 flex flex-col items-center justify-center border border-slate-100 rounded-xl">
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
          Sponsored Advertisement
        </span>
      </div>

      {/* ── Educational Content ───────────────────────────────────────────── */}
      <section className="prose prose-slate max-w-none mb-16 space-y-12">

        {/* Two-column explainers */}
        <div className="grid md:grid-cols-2 gap-12 border-t pt-12 border-slate-100">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <DollarSign className="text-purple-600" /> What Is Back Pay vs. Front Pay?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              <strong>Back pay</strong> is the wages and benefits you lost from the date of termination up to the
              date of a settlement or verdict. <strong>Front pay</strong> covers projected future earnings you
              will lose because the illegal termination damaged your career trajectory or because reinstatement
              is not practical. Courts weigh your good-faith efforts to <em>mitigate</em> damages by actively
              seeking comparable employment—keeping a job search log strengthens your claim significantly.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Users className="text-purple-600" /> Federal vs. State Protections
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Title VII, the ADA, ADEA, and FMLA provide federal floors of protection, but states like
              <strong> California (FEHA)</strong> and <strong>New York (NYSHRL)</strong> offer broader
              coverage—including applying to smaller employers and removing punitive damage caps entirely.
              Employees in strong-protection states often recover substantially more. The applicable law
              depends on which jurisdiction's court hears your case.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Clock className="text-purple-600" /> Statute of Limitations
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Time limits are strict and vary by claim type. For federal discrimination claims you generally
              must file an <strong>EEOC charge within 180–300 days</strong> of the discriminatory act.
              State claims may allow longer windows (up to 3 years in California), but the clock starts
              running at termination. Missing the deadline typically forfeits the right to sue entirely,
              making early consultation with an attorney critical.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <BookOpen className="text-purple-600" /> Retaliation Claims Explained
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Retaliation occurs when an employer punishes an employee for engaging in a
              <strong> legally protected activity</strong>—reporting wage theft, filing an OSHA complaint,
              participating in a discrimination investigation, or blowing the whistle on fraud.
              Retaliation claims carry the highest damages multipliers because courts take them seriously
              as a deterrent. A strong retaliation case requires showing a clear temporal link between the
              protected activity and the adverse employment action.
            </p>
          </div>
        </div>

        {/* Punitive Damages Deep-Dive */}
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-6">
            <TrendingUp className="text-purple-600" /> Understanding Punitive Damages in Employment Cases
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Punitive damages are awarded not to compensate the employee, but to <strong>punish the employer
            and deter future misconduct</strong>. They require proof that the employer acted with{' '}
            <em>malice, oppression, or fraud</em>—a higher standard than simple negligence. Evidence such as
            prior complaints that management ignored, a documented pattern of targeting protected-class
            employees, or destruction of HR records can all support a punitive award.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {[
              { state: 'California', cap: 'No statutory cap', note: 'FEHA allows full jury discretion; ratio to compensatory damages scrutinized by courts' },
              { state: 'Texas', cap: 'Capped at $300,000', note: 'For employers with 201–500 employees; $200k for smaller employers under Title VII' },
              { state: 'Federal (Title VII)', cap: 'Capped at $300,000', note: 'Combined compensatory and punitive cap for employers with 500+ employees' },
            ].map(({ state, cap, note }) => (
              <div key={state} className="bg-white p-4 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">{state}</div>
                <div className="text-sm text-purple-600 font-semibold mb-2">{cap}</div>
                <div className="text-xs text-slate-500 leading-relaxed">{note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-6">
            <HelpCircle className="text-purple-600" /> Wrongful Termination FAQ
          </h2>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-slate-800 mb-2">
                Can I be fired for no reason?
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                In most U.S. states, employment is <strong>"at-will,"</strong> meaning an employer can
                generally terminate without cause—but not for an <em>illegal</em> reason. Illegal reasons
                include your race, gender, religion, national origin, disability, age (40+), pregnancy,
                or in retaliation for protected activity. A written contract or employee handbook may
                also limit the employer's ability to fire without cause.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-2">
                Should I sign a severance agreement?
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Severance agreements almost always include a <strong>release of all employment claims</strong>.
                Once signed (and the revocation period expires), you generally cannot pursue a wrongful
                termination lawsuit. If you believe you were illegally terminated, consult an attorney
                <em> before</em> signing—the value of your claims may far exceed the severance offered.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-2">
                Are employment lawsuit settlements taxable?
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                <strong>Back pay and front pay</strong> awards are generally taxable as ordinary income and
                subject to payroll taxes. <strong>Compensatory damages</strong> for physical injuries or
                sickness may be excludable. Emotional distress damages not attributable to physical injury
                are typically taxable. Proper allocation of a settlement amount between categories can have
                a significant effect on your after-tax recovery.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-2">
                What is the EEOC charge process?
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Before filing a federal discrimination lawsuit under Title VII, the ADA, or the ADEA, you
                must first file a <strong>charge of discrimination</strong> with the Equal Employment
                Opportunity Commission (EEOC). The EEOC will investigate, attempt mediation, and ultimately
                issue a <em>"right to sue"</em> letter that allows you to file in federal court. This
                administrative prerequisite is separate from filing directly under state law.
              </p>
            </div>
          </div>
        </div>

        {/* Key Steps callout */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <FileText className="text-purple-600" size={22} />,
              title: 'Document Everything',
              body: 'Save all emails, performance reviews, HR complaints, and communications. Courts require contemporaneous evidence—notes written immediately after events carry significant weight.',
            },
            {
              icon: <Clock className="text-purple-600" size={22} />,
              title: 'Act Quickly',
              body: 'EEOC filing deadlines can be as short as 180 days. Evidence disappears, witnesses move on, and memories fade. Consulting an attorney within 30 days of termination is strongly advisable.',
            },
            {
              icon: <Scale className="text-purple-600" size={22} />,
              title: 'Mitigate Your Damages',
              body: 'You have a legal duty to seek comparable employment after termination. Failure to do so can significantly reduce your back pay award. Keep a detailed job search log with every application and response.',
            },
          ].map(({ icon, title, body }) => (
            <div key={title} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                {icon}
                <h3 className="font-bold text-slate-900">{title}</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Ad Slot – Bottom ──────────────────────────────────────────────── */}
      <div className="w-full h-24 bg-slate-50 mb-10 flex flex-col items-center justify-center border border-slate-100 rounded-xl">
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
          Sponsored Advertisement
        </span>
      </div>

      {/* ── Disclaimer ────────────────────────────────────────────────────── */}
      <footer className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl">
        <div className="flex gap-4">
          <ShieldAlert className="text-amber-600 shrink-0" size={24} />
          <p className="text-xs text-amber-800 leading-relaxed font-medium">
            <strong>Legal Disclosure:</strong> Employment and labor laws vary significantly by state and
            are subject to frequent legislative change. This calculator uses generalized formulas for
            illustrative purposes only and does not constitute legal advice. Damage caps, statute of
            limitations, EEOC requirements, and available remedies depend on your specific jurisdiction
            and facts. Consult a qualified <strong>employment attorney</strong> before making any legal
            decisions regarding your claim.
          </p>
        </div>
      </footer>
    </div>
  );
}
