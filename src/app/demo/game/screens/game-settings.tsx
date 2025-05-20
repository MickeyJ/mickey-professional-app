import { useEffect, useState } from "react";

import { getCharacterData, loadingCharacterData } from "@/api";
import { useDebounce } from "@/hooks";
import type { Character, DifficultySettings, SelectedCards } from "@/types";
import { Difficulty } from "@/types/game-types";
import CharacterPagination from "../components/character-pagination";
import RenderCards from "../components/render-cards";

interface GameSettingsProps {
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  selectedCards: SelectedCards;
  setSelectedCards: (cards: SelectedCards) => void;
  timedChallengeOn: boolean;
  setTimeChallengeOn: (timedChallengeOn: boolean) => void;
  difficultyOptions: DifficultySettings[];
  difficultySettings: DifficultySettings;
  onGameScreenNext: () => void;
  onGameScreenBack: () => void;
}

const cardsPerPage = 20;
const loadingData = loadingCharacterData(cardsPerPage);

export default function GameSettings({
  difficulty,
  setDifficulty,
  selectedCards,
  setSelectedCards,
  timedChallengeOn,
  setTimeChallengeOn,
  difficultyOptions,
  difficultySettings,
  onGameScreenNext,
  // onGameScreenBack,
}: GameSettingsProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [characterData, setCharacterData] = useState<Character[]>([]);
  // Game Setup state
  const [characterSearchCount, setCharacterSearchCount] = useState<number>(0);

  // Pagination state
  const [currentPage, debouncedCurrentPage, setCurrentPage] = useDebounce<number>(1, 300);

  // Character search state
  const [nameSearchInput, debounceNameSearchInput, setNameSearchInput] = useDebounce<string>(
    "",
    300
  );

  const lastPage = Math.ceil(characterSearchCount / cardsPerPage);
  const numCardsToSelect = difficultySettings.pairs / 2;
  const numCardsSelected = Object.keys(selectedCards).length;
  const readyToPlay = numCardsSelected === numCardsToSelect;

  useEffect(() => {
    fetchCharacters(debouncedCurrentPage, debounceNameSearchInput);
    console.log("useEffect - fetchCharacters -", new Date().toISOString());
  }, [debouncedCurrentPage, debounceNameSearchInput]);

  useEffect(() => {
    if (!loading) setLoading(true);
  }, [currentPage, nameSearchInput]);

  useEffect(() => {
    if (loading) setLoading(false);
  }, [characterData]);

  async function fetchCharacters(page: number, search: string) {
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
  }

  const handleSelectOrRemoveCard = (character: Character) => {
    const { id } = character;
    if (selectedCards[id]) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [id]: _, ...rest } = selectedCards;
      setSelectedCards({ ...rest });
    } else if (numCardsSelected < numCardsToSelect) {
      setSelectedCards({
        ...selectedCards,
        [id]: character,
      });
    } else {
      // Maybe show user they can't select more cards
    }
  };

  const selectedCardElements = Object.values(selectedCards).map((character: Character) => (
    <button
      key={character.id + character.name}
      className="flex flex-row items-center text-xs text-info rounded-sm bg-base-200 p-1 border border-gray-300 hover:border-error transform-border duration-200 cursor-pointer"
      onClick={() => handleSelectOrRemoveCard(character)}
    >
      {character.name}
      <span className="text-xs text-error font-bold mx-1">X</span>
    </button>
  ));

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
    <div className="flex flex-col items-center justify-start w-full h-full p-4 bg-base-100">
      <div className="w-full min-h-[150] flex flex-row items-stretch justify-start mt-4 gap-2">
        <div className="flex-1/4 flex flex-col rounded border-2 border-base-300 p-2 gap-2">
          {/* Difficulty Selection */}
          <div className="w-full flex flex-col items-start">
            <label
              htmlFor="difficultySelection"
              className="text-sm text-dark"
            >
              Choose Difficulty
            </label>
            <select
              id="difficultySelection"
              className="w-full h-[30px] border border-gray-300 rounded px-2 cursor-pointer"
              value={difficulty}
              onChange={(e) => {
                setSelectedCards({});
                setDifficulty(e.target.value as Difficulty);
              }}
            >
              {difficultyOptions.map(({ name, pairs }) => (
                <option
                  key={name}
                  value={name}
                  className="bg-base-100 text-dark focus:bg-info"
                >
                  {name}-({pairs} Cards)
                </option>
              ))}
            </select>
          </div>

          {/* Character Search Input */}
          <div className="w-full flex flex-col items-start">
            <label
              htmlFor="nameSearchInput"
              className="text-sm text-dark"
            >
              Search Characters
            </label>
            <input
              id="nameSearchInput"
              type="text"
              placeholder="character name"
              value={nameSearchInput}
              onChange={(e) => {
                setNameSearchInput(e.target.value);
                if (currentPage !== 1) {
                  setCurrentPage(1);
                }
              }}
              className="w-full h-[30px] border border-gray-300 rounded px-2"
            />
          </div>

          {/* Time Challenge Checkbox */}
          <div className="w-full flex flex-row items-center justify-start gap-2 cursor-pointer">
            <input
              id="timedChallenge"
              type="checkbox"
              placeholder="character name"
              checked={timedChallengeOn}
              onChange={() => setTimeChallengeOn(!timedChallengeOn)}
              className="w-4 h-4 text-info bg-gray-100 border-gray-300 rounded-full cursor-pointer"
            />
            <label
              htmlFor="timedChallenge"
              className="text-sm text-dim cursor-pointer"
            >
              Timed Challenge - {difficultySettings.timeLimit}s
            </label>
          </div>
        </div>

        <div
          className={`flex-1/2 flex flex-col rounded border-2  p-2 gap-2 ${readyToPlay ? "border-success" : "border-base-300"}`}
        >
          {/* Selected Character List/Buttons */}
          <div className="flex flex-col items-start">
            <div className="w-full flex flex-row items-center justify-between">
              <label className="text-sm text-dim">
                <span className="text-info font-bold">{selectedCardElements.length} </span>
                <span>of</span> <span className="text-info font-bold">{numCardsToSelect} </span>
                <span>Characters Selected</span>
              </label>
              <span
                className={`text-xs rounded border-1  px-1 ml-1 cursor-pointer ${numCardsSelected ? "border-error text-error hover:bg-error hover:text-white" : "border-base-300 text-dark"} transition-all duration-200`}
                onClick={() => setSelectedCards({})}
              >
                Clear
              </span>
            </div>
            <div className="flex flex-row flex-wrap gap-2 mt-2">{selectedCardElements}</div>
          </div>
        </div>

        {/* Play Button */}
        <div className="flex-1/6 flex flex-row items-center justify-center">
          <button
            onClick={() => readyToPlay && onGameScreenNext()}
            className={`w-full h-full border-1 rounded text-2xl font-bold ${readyToPlay ? "cursor-pointer text-white bg-base-300 hover:text-black hover:bg-success transition-all duration-200" : "text-dark"} `}
          >
            PLAY
          </button>
        </div>
      </div>

      {/* Character Cards */}
      {errorMessage ? (
        <div className="text-red-500 text-center mt-6">{errorMessage}</div>
      ) : (
        <div className="mt-6">
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
            // flippedCards={flippedCards}
            handleSelectOrRemoveCard={handleSelectOrRemoveCard}
          />
        </div>
      )}

      {/* Screen Change Buttons */}
      {/* <div className="flex flex-row items-center justify-center gap-2">
        <button
          onClick={() => onGameScreenBack()}
          className="btn-secondary"
        >
          Back To Instructions
        </button>
        <button
          onClick={() => onGameScreenNext()}
          className="btn-primary"
        >
          Next
        </button>
      </div> */}
    </div>
  );
}
