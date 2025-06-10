import axios from 'axios';

import config from '@/config';
import type {
  CountryRaw,
  EmailFormFields,
  FoodOasisDataAreasResponse,
  FoodOasisDataItemResponse,
  FoodOasisMultiLineChartData,
  USDAFoodSearchData,
} from '@/types';

export const getAllCountryData = async (): Promise<CountryRaw[]> => {
  const response = await axios.get<CountryRaw[]>(config.URL.API.ALL_COUNTRY_DATA);
  return response.data;
};

export const sendEmail = async (emailFormFields: EmailFormFields): Promise<unknown> => {
  const response = await axios.post(config.URL.API.SEND_EMAIL, emailFormFields);
  return response.data;
};

export const getFoodOasisItems = async (): Promise<FoodOasisDataItemResponse> => {
  const response = await axios.get<FoodOasisDataItemResponse>(
    `${config.URL.API.FOOD_OASIS}/v1/prices/multi-line/items`
  );
  return response.data;
};

export const getFoodOasisAreasForItem = async (
  itemCode: string
): Promise<FoodOasisDataAreasResponse> => {
  const response = await axios.get<FoodOasisDataAreasResponse>(
    `${config.URL.API.FOOD_OASIS}/v1/prices/multi-line/available-areas?item_code=${itemCode}`
  );
  return response.data;
};

export const getFoodOasisChartData = async (
  itemCode: string,
  areaCodes: string[]
): Promise<FoodOasisMultiLineChartData> => {
  // areaCodes looks like: 'area_codes=123&area_codes=456'
  const areaCodeQueries = areaCodes.map((code) => `area_codes=${code}`).join('&');
  const response = await axios.get<FoodOasisMultiLineChartData>(
    `${config.URL.API.FOOD_OASIS}/v1/prices/multi-line/price-data?item_code=${itemCode}&year_start=1990&year_end=2024&${areaCodeQueries}`
  );
  return response.data;
};

export const getUSDAFoodsSearch = async (query: string = ''): Promise<USDAFoodSearchData> => {
  const dataTypes = ['Branded', 'Foundation', 'Survey (FNDDS)', 'SR Legacy'];
  const dataTypeQuery = encodeURIComponent(dataTypes.join(','));
  const response = await axios.get<USDAFoodSearchData>(
    `${config.URL.API.USDA_FOOD}/foods/search?api_key=${process.env.NEXT_PUBLIC_USDA_API_KEY}&pageSize=200&query=${query}&dataType=${dataTypeQuery}`
  );
  return response.data;
};
