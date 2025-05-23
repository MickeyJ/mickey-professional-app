import Image from 'next/image';

// import { InformationCircleIcon } from "@heroicons/react/24/outline";

export interface GameCardProps {
  id: number;
  index: number;
  isSelected: boolean;
  isFlipped: boolean;
  name: string;
  image: string;
  cardSize?: string;
  location?: {
    name: string;
  };
  sizeClass?: string; // 'card-size-sm' | 'card-size-md' | 'card-size-lg'
  className?: string;
}

export default function GameCard({
  index,
  name,
  image,
  // location,
  isSelected,
  isFlipped,
  className = '',
  // cardSize = "w-[120px] h-[120px]",
  sizeClass = 'card-size-md',
}: GameCardProps) {
  const cardClassName = `game-card ${sizeClass} ${isSelected ? 'selected' : ''} ${isFlipped ? 'flipped' : ''} ${className}`;

  return (
    <div
      className={cardClassName}
      tabIndex={index}
    >
      <div className="game-card-header">
        <h4 className="game-card-name">{name}</h4>
      </div>
      <div className="game-card-image">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 90px, 120px"
          style={{
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        />
      </div>
    </div>
  );
}
