
import React from 'react';
import { Metadata } from 'next';
import WeightClient from './WeightClient';

export async function generateMetadata({
  params 
}:{
  params: { slug: string }
 }): Promise<Metadata> {

  return {
    alternates: {
      canonical: `https://syntixgear.com/calc-vault/units/${params.slug}`,
  },
  
  }
}

export default function WeightPage() {
  return <WeightClient />;
}

