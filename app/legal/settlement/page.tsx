
import { Metadata } from 'next';
import SettlementCalculatorClient from './SettlementCalculatorClient';  

export async function generateMetadata({
  params 
}:{
  params: { slug: string }
 }): Promise<Metadata> {

  return {
    alternates: {
      canonical: `https://syntixgear.com/calc-vault/legal/${params.slug}`,
  },
  
  }
}

export default function SettlementCalculator() {
  return <SettlementCalculatorClient />;
}
