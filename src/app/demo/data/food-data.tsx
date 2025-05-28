'use client';

import { useEffect, useState } from 'react';

import { MultiSelectSearch } from '@/_components/ui/multiselect-search';
import { SelectSearch } from '@/_components/ui/select-search';
import { getFoodOasisAreasForItem, getFoodOasisItems } from '@/api';
import type { FoodOasisDataArea, FoodOasisDataItem } from '@/types';
import FoodDataChartContainer from './food-data-chart-container';

export default function FoodDataPage() {
  // const [loadingData, setLoadingData] = useState<boolean>(false);
  // const [fetchError, setFetchError] = useState<string>('');
  const [foodDataItems, setFoodDataItems] = useState<FoodOasisDataItem[]>([]);
  const [loadingItems, setLoadingItems] = useState<boolean>(false);
  const [foodDataAreas, setFoodDataAreas] = useState<FoodOasisDataArea[]>([]);
  const [loadingAreas, setLoadingAreas] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<FoodOasisDataItem | null>(null);
  const [selectedAreas, setSelectedAreas] = useState<FoodOasisDataArea[]>([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchItems = async () => {
      try {
        setLoadingItems(true);
        // setFetchError('');
        const data = await getFoodOasisItems();
        console.log('Fetched Food Oasis Data Items:', data);
        console.log(data);

        setFoodDataItems(data.items);
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
    const fetchDataForItem = async () => {
      if (selectedItem) {
        setLoadingAreas(true);
        // setFetchError('');

        try {
          const data = await getFoodOasisAreasForItem(selectedItem.item_code);
          console.log('Fetched Data for Item:', data);
          setFoodDataAreas(data.available_areas);
        } catch (err: any) {
          console.error('Error fetching data for item:', err.message);
          // setFetchError(err.message);
        } finally {
          setLoadingAreas(false);
        }
      }
    };

    fetchDataForItem();
  }, [selectedItem]);

  return (
    <div className="mx-auto p-4">
      <div className="flex flex-row justify-between items-center mb-2 gap-4">
        <div className="form-field">
          <SelectSearch
            loading={loadingItems}
            options={foodDataItems.map((item) => ({
              label: item.name,
              value: item.item_code.toString(),
            }))}
            selected={
              selectedItem
                ? { label: selectedItem.name, value: selectedItem.item_code.toString() }
                : null
            }
            onSelect={(value) =>
              setSelectedItem(
                foodDataItems.find((item) => item.item_code === Number(value)) || null
              )
            }
          />
        </div>
        <div className="form-field">
          <MultiSelectSearch
            maxSelected={5}
            loading={loadingAreas}
            options={foodDataAreas.map((area) => ({
              label: area.name,
              value: area.area_code.toString(),
            }))}
            selected={selectedAreas.map((selectedArea) => ({
              label: selectedArea.name,
              value: selectedArea.area_code.toString(),
            }))}
            onSelect={(selectedOptions) =>
              setSelectedAreas(
                foodDataAreas.filter((area) =>
                  selectedOptions.some((option) => option.value === area.area_code.toString())
                )
              )
            }
          />
        </div>
      </div>
      <FoodDataChartContainer
        selectedItem={selectedItem}
        selectedAreas={selectedAreas}
      />
    </div>
  );
}
