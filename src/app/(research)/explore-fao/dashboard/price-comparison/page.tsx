import PriceComparisonContainer from './container';

export default function PriceComparisonPage() {
  return (
    <div className="mx-auto p-4 pt-1">
      <div className="flex flex-row  items-center justify-center gap-2 mb-1">
        <h4 className="text-heading-sm font-bold">Global Food Price Explorer</h4>
      </div>

      <PriceComparisonContainer />
      <div className="mx-1 rounded-md bg-base-200 p-4 mt-4">
        <h4 className="text-md font-bold">About the Data</h4>
        <p className="text-dim text-sm">
          This visualization shows normalized price trajectories for agricultural commodities across
          multiple nations. The data comes from FAO's global price database, a collection of
          agricultural prices from governments worldwide. By showing relative changes rather than
          absolute prices, the chart reveals important patterns—like global food crises affecting
          multiple countries simultaneously, or local events causing dramatic price spikes in
          individual nations. Try "Hen eggs in shell" in the Unites States.
        </p>
      </div>
    </div>
  );
}
