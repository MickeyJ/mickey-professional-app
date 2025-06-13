import { faoApi } from '@/config';
import type {
  FAOMarketIntegrationComparisonData,
  FAOMarketIntegrationCorrelationData,
  FAOMarketIntegrationCountries,
  FAOMarketIntegrationItems,
  // FAOMultiLineChartData,
} from '@/types';

export const getFAOMarketIntegrationItems = async (
  elementCode: string
): Promise<FAOMarketIntegrationItems> => {
  const url = `/v1/market-integration/items?element_code=${elementCode}`;
  console.log(`\n📨 ITEMS - ${url}`);
  const response = await faoApi.get<FAOMarketIntegrationItems>(url);
  return response.data;
};

export const getFAOMarketIntegrationCountries = async (
  itemCode: string,
  elementCode: string
): Promise<FAOMarketIntegrationCountries> => {
  const url = `/v1/market-integration/available-countries?item_code=${itemCode}&element_code=${elementCode}`;
  console.log(`\n📨 COUNTRIES - ${url}`);
  const response = await faoApi.get<FAOMarketIntegrationCountries>(url);
  return response.data;
};

export const getFAOMarketIntegrationComparisonData = async (
  itemCode: string,
  elementCode: string,
  areaCodes: string[]
): Promise<FAOMarketIntegrationComparisonData> => {
  // areaCodes looks like: 'area_codes=123&area_codes=456'

  const areaCodeQueries = areaCodes.map((code) => `area_codes=${code}`).join('&');
  const url = `/v1/market-integration/comparison?item_code=${itemCode}&element_code=${elementCode}&year_start=1990&year_end=2024&${areaCodeQueries}`;
  console.log(`\n📨 COMPARISON - ${url}`);
  const response = await faoApi.get<FAOMarketIntegrationComparisonData>(url);
  return response.data;
};

export const getFAOMarketIntegrationCorrelationsData = async (
  itemCode: string,
  elementCode: string,
  areaCodes: string[]
): Promise<FAOMarketIntegrationCorrelationData> => {
  const areaCodeQueries = areaCodes.map((code) => `area_codes=${code}`).join('&');
  const url = `/v1/market-integration/correlations?item_code=${itemCode}&element_code=${elementCode}&${areaCodeQueries}`;
  console.log(`\n📨 CORRELATIONS - ${url}`);
  const response = await faoApi.get<FAOMarketIntegrationCorrelationData>(url);
  return response.data;
};
