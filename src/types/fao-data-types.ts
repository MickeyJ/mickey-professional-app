export interface FAOMarketIntegrationItems {
  items: FAOMarketIntegrationItem[];
}

export interface FAOMarketIntegrationItem {
  id: number;
  name: string;
  item_code: string;
  cpc_code: string;
  price_points: number;
  countries_with_data: number;
  years_with_data: number;
  earliest_year: number;
  latest_year: number;
  avg_points_per_country: number;
}

export interface FAOMarketIntegrationCountries {
  item_code: string;
  year_range: string;
  countries: FAOMarketIntegrationCountry[];
  total_countries: number;
}

export interface FAOMarketIntegrationCountry {
  id: number;
  country_name: string;
  area_code: string;
  years_with_data: number;
  year_range: string;
  avg_price: number;
  volatility: number;
}

export interface FAOMarketIntegration {
  item: {
    code: string;
    name: string;
  };
  analysis_period: {
    start_year: number;
    end_year: number;
  };
  countries_analyzed: number;
  comparisons_count: number;
  comparisons: FAOMarketIntegrationComparison[];
}

export interface FAOMarketIntegrationComparison {
  country_pair: {
    country1: {
      name: string;
      code: string;
    };
    country2: {
      name: string;
      code: string;
    };
  };
  metrics: {
    years_compared: number;
    avg_ratio: number;
    volatility: number;
    min_ratio: number;
    max_ratio: number;
    integration_level: string;
  };
  time_series: string; // JSON string of time series data
}
