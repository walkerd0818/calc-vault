import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '@components/SearchBar';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import './globals.css';
import { Metadata } from 'next';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'CalcVault | Professional Online Calculators',
  description: 'Hundreds of free finance, math, and unit conversion calculators.',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {(
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7513014543018596"
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8D7R5BJNH9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8D7R5BJNH9');
          `}
        </Script>

        {/* ── SyntixGear breadcrumb ── */}
        <div className="syntix-breadcrumb">
          <Link href="https://syntixgear.com" className="syntix-breadcrumb-link">
            <span className="syntix-breadcrumb-bracket">[</span>
            <span className="syntix-breadcrumb-brand">SyntixGear</span>
            <span className="syntix-breadcrumb-bracket">]</span>
          </Link>
          <span className="syntix-breadcrumb-sep">/</span>
          <span className="syntix-breadcrumb-current">CalcVault</span>
        </div>

        <header className="border-b bg-white p-4 shadow-sm">
          <nav className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-2xl font-black text-blue-600 tracking-tighter">
              <Image src="/calc-vault/SyntixGear.png" alt="SyntixGear" width={32} height={32} />
              CALC<span className="text-slate-800">VAULT</span>
            </Link>

            <div className="w-full md:w-1/2">
              <SearchBar />
            </div>

            <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
              <Link href="/finance"     className="hover:text-blue-600   transition-colors">Finance</Link>
              <Link href="/units"       className="hover:text-blue-600   transition-colors">Units</Link>
              <Link href="/engineering" className="hover:text-amber-600  transition-colors">Engineering</Link>
              <Link href="/health"      className="hover:text-rose-600   transition-colors">Health</Link>
              <Link href="/legal"       className="hover:text-purple-600 transition-colors">Legal</Link>
            </div>
          </nav>
        </header>

        <main className="flex-grow max-w-7xl mx-auto w-full p-6">
          {children}
          <Analytics />
          <SpeedInsights />
        </main>

        <footer className="bg-slate-900 text-slate-400 py-12 mt-20 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-white font-bold mb-4">CalcVault</h3>
              <p className="text-sm">The world&apos;s most trusted suite of calculation tools.</p>
              <p className="text-xs mt-3 text-slate-600">
                Part of the{' '}
                <Link href="https://syntixgear.com" className="text-cyan-500 hover:text-cyan-400 transition-colors">
                  SyntixGear
                </Link>{' '}
                hub.
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <h4 className="text-white font-bold mb-2">Quick Links</h4>
              <Link href="/finance/mortgage-calculator" className="hover:text-white transition">Mortgage Calculator</Link>
              <Link href="/units/length"                className="hover:text-white transition">Unit Converter</Link>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <h4 className="text-white font-bold mb-2">Legal</h4>
              <Link href="/about"   className="hover:text-white transition">About Us</Link>
              <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
