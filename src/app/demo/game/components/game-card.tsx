import Image from "next/image";

import type { GameCardProps } from "@/types";

export default function GameCard({
  index,
  isSelected,
  isFlipped,
  name,
  image,
  location,
  className = "",
}: GameCardProps) {
  const cardClassName = `game-card ${className} ${isFlipped ? "flipped" : ""} ${isSelected ? "selected" : ""}`;

  return (
    <div
      className={cardClassName}
      tabIndex={index}
    >
      <h2 className="max-w-42 text-md text-bright font-semibold truncate">{name}</h2>
      <Image
        src={image}
        alt={name}
        width={500}
        height={500}
        className="w-24 h-24 rounded-full"
      />
      <p className="max-w-42 text-sm text-dark truncate">{location.name}</p>
    </div>
  );
}
