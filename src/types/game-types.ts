export enum Difficulty {
  easy = "easy",
  medium = "medium",
  hard = "hard",
}

export enum GameScreen {
  instructions = "instructions",
  settings = "settings",
  game_play = "game_play",
  game_over = "game_over",
}

export interface DifficultySettings {
  pairs: number;
  timeLimit: number;
  name: Difficulty.easy | Difficulty.medium | Difficulty.hard;
  cardGameWidth: string;
}

export interface DifficultyLevels {
  [key: string]: DifficultySettings;
}

export interface SelectedCards {
  [key: string]: Character;
}

export interface FlippedCards {
  [key: number]: number;
}

export interface Character {
  id: number;
  name: string;
  image: string;
  location: {
    name: string;
  };
}
