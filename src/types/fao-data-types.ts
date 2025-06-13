/*
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * Market Integration Supporting Data Types
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * Countries (AreaCodes)
 * Items (ItemCodes)
 */

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

// This interface is used to pass props to the Market Integration Container components
// such as PriceCorrelationContainer and PriceComparisonContainer
export interface FAOMarketIntegrationContainerProps {
  selectedItem: FAOMarketIntegrationItem | null;
  selectedElement: { label: string; value: string };
  selectedCountries: FAOMarketIntegrationCountry[];
}

/*
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * Market Integration CORRELATIONS Data Types
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 */

export interface FAOMarketIntegrationCorrelationData {
  element_code: string;
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
  comparisons: FAOMarketIntegrationCorrelationPair[];
}

interface FAOMarketIntegrationCorrelationPairCountry {
  area_id: number;
  area_name: string;
  area_code: string;
}

export interface FAOMarketIntegrationCorrelationPair {
  country_pair: {
    country1: FAOMarketIntegrationCorrelationPairCountry;
    country2: FAOMarketIntegrationCorrelationPairCountry;
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

/*
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * Market Integration COMPARISON Data Types
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 */

export interface FAOMarketIntegrationComparisonData {
  item: {
    name: string;
    code: string;
  };
  parameters: {
    requested_areas: number[];
    year_start: number;
    year_end: number;
  };
  lines: FAOMarketIntegrationComparisonDataLine[];
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

export interface FAOMarketIntegrationComparisonDataPoint {
  year: number;
  price_per_t: number;
  price_per_kg: number;
  price_per_lb: number;
}

export interface FAOMarketIntegrationComparisonDataLine {
  area_id: number;
  area_name: string;
  area_code: string;
  currency: string;
  data_points: FAOMarketIntegrationComparisonDataPoint[];
}
