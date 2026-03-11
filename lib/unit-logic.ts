export type UnitCategory = 'length' | 'weight' | 'temperature' | 'area';

export interface UnitDefinition {
  label: string;
  value: string;
  ratio?: number; // Multiply by this to get the base unit
  formula?: (val: number, toBase: boolean) => number; // For non-linear like Temp
}

export const UnitRegistry: Record<UnitCategory, { base: string, units: UnitDefinition[] }> = {
  length: {
    base: 'meter',
    units: [
      { label: 'Meters (m)', value: 'meter', ratio: 1 },
      { label: 'Kilometers (km)', value: 'km', ratio: 1000 },
      { label: 'Feet (ft)', value: 'ft', ratio: 0.3048 },
      { label: 'Inches (in)', value: 'in', ratio: 0.0254 },
      { label: 'Miles (mi)', value: 'mi', ratio: 1609.34 },
    ]
  },
  weight: {
    base: 'kg',
    units: [
      { label: 'Kilograms (kg)', value: 'kg', ratio: 1 },
      { label: 'Grams (g)', value: 'g', ratio: 0.001 },
      { label: 'Pounds (lb)', value: 'lb', ratio: 0.453592 },
      { label: 'Ounces (oz)', value: 'oz', ratio: 0.0283495 },
    ]
  },
  temperature: {
    base: 'celsius',
    units: [
      { label: 'Celsius (°C)', value: 'celsius', formula: (v, toBase) => v },
      { label: 'Fahrenheit (°F)', value: 'fahrenheit', formula: (v, toBase) => toBase ? (v - 32) * 5/9 : (v * 9/5) + 32 },
      { label: 'Kelvin (K)', value: 'kelvin', formula: (v, toBase) => toBase ? v - 273.15 : v + 273.15 },
    ]
  }
};

export function convertUnits(value: number, from: string, to: string, category: UnitCategory): number {
  const cat = UnitRegistry[category];
  const fromUnit = cat.units.find(u => u.value === from);
  const toUnit = cat.units.find(u => u.value === to);

  if (!fromUnit || !toUnit) return 0;

  // Step 1: Convert input to Base
  let baseValue: number;
  if (fromUnit.formula) {
    baseValue = fromUnit.formula(value, true);
  } else {
    baseValue = value * (fromUnit.ratio || 1);
  }

  // Step 2: Convert Base to target
  if (toUnit.formula) {
    return toUnit.formula(baseValue, false);
  } else {
    return baseValue / (toUnit.ratio || 1);
  }
}