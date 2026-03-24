import { Metadata } from 'next';
import GeometryCalculatorClient from './GeometryCalculatorClient';

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

export default function GeometryCalculatorPage() {
  return <GeometryCalculatorClient />;
}
