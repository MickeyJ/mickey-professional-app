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
  area_id: number;
  area_name: string;
  area_code: string;
  years_with_data: number;
  year_range: string;
  avg_price: number;
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

interface FAOPairCountry {
  area_id: number;
  area_name: string;
  area_code: string;
}

export interface FAOMarketIntegrationComparison {
  country_pair: {
    country1: FAOPairCountry;
    country2: FAOPairCountry;
  };
  metrics: {
    years_compared: number;
    avg_ratio: number;
    volatility: number;
    min_ratio: number;
    max_ratio: number;
    integration_level: string;
  };
  calculated_metrics: {
    correlation: number;
    correlation_based_integration: string;
    ratio_based_integration: number;
  };
  time_series: Array<{
    year: number;
    price1: number;
    price2: number;
    ratio: number;
  }>;
}

export interface FAOAreasResponse {
  available_areas: FAOArea[];
}

export interface FAOArea {
  area_id: number;
  area_name: string;
  area_code: string;
  currency: string;
  data_points: number;
  earliest_year: number;
  latest_year: number;
}

export interface FAOMultiLineChartDataPoint {
  year: number;
  price_per_t: number;
  price_per_kg: number;
  price_per_lb: number;
}

export interface FAOMultiLineChartDataLine {
  area_name: string;
  area_code: number;
  currency: string;
  data_points: FAOMultiLineChartDataPoint[];
}

export interface FAOMultiLineChartData {
  item: {
    name: string;
    code: string;
  };
  parameters: {
    requested_areas: number[];
    year_start: number;
    year_end: number;
  };
  lines: FAOMultiLineChartDataLine[];
  summary: {
    min_price: number;
    max_price: number;
    min_year: number;
    max_year: number;
    areas_found: number;
    total_data_points: number;
  };
  currencies: string[];
  quantities: string;
  note: string;
}
