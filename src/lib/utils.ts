import type { Country, CountryRaw } from '@/types';
import * as d3 from 'd3';

export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

export const d3FormatBillions = (fs: string) => (s: number) =>
  d3.format(fs)(s).replace(/G/, 'B');

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
