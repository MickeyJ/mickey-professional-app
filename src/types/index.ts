export type * from "./game-types";

export interface CountryRaw {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  population: number;
  area: number;
  region: string;
  subregion: string;
  capital: string[];
  languages: {
    [key: string]: string;
  };
  currencies: {
    [key: string]: {
      symbol: string;
      name: string;
    };
  };
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  independent: boolean;
  status: string;
  unMember: boolean;
  landlocked: boolean;
  timezones: string[];
  fifa: string;
}

export interface Country {
  name: string;
  population: number;
  area: number;
  region: string;
  subregion: string;
  capital: string[];
  languages: {
    [key: string]: string;
  };
  currencies: {
    [key: string]: {
      symbol: string;
      name: string;
    };
  };
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  independent: boolean;
  status: string;
  unMember: boolean;
  landlocked: boolean;
  timezones: string[];
  fifa: string;
}

export interface DataPoint {
  name: string;
  value: number;
}
