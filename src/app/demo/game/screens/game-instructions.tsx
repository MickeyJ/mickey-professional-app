interface GameInstructionsProps {
  onGameScreenNext: () => void;
}

export default function GameInstructions({ onGameScreenNext }: GameInstructionsProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Rick and Morty Card Match!</h2>
      <p>
        Typical card match game. The goal is to find all matching pairs of cards. You flip two
        cards, and if they match, they will remain flipped. If they do not match, they will flip
        back over.
      </p>
      <p>
        On the next screen you'll need to choose your character cards. You can search for any
        characters in the Rick and Morty universe. There are over 800 to choose from, with 100+
        different Ricks alone - like Pickle Rick!
      </p>
      <p>
        You'll also have the option to change difficulty level, which will determine how many cards
        you need to match.
      </p>
      <button
        onClick={() => onGameScreenNext()}
        className="btn-primary"
      >
        Next
      </button>
    </div>
  );
}
