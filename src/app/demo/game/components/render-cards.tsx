import type { CardReferences, Character } from "@/types";
import GameCard from "./game-card";

interface RenderCardsProps {
  loading: boolean;
  loadingData: Character[];
  characterData: Character[];
  selectedCards: CardReferences;
  // flippedCards: CardReferences;
  handleSelectOrRemoveCard: (character: Character) => void;
}

export default function RenderCards({
  loading,
  loadingData,
  characterData,
  selectedCards,
  // flippedCards,
  handleSelectOrRemoveCard,
}: RenderCardsProps) {
  let data = characterData;
  if (loading) {
    data = loadingData;
  }
  return (
    <div className="max-w-[700px] flex flex-wrap gap-4 items-center justify-center my-6">
      {data.length ? (
        data.map((character: Character, i: number) => {
          return (
            <div
              key={character.id + character.name}
              onClick={() => handleSelectOrRemoveCard(character)}
            >
              <GameCard
                id={character.id}
                index={i}
                isSelected={!!selectedCards[character.id]}
                isFlipped={false}
                name={character.name}
                image={character.image}
                location={character.location}
                className={loading ? "card-loading" : "card-appear"}
              />
            </div>
          );
        })
      ) : (
        <div>
          <h2 className="text-lg font-semibold text-center">{"No characters found."}</h2>
        </div>
      )}
    </div>
  );
}
