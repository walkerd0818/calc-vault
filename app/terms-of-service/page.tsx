import React from 'react';

import { Metadata } from 'next';
import TermsOfServiceClient from './termsofserviceClient';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://syntixgear.com/calc-vault/privacy',
  },
}

export default function TermsOfServicePage() {
  return <TermsOfServiceClient />;
}

