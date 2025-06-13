'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import MarketIntegrationComparisonChart from '@/_components/fao/charts/market-integration-chart-comparison';
import { YearRangeSlider } from '@/_components/fao/ui/year-range-slider';
import { getFAOMarketIntegrationComparisonData } from '@/api';
import type {
  FAOMarketIntegrationComparisonData,
  FAOMarketIntegrationContainerProps,
} from '@/types';

export default function PriceComparisonContainer({
  selectedItem,
  selectedElement,
  selectedCountries,
}: FAOMarketIntegrationContainerProps) {
  const [startYear, setStartYear] = useState<number>(1990);
  const [endYear, setEndYear] = useState<number>(2024);

  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string>('');
  const [chartData, setComparisonData] = useState<FAOMarketIntegrationComparisonData | null>(null);
  const prevSelectedAreasRef = useRef(selectedCountries);

  // Filter the chart data by year range
  const filteredComparisonData = useMemo(() => {
    if (!chartData) return null;

    // Filter lines and remove any that have no data points after filtering
    const filteredLines = chartData.lines
      .map((line) => ({
        ...line,
        data_points: line.data_points.filter(
          (point) => point.year >= startYear && point.year <= endYear
        ),
      }))
      .filter((line) => line.data_points.length > 0); // Remove empty lines

    // If no data remains after filtering, return null
    if (filteredLines.length === 0) {
      return null;
    }

    return {
      ...chartData,
      lines: filteredLines,
      summary: {
        ...chartData.summary,
        min_year: startYear,
        max_year: endYear,
        total_data_points: filteredLines.reduce((sum, line) => sum + line.data_points.length, 0),
      },
    };
  }, [chartData, startYear, endYear]);

  useEffect(() => {
    const prevSelectedAreas = prevSelectedAreasRef.current;

    if (selectedItem && selectedCountries.length) {
      const fetchComparisonData = async () => {
        if (prevSelectedAreas.length < selectedCountries.length) {
          setLoadingData(true);
        }

        try {
          setFetchError('');
          const data = await getFAOMarketIntegrationComparisonData(
            selectedItem.item_code,
            selectedElement.value,
            selectedCountries.map((area) => area.area_code)
          );
          // console.log('Fetched Comparison Data:', data);
          setComparisonData(data);
        } catch (err: any) {
          console.error('Error fetching chart data:', err);
          setFetchError(err.response?.data.error.message);
        } finally {
          setLoadingData(false);
        }
      };

      fetchComparisonData();
    } else {
      setComparisonData(null); // Reset chart data if no item or areas are selected
    }
    prevSelectedAreasRef.current = selectedCountries;
  }, [selectedItem, selectedElement, selectedCountries]);

  return (
    <div className="mx-auto">
      {/* {loadingData && <LoadingSpinner />} */}

      {/* You can add your chart component here */}
      <MarketIntegrationComparisonChart
        data={filteredComparisonData}
        loading={loadingData}
      />
      <YearRangeSlider
        startYear={startYear}
        endYear={endYear}
        setStartYear={setStartYear}
        setEndYear={setEndYear}
      />
      {fetchError && (
        <div className="mt-4">
          <p className="text-sm text-error">Error: {fetchError}</p>
        </div>
      )}
    </div>
  );
}
