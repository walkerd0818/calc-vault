
import { Metadata } from 'next';
import HealthClient from './HealthClient';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://syntixgear.com/calc-vault/health',
  },
}

export default function HealthPage() {
  return <HealthClient />;
}
