'use client';

import { useEffect, useRef, useState } from 'react';

import MarketIntegrationCorrelationsChart from '@/_components/fao/charts/market-integration-chart-correlations';
// import { YearRangeSlider } from '@/_components/fao/ui/year-range-slider';
import { getFAOMarketIntegrationCorrelationsData } from '@/api';
import type {
  FAOMarketIntegrationContainerProps,
  FAOMarketIntegrationCorrelationData,
} from '@/types';

export default function PriceCorrelationContainer({
  selectedItem,
  selectedElement,
  selectedCountries,
}: FAOMarketIntegrationContainerProps) {
  const [loadingIntegrationData, setLoadingIntegrationData] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string>('');
  const [marketIntegrationData, setMarketIntegrationData] =
    useState<FAOMarketIntegrationCorrelationData | null>(null);
  const prevSelectedCountriesRef = useRef(selectedCountries);

  useEffect(() => {
    const prevSelectedAreas = prevSelectedCountriesRef.current;

    if (selectedItem && selectedCountries.length > 1) {
      const fetchMarketIntegrationData = async () => {
        if (prevSelectedAreas.length < selectedCountries.length) {
          setLoadingIntegrationData(true);
        }

        try {
          setFetchError('');
          const data = await getFAOMarketIntegrationCorrelationsData(
            selectedItem.item_code,
            selectedElement.value,
            selectedCountries.map((area) => area.area_code)
          );
          setMarketIntegrationData(data);
        } catch (err: any) {
          console.error('Error fetching chart data:', err);
          setFetchError(err.response?.data.error.message);
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
  }, [selectedItem, selectedElement, selectedCountries]);

  console.log(`Selected Item: ${selectedItem ? selectedItem.item_code : 'None'}`);

  return (
    <div className="mx-auto p-4">
      {loadingIntegrationData && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">Loading market integration data...</p>
        </div>
      )}
      {marketIntegrationData ? (
        <MarketIntegrationCorrelationsChart
          data={marketIntegrationData}
          loading={loadingIntegrationData}
          width={800}
          height={500}
        />
      ) : (
        <div className="h-[800] m-auto flex items-center justify-center">
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
