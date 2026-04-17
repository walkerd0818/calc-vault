import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://syntixgear.com/calc-vault',
  },
};

export default function HomePage() {
  return <HomeClient />;
}
