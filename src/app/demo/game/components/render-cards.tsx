import type { CardReferences, Character } from '@/types';
import GameCard from './game-card';

interface RenderCardsProps {
  loading: boolean;
  characterData: Character[];
  selectedCards: CardReferences;
  flippedCards: CardReferences;
  handleSelectOrRemoveCard: (character: Character) => void;
}

export default function RenderCards({
  loading,
  characterData,
  selectedCards,
  flippedCards,
  handleSelectOrRemoveCard,
}: RenderCardsProps) {
  // const characterDataFiltered = [...characterData].filter((character, i) => {
  //   const selectedCard = Object.keys(selectedCards).find(
  //     (key) => selectedCards[key].id === character.id
  //   );
  //   return !selectedCard;
  // });

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center my-6">
      {characterData.map((character: Character, i: number) => {
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
              className={loading ? 'animate-shimmer' : ''}
            />
          </div>
        );
      })}
    </div>
  );
}
