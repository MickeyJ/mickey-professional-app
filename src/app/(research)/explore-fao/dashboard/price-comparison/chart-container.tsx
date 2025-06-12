import { useEffect, useMemo, useRef, useState } from 'react';

import MultiLineChart from '@/_components/fao/charts/multi-line-chart';
import { getFoodOasisChartData } from '@/api';
import type { FAOArea, FoodOasisDataItem, FoodOasisMultiLineChartData } from '@/types';

interface FoodDataChartContainerProps {
  selectedItem: FoodOasisDataItem | null;
  selectedAreas: FAOArea[];
  startYear: number;
  endYear: number;
}

export default function PriceComparisonChartContainer({
  selectedItem,
  selectedAreas,
  startYear,
  endYear,
}: FoodDataChartContainerProps) {
  const [loadingData, setLoadingData] = useState<boolean>(false);
  // const [fetchError, setFetchError] = useState<string>('');
  const [chartData, setChartData] = useState<FoodOasisMultiLineChartData | null>(null);
  const prevSelectedAreasRef = useRef(selectedAreas);

  // Filter the chart data by year range
  const filteredChartData = useMemo(() => {
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

    if (selectedItem && selectedAreas.length) {
      const fetchChartData = async () => {
        if (prevSelectedAreas.length < selectedAreas.length) {
          setLoadingData(true);
        }

        try {
          const data = await getFoodOasisChartData(
            selectedItem.item_code,
            selectedAreas.map((area) => area.area_code)
          );
          console.log('Fetched Chart Data:', data);
          setChartData(data);
        } catch (err: any) {
          console.error('Error fetching chart data:', err.detail.message);
          // setFetchError(err.detail.message);
        } finally {
          setLoadingData(false);
        }
      };

      fetchChartData();
    } else {
      setChartData(null); // Reset chart data if no item or areas are selected
    }
    prevSelectedAreasRef.current = selectedAreas;
  }, [selectedItem, selectedAreas]);

  return (
    <div className="mx-auto">
      {/* {loadingData && <LoadingSpinner />} */}

      {/* You can add your chart component here */}
      <MultiLineChart
        data={filteredChartData}
        loading={loadingData}
      />
    </div>
  );
}
