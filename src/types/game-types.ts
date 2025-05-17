export interface CardReferences {
  [key: string]: Character;
}

export interface GameCardProps {
  id: number;
  index: number;
  isSelected: boolean;
  isFlipped: boolean;
  name: string;
  image: string;
  location: {
    name: string;
  };
  className?: string;
}

export interface Character {
  id: number;
  name: string;
  image: string;
  location: {
    name: string;
  };
}
