import { Metadata } from 'next';
import HELOCCalculatorClient from './HELOCalculatorClient';

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

export default function HELOCCalculator() {
  return <HELOCCalculatorClient />;
}