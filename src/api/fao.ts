import { faoApi } from '@/config';
import type {
  FAOMarketIntegration,
  FAOMarketIntegrationCountries,
  FAOMarketIntegrationItems,
} from '@/types';

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
