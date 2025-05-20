"use client";

import { useState } from "react";

import type { FlippedCards, SelectedCards } from "@/types";
import { Difficulty, GameScreen } from "@/types/game-types";
import GameInstructions from "./screens/game-instructions";
import GamePlay from "./screens/game-play";
import GameSettings from "./screens/game-settings";

const GAME_SETTINGS = {
  DIFFICULTY_OPTIONS: {
    [Difficulty.easy]: {
      pairs: 6,
      timeLimit: 10,
      unmatchTime: 200,
      name: Difficulty.easy,
      cardGameWidth: "max-w-[600px]",
    },
    [Difficulty.medium]: {
      pairs: 8,
      timeLimit: 15,
      unmatchTime: 300,
      name: Difficulty.medium,
      cardGameWidth: "max-w-[700px]",
    },
    [Difficulty.hard]: {
      pairs: 12,
      timeLimit: 20,
      unmatchTime: 500,
      name: Difficulty.hard,
      cardGameWidth: "max-w-[700px]",
    },
  },
};

export default function GamePage() {
  // Data fetching state

  const [selectedCards, setSelectedCards] = useState<SelectedCards>({});
  const [gameScreen, setGameScreen] = useState<
    GameScreen.instructions | GameScreen.settings | GameScreen.game_play
  >(GameScreen.instructions);

  const [difficulty, setDifficulty] = useState<
    Difficulty.easy | Difficulty.medium | Difficulty.hard
  >(Difficulty.easy);
  const [timedChallengeOn, setTimeChallengeOn] = useState<boolean>(true);

  // Game state
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
            timedChallengeOn={timedChallengeOn}
            setTimeChallengeOn={setTimeChallengeOn}
            difficultyOptions={Object.values(GAME_SETTINGS.DIFFICULTY_OPTIONS)}
            difficultySettings={GAME_SETTINGS.DIFFICULTY_OPTIONS[difficulty]}
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
            timedChallengeOn={timedChallengeOn}
            difficultySettings={GAME_SETTINGS.DIFFICULTY_OPTIONS[difficulty]}
            onGameScreenBack={() => {
              // Reset game state
              setGameScreen(GameScreen.settings);
            }}
            onGameScreenNext={() => {
              // Where to go?
              setGameScreen(GameScreen.settings);
            }}
          />
        );
      },
    },
  };

  return <div className="w-screen h-full pr-12">{GameScreens[gameScreen].render()}</div>;
}
