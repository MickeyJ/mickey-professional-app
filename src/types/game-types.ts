export enum Difficulty {
  easy = "easy",
  medium = "medium",
  hard = "hard",
}

export interface DifficultyLevel {
  pairs: number;
  timeout: number;
  name: Difficulty;
}

export interface DifficultyLevels {
  [key: string]: DifficultyLevel;
}

export interface CardReferences {
  [key: string]: Character;
}

export interface GameCardProps {
  id: number;
  index: number;
  isSelected: boolean;
  isFlipped: boolean;
  name: string;
  image: string;
  location: {
    name: string;
  };
  className?: string;
}

export interface Character {
  id: number;
  name: string;
  image: string;
  location: {
    name: string;
  };
}
