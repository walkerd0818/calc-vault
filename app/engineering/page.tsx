import { Metadata } from 'next';
import EngineeringPage from './EngineeringClient';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://syntixgear.com/calc-vault/engineering',
  },
}

export default function Engineering() {
  return <EngineeringPage />;
}
