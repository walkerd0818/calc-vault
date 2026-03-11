export interface CalculatorMetadata {
  id: string;
  name: string;
  category: string;
  href: string;
  keywords: string[];
}

export const AllCalculators: CalculatorMetadata[] = [
  {
    id: 'mortgage',
    name: 'Mortgage Calculator',
    category: 'Finance',
    href: '/finance/mortgage-calculator',
    keywords: ['home', 'loan', 'house', 'interest', 'amortization']
  },
  {
    id: 'length',
    name: 'Length Converter',
    category: 'Units',
    href: '/units/length',
    keywords: ['meters', 'feet', 'miles', 'distance', 'inches']
  },
  {
    id: 'temp',
    name: 'Temperature Converter',
    category: 'Units',
    href: '/units/temperature',
    keywords: ['celsius', 'fahrenheit', 'kelvin', 'weather']
  },
  // Adding a new calculator here automatically makes it searchable site-wide
];