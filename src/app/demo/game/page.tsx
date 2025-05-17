'use client';
import type {
  CardReferences,
  Character,
  DifficultyLevel,
  DifficultyLevels,
} from '@/types';

import { Difficulty } from '@/types/game-types';
import { getCharacterData, loadingCharacterData } from '@/api';
import { useEffect, useState } from 'react';

import RenderCards from './components/render-cards';
import GameSettings from './components/game-settings';
import CharacterPagination from './components/character-pagination';

const GAME_SETTINGS = {
  DIFFICULTY_LEVELS: {
    [Difficulty.easy]: { pairs: 6, timeout: 1000, name: Difficulty.easy },
    [Difficulty.medium]: { pairs: 8, timeout: 800, name: Difficulty.medium },
    [Difficulty.hard]: { pairs: 12, timeout: 600, name: Difficulty.hard },
  },
};

export default function GamePage() {
  // Data fetching state
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [characterData, setCharacterData] = useState<Character[]>([]);
  const cardsPerPage = 20;

  // Game Setup state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [characterSearchCount, setCharacterSearchCount] = useState<number>(0);
  const [nameSearchInput, setNameSearchInput] = useState<string>('Rick');
  const [difficultySelection, setDifficultySelection] = useState<number>(6);
  const [selectedCards, setSelectedCards] = useState<CardReferences>({});
  const [difficulty, setDifficulty] = useState<
    Difficulty.easy | Difficulty.medium | Difficulty.hard
  >(Difficulty.easy);
  const [gameStatus, setGameStatus] = useState<
    'loading' | 'ready' | 'playing' | 'completed'
  >('loading');
  const lastPage = Math.ceil(characterSearchCount / cardsPerPage);
  const numberOfCardsToSelect =
    GAME_SETTINGS.DIFFICULTY_LEVELS[difficulty].pairs / 2;

  // Game state
  const [flippedCards, setFlippedCards] = useState<CardReferences>({});

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 700)); // Simulate loading delay
      try {
        const { data } = await getCharacterData(currentPage, nameSearchInput);
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

    fetchCharacters();
  }, [nameSearchInput, currentPage]);

  useEffect(() => {
    setSelectedCards({});
  }, [difficulty]);

  const handleSelectOrRemoveCard = (character: Character) => {
    const { id } = character;
    if (selectedCards[id]) {
      const { [id]: _, ...rest } = selectedCards;
      setSelectedCards({ ...rest });
    } else if (Object.keys(selectedCards).length < numberOfCardsToSelect) {
      setSelectedCards({
        ...selectedCards,
        [id]: character,
      });
    } else {
      console.log('Max cards selected');
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1) {
      setCurrentPage(1);
    } else if (newPage > lastPage) {
      setCurrentPage(lastPage);
    } else {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-start justify-start mt-2 gap-3">
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
          <div className="mx-auto flex flex-col items-center justify-center">
            <CharacterPagination
              currentPage={currentPage}
              lastPage={lastPage}
              handlePageChange={handlePageChange}
            />
            <RenderCards
              loading={loading}
              characterData={
                loading ? loadingCharacterData(cardsPerPage) : characterData
              }
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
