export type UnitCategory = 'length' | 'weight' | 'temperature' | 'area' | 'data' | 'cooking';

export interface UnitDefinition {
  label: string;
  value: string;
  ratio?: number; // Multiply by this to get the base unit
  formula?: (val: number, _toBase: boolean) => number; // For non-linear like Temp
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
      { label: 'Celsius (°C)', value: 'celsius', formula: (v) => v },
      { label: 'Fahrenheit (°F)', value: 'fahrenheit', formula: (v, toBase) => toBase ? (v - 32) * 5/9 : (v * 9/5) + 32 },
      { label: 'Kelvin (K)', value: 'kelvin', formula: (v, toBase) => toBase ? v - 273.15 : v + 273.15 },
    ]
  },
  area: {
    base: 'square_meter',
    units: [
      { label: 'Square Meters (m²)', value: 'square_meter', ratio: 1 },
      { label: 'Square Kilometers (km²)', value: 'square_km', ratio: 1000000 },
      { label: 'Square Feet (ft²)', value: 'square_ft', ratio: 0.092903 },
      { label: 'Square Inches (in²)', value: 'square_in', ratio: 0.00064516 },
      { label: 'Square Miles (mi²)', value: 'square_mi', ratio: 2589988 },
      { label: 'Hectares (ha)', value: 'hectare', ratio: 10000 },
      { label: 'Acres (ac)', value: 'acre', ratio: 4046.86 },
    ]
  }
  ,
  data: {
    base: 'byte',
    units: [
      { label: 'Bits (b)', value: 'bit', ratio: 1 / 8 },
      { label: 'Bytes (B)', value: 'byte', ratio: 1 },
      { label: 'Kilobytes (KB)', value: 'kb', ratio: 1000 },
      { label: 'Kibibytes (KiB)', value: 'kib', ratio: 1024 },
      { label: 'Megabytes (MB)', value: 'mb', ratio: 1000 * 1000 },
      { label: 'Mebibytes (MiB)', value: 'mib', ratio: 1024 * 1024 },
      { label: 'Gigabytes (GB)', value: 'gb', ratio: 1000 * 1000 * 1000 },
      { label: 'Gibibytes (GiB)', value: 'gib', ratio: 1024 * 1024 * 1024 },
      { label: 'Terabytes (TB)', value: 'tb', ratio: 1000 * 1000 * 1000 * 1000 },
      { label: 'Tebibytes (TiB)', value: 'tib', ratio: 1024 * 1024 * 1024 * 1024 },
    ]
  }
  ,
  cooking: {
    base: 'milliliter',
    units: [
      { label: 'Teaspoons (tsp)', value: 'tsp', ratio: 4.92892159375 },
      { label: 'Tablespoons (tbsp)', value: 'tbsp', ratio: 14.78676478125 },
      { label: 'Fluid Ounces (fl oz)', value: 'fl_oz', ratio: 29.5735295625 },
      { label: 'Cups (cup)', value: 'cup', ratio: 236.5882365 },
      { label: 'Pints (pt)', value: 'pt', ratio: 473.176473 },
      { label: 'Quarts (qt)', value: 'qt', ratio: 946.352946 },
      { label: 'Gallons (gal)', value: 'gal', ratio: 3785.411784 },
      { label: 'Milliliters (mL)', value: 'ml', ratio: 1 },
      { label: 'Liters (L)', value: 'l', ratio: 1000 },
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