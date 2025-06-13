// app/market-integration/correlation/page.tsx
'use client';

import { useMarketIntegration } from '../context';
import Wrapper from '../wrapper';
import PriceNetworkContainer from './network-container';

export default function PriceNetworkPage() {
  const { selectedItem, selectedElement, selectedCountries, isElementChanging } =
    useMarketIntegration();

  return (
    <div className="mx-auto p-4 pt-1">
      <Wrapper>
        <PriceNetworkContainer
          selectedItem={selectedItem}
          selectedElement={selectedElement}
          selectedCountries={selectedCountries}
          isElementChanging={isElementChanging}
        />
      </Wrapper>
      <div className="mx-1 rounded-md bg-base-200 p-4 mt-4">
        <h4 className="text-md font-bold">About the Data</h4>
        <p className="text-dim text-sm">
          Market integration measures how closely prices in different countries move together for
          the same commodity. When markets are integrated, price changes in one country are quickly
          reflected in others through trade and arbitrage—like ripples spreading across connected
          pools.
        </p>
        <br />
        <p className="text-dim text-sm">
          These charts show price movements over time, with each track comparing two countries.
          Parallel lines indicate integrated markets (prices rising and falling together), while
          diverging lines suggest isolated markets. The green/amber/red indicators show correlation
          strength: high integration means traders are actively connecting these markets, keeping
          prices in sync despite geographic distance.
        </p>
      </div>
    </div>
  );
}
