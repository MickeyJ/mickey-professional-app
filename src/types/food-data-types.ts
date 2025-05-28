export interface FoodOasisDataItem {
  id: number;
  name: string;
  item_code: number;
}

export interface FoodOasisDataArea {
  name: string;
  area_code: number;
  currency: string;
  data_points: number;
  earliest_year: number;
  latest_year: number;
}

export interface FoodOasisMultiLineChartDataPoint {
  year: number;
  price_per_t: number;
  price_per_kg: number;
  price_per_lb: number;
}

export interface FoodOasisMultiLineChartDataLine {
  area_name: string;
  area_code: number;
  currency: string;
  data_points: FoodOasisMultiLineChartDataPoint[];
}

export interface FoodOasisMultiLineChartData {
  item: {
    name: string;
    code: number;
  };
  parameters: {
    requested_areas: number[];
    year_start: number;
    year_end: number;
  };
  lines: FoodOasisMultiLineChartDataLine[];
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
