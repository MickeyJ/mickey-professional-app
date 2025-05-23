import axios from 'axios';

import config from '@/config';
import type { CountryRaw, EmailFormFields } from '@/types';

export const getAllCountryData = async (): Promise<CountryRaw[]> => {
  const response = await axios.get<CountryRaw[]>(config.URL.API.ALL_COUNTRY_DATA);
  return response.data;
};

export const sendEmail = async (emailFormFields: EmailFormFields): Promise<unknown> => {
  const response = await axios.post(config.URL.API.SEND_EMAIL, emailFormFields);
  return response.data;
};
