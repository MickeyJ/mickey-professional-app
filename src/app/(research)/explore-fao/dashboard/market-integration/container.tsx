'use client';

import { useEffect, useRef, useState } from 'react';

import { MultiSelectSearch } from '@/_components/fao/ui/multiselect-search';
import { SelectSearch } from '@/_components/fao/ui/select-search';
// import { YearRangeSlider } from '@/_components/fao/ui/year-range-slider';
import {
  getFAOMarketIntegrationCountries,
  getFAOMarketIntegrationData,
  getFAOMarketIntegrationItems,
} from '@/api';
import type {
  FAOMarketIntegration,
  // FAOMarketIntegrationComparison,
  FAOMarketIntegrationCountry,
  FAOMarketIntegrationItem,
} from '@/types';

export default function MarketIntegrationContainer() {
  // const [fetchError, setFetchError] = useState<string>('');

  const [faoItems, setFAOItems] = useState<FAOMarketIntegrationItem[]>([]);
  const [faoCountries, setFAOCountries] = useState<FAOMarketIntegrationCountry[]>([]);
  const [loadingItems, setLoadingItems] = useState<boolean>(false);
  const [loadingCountries, setLoadingCountries] = useState<boolean>(false);
  const [loadingIntegrationData, setLoadingIntegrationData] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<FAOMarketIntegrationItem | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<FAOMarketIntegrationCountry[]>([]);
  const prevSelectedCountriesRef = useRef(selectedCountries);
  const [marketIntegrationData, setMarketIntegrationData] = useState<FAOMarketIntegration | null>(
    null
  );

  useEffect(() => {
    // Fetch data from the API
    const fetchItems = async () => {
      try {
        setLoadingItems(true);
        // setFetchError('');
        const data = await getFAOMarketIntegrationItems();
        console.log('Fetched FAO Items:', data);
        console.log(data);

        setFAOItems(data.items);
      } catch (err: any) {
        console.error('Error fetching data for item:', err.message);
        // setFetchError(err.message);
      } finally {
        setLoadingItems(false);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    // Fetch data from the API
    if (!selectedItem) {
      // setFAOCountries([]);
      return;
    }
    const fetchCountries = async () => {
      try {
        setLoadingCountries(true);
        // setFetchError('');
        const data = await getFAOMarketIntegrationCountries(selectedItem.item_code);
        console.log('Fetched FAO Items:', data);
        console.log(data);

        setFAOCountries(data.countries);
      } catch (err: any) {
        console.error('Error fetching data for item:', err.message);
        // setFetchError(err.message);
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchCountries();
  }, [selectedItem]);

  useEffect(() => {
    const prevSelectedAreas = prevSelectedCountriesRef.current;

    if (selectedItem && selectedCountries.length > 1) {
      const fetchMarketIntegrationData = async () => {
        if (prevSelectedAreas.length < selectedCountries.length) {
          setLoadingIntegrationData(true);
        }

        try {
          const data = await getFAOMarketIntegrationData(
            selectedItem.item_code,
            selectedCountries.map((area) => area.area_code)
          );
          console.log('Fetched Chart Data:', data);
          setMarketIntegrationData(data);
        } catch (err: any) {
          console.error('Error fetching chart data:', err.detail.message);
          // setFetchError(err.detail.message);
        } finally {
          setLoadingIntegrationData(false);
        }
      };

      fetchMarketIntegrationData();
    } else {
      setMarketIntegrationData(null); // Reset chart data if no item or areas are selected
    }
    prevSelectedCountriesRef.current = selectedCountries;
  }, [selectedItem, selectedCountries]);

  return (
    <div className="mx-auto p-4">
      <div className="flex flex-row justify-between items-center gap-4">
        <div className="form-field max-w-[200]">
          <SelectSearch
            loading={loadingItems}
            options={faoItems.map((item) => ({
              label: item.name,
              value: item.item_code.toString(),
            }))}
            selected={
              selectedItem
                ? { label: selectedItem.name, value: selectedItem.item_code.toString() }
                : null
            }
            onSelect={(value) => {
              console.log(`Selected item value: ${value}`);

              return setSelectedItem(faoItems.find((item) => item.item_code == value) || null);
            }}
          />
        </div>
        <div className="form-field flex-1">
          <MultiSelectSearch
            maxSelected={5}
            showSelectedCount={true}
            loading={loadingCountries}
            options={faoCountries.map((area) => ({
              label: area.country_name,
              value: area.area_code.toString(),
            }))}
            selected={selectedCountries.map((selectedArea) => ({
              label: selectedArea.country_name,
              value: selectedArea.area_code.toString(),
            }))}
            onSelect={(selectedOptions) =>
              setSelectedCountries(
                faoCountries.filter((area) =>
                  selectedOptions.some((option) => option.value === area.area_code)
                )
              )
            }
          />
        </div>
      </div>
      {loadingIntegrationData && !marketIntegrationData ? (
        <div className="mt-4">
          <p className="text-sm text-gray-500">Loading market integration data...</p>
        </div>
      ) : (
        <p>Countries Analyzed: {marketIntegrationData?.countries_analyzed}</p>
      )}
    </div>
  );
}
