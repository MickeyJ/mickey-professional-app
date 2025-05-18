import axios from "axios";

import config from "@/config";
import type { Country, CountryRaw } from "@/types";

export const getAllCountryData = async (): Promise<CountryRaw[]> => {
  const response = await axios.get<CountryRaw[]>(config.URL.API.ALL_COUNTRY_DATA);
  return response.data;
};
