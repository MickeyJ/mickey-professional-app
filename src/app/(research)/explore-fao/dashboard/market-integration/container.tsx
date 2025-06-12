'use client';

import { useEffect, useRef, useState } from 'react';

import MarketIntegrationChart from '@/_components/fao/charts/market-integration-chart-timeline';
import { MultiSelectSearch } from '@/_components/fao/ui/multiselect-search';
import { SelectSearch } from '@/_components/fao/ui/select-search';
// import { YearRangeSlider } from '@/_components/fao/ui/year-range-slider';
import {
  getFAOMarketIntegrationCountries,
  getFAOMarketIntegrationData,
  getFAOMarketIntegrationItems,
} from '@/api';
import { stringToColorCountry } from '@/lib/utils';
import type {
  FAOMarketIntegration,
  // FAOMarketIntegrationComparison,
  FAOMarketIntegrationCountry,
  FAOMarketIntegrationItem,
} from '@/types';

export default function MarketIntegrationContainer() {
  const [loadingIntegrationData, setLoadingIntegrationData] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string>('');
  const [marketIntegrationData, setMarketIntegrationData] = useState<FAOMarketIntegration | null>(
    null
  );

  const [loadingItems, setLoadingItems] = useState<boolean>(false);
  const [itemsError, setItemsError] = useState<string>('');
  const [faoItems, setFAOItems] = useState<FAOMarketIntegrationItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<FAOMarketIntegrationItem | null>(null);

  const [loadingCountries, setLoadingCountries] = useState<boolean>(false);
  const [countriesError, setCountriesError] = useState<string>('');
  const [faoCountries, setFAOCountries] = useState<FAOMarketIntegrationCountry[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<FAOMarketIntegrationCountry[]>([]);
  const prevSelectedCountriesRef = useRef(selectedCountries);

  useEffect(() => {
    // Fetch data from the API
    const fetchItems = async () => {
      try {
        setLoadingItems(true);
        setItemsError('');
        const data = await getFAOMarketIntegrationItems();
        console.log('Fetched FAO Items:', data);
        console.log(data);

        setFAOItems(data.items);
      } catch (err: any) {
        console.error('Error fetching data for item:', err);
        setItemsError(err.response?.data.error.message || 'Error loading items');
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
        setCountriesError('');
        const data = await getFAOMarketIntegrationCountries(selectedItem.item_code);
        console.log('Fetched FAO Items:', data);
        console.log(data);

        setFAOCountries(data.countries);
      } catch (err: any) {
        console.error('Error fetching data for item:', err.message);
        setCountriesError(err.response?.data.error.message || 'Error loading countries');
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
          setMarketIntegrationData(data);
        } catch (err: any) {
          console.error('Error fetching chart data:', err);
          setFetchError(err.response.data.error.message);
          setMarketIntegrationData(null);
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
      <div className="flex flex-row justify-start items-center gap-4">
        <div className="form-field max-w-[250]">
          <SelectSearch
            loading={loadingItems}
            error={itemsError}
            options={faoItems.map((item) => ({
              label: item.name,
              value: item.item_code,
            }))}
            selected={
              selectedItem ? { label: selectedItem.name, value: selectedItem.item_code } : null
            }
            onSelect={(value) => {
              console.log(`Selected item value: ${value}`);

              return setSelectedItem(faoItems.find((item) => item.item_code == value) || null);
            }}
          />
        </div>
        <div className="form-field">
          <MultiSelectSearch
            maxSelected={4}
            placeholder="Select up to 4 countries"
            showSelectedMessage={`${selectedCountries.length} ${selectedCountries.length === 1 ? 'country' : 'countries'} selected`}
            loading={loadingCountries}
            error={countriesError}
            options={faoCountries.map((area) => ({
              label: `${area.area_name} ($${area.avg_price})`,
              value: area.area_code,
            }))}
            selected={selectedCountries.map((selectedArea) => ({
              label: `${selectedArea.area_name} ($${selectedArea.avg_price})`,
              value: selectedArea.area_code,
            }))}
            onSelect={(selectedOptions) =>
              setSelectedCountries(
                faoCountries.filter((area) =>
                  selectedOptions.some((option) => option.value === area.area_code)
                )
              )
            }
            getItemColor={(item, i) => {
              const area = faoCountries.find(
                (area) => area.area_code.toString() === item.value
              ) as FAOMarketIntegrationCountry;
              return stringToColorCountry(area, i);
            }}
          />
        </div>
      </div>
      {loadingIntegrationData && !marketIntegrationData && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">Loading market integration data...</p>
        </div>
      )}
      {marketIntegrationData ? (
        <MarketIntegrationChart
          data={marketIntegrationData}
          loading={loadingIntegrationData}
          width={800}
          height={500}
        />
      ) : (
        <div className="h-[300] m-auto flex items-center justify-center">
          <p className="text-sm text-gray-500">
            Select an item and at least two countries to view market integration data.
          </p>
        </div>
      )}
      {fetchError && (
        <div className="mt-4">
          <p className="text-sm text-error">Error: {fetchError}</p>
        </div>
      )}
    </div>
  );
}
