import type { CardReferences, Character, DifficultyLevel } from '@/types';
import { Difficulty } from '@/types/game-types';

interface GameSettingsProps {
  numberOfCardsToSelect: number;
  selectedCards: CardReferences;
  difficulty: string;
  difficultyLevels: DifficultyLevel[];
  nameSearchInput: string;
  setDifficulty: (difficulty: Difficulty) => void;
  setNameSearchInput: (name: string) => void;
  setSelectedCards: (cards: CardReferences) => void;
  handleSelectOrRemoveCard: (character: Character) => void;
}



export default function GameSettings({
  numberOfCardsToSelect,
  selectedCards,
  difficulty,
  difficultyLevels,
  nameSearchInput,
  setDifficulty,
  setNameSearchInput,
  setSelectedCards,
  handleSelectOrRemoveCard,
}: GameSettingsProps) {
  const selectedCardElements = Object.values(selectedCards).map((character: Character) => (
    <button
      key={ character.id + character.name }
      className="flex flex-row items-center text-xs text-info rounded-sm bg-base-200 p-1 border border-gray-300 hover:border-error transform-border duration-200 cursor-pointer"
      onClick={() => handleSelectOrRemoveCard(character)}
    >
      {character.name}
      <span className="text-xs text-error font-bold mx-1">X</span>
    </button>
  ));

  
  return (
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
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as Difficulty)}
        >
          {difficultyLevels.map(({ name, pairs }) => (
            <option
              key={name}
              value={name}
              className="bg-base-100 text-dark"
            >
              {name}-({pairs} Cards)
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
        <div>
          <label className="text-sm text-dim">
            <span className="text-info font-bold">{selectedCardElements.length} </span>
            <span>of</span> <span className="text-info font-bold">{numberOfCardsToSelect} </span>
            <span>Characters Selected:</span>
          </label>
          <span
            className="text-xs rounded border-1 border-error text-error px-1 ml-1 cursor-pointer"
            onClick={() => setSelectedCards({})}
          >
            reset
          </span>
        </div>
        <div className="flex flex-row flex-wrap gap-2 mt-2">{selectedCardElements}</div>
      </div>
    </div>
  );
}
