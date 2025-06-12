'use client';

import { useEffect, useState } from 'react';

import { MultiSelectSearch } from '@/_components/fao/ui/multiselect-search';
import { SelectSearch } from '@/_components/fao/ui/select-search';
import { YearRangeSlider } from '@/_components/fao/ui/year-range-slider';
import { getFAOAreasForItem, getFoodOasisItems } from '@/api';
import { stringToColorCountry } from '@/lib/utils';
import type { FAOArea, FoodOasisDataItem } from '@/types';
import FoodDataChartContainer from './chart-container';

export default function PriceComparisonContainer() {
  // const [loadingData, setLoadingData] = useState<boolean>(false);
  // const [fetchError, setFetchError] = useState<string>('');
  const [startYear, setStartYear] = useState<number>(1990);
  const [endYear, setEndYear] = useState<number>(2024);

  const [loadingItems, setLoadingItems] = useState<boolean>(false);
  const [itemsError, setItemsError] = useState<string>('');
  const [foodDataItems, setFoodDataItems] = useState<FoodOasisDataItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<FoodOasisDataItem | null>(null);

  const [loadingAreas, setLoadingAreas] = useState<boolean>(false);
  const [areasError, setAreasError] = useState<string>('');
  const [foodDataAreas, setFoodDataAreas] = useState<FAOArea[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<FAOArea[]>([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchItems = async () => {
      try {
        setItemsError('');
        setLoadingItems(true);
        const data = await getFoodOasisItems();
        console.log('Fetched Food Oasis Data Items:', data);
        console.log(data);

        setFoodDataItems(data.items);
      } catch (err: any) {
        console.error('Error fetching data for item:', err.message);
        setItemsError(err.response?.data.error.message || 'Error loading items');
      } finally {
        setLoadingItems(false);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    console.log(`Selected Item: ${selectedItem ? selectedItem.name : 'None'}`);

    const fetchDataForItem = async () => {
      if (selectedItem) {
        try {
          setLoadingAreas(true);
          const data = await getFAOAreasForItem(selectedItem.item_code);
          console.log('Fetched Data for Item:', data);
          setFoodDataAreas(data.available_areas);
        } catch (err: any) {
          console.error('Error fetching data for item:', err.message);
          setAreasError(err.response?.data.error.message || 'Error loading areas');
        } finally {
          setLoadingAreas(false);
          setAreasError('');
        }
      }
    };

    fetchDataForItem();
  }, [selectedItem]);

  return (
    <div className="mx-auto p-4">
      <div className="flex flex-row justify-start items-center gap-4">
        <div className="form-field max-w-[250]">
          <SelectSearch
            loading={loadingItems}
            error={itemsError}
            options={foodDataItems.map((item) => ({
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

              return setSelectedItem(foodDataItems.find((item) => item.item_code == value) || null);
            }}
          />
        </div>
        <div className="form-field ">
          <MultiSelectSearch
            maxSelected={5}
            placeholder="Select up to 5 countries"
            showSelectedMessage={`${selectedAreas.length} ${selectedAreas.length === 1 ? 'country' : 'countries'} selected`}
            loading={loadingAreas}
            error={areasError}
            options={foodDataAreas.map((area) => ({
              label: area.area_name,
              value: area.area_code.toString(),
            }))}
            selected={selectedAreas.map((selectedArea) => ({
              label: selectedArea.area_name,
              value: selectedArea.area_code.toString(),
            }))}
            onSelect={(selectedOptions) =>
              setSelectedAreas(
                foodDataAreas.filter((area) =>
                  selectedOptions.some((option) => option.value === area.area_code)
                )
              )
            }
            getItemColor={(item, i) => {
              const area = foodDataAreas.find(
                (area) => area.area_code.toString() === item.value
              ) as FAOArea;
              return stringToColorCountry(area, i);
            }}
          />
        </div>
        <div className="form-field flex-1"></div>
      </div>

      <FoodDataChartContainer
        selectedItem={selectedItem}
        selectedAreas={selectedAreas}
        startYear={startYear}
        endYear={endYear}
      />
      <YearRangeSlider
        startYear={startYear}
        endYear={endYear}
        setStartYear={setStartYear}
        setEndYear={setEndYear}
      />
    </div>
  );
}
