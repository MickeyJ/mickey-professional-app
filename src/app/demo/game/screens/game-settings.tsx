import { useEffect, useState } from 'react';

import { getCharacterData, loadingCharacterData } from '@/api';
import { useDebounce } from '@/hooks';
import type { Character, DifficultySettings, SelectedCards } from '@/types';
import { Difficulty } from '@/types/game-types';
import CharacterPagination from '../components/character-pagination';
import RenderCards from '../components/render-cards';

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
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [characterData, setCharacterData] = useState<Character[]>([]);
  // Game Setup state
  const [characterSearchCount, setCharacterSearchCount] = useState<number>(0);

  // Pagination state
  const [currentPage, debouncedCurrentPage, setCurrentPage] = useDebounce<number>(1, 300);

  // Character search state
  const [nameSearchInput, debounceNameSearchInput, setNameSearchInput] = useDebounce<string>(
    '',
    300
  );

  const lastPage = Math.ceil(characterSearchCount / cardsPerPage);
  const numCardsToSelect = difficultySettings.pairs / 2;
  const numCardsSelected = Object.keys(selectedCards).length;
  const readyToPlay = numCardsSelected === numCardsToSelect;

  useEffect(() => {
    fetchCharacters(debouncedCurrentPage, debounceNameSearchInput);
    console.log('useEffect - fetchCharacters -', new Date().toISOString());
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
      console.log('fetchCharacters:', new Date().toISOString(), data.characters.results);

      setLoading(false);
    } catch (error: unknown) {
      console.error('Error fetching character data:', error);
      setErrorMessage('Error fetching character data: ' + (error as Error).message);
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
      className="selected-card-chip"
      onClick={() => handleSelectOrRemoveCard(character)}
    >
      {character.name}
      <span className="card-chip-delete">X</span>
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
    <div className="game-settings-container">
      <div className="game-settings-main">
        {/* Left Panel - Settings */}
        <div className="settings-panel settings-panel-left">
          {/* Difficulty Selection */}
          <div className="form-field">
            <label
              htmlFor="difficultySelection"
              className="form-label"
            >
              Choose Difficulty
            </label>
            <select
              id="difficultySelection"
              className="form-select"
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
                  className="form-option"
                >
                  {name}-({pairs} Cards)
                </option>
              ))}
            </select>
          </div>

          {/* Character Search Input */}
          <div className="form-field">
            <label
              htmlFor="nameSearchInput"
              className="form-label"
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
              className="form-input"
            />
          </div>

          {/* Time Challenge Checkbox */}
          <div className="checkbox-group">
            <input
              id="timedChallenge"
              type="checkbox"
              placeholder="character name"
              checked={timedChallengeOn}
              onChange={() => setTimeChallengeOn(!timedChallengeOn)}
              className="form-checkbox"
            />
            <label
              htmlFor="timedChallenge"
              className="checkbox-label"
            >
              Timed Challenge - {difficultySettings.timeLimit}s
            </label>
          </div>
        </div>

        {/* Middle Panel - Character Chips */}
        <div
          className={`settings-panel ${readyToPlay ? 'settings-panel-middle-ready' : 'settings-panel-middle-default'} settings-panel-middle`}
        >
          {/* Selected Character List/Buttons */}
          <div className="flex flex-col items-start">
            <div className="selected-cards-header">
              <label className="selected-cards-counter">
                <span className="counter-highlight">{selectedCardElements.length} </span>
                <span>of</span> <span className="counter-highlight">{numCardsToSelect} </span>
                <span>Characters Selected</span>
              </label>
              <span
                className={`clear-button ${numCardsSelected ? 'clear-button-active' : 'clear-button-disabled'}`}
                onClick={() => setSelectedCards({})}
              >
                Clear
              </span>
            </div>
            <div className="selected-cards-grid">{selectedCardElements}</div>
          </div>
        </div>

        {/* Right Panel - Play Button */}
      </div>

      {/* Character Cards */}
      {errorMessage ? (
        <div className="error-message">{errorMessage}</div>
      ) : (
        <div className="character-cards-section">
          <div>
            <CharacterPagination
              currentPage={currentPage}
              lastPage={lastPage}
              handlePageChange={handlePageChange}
            />
          </div>

          <RenderCards
            loading={loading}
            loadingData={loadingData}
            characterData={characterData}
            selectedCards={selectedCards}
            // flippedCards={flippedCards}
            handleSelectOrRemoveCard={handleSelectOrRemoveCard}
          />
          <button
            onClick={() => readyToPlay && onGameScreenNext()}
            className={`play-button ${readyToPlay ? 'play-button-ready' : 'play-button-disabled'}`}
          >
            PLAY
          </button>
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
