import React from 'react';
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
          <nav className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">CalcVault</h1>
            {/* Search and Category Links go here */}
          </nav>
        </header>

        <main className="flex-grow max-w-7xl mx-auto w-full p-6">
          {children}
        </main>

        <footer className="bg-slate-800 text-white p-8 mt-12">
          <div className="max-w-7xl mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} CalcVault - All Rights Reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}