import Image from "next/image";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export interface GameCardProps {
  id: number;
  index: number;
  isSelected: boolean;
  isFlipped: boolean;
  name: string;
  image: string;
  cardSize?: number;
  location?: {
    name: string;
  };
  className?: string;
}

export default function GameCard({
  index,
  name,
  image,
  // location,
  isSelected,
  isFlipped,
  className = "",
  cardSize = 100,
}: GameCardProps) {
  const cardClassName = `game-card ${className} ${isFlipped ? "flipped" : ""} ${isSelected ? `selected w-[${cardSize - cardSize / 10}px] h-[${cardSize - cardSize / 10}px]` : ""}`;

  return (
    <div className={`w-[120] h-[120] flex flex-col items-center justify-center`}>
      <div
        className={cardClassName}
        tabIndex={index}
      >
        <div className="text-center justify-center px-1">
          <h4 className="text-[10px] text-bright font-semibold truncate">{name}</h4>
          {/* <InformationCircleIcon className="absolute top-1 right-1 w-3 h-3 text-bright" /> */}
        </div>
        <Image
          src={image}
          alt={name}
          // fill={true}
          width={500}
          height={500}
          className="w-full"
        />
      </div>
    </div>
  );
}
