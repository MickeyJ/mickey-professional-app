interface GameInstructionsProps {
  onGameScreenNext: () => void;
}

export default function GameInstructions({ onGameScreenNext }: GameInstructionsProps) {
  return (
    <div className="w-full flex flex-col items-center p-4">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold">Rick and Morty Card Match!</h2>
        <div className="w-full sm:w-[80%] flex flex-col gap-2 text-dim">
          <h2 className="text-xl text-dim font-semibold underline">Game play</h2>

          <p className="text-dim">
            Your typical card match game. Flip two cards, if they match, they remain flipped. If
            they do not match, they will flip back over.
          </p>

          <hr className="my-2 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

          <h2 className="text-xl text-dim font-semibold underline">Difficulty</h2>

          <p className="text-dim">
            This determines the number of cards you'll need to match. It also changes the time
            limit, if you choose to play against the clock
          </p>

          <i className="text-sm text-dark">
            Difficulty also adds something more subtle challenge. See if you can tell what it is!
          </i>

          <hr className="my-1 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

          <h2 className="text-xl text-dim font-semibold underline">Cards</h2>
          <p className="text-dim">
            Pick any characters from the Rick and Morty universe. There are over 800... with 100+
            Ricks alone, like Pickle Rick! Use the search bar on the next page. No search means all
            characters.
          </p>
          <i className="text-sm text-dark">
            <b>Pickle Rick</b> - <b>Ice-T</b> - <b>Mr. Meeseeks</b> - <b>Armagheadon</b> -{' '}
            <b>Jerry's Mytholog</b>
          </i>
          <button
            onClick={() => onGameScreenNext()}
            className="btn-primary self-end"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
