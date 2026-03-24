import { Metadata } from 'next';
import PercentageCalculatorClient from './PercentageCalculatorClient';
export async function generateMetadata({
  params 
}:{
  params: { slug: string }
 }): Promise<Metadata> {

  return {
    alternates: {
      canonical: `https://syntixgear.com/calc-vault/engineering/${params.slug}`,
  },
  
  }
}

export default function PercentageCalculatorPage() {
  return <PercentageCalculatorClient />;
}
