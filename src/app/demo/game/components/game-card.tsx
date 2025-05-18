import type { GameCardProps } from "@/types";

export default function GameCard({
  id,
  index,
  isSelected,
  isFlipped,
  name,
  image,
  location,
  className = "",
}: GameCardProps) {
  let cardClassName = "game-card";
  isFlipped && (cardClassName += " flipped");
  isSelected && (cardClassName += " selected");
  className && (cardClassName += ` ${className}`);

  return (
    <div className={cardClassName} tabIndex={index}>
      <h2 className="max-w-42 text-md text-bright font-semibold truncate">{name}</h2>
      <img src={image} alt={name} width={24} height={24} className="w-24 h-24 rounded-full" />
      <p className="max-w-42 text-sm text-dark truncate">{location.name}</p>
    </div>
  );
}
