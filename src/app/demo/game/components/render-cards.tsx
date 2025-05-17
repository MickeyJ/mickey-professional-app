import type { CardReferences, Character } from '@/types';
import GameCard from './game-card';

interface RenderCardsProps {
  characterData: Character[];
  selectedCards: CardReferences;
  flippedCards: CardReferences;
  handleSelectCard: (
    character: Character,
    index: number
  ) => (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function RenderCards({
  characterData,
  selectedCards,
  flippedCards,
  handleSelectCard,
}: RenderCardsProps) {
  const characterDataFiltered = [...characterData].filter((character, i) => {
    const selectedCard = Object.keys(selectedCards).find(
      (key) => selectedCards[key].id === character.id
    );
    return !selectedCard;
  });

  return [...characterData, ...Object.keys(selectedCards)].map(
    (_, i: number) => {
      let character: Character | undefined;
      if (selectedCards[i]) {
        character = selectedCards[i];
      } else {
        character = characterDataFiltered.shift();
      }
      if (!character) {
        return undefined;
      }

      return (
        <div
          key={character.id + character.name}
          onClick={handleSelectCard(character, i)}
        >
          <GameCard
            id={character.id}
            index={i}
            isSelected={!!selectedCards[i]}
            isFlipped={false}
            name={character.name}
            image={character.image}
            location={character.location}
          />
        </div>
      );
    }
  );
}
