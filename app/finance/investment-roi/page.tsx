import { Metadata } from 'next';
import InvestmentROICalculatorClient from './InvestmentROICalculatorClient';

type CapitalGainsType = 'shortterm' | 'longterm';

export async function generateMetadata({
  params 
}:{
  params: { slug: string }
 }): Promise<Metadata> {

  return {
    alternates: {
      canonical: `https://syntixgear.com/calc-vault/finance/${params.slug}`,
  },
  
  }
}

export default function InvestmentROICalculator() {
  return <InvestmentROICalculatorClient />;
}
