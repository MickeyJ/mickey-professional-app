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
  isElementChanging,
}: FAOMarketIntegrationContainerProps) {
  const [loadingIntegrationData, setLoadingIntegrationData] = useState<boolean>(false);
  const [correlationDataError, setCorrelationDataError] = useState<string>('');
  const [correlationData, setCorrelationData] =
    useState<FAOMarketIntegrationCorrelationData | null>(null);
  const prevSelectedCountriesRef = useRef(selectedCountries);

  useEffect(() => {
    const prevSelectedAreas = prevSelectedCountriesRef.current;
    // Don't fetch if element is changing - wait for countries to update
    if (isElementChanging) {
      console.log('\n\n✋ Element is changing, skipping correlation data fetch\n');
      return;
    }

    if (selectedItem && selectedCountries.length > 1) {
      const fetchMarketIntegrationData = async () => {
        if (prevSelectedAreas.length < selectedCountries.length) {
          setLoadingIntegrationData(true);
        }

        try {
          setCorrelationDataError('');
          const data = await getFAOMarketIntegrationCorrelationsData(
            selectedItem.item_code,
            selectedElement.value,
            selectedCountries.map((area) => area.area_code)
          );
          setCorrelationData(data);
        } catch (err: any) {
          console.error('Error fetching chart data:', err);
          setCorrelationDataError(err.response?.data.error.message || 'Unknown Server Error');
          setCorrelationData(null);
        } finally {
          setLoadingIntegrationData(false);
        }
      };

      fetchMarketIntegrationData();
    } else {
      setCorrelationData(null); // Reset chart data if no item or areas are selected
    }
    prevSelectedCountriesRef.current = selectedCountries;
  }, [selectedItem, selectedElement, selectedCountries, isElementChanging]);

  return (
    <div className="mx-auto p-4">
      {loadingIntegrationData && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">Loading market integration data...</p>
        </div>
      )}
      {correlationData ? (
        <MarketIntegrationCorrelationsChart
          data={correlationData}
          loading={loadingIntegrationData}
          width={800}
          height={500}
        />
      ) : (
        <div className="h-[500] m-auto flex items-center justify-center">
          <p className="text-sm text-gray-500">
            Select an item and at least two countries to view market integration data.
          </p>
        </div>
      )}
      {correlationDataError && (
        <div className="mt-4">
          <p className="text-sm text-error">Error: {correlationDataError}</p>
        </div>
      )}
    </div>
  );
}
