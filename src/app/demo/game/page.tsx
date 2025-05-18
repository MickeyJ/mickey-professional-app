"use client";

import { useEffect, useState } from "react";

import { getCharacterData, loadingCharacterData } from "@/api";
import { useDebounce } from "@/hooks";
import type { CardReferences, Character } from "@/types";
import { Difficulty } from "@/types/game-types";
import CharacterPagination from "./components/character-pagination";
import GameSettings from "./components/game-settings";
import RenderCards from "./components/render-cards";

const GAME_SETTINGS = {
  DIFFICULTY_LEVELS: {
    [Difficulty.easy]: {
      pairs: 6,
      timeout: 1000,
      name: Difficulty.easy,
    },
    [Difficulty.medium]: {
      pairs: 8,
      timeout: 800,
      name: Difficulty.medium,
    },
    [Difficulty.hard]: {
      pairs: 12,
      timeout: 600,
      name: Difficulty.hard,
    },
  },
};

const cardsPerPage = 20;
const loadingData = loadingCharacterData(cardsPerPage / 2);

export default function GamePage() {
  // Data fetching state
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [characterData, setCharacterData] = useState<Character[]>([]);

  // Game Setup state
  const [characterSearchCount, setCharacterSearchCount] = useState<number>(0);

  // Pagination state
  const [currentPage, debouncedCurrentPage, setCurrentPage] = useDebounce<number>(1, 300);

  // Character search state
  const [nameSearchInput, debounceNameSearchInput, setNameSearchInput] = useDebounce<string>("Rick", 300);

  const [selectedCards, setSelectedCards] = useState<CardReferences>({});
  const [difficulty, setDifficulty] = useState<Difficulty.easy | Difficulty.medium | Difficulty.hard>(Difficulty.easy);
  // const [gameStatus, setGameStatus] = useState<"loading" | "ready" | "playing" | "completed">("loading");
  const lastPage = Math.ceil(characterSearchCount / cardsPerPage);
  const numberOfCardsToSelect = GAME_SETTINGS.DIFFICULTY_LEVELS[difficulty].pairs / 2;

  // Game state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [flippedCards, setFlippedCards] = useState<CardReferences>({});

  useEffect(() => {
    fetchCharacters(debouncedCurrentPage, debounceNameSearchInput);
    console.log("page change debounce:", new Date().toISOString());
  }, [debouncedCurrentPage, debounceNameSearchInput]);

  useEffect(() => {
    if (!loading) setLoading(true);
  }, [currentPage, nameSearchInput]);

  useEffect(() => {
    if (loading) setLoading(false);
  }, [characterData]);

  useEffect(() => {
    setSelectedCards({});
  }, [difficulty]);

  const fetchCharacters = async (page: number, search: string) => {
    try {
      setLoading(true);
      const { data } = await getCharacterData(page, search);
      setCharacterData(data.characters.results);
      setCharacterSearchCount(data.characters.info.count);
      console.log("fetchCharacters:", new Date().toISOString(), data.characters.results);

      setLoading(false);
    } catch (error: unknown) {
      console.error("Error fetching character data:", error);
      setErrorMessage("Error fetching character data: " + (error as Error).message);
      setLoading(false);
    }
  };

  const handleSelectOrRemoveCard = (character: Character) => {
    const { id } = character;
    if (selectedCards[id]) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [id]: _, ...rest } = selectedCards;
      setSelectedCards({ ...rest });
    } else if (Object.keys(selectedCards).length < numberOfCardsToSelect) {
      setSelectedCards({
        ...selectedCards,
        [id]: character,
      });
    } else {
      console.log("Max cards selected");
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage <= 1) {
      setCurrentPage(1);
    } else if (newPage > lastPage) {
      setCurrentPage(lastPage);
    } else {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-screen h-screen overflow-y-hidden">
      <div className="w-full flex flex-col items-center justify-start mt-2 gap-3">
        <div className="w-full flex flex-col align-start items-start">
          <h1 className="text-2xl font-bold text-center">Rick and Morty Card Match</h1>
          <p className="text-sm text-dim text-center">
            Choose your difficulty. Search and select your characters. Press
            <button className="cursor-pointer border-1 rounded px-1 ml-2 font-bold text-success hover:text-white transition-color duration-200">
              PLAY
            </button>
          </p>
        </div>

        <GameSettings
          numberOfCardsToSelect={numberOfCardsToSelect}
          selectedCards={selectedCards}
          difficulty={difficulty}
          difficultyLevels={Object.values(GAME_SETTINGS.DIFFICULTY_LEVELS)}
          nameSearchInput={nameSearchInput}
          setDifficulty={setDifficulty}
          setNameSearchInput={setNameSearchInput}
          setSelectedCards={setSelectedCards}
          handleSelectOrRemoveCard={handleSelectOrRemoveCard}
        />

        {errorMessage ? (
          <div className="text-red-500 text-center mt-6">{errorMessage}</div>
        ) : (
          <div className="min-w-[700] flex flex-col items-center justify-center mr-13">
            <CharacterPagination
              currentPage={currentPage}
              lastPage={lastPage}
              handlePageChange={handlePageChange}
            />
            <RenderCards
              loading={loading}
              loadingData={loadingData}
              characterData={characterData}
              selectedCards={selectedCards}
              flippedCards={flippedCards}
              handleSelectOrRemoveCard={handleSelectOrRemoveCard}
            />
          </div>
        )}
      </div>
    </div>
  );
}
