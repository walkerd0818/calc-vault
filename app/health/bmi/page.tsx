
import { Metadata } from 'next';
import BMICalculatorClient from './BMICalculatorClient';

export async function generateMetadata({
  params 
}:{
  params: { slug: string }
 }): Promise<Metadata> {

  return {
    alternates: {
      canonical: `https://syntixgear.com/calc-vault/health/${params.slug}`,
  },
  
  }
}

export default function BMICalculator() {
  return <BMICalculatorClient />;
}


