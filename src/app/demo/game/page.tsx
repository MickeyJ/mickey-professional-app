"use client";

import { useState } from "react";

import type { FlippedCards, SelectedCards } from "@/types";
import { Difficulty, GameScreen } from "@/types/game-types";
import GameInstructions from "./screens/game-instructions";
import GameOver from "./screens/game-over";
import GamePlay from "./screens/game-play";
import GameSettings from "./screens/game-settings";

const GAME_SETTINGS = {
  DIFFICULTY_OPTIONS: {
    [Difficulty.easy]: {
      pairs: 6,
      timeLimit: 20,
      name: Difficulty.easy,
      cardGameWidth: "max-w-[400px]",
    },
    [Difficulty.medium]: {
      pairs: 8,
      timeLimit: 20,
      name: Difficulty.medium,
      cardGameWidth: "max-w-[600px]",
    },
    [Difficulty.hard]: {
      pairs: 12,
      timeLimit: 30,
      name: Difficulty.hard,
      cardGameWidth: "max-w-[600px]",
    },
  },
};

export default function GamePage() {
  // Data fetching state

  const [gameScreen, setGameScreen] = useState<
    GameScreen.instructions | GameScreen.settings | GameScreen.game_play | GameScreen.game_over
  >(GameScreen.instructions);

  const [difficulty, setDifficulty] = useState<
    Difficulty.easy | Difficulty.medium | Difficulty.hard
  >(Difficulty.easy);

  const numberOfCardsToSelect = GAME_SETTINGS.DIFFICULTY_OPTIONS[difficulty].pairs / 2;

  // Game state

  const [selectedCards, setSelectedCards] = useState<SelectedCards>({});
  const [flippedCards, setFlippedCards] = useState<FlippedCards>({});

  const GameScreens = {
    [GameScreen.instructions]: {
      title: "Game Instructions",
      render() {
        return (
          <GameInstructions
            onGameScreenNext={() => {
              setGameScreen(GameScreen.settings);
            }}
          />
        );
      },
    },
    [GameScreen.settings]: {
      title: "Game Settings",
      render() {
        return (
          <GameSettings
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            selectedCards={selectedCards}
            setSelectedCards={setSelectedCards}
            difficultyOptions={Object.values(GAME_SETTINGS.DIFFICULTY_OPTIONS)}
            difficultySettings={GAME_SETTINGS.DIFFICULTY_OPTIONS[difficulty]}
            numberOfCardsToSelect={numberOfCardsToSelect}
            onGameScreenBack={() => {
              setGameScreen(GameScreen.instructions);
            }}
            onGameScreenNext={() => {
              setGameScreen(GameScreen.game_play);
            }}
          />
        );
      },
    },
    [GameScreen.game_play]: {
      title: "Game",
      render() {
        return (
          <GamePlay
            selectedCards={selectedCards}
            flippedCards={flippedCards}
            setFlippedCards={setFlippedCards}
            difficultySettings={GAME_SETTINGS.DIFFICULTY_OPTIONS[difficulty]}
            onGameScreenBack={() => {
              // Reset game state
              setGameScreen(GameScreen.settings);
            }}
            onGameScreenNext={() => {
              // Reset game state
              setGameScreen(GameScreen.game_over);
            }}
          />
        );
      },
    },
    [GameScreen.game_over]: {
      title: "Game Over",
      render() {
        return (
          <GameOver
            onGameScreenBack={() => {
              setGameScreen(GameScreen.game_play);
            }}
            onGameScreenNext={() => {
              setGameScreen(GameScreen.settings);
            }}
          />
        );
      },
    },
  };

  return <div className="w-screen pr-12">{GameScreens[gameScreen].render()}</div>;
}
