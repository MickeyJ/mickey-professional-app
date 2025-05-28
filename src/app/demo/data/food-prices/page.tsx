import FoodData from './food-data';

export default function FoodPricesPage() {
  return (
    <div className="mx-auto p-4 pt-1">
      <div className="flex flex-col items-center justify-center gap-2 mb-1">
        <h1 className="text-heading-md font-bold">Global Food Price Explorer</h1>
        <p className="text-dim">
          Explore food commodity prices and trends across 250+ items and countries worldwide
        </p>
      </div>

      <FoodData />
      <div className="mx-1 rounded-md bg-base-200 p-4 mt-4">
        <h4 className="text-heading-sm font-bold">About the Data</h4>
        <p className="text-dim">
          The commodity, country/region, and price data come from the FAO's global food price
          database. Prices typically reflect export unit values — the average price per metric ton
          (1,000 kg) that countries receive for selling agricultural products internationally. Each
          entry links a specific food item, a country or region, and a yearly price, standardized in
          USD per tonne. This data helps track global trends in food commodity markets over time.
        </p>
      </div>
    </div>
  );
}
