import type { Character } from '@/types';

export default function loadingData(cardsPerPage: number): Character[] {
  return Array.from({ length: cardsPerPage }, (_, i) => ({
    id: i,
    name: 'Loading...',
    image: '/person-image-placeholder.png',
    location: {
      name: 'Loading...',
    },
    className: 'loading-card',
  }));
}
