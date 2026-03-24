import { Metadata } from 'next';
import ScientificCalculatorClient from './ScientificateCalculatorClient';

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

export default function ScientificCalculatorPage() {
  return <ScientificCalculatorClient />;
}
