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
    keywords: ['home', 'loan', 'house', 'interest', 'amortization', 'payment']
  },
  {
    id: 'refinance',
    name: 'Mortgage Refinance Calculator',
    category: 'Finance',
    href: '/finance/refinance-calculator',
    keywords: ['refinance', 'mortgage', 'savings', 'interest rate', 'break-even']
  },
  {
    id: 'heloc',
    name: 'HELOC Calculator',
    category: 'Finance',
    href: '/finance/heloc-calculator',
    keywords: ['heloc', 'home equity', 'credit', 'line of credit', 'borrowing']
  },
  {
    id: 'investment-roi',
    name: 'Investment & Crypto ROI Calculator',
    category: 'Finance',
    href: '/finance/investment-roi',
    keywords: ['crypto', 'bitcoin', 'ethereum', 'roi', 'return on investment', 'trading', 'capital gains', 'tax', 'investment', 'stock']
  },
  {
    id: 'loan-amortization',
    name: 'Loan Amortization Calculator',
    category: 'Finance',
    href: '/finance/loan-calculator',
    keywords: ['loan', 'amortization', 'personal', 'payment', 'schedule']
  },
  {
    id: 'interest',
    name: 'Interest Calculator',
    category: 'Finance',
    href: '/finance/interest',
    keywords: ['interest', 'compound', 'simple', 'savings', 'investment']
  },
  {
    id: 'length',
    name: 'Length Converter',
    category: 'Units',
    href: '/units/length',
    keywords: ['meters', 'feet', 'miles', 'distance', 'inches', 'kilometers']
  },
  {
    id: 'weight',
    name: 'Weight Converter',
    category: 'Units',
    href: '/units/weight',
    keywords: ['weight', 'mass', 'kilograms', 'pounds', 'ounces', 'grams']
  },
  {
    id: 'temp',
    name: 'Temperature Converter',
    category: 'Units',
    href: '/units/temperature',
    keywords: ['celsius', 'fahrenheit', 'kelvin', 'weather', 'temperature']
  },
  {
    id: 'scientific',
    name: 'Scientific Calculator',
    category: 'Engineering',
    href: '/engineering/scientific',
    keywords: ['calculator', 'math', 'square root', 'trigonometry', 'sine', 'cosine', 'logarithm']
  },
  {
    id: 'percentage',
    name: 'Percentage Calculator',
    category: 'Engineering',
    href: '/engineering/percentage',
    keywords: ['percentage', 'discount', 'markup', 'increase', 'decrease', 'percent']
  },
  {
    id: 'geometry',
    name: 'Area & Volume Calculator',
    category: 'Engineering',
    href: '/engineering/geometry',
    keywords: ['area', 'volume', 'circle', 'sphere', 'cube', 'rectangle', 'triangle', 'geometry']
  },
  {
    id: 'bmi',
    name: 'BMI Calculator',
    category: 'Health',
    href: '/health/bmi',
    keywords: ['bmi', 'body mass index', 'weight', 'height', 'health', 'fitness']
  },
  {
    id: 'calories',
    name: 'Calorie Needs Calculator',
    category: 'Health',
    href: '/health/calories',
    keywords: ['calories', 'tdee', 'bmr', 'diet', 'nutrition', 'weight loss']
  },
  {
    id: 'date-calc',
    name: 'Date Calculator',
    category: 'Tools',
    href: '/tools/date-calc',
    keywords: ['date', 'days', 'weeks', 'months', 'years', 'time']
  },
  {
    id: 'settlement',
    name: 'Personal Injury Settlement Calculator',
    category: 'Legal',
    href: '/legal/settlement',
    keywords: ['settlement', 'personal injury', 'car accident', 'claim', 'damages', 'lawsuit', 'injury compensation']
  },
  {
    id: 'workers-comp',
    name: 'Workers Compensation & Disability Calculator',
    category: 'Legal',
    href: '/legal/workers-comp',
    keywords: ['workers comp', 'disability', 'workers compensation', 'benefits', 'ttd', 'ppd', 'injury']
  },
];