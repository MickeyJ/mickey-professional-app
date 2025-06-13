import { faoApi } from '@/config';
import type {
  FAOMarketIntegrationComparisonData,
  FAOMarketIntegrationCorrelationData,
  FAOMarketIntegrationCountries,
  FAOMarketIntegrationItems,
  // FAOMultiLineChartData,
} from '@/types';

export const getFAOMarketIntegrationComparisonData = async (
  itemCode: string,
  elementCode: string,
  areaCodes: string[]
): Promise<FAOMarketIntegrationComparisonData> => {
  // areaCodes looks like: 'area_codes=123&area_codes=456'
  const areaCodeQueries = areaCodes.map((code) => `area_codes=${code}`).join('&');
  const response = await faoApi.get<FAOMarketIntegrationComparisonData>(
    `/v1/market-integration/comparison?item_code=${itemCode}&element_code=${elementCode}&year_start=1990&year_end=2024&${areaCodeQueries}`
  );
  return response.data;
};

export const getFAOMarketIntegrationItems = async (
  elementCode: string
): Promise<FAOMarketIntegrationItems> => {
  const response = await faoApi.get<FAOMarketIntegrationItems>(
    `/v1/market-integration/items?element_code=${elementCode}`
  );
  return response.data;
};

export const getFAOMarketIntegrationCountries = async (
  itemCode: string,
  elementCode: string
): Promise<FAOMarketIntegrationCountries> => {
  const response = await faoApi.get<FAOMarketIntegrationCountries>(
    `/v1/market-integration/available-countries?item_code=${itemCode}&element_code=${elementCode}`
  );
  return response.data;
};

export const getFAOMarketIntegrationCorrelationsData = async (
  itemCode: string,
  elementCode: string,
  areaCodes: string[]
): Promise<FAOMarketIntegrationCorrelationData> => {
  const areaCodeQueries = areaCodes.map((code) => `area_codes=${code}`).join('&');
  const response = await faoApi.get<FAOMarketIntegrationCorrelationData>(
    `/v1/market-integration/correlations?item_code=${itemCode}&element_code=${elementCode}&${areaCodeQueries}`
  );
  return response.data;
};
