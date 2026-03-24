import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://syntixgear.com/calc-vault/about',
  },
}

export default function AboutPage() {
  return <AboutClient />;
}