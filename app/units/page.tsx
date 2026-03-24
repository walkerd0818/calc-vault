
import React from 'react';
import { Metadata } from 'next';
import UnitsClient from './UnitsClient';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://syntixgear.com/calc-vault/units',
  },
}

export default function UnitsPage() {
  return <UnitsClient />;
}
