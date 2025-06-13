// app/market-integration/wrapper.tsx (or MarketIntegrationWrapper.tsx)
'use client';

import { MultiSelectSearch } from '@/_components/fao/ui/multiselect-search';
import { Select } from '@/_components/fao/ui/select';
import { SelectSearch } from '@/_components/fao/ui/select-search';
import { stringToColorCountry } from '@/lib/utils';
import type { FAOMarketIntegrationCountry } from '@/types';
import { useMarketIntegration } from './context';

export default function MarketIntegrationWrapper({ children }: { children: React.ReactNode }) {
  const {
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
  } = useMarketIntegration();

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
              setSelectedItem(faoItems.find((item) => item.item_code == value) || null);
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
            getItemColor={(item) => {
              const area = faoCountries.find(
                (area) => area.area_code.toString() === item.value
              ) as FAOMarketIntegrationCountry;
              if (!area || !faoCountries.length) return '#ccc'; // Default color if no countries are loaded
              return stringToColorCountry(area);
            }}
          />
        </div>
        <div className="form-field  max-w-[200]">
          <Select
            placeholder="Select Currency"
            options={faoElementOptions}
            selected={selectedElement}
            onSelect={(option) => {
              setSelectedElement(option);
            }}
          />
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
}
