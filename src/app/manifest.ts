// src/app/(main)/manifest.ts
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mickey Malotte',
    short_name: 'Mickey M',
    description: 'Full-stack developer crafting clean, functional web applications',
    start_url: '/',
    display: 'standalone',
    background_color: '#1a1a1f',
    theme_color: '#00d4aa',
    orientation: 'any',
    scope: '/',
    icons: [
      {
        src: '/icons/portfolio/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/portfolio/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/portfolio/favicon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/portfolio/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/portfolio/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/portfolio/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['portfolio', 'developer', 'technology'],
  };
}
