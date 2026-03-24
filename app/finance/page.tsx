import { Metadata } from 'next';
import FinanceClient from './FinanceClient';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://syntixgear.com/calc-vaul/finance',
  },
}

export default function FinancePage() {
  return <FinanceClient />;
}
