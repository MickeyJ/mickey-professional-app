import MarketIntegrationContainer from './container';

export default function MarketIntegrationPage() {
  return (
    <div className="mx-auto p-4 pt-1">
      <MarketIntegrationContainer />
      <div className="mx-1 rounded-md bg-base-200 p-4 mt-4">
        <h4 className="text-md font-bold">About the Data</h4>
        <p className="text-dim text-sm">
          Market Integration is a key aspect of food security, reflecting how well different markets
          are connected. This dashboard provides insights into the integration of food markets
          across various regions, helping to identify trends and disparities in food availability
          and pricing.
        </p>
      </div>
    </div>
  );
}
