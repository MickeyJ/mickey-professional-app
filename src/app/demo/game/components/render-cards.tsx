import type { CardReferences, Character } from '@/types';
import GameCard from './game-card';

interface RenderCardsProps {
  loading: boolean;
  characterData: Character[];
  selectedCards: CardReferences;
  flippedCards: CardReferences;
  handleSelectOrRemoveCard: (character: Character) => void;
}



export default function RenderCards({ loading, characterData, selectedCards, flippedCards, handleSelectOrRemoveCard }: RenderCardsProps) {
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
              className={loading ? 'card-loading' : 'card-appear'}
            />
          </div>
        );
      })}
    </div>
  );
}
