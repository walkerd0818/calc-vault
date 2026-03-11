import React from 'react';
import Link from 'next/link';
import SearchBar from '@components/SearchBar';
import './globals.css'; // Ensure your Tailwind styles are imported

// 1. Define the Interface for the Props
interface RootLayoutProps {
  children: React.ReactNode;
}

// 2. Add Metadata for SEO
export const metadata = {
  title: 'CalcVault | Professional Online Calculators',
  description: 'Hundreds of free finance, math, and unit conversion calculators.',
};

// 3. Apply the Type to the Function Component
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* Placeholder for Google AdSense - Only loads in production */}
        {process.env.NODE_ENV === 'production' && (
          <script 
            async 
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ID" 
            crossOrigin="anonymous" 
          />
        )}
      </head>
      <body className="antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        <header className="border-b bg-white p-4 shadow-sm">
          {/* <nav className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">CalcVault</h1> */}
        <nav className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="text-2xl font-black text-blue-600 tracking-tighter">
            CALC<span className="text-slate-800">VAULT</span>
          </Link>
  
          <div className="w-full md:w-1/2">
            <SearchBar />
          </div>
  
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <Link href="/finance" className="hover:text-blue-600 transition-colors">Finance</Link>
            <Link href="/units" className="hover:text-blue-600 transition-colors">Units</Link>
            <Link href="/engineering" className="hover:text-amber-600 transition-colors">Engineering</Link>
            <Link href="/health" className="hover:text-rose-600 transition-colors">Health</Link>
            <Link href="/legal" className="hover:text-purple-600 transition-colors">Legal</Link>
          </div>          
        </nav>
        </header>

        <main className="flex-grow max-w-7xl mx-auto w-full p-6">
          {children}
        </main>

        <footer className="bg-slate-900 text-slate-400 py-12 mt-20 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-white font-bold mb-4">CalcVault</h3>
              <p className="text-sm">The world's most trusted suite of calculation tools.</p>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <h4 className="text-white font-bold mb-2">Quick Links</h4>
              <Link href="/finance/mortgage-calculator" className="hover:text-white transition">Mortgage Calculator</Link>
              <Link href="/units/length" className="hover:text-white transition">Unit Converter</Link>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <h4 className="text-white font-bold mb-2">Legal</h4>
              <Link href="/about" className="hover:text-white transition">About Us</Link>
              <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}