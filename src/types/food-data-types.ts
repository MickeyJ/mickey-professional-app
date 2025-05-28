export interface USDAFoodItemNutrient {
  nutrientId: number;
  nutrientName: string;
  nutrientNumber: string;
  unitName: string;
  derivationCode: string;
  derivationDescription: string;
  derivationId: number;
  value: number;
  foodNutrientSourceId: number;
  foodNutrientSourceCode: string;
  foodNutrientSourceDescription: string;
  rank: number;
  foodNutrientId: number;
}

export interface FinalFoodInputFood {
  foodDescription: string;
  gramWeight: number;
  id: number;
  portionCode: string;
  portionDescription: string;
  unit: number;
  rank: number;
  srCode: number;
  value: number;
}

export interface FoodMeasure {
  disseminationText: string; // e.g., "1 cup"
  gramWeight: number; // e.g., 240
  id: number; // e.g., 297249
  measureUnitAbbreviation: string; // "undetermined" ??
  measureUnitId: number; // e.g., 9999
  measureUnitName: string; // "undetermined" ??
  modifier: string; // e.g., "10205" ??
}

// Actual Brand Name Product
export interface FoodAttribute {
  id: number;
  value: string; // name of the product - e.g., "Coca-Cola"
  sequenceNumber: number; // sequence number indicates an actual brand name product
}

// Specific Food Attribute Type that includes brand name examples
export interface FoodAttributeType {
  name: 'Additional Description';
  id: 1001;
  foodAttributes: FoodAttribute[];
}

export interface USDAFoodItem {
  fdcId: number;
  description: string;
  commonNames: string;
  additionalDescriptions: string;
  dataType: 'Branded' | 'Survey (FNDDS)' | 'Foundation' | 'SR Legacy';
  brandOwner: string;
  brandName: string;
  ingredients: string;
  marketCountry: string;
  foodCategory: string;
  servingSizeUnit: string;
  servingSize: number;
  publishedDate: string;
  tradeChannels: string[];
  foodNutrients: USDAFoodItemNutrient[];
  finalFoodInputFoods: FinalFoodInputFood[];
  foodAttributeTypes: FoodAttributeType[];
  foodMeasures: FoodMeasure[];
}

export interface USDAFoodSearchData {
  totalHits: number;
  currentPage: number;
  totalPages: number;
  pageList: number[];
  foodSearchCriteria: {
    query: string;
    generalSearchInput: string;
    pageNumber: number;
    numberOfResultsPerPage: number;
    pageSize: number;
  };
  foods: USDAFoodItem[];
}

export interface FoodOasisDataItemResponse {
  items: FoodOasisDataItem[];
}

export interface FoodOasisDataAreasResponse {
  available_areas: FoodOasisDataArea[];
}

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
