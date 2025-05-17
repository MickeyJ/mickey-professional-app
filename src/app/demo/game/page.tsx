'use client';
import type { CardReferences, Character } from '@/types';
import { getCharacterData } from '@/api';
import { useEffect, useState } from 'react';

import RenderCards from './components/render-cards';
import loadingData from './components/loading-cards';

const cardsPerPage = 20;

export default function GamePage() {
  // Data fetching state
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [characterData, setCharacterData] = useState<Character[]>([]);

  // Game Setup state
  const [page, setPage] = useState<number>(1);
  const [characterSearchCount, setCharacterSearchCount] = useState<number>(0);
  const [nameSearchInput, setNameSearchInput] = useState<string>('Rick');
  const [difficultySelection, setDifficultySelection] = useState<number>(6);
  const [selectedCards, setSelectedCards] = useState<CardReferences>({});
  const lastPage = Math.ceil(characterSearchCount / cardsPerPage);

  // Game state
  const [flippedCards, setFlippedCards] = useState<CardReferences>({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 700)); // Simulate loading delay
      try {
        const { data } = await getCharacterData(page, nameSearchInput);
        setCharacterSearchCount(data.characters.info.count);
        setCharacterData(data.characters.results);
        setLoading(false);
      } catch (error: unknown) {
        console.error('Error fetching character data:', error);
        setErrorMessage(
          'Error fetching character data: ' + (error as Error).message
        );
        setLoading(false);
      }
    };

    fetchData();
  }, [nameSearchInput, page]);

  useEffect(() => {
    if (difficultySelection) {
      setSelectedCards({});
    }
  }, [difficultySelection]);

  const handleSelectCard =
    (character: Character, index: number) =>
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { id } = character;
      if (selectedCards[index]) {
        const { [index]: _, ...rest } = selectedCards;
        setSelectedCards({ ...rest });
      } else if (Object.keys(selectedCards).length < difficultySelection) {
        setSelectedCards({
          ...selectedCards,
          [index]: { ...character, index },
        });
      } else {
        console.log('Max cards selected');
      }
    };

  const selectedCardElements = Object.values(selectedCards).map(
    ({ id, name }) => (
      <span
        key={id + name}
        className="text-xs text-info rounded-sm bg-base-200 p-1 border border-gray-300 mr-1"
      >
        {name}
      </span>
    )
  );

  const handlePageChange = (newPage: number) => {
    if (newPage < 1) {
      setPage(1);
    } else if (newPage > lastPage) {
      setPage(lastPage);
    } else {
      setPage(newPage);
    }
  };

  return (
    <div className="mx-auto px-2">
      <div className="flex flex-col items-start justify-start mt-2 gap-3">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold text-center">
            Rick and Morty Card Match
          </h1>
          <p className="text-sm text-dim text-center">
            Choose your difficulty. Search and select your characters. Press
            <button className="cursor-pointer border-1 rounded px-1 ml-2 font-bold text-success hover:text-white transition-color duration-200">
              PLAY
            </button>
          </p>
        </div>

        <div className="h-[125] flex flex-row gap-7 items-start justify-center">
          <div className="min-w-[110] flex flex-col items-start">
            <label
              htmlFor="difficultySelection"
              className="text-sm text-dark"
            >
              Choose Difficulty
            </label>
            <select
              id="difficultySelection"
              className="h-[40px] border border-gray-300 rounded px-2"
              value={difficultySelection}
              onChange={(e) => setDifficultySelection(Number(e.target.value))}
            >
              {[6, 8, 10].map((num) => (
                <option
                  key={num}
                  value={num}
                  className="bg-base-100 text-dark"
                >
                  {num} Cards
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col items-start">
            <label
              htmlFor="nameSearchInput"
              className="text-sm text-dark"
            >
              Search Characters
            </label>
            <input
              id="nameSearchInput"
              type="text"
              placeholder="Search for a character..."
              value={nameSearchInput}
              onChange={(e) => setNameSearchInput(e.target.value)}
              className="h-[40px] border border-gray-300 rounded px-2"
            />
          </div>
          <div className="flex flex-col items-start">
            {selectedCardElements.length > 0 && (
              <>
                <div>
                  <label className="text-sm text-dark">
                    Selected Characters:
                  </label>
                  <span
                    className="text-xs rounded border-1 border-error text-error px-1 ml-1 cursor-pointer"
                    onClick={() => setSelectedCards({})}
                  >
                    reset
                  </span>
                </div>
                <div className="flex flex-row flex-wrap gap-2 mt-2">
                  {selectedCardElements}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {errorMessage ? (
        <div className="text-red-500 text-center mt-4">{errorMessage}</div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              className="cursor-pointer border-1 rounded px-1 ml-2 font-bold text-info hover:text-white transition-color duration-200"
            >
              {'<'}
            </button>
            <span className="w-20 text-sm text-dark text-center">
              Page {page} of {lastPage}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              className="cursor-pointer border-1 rounded px-1 ml-2 font-bold text-info hover:text-white transition-color duration-200"
            >
              {'>'}
            </button>
          </div>
          <div className="flex flex-wrap gap-4 justify-center my-6">
            <RenderCards
              characterData={
                loading ? loadingData(cardsPerPage) : characterData
              }
              selectedCards={selectedCards}
              flippedCards={flippedCards}
              handleSelectCard={handleSelectCard}
            />
          </div>
        </div>
      )}
    </div>
  );
}
