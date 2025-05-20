interface GameInstructionsProps {
  onGameScreenNext: () => void;
}

export default function GameInstructions({ onGameScreenNext }: GameInstructionsProps) {
  return (
    <div className="w-full flex flex-col items-center p-4">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold">Rick and Morty Card Match!</h2>
        <div className="w-full flex flex-col gap-2 text-dim">
          <h2 className="text-xl text-bright font-semibold">Game play</h2>

          <ul>
            <li>- This is pretty much your typical card match game</li>
            <li>- Flip two cards, if they match, they remain flipped</li>
            <li>- If they do not match, they will flip back over</li>
            <li>- You'll have some options on the next page</li>
          </ul>
          <hr className="my-2 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

          <h2 className="text-xl text-bright font-semibold">Diffiuclty</h2>

          <ul>
            <li>- Use the difficulty settings dropdown menu on the next page</li>
            <li>- This determines the number of cards you'll need to match</li>
            <li>- It also changes the time limit, if you choose to play against the clock</li>
            <li className="text-sm text-dark">
              <i>
                - There's another more subtle challenge per difficulty. See if you can tell what it
                is!
              </i>
            </li>
          </ul>

          <hr className="my-2 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

          <h2 className="text-xl text-bright font-semibold">Cards</h2>
          <ul>
            <li>- Pick any characters from the Rick and Morty universe</li>
            <li>- There are over 800... with 100+ Ricks alone, like Pickle Rick!</li>
            <li>- Use the search bar on the next page. No search means all characters</li>
            <li className="text-sm text-dark">
              <i>
                - Try <b>Pickle Rick</b> - <b>Ice-T</b> - <b>Mr. Meeseeks</b> - <b>Armagheadon</b> -{" "}
                <b>Jerry's Mytholog</b>
              </i>
            </li>
          </ul>
        </div>

        <button
          onClick={() => onGameScreenNext()}
          className="btn-primary self-end"
        >
          Next
        </button>
      </div>
    </div>
  );
}
