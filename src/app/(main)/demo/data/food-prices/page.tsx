import PriceComparisonPage from '@/app/(research)/explore-fao/dashboard/market-integration/comparison/page';
import { MarketIntegrationProvider } from '@/app/(research)/explore-fao/dashboard/market-integration/context';

export default function FoodPricesPage() {
  return (
    <MarketIntegrationProvider>
      <PriceComparisonPage />
    </MarketIntegrationProvider>
  );
}
