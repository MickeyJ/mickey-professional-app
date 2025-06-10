import type { ReactNode } from 'react';

interface CardSimpleProps {
  title: string;
  subtitle: string;
  body: string;
  meta_text: ReactNode;
  image_alt_text?: string;
}

export function CardSimple({
  title,
  subtitle,
  body,
  meta_text,
  image_alt_text = 'Image placeholder',
}: CardSimpleProps) {
  return (
    <div className="simple-card-container">
      <div className="image-placeholder tertiary-placeholder h-32 md:h-48 mb-4 md:mb-6">
        [{image_alt_text}]
      </div>
      <h3 className="simple-card-title">{title}</h3>
      <h4 className="simple-card-subtitle">{subtitle}</h4>
      <p className="simple-card-body">{body}</p>
      <div className="simple-card-meta">{meta_text}</div>
    </div>
  );
}
