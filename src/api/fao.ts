import { faoApi } from '@/config';
import type {
  FAOAreasResponse,
  FAOMarketIntegration,
  FAOMarketIntegrationCountries,
  FAOMarketIntegrationItems,
  FAOMultiLineChartData,
} from '@/types';

export const getFAOAreasForItem = async (itemCode: string): Promise<FAOAreasResponse> => {
  const response = await faoApi.get<FAOAreasResponse>(
    `/v1/prices/multi-line/available-areas?item_code=${itemCode}`
  );
  return response.data;
};

export const getFAOMultiLineChartData = async (
  itemCode: string,
  areaCodes: string[]
): Promise<FAOMultiLineChartData> => {
  // areaCodes looks like: 'area_codes=123&area_codes=456'
  const areaCodeQueries = areaCodes.map((code) => `area_codes=${code}`).join('&');
  const response = await faoApi.get<FAOMultiLineChartData>(
    `/v1/prices/multi-line/price-data?item_code=${itemCode}&year_start=1990&year_end=2024&${areaCodeQueries}`
  );
  return response.data;
};

export const getFAOMarketIntegrationItems = async (): Promise<FAOMarketIntegrationItems> => {
  const response = await faoApi.get<FAOMarketIntegrationItems>(
    `/v1/prices/market-integration/items`
  );
  return response.data;
};

export const getFAOMarketIntegrationCountries = async (
  itemCode: string
): Promise<FAOMarketIntegrationCountries> => {
  const response = await faoApi.get<FAOMarketIntegrationCountries>(
    `/v1/prices/market-integration/available-countries?item_code=${itemCode}`
  );
  return response.data;
};

export const getFAOMarketIntegrationData = async (
  itemCode: string,
  areaCodes: string[]
): Promise<FAOMarketIntegration> => {
  const areaCodeQueries = areaCodes.map((code) => `area_codes=${code}`).join('&');
  const response = await faoApi.get<FAOMarketIntegration>(
    `/v1/prices/market-integration/data?item_code=${itemCode}&${areaCodeQueries}`
  );
  return response.data;
};
