/* eslint-disable @typescript-eslint/no-unused-vars */
import { clear } from 'console';
import { useEffect, useState } from 'react';
import { Span } from 'next/dist/trace';

import type { Character, DifficultySettings, FlippedCards, SelectedCards } from '@/types';
import GameCard from '../components/game-card';

interface GamePlayProps {
  selectedCards: SelectedCards;
  flippedCards: FlippedCards;
  setFlippedCards: (flippedCards: FlippedCards) => void;
  timedChallengeOn: boolean;
  difficultySettings: DifficultySettings;
  onGameScreenNext: () => void;
  onGameScreenBack: () => void;
}

export default function GamePlay({
  selectedCards,
  flippedCards,
  setFlippedCards,
  timedChallengeOn,
  difficultySettings,
  onGameScreenNext,
  onGameScreenBack,
}: GamePlayProps) {
  const [currentFlippedCardIndices, setCurrentFlippedCardIndices] = useState<number[]>([]);
  const [playingCards, setPlayingCards] = useState<Character[]>([]);

  const [seconds, setSeconds] = useState<number>(0);
  const [gameWon, setGameWon] = useState<boolean | null>(null);
  const [matches, setMatches] = useState<number>(0);

  const matchesNeeded = difficultySettings.pairs / 2;
  const gameOver = gameWon === true || gameWon === false;

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
    if (timedChallengeOn) {
      // TODO: this is a little hackky
      let interval: NodeJS.Timeout = setInterval(() => null, 1000);
      if (gameWon === null) {
        interval = setInterval(() => {
          setSeconds((prev) => prev + 1);
          console.log('seconds', seconds);
        }, 1000);
      } else {
        clearInterval(interval);
      }

      return () => {
        clearInterval(interval);
      };
    }
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
    console.log('handleFlipCard', currentFlippedCardIndices.length);

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
          // Reset after time per difficulty, keep matched cards flipped
          resetFlipped(matchedCards);
        }, difficultySettings.unmatchTime);
      }
      return;
    }

    console.log('Max cards selected');
  };

  const renderGameOutcome = () => {
    if (gameWon === null) {
      const timeLeft = difficultySettings.timeLimit - seconds;

      const getTimeLeftColorText = () => {
        let textColor = 'text-success';
        if (timeLeft <= difficultySettings.timeLimit * 0.25) {
          textColor = 'text-error';
        } else if (timeLeft <= difficultySettings.timeLimit * 0.5) {
          textColor = 'text-warning';
        }
        return <span className={`w-[25] inline-block text-center ${textColor}`}>{timeLeft}</span>;
      };

      return (
        <p className="text-dim">
          You have <span className="text-warning">{matches}</span> of <span>{matchesNeeded}</span>{' '}
          matches {!!timedChallengeOn && <span>and {getTimeLeftColorText()} seconds left!</span>}
        </p>
      );
    } else if (gameWon === true) {
      return <p className="text-success">You Win!</p>;
    } else {
      return <p className="text-error">Game Over!</p>;
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-base-100">
      <div className="flex flex-col items-center justify-center text-2xl font-bold">
        {renderGameOutcome()}
      </div>

      <div
        className={`${difficultySettings.cardGameWidth} flex flex-wrap gap-4 items-center justify-center my-6`}
      >
        {playingCards.map(({ id, name, image }, i) => {
          const index = i + 1;
          const isFlipped = !!flippedCards[index];

          return (
            <div
              key={id + name + index}
              className={`flex flex-col items-center justify-center`}
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
                    className={`card-appear`}
                    sizeClass="card-size-lg"
                  />
                ) : (
                  <div className="game-card card-size-lg" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className={`w-[300] flex flex-row gap-4 items-center justify-around my-2`}>
        {gameOver ? (
          <>
            <button
              onClick={() => resetGame()}
              className="btn-secondary"
            >
              Play Again
            </button>

            <button
              onClick={() => onGameScreenNext()}
              className="btn-primary"
            >
              Change Settings
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onGameScreenBack()}
              className="btn-secondary"
            >
              Change Settings
            </button>
            <button
              onClick={() => {
                resetGame();
              }}
              className="btn-primary"
            >
              Cheat
            </button>
          </>
        )}
      </div>
    </div>
  );
}
