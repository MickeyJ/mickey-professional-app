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

export function stringToColor(str: string): string {
  // Generate a hash from the string
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert hash to a color with good saturation and brightness
  const h = Math.abs(hash % 360); // Hue (0-360)
  const s = 65 + (hash % 20); // Saturation (65-85%)
  const l = 55 + (hash % 10); // Lightness (55-65%)

  return `hsl(${h}, ${s}%, ${l}%)`;
}

// Also add the functions to calculate stats and balanced domain:

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
