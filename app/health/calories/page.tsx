import { Metadata } from 'next';
import CalorieCalculatorClient from './CalorieCalculatorClient';

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

export default function CalorieCalculator() {
  return <CalorieCalculatorClient />;
}
