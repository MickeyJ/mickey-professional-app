interface GameOverProps {
  onGameScreenNext: () => void;
  onGameScreenBack: () => void;
}

export default function GameInstructions({ onGameScreenNext, onGameScreenBack }: GameOverProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Game Over</h2>
      <p>
        **Congratulations!** You have completed the game. You found all the matching pairs of cards.
        You can now start a new game or go back to the main menu.
      </p>
      <p>or YOU LOST! Better luck next time. You can try again or go back to the main menu.</p>
      <div className="flex flex-row items-center justify-center gap-2">
        <button
          onClick={() => onGameScreenBack()}
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
      </div>
    </div>
  );
}
