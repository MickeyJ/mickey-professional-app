"use client";

import { useEffect, useMemo, useState } from "react";
import { min } from "d3";

import LineChart from "@/_components/charts/line-chart";
import { getAllCountryData } from "@/api";
import { formatCountryData, sortCountryData } from "@/lib/utils";
import type { Country, CountryRaw } from "@/types";

const defaultMinPopulation = 100000000;

const filterByPopulation = (minPopulation: number) => (d: Country) => d.population > minPopulation;

export default function DataPage() {
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string>("");
  const [countryData, setCountryData] = useState<Country[]>([]);
  const [filteredCountryData, setFilteredCountryData] = useState<Country[]>([]);
  const [minPopulation, setMinPopulation] = useState<number>(defaultMinPopulation / 2);

  useEffect(() => {
    // Fetch data from the API

    const fetchData = async () => {
      setLoadingData(true);
      setFetchError("");
      try {
        const data = await getAllCountryData();
        const formattedData = data.map(formatCountryData);
        setCountryData(formattedData);

        setLoadingData(false);
      } catch (err: { message: string } | any) {
        setFetchError(err.message);
        setLoadingData(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (countryData.length) {
      setFilteredCountryData(countryData.filter(filterByPopulation(minPopulation)));
    }
  }, [countryData, minPopulation]);

  const chartData = useMemo(
    () =>
      filteredCountryData.map(({ name, population: value }) => ({
        name,
        value,
      })),
    [filteredCountryData]
  );

  return (
    <div className="mx-auto py-12 px-2">
      <h1 className="text-2xl font-bold mb-6 text-center">Country Population Data</h1>

      {loadingData && <p className="text-info">Loading...</p>}
      {fetchError && <p className="text-error">{fetchError}</p>}

      <label htmlFor="default-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Minimum Population - {minPopulation}
      </label>
      <input
        id="default-range"
        type="range"
        min="0"
        max={defaultMinPopulation}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        value={minPopulation}
        onChange={(e) => {
          const newMinPopulation = parseInt(e.target.value);
          // Threshold to avoid too many re-renders
          if (Math.abs(newMinPopulation - minPopulation) > 1000000) {
            setMinPopulation(newMinPopulation);
          }
        }}
      />

      <div className="rounded-lg p-6 shadow-md">
        <LineChart data={chartData} scaleExponent={minPopulation} />
      </div>
    </div>
  );
}
