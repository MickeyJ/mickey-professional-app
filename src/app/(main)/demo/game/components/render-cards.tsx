import type { Character, SelectedCards } from '@/types';
import GameCard from './game-card';

interface RenderCardsProps {
  loading: boolean;
  loadingData: Character[];
  characterData: Character[];
  selectedCards: SelectedCards;
  handleSelectOrRemoveCard: (character: Character) => void;
}

export default function RenderCards({
  loading,
  loadingData,
  characterData,
  selectedCards,
  handleSelectOrRemoveCard,
}: RenderCardsProps) {
  let data = characterData;
  if (loading) {
    data = loadingData;
  }
  return (
    <div className="w-full character-cards-container">
      <div className="character-cards-scroll">
        {data.length ? (
          data.map((character: Character, i: number) => {
            return (
              <div
                key={character.id + character.name}
                onClick={() => handleSelectOrRemoveCard(character)}
                className="card-wrapper"
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
                  sizeClass="card-size-md"
                />
              </div>
            );
          })
        ) : (
          <div className="w-full text-center py-4">
            <h2 className="text-lg font-semibold">{'No characters found.'}</h2>
          </div>
        )}
      </div>

      {/* Helper text for mobile */}
      <div className="scroll-helper-text">Scroll to see more characters</div>
    </div>
  );
}
