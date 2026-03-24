

import React from 'react';
import { Metadata } from 'next';
import LegalClient from './LegalClient';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://syntixgear.com/calc-vault/legal',
  },
}

export default function LegalPage() {
  return <LegalClient />;
}
