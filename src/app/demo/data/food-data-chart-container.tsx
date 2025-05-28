import { useEffect, useRef, useState } from 'react';

import MultiLineChart from '@/_components/charts/multi-line-chart';
import { getFoodOasisChartData } from '@/api';
import type { FoodOasisDataArea, FoodOasisDataItem, FoodOasisMultiLineChartData } from '@/types';

interface FoodDataChartContainerProps {
  selectedItem: FoodOasisDataItem | null;
  selectedAreas: FoodOasisDataArea[];
}

export default function FoodDataChartContainer({
  selectedItem,
  selectedAreas,
}: FoodDataChartContainerProps) {
  const [loadingData, setLoadingData] = useState<boolean>(false);
  // const [fetchError, setFetchError] = useState<string>('');
  const [chartData, setChartData] = useState<FoodOasisMultiLineChartData | null>(null);
  const prevSelectedAreasRef = useRef(selectedAreas);

  useEffect(() => {
    const prevSelectedAreas = prevSelectedAreasRef.current;
    console.log(`\n\nprevSelectedAreas: ${prevSelectedAreas.length}`);
    console.log(`selectedAreas: ${selectedAreas.length}\n\n`);

    if (selectedItem && selectedAreas.length) {
      const fetchChartData = async () => {
        if (prevSelectedAreas.length < selectedAreas.length) {
          setLoadingData(true);
        }
        // setFetchError('');

        try {
          // Simulate fetching chart data based on selected item and area
          // Replace this with actual API call
          // selectedAreas
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
    <div className="mx-auto p-1">
      <p className="text-sm text-center font-semibold italic text-warning opacity-50">
        Note: Price trends may reflect currency changes, redenominations, or transitions between
        reporting currencies.
      </p>

      {/* {loadingData && <LoadingSpinner />} */}

      {/* You can add your chart component here */}
      <MultiLineChart
        data={chartData}
        loading={loadingData}
      />
    </div>
  );
}
