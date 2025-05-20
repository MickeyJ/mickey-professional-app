import { clear } from "console";
import { useEffect, useState } from "react";

import type { Character, DifficultySettings, FlippedCards, SelectedCards } from "@/types";
import GameCard from "../components/game-card";

interface GamePlayProps {
  selectedCards: SelectedCards;
  flippedCards: FlippedCards;
  difficultySettings: DifficultySettings;
  setFlippedCards: (flippedCards: FlippedCards) => void;
  onGameScreenNext: () => void;
  onGameScreenBack: () => void;
}

export default function GamePlay({
  selectedCards,
  flippedCards,
  difficultySettings,
  setFlippedCards,
  onGameScreenNext,
  onGameScreenBack,
}: GamePlayProps) {
  const [currentFlippedCardIndices, setCurrentFlippedCardIndices] = useState<number[]>([]);
  const [playingCards, setPlayingCards] = useState<Character[]>([]);
  const [seconds, setSeconds] = useState<number>(0);
  const [gameWon, setGameWon] = useState<boolean | null>(null);
  const [matches, setMatches] = useState<number>(0);

  const matchesNeeded = difficultySettings.pairs / 2;
  const isGameWon = matches === matchesNeeded;

  function generatePlayingCards(): Character[] {
    const cards: Character[] = Object.values(selectedCards);

    return [...cards, ...cards]
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  useEffect(() => {
    setPlayingCards(generatePlayingCards());
    return () => {
      setFlippedCards({});
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameWon === null) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
        console.log("seconds", seconds);
      }, 1000);
    }

    if (gameWon === true || gameWon === false) {
      console.log("clearInterval");

      interval && clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [gameWon]);

  useEffect(() => {
    if (matches === matchesNeeded) {
      setGameWon(true);
      setSeconds(0);
    } else if (seconds >= difficultySettings.timeLimit) {
      setGameWon(false);
      setSeconds(0);
    }
  }, [matches, seconds]);

  const resetFlippedIndices = () => {
    setCurrentFlippedCardIndices([]);
  };

  const resetFlipped = (flipped = {}) => {
    setFlippedCards(flipped);
    resetFlippedIndices();
  };

  const resetGame = () => {
    resetFlipped();
    setMatches(0);
    setGameWon(null);
    setSeconds(0);
    setPlayingCards(generatePlayingCards());
  };

  const handleFlipCard = (currentCardIndex: number, currentCardId: number) => {
    console.log("handleFlipCard", currentFlippedCardIndices.length);

    if (!currentFlippedCardIndices.length) {
      // Flip first card
      setCurrentFlippedCardIndices([currentCardIndex]);
      setFlippedCards({ ...flippedCards, [currentCardIndex]: currentCardId });
    } else if (currentFlippedCardIndices.length === 1) {
      // Flip second card
      setCurrentFlippedCardIndices((prev) => [prev[0], currentCardIndex]);
      setFlippedCards({
        ...flippedCards,
        [currentCardIndex]: currentCardId,
      });

      // Check for match
      const lastFlippedCardIndex = currentFlippedCardIndices[0];
      const lastFlippedCardId = flippedCards[lastFlippedCardIndex];

      if (lastFlippedCardId === currentCardId) {
        // Match found, keep cards flipped, reset indices
        setCurrentFlippedCardIndices([]);
        setTimeout(() => {
          setMatches((prev) => prev + 1);
        }, 500);
      } else {
        const {
          [lastFlippedCardIndex]: noMatchA,
          [currentCardIndex]: noMatchB,
          ...matchedCards
        } = flippedCards;

        setTimeout(() => {
          // Reset after 1 second, keep matched cards flipped
          resetFlipped(matchedCards);
        }, 1000);
      }
      return;
    }

    console.log("Max cards selected");
  };

  const renderGameOutcome = () => {
    if (gameWon === null) {
      return (
        <h2 className="text-info">
          You have {matches} of {matchesNeeded} matches and {difficultySettings.timeLimit - seconds}{" "}
          to go!
        </h2>
      );
    } else if (gameWon === true) {
      return <h2 className="text-success">You Win!</h2>;
    } else {
      return <h2 className="text-error">Game Over!</h2>;
    }
  };

  return (
    <div className="flex flex-col items-center justify-start w-full h-full p-4 bg-base-100">
      {renderGameOutcome()}

      <div
        className={`${difficultySettings.cardGameWidth} flex flex-wrap gap-4 items-center justify-center my-6`}
      >
        {playingCards.map(({ id, name, image }, i) => {
          const index = i + 1;
          const isFlipped = !!flippedCards[index];

          return (
            <div
              key={id + name + index}
              className="flex flex-col items-center justify-center"
            >
              <div onClick={() => !isFlipped && handleFlipCard(index, id)}>
                {isFlipped ? (
                  <GameCard
                    id={id}
                    index={index}
                    isSelected={false}
                    isFlipped={isFlipped}
                    name={name}
                    image={image}
                    // location={location}
                    className={"card-appear"}
                  />
                ) : (
                  <div className="w-[120] h-[120] flex flex-col items-center justify-center border-1 rounded-lg cursor-pointer" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-row items-center justify-center gap-2">
        {isGameWon ? (
          <>
            <button
              onClick={() => resetGame()}
              className="btn-secondary"
            >
              Try Again
            </button>

            <button
              onClick={() => onGameScreenNext()}
              className="btn-primary"
            >
              Start Over
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onGameScreenBack()}
              className="btn-secondary"
            >
              Back to Settings
            </button>
            <button
              onClick={() => {
                resetGame();
              }}
              className="btn-secondary text-info"
            >
              RESET
            </button>
          </>
        )}
      </div>
    </div>
  );
}
