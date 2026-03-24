import React from 'react';

import { Metadata } from 'next';
import PrivacyClient from './privacyClient';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://syntixgear.com/calc-vault/privacy',
  },
}

export default function PrivacyPage() {
  return <PrivacyClient />;
}

