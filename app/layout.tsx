import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'CalcVault | Professional Online Calculators',
  description: 'Free finance, math, and unit conversion calculators.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
      </head>
      <body className="bg-slate-50 text-slate-900">
        <header>...</header>
        <main>{children}</main>
      </body>
    </html>
  );
}
