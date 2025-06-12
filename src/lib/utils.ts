import * as d3 from 'd3';

import type { Country, CountryRaw } from '@/types';

export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

export const d3FormatBillions = (fs: string) => (s: number) => d3.format(fs)(s).replace(/G/, 'B');

export const sortCountryData =
  <K extends keyof Country>(sortByKey: K) =>
  (a: Country, b: Country): number =>
    (a[sortByKey] as number) - (b[sortByKey] as number);

export const formatCountryData = ({
  name,
  population,
  area,
  region,
  subregion,
  capital,
  languages,
  currencies,
  flags,
  maps,
  independent,
  status,
  unMember,
  landlocked,
  timezones,
  fifa,
}: CountryRaw): Country => ({
  name: name.common,
  population,
  area,
  region,
  subregion,
  capital,
  languages,
  currencies,
  flags,
  maps,
  independent,
  status,
  unMember,
  landlocked,
  timezones,
  fifa,
});

// Define a palette of visually distinct colors
const CHART_COLORS = [
  '#e63946', // red
  '#2a9d8f', // teal
  '#f77f00', // orange
  '#06ffa5', // mint
  '#7209b7', // purple
  '#fbca04', // yellow
  '#2196f3', // blue
  '#d62828', // crimson
  '#52b788', // green
  '#f72585', // pink
];

// Improved deterministic color function
export function getCountryColor(countryName: string): string {
  // Create hash from country name
  let hash = 0;
  for (let i = 0; i < countryName.length; i++) {
    hash = (hash << 5) - hash + countryName.charCodeAt(i);
    hash = hash & hash;
  }

  // Map to color palette
  const index = Math.abs(hash) % CHART_COLORS.length;
  return CHART_COLORS[index];
}

export function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const h = Math.abs(hash % 360);
  const s = 75 + (hash % 20); // Saturation (75-95%) - more vibrant
  const l = 45 + (hash % 15); // Lightness (45-60%) - richer colors

  return `hsl(${h}, ${s}%, ${l}%)`;
}

export const stringToColorCountry = (
  area: { area_id: number; area_name: string; area_code: string },
  index: number
) => {
  // Use a combination of area name and code to ensure distinct colors
  const baseString = area.area_name + area.area_code + area.area_id + index;
  return stringToColor(baseString);
};

export function calculateStats(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  const q1 = d3.quantile(sorted, 0.25) || 0;
  const q3 = d3.quantile(sorted, 0.75) || 0;
  const iqr = q3 - q1; // Interquartile range

  return {
    min: d3.min(values) || 0,
    max: d3.max(values) || 0,
    median: d3.median(values) || 0,
    q1,
    q3,
    iqr,
  };
}

export function getBalancedYDomain(stats: any) {
  // Calculate bounds outside which values are considered outliers
  const lowerOutlierBound = stats.q1 - 1.5 * stats.iqr;
  const upperOutlierBound = stats.q3 + 1.5 * stats.iqr;

  // Get min and max excluding extreme outliers
  const minVal = Math.min(lowerOutlierBound, stats.min);
  const maxVal = Math.max(upperOutlierBound, stats.max);

  // Calculate padding to avoid lines touching top/bottom
  const padding = (maxVal - minVal) * 0.1;

  // Ensure zero is always included in the domain
  let min = Math.min(0, minVal - padding);
  let max = Math.max(0, maxVal + padding);

  // If domain is too small, provide minimum range
  if (max - min < 10) {
    min = Math.min(min, -5);
    max = Math.max(max, 5);
  }

  return [min, max];
}
