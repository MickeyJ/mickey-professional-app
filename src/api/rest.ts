import axios from 'axios';

import config from '@/config';
import type { CountryRaw, EmailFormFields, FoodOasisMultiLineChartData } from '@/types';

export const getAllCountryData = async (): Promise<CountryRaw[]> => {
  const response = await axios.get<CountryRaw[]>(config.URL.API.ALL_COUNTRY_DATA);
  return response.data;
};

export const sendEmail = async (emailFormFields: EmailFormFields): Promise<unknown> => {
  const response = await axios.post(config.URL.API.SEND_EMAIL, emailFormFields);
  return response.data;
};

export const getFoodOasisItems = async (): Promise<unknown> => {
  const response = await axios.get(`${config.URL.API.FOOD_OASIS}/v1/data/items`);
  return response.data;
};

export const getFoodOasisAreasForItem = async (itemCode: number): Promise<unknown> => {
  const response = await axios.get(
    `${config.URL.API.FOOD_OASIS}/v1/data/available-data-for-item?item_code=${itemCode}`
  );
  return response.data;
};

export const getFoodOasisChartData = async (
  itemCode: number,
  areaCodes: number[]
): Promise<FoodOasisMultiLineChartData> => {
  // areaCodes looks like: 'area_codes=123&area_codes=456'
  const areaCodeQueries = areaCodes.map((code) => `area_codes=${code}`).join('&');
  const response = await axios.get<FoodOasisMultiLineChartData>(
    `${config.URL.API.FOOD_OASIS}/v1/viz/multi-line-price-trends?item_code=${itemCode}&${areaCodeQueries}`
  );
  return response.data;
};
