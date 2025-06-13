// app/market-integration/MarketIntegrationContext.tsx
'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { getFAOMarketIntegrationCountries, getFAOMarketIntegrationItems } from '@/api';
import type { FAOMarketIntegrationCountry, FAOMarketIntegrationItem } from '@/types';

interface MarketIntegrationContextType {
  // Items
  loadingItems: boolean;
  itemsError: string;
  faoItems: FAOMarketIntegrationItem[];
  selectedItem: FAOMarketIntegrationItem | null;
  setSelectedItem: (item: FAOMarketIntegrationItem | null) => void;

  // Countries
  loadingCountries: boolean;
  countriesError: string;
  faoCountries: FAOMarketIntegrationCountry[];
  selectedCountries: FAOMarketIntegrationCountry[];
  setSelectedCountries: (countries: FAOMarketIntegrationCountry[]) => void;

  faoElementOptions: { label: string; value: string }[];
  selectedElement: { label: string; value: string };
  setSelectedElement: (element: { label: string; value: string }) => void;
  isElementChanging: boolean;
  setIsElementChanging: (isChanging: boolean) => void;
}

const MarketIntegrationContext = createContext<MarketIntegrationContextType | undefined>(undefined);

const faoElementOptions = [
  {
    label: 'LCU',
    value: '5530',
  },
  {
    label: 'USD',
    value: '5532',
  },
];

export function MarketIntegrationProvider({ children }: { children: ReactNode }) {
  const [loadingItems, setLoadingItems] = useState<boolean>(false);
  const [itemsError, setItemsError] = useState<string>('');
  const [faoItems, setFAOItems] = useState<FAOMarketIntegrationItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<FAOMarketIntegrationItem | null>(null);

  const [loadingCountries, setLoadingCountries] = useState<boolean>(false);
  const [countriesError, setCountriesError] = useState<string>('');
  const [faoCountries, setFAOCountries] = useState<FAOMarketIntegrationCountry[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<FAOMarketIntegrationCountry[]>([]);

  const [isElementChanging, setIsElementChanging] = useState<boolean>(false);
  const [selectedElement, setSelectedElement] = useState<{ label: string; value: string }>(
    faoElementOptions[0]
  );

  // Fetch items on mount or when element changes
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoadingItems(true);
        setItemsError('');
        const data = await getFAOMarketIntegrationItems(selectedElement.value);
        setFAOItems(data.items);
      } catch (err: any) {
        console.error('Error fetching data for item:', err);
        setItemsError(err.response?.data.error.message || 'Error loading items');
      } finally {
        setLoadingItems(false);
      }
    };

    fetchItems();
  }, [selectedElement]);

  // Fetch countries when item changes
  useEffect(() => {
    if (!selectedItem) {
      setIsElementChanging(false);
      return;
    }

    const fetchCountries = async () => {
      try {
        setLoadingCountries(true);
        setCountriesError('');
        const data = await getFAOMarketIntegrationCountries(
          selectedItem.item_code,
          selectedElement.value
        );
        setFAOCountries(data.countries);
        // Filter selected countries to only keep those available for the new item
        setSelectedCountries((prevSelected) => {
          const validCountries = prevSelected.filter((selected) =>
            data.countries.some((country) => country.area_code === selected.area_code)
          );

          const removedCountries = prevSelected.filter(
            (selected) =>
              !data.countries.some((country) => country.area_code === selected.area_code)
          );

          if (removedCountries.length > 0) {
            console.log(
              '✂ MarketIntegrationProvider - Removed countries not available for new item:',
              removedCountries.map((c) => c.area_name).join(', ')
            );
          }

          return validCountries;
        });
      } catch (err: any) {
        console.error('Error fetching data for item:', err.message);
        setCountriesError(err.response?.data.error.message || 'Error loading countries');
        setSelectedCountries([]);
      } finally {
        setLoadingCountries(false);
        setIsElementChanging(false);
      }
    };

    fetchCountries();
  }, [selectedItem, selectedElement]);

  return (
    <MarketIntegrationContext.Provider
      value={{
        loadingItems,
        itemsError,
        faoItems,
        selectedItem,
        setSelectedItem,
        loadingCountries,
        countriesError,
        faoCountries,
        selectedCountries,
        setSelectedCountries,
        faoElementOptions,
        selectedElement,
        setSelectedElement,
        isElementChanging,
        setIsElementChanging,
      }}
    >
      {children}
    </MarketIntegrationContext.Provider>
  );
}

export function useMarketIntegration() {
  const context = useContext(MarketIntegrationContext);
  if (!context) {
    throw new Error('useMarketIntegration must be used within MarketIntegrationProvider');
  }
  return context;
}
