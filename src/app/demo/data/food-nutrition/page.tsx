'use client';

import { useEffect, useState } from 'react';

import { SelectSearch } from '@/_components/ui/select-search';
import { getUSDAFoodsSearch } from '@/api';
import { useDebounce } from '@/hooks';
import type { USDAFoodItem } from '@/types'; // Adjust the import path as necessary

export default function FoodNutritionPage() {
  const [loadingItems, setLoadingItems] = useState<boolean>(false);
  const [foodDataItems, setFoodDataItems] = useState<USDAFoodItem[]>([]); // Replace 'any' with your actual type
  const [searchInput, debouncedSearchInput, setSearchInput] = useDebounce<string>('', 500);
  const [selectedItem, setSelectedItem] = useState<USDAFoodItem | null>(null); // Replace 'any' with your actual type

  useEffect(() => {
    console.log('Search Input:', debouncedSearchInput);

    if (debouncedSearchInput) {
      const fetchUSDAFoods = async () => {
        setLoadingItems(true);
        try {
          const data = await getUSDAFoodsSearch(debouncedSearchInput);
          console.log('Fetched USDA Foods List:', data);
          setFoodDataItems(data.foods || []); // Adjust based on your API response structure
        } catch (err: any) {
          console.error('Error fetching USDA Foods List:', err.message);
        } finally {
          setLoadingItems(false);
        }
      };
      fetchUSDAFoods();
    }
  }, [debouncedSearchInput]);

  const selectedItemBrandNames = selectedItem?.foodAttributeTypes.find((attr) => attr.id === 1001);

  const selectedItemInfoPoints = () =>
    selectedItem
      ? [
          { title: 'Description', value: selectedItem.description },
          { title: 'Brand Name', value: selectedItem.brandName },
          { title: 'Brand Owner', value: selectedItem.brandOwner },
          // { title: 'Additional Descriptions', value: selectedItem.additionalDescriptions },
          { title: 'Published Date', value: selectedItem.publishedDate },
          { title: 'Ingredients', value: selectedItem.ingredients },
          {
            title: 'Serving Size',
            value:
              selectedItem.servingSize &&
              `${selectedItem.servingSize}${selectedItem.servingSizeUnit}`,
          },
          { title: 'Data Type', value: selectedItem.dataType },
          {
            title: 'Additional Brand Names',
            value:
              selectedItemBrandNames &&
              selectedItemBrandNames.foodAttributes.map((attr) => attr.value).join(', '),
          },
        ]
      : [];

  return (
    <div className="mx-auto p-4 h-full flex flex-col">
      <h1 className="text-heading-lg font-bold text-center">Nutrition Data</h1>
      <div className="flex flex-row justify-between items-center gap-4">
        <div className="form-field flex-1">
          <SelectSearch
            placeholder="Search Foods..."
            persistInput={true}
            loading={loadingItems}
            options={foodDataItems.map((item) => ({
              label: item.description,
              value: item.fdcId.toString(),
            }))}
            selected={
              selectedItem
                ? { label: selectedItem.description, value: selectedItem.fdcId.toString() }
                : null
            }
            externalSearchInput={searchInput}
            setExternalSearchInput={setSearchInput}
            onSelect={(value) =>
              setSelectedItem(foodDataItems.find((item) => item.fdcId === Number(value)) || null)
            }
          />
        </div>
      </div>

      {/* Display selected item details if available */}
      <div className="flex flex-col items-stretch justify-stretch gap-4 mt-4 flex-1">
        {selectedItem ? (
          <div className="flex-1 flex flex-row items-start justify-between gap-4 rounded-md bg-base-200">
            <div className="p-2 flex-1">
              <h2 className="text-heading-sm font-bold">{selectedItem.description}</h2>

              {selectedItemInfoPoints().map(
                (point, index) =>
                  point.value && (
                    <p
                      key={index}
                      className="text-dim"
                    >
                      <span className="text-bright">{point.title}</span>:{' '}
                      <span className="text-dark">{point.value}</span>
                    </p>
                  )
              )}
            </div>
            <div
              className={`max-h-[500] flex-2 p-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l-1 overflow-y-auto`}
            >
              {selectedItem.foodNutrients.map((nutrient) => (
                <p key={nutrient.nutrientId}>
                  <span className="text-bright">{nutrient.nutrientName}</span>:{' '}
                  <span className="text-dark">
                    {nutrient.value} {nutrient.unitName}
                  </span>
                </p>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-4 text-dim">No item selected.</p>
        )}
      </div>

      {/* <div className="mx-1 rounded-md bg-base-200 p-4 mt-4">
        <h4 className="text-heading-sm font-bold">About the Data</h4>
        <p className="text-dim">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur vitae porro minus
          nobis corporis, animi libero quia obcaecati, placeat asperiores dolorum, veritatis in
          voluptatem ab nemo dolore vero ut est!
        </p>
      </div> */}
    </div>
  );
}
