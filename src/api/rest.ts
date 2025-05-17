import axios from 'axios';
import type { CountryRaw, Country } from '@/types';
import config from '@/config';

export const getAllCountryData = async (): Promise<CountryRaw[]> => {
  const response = await axios.get<CountryRaw[]>(
    config.URL.API.ALL_COUNTRY_DATA
  );
  return response.data;
};
