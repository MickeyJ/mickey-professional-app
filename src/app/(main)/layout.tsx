import type { Metadata } from 'next';
// import { Roboto, Roboto_Mono } from 'next/font/google';
import { Doto, JetBrains_Mono, Mulish } from 'next/font/google';

import './globals.css';

import Footer from '@/_components/layout/footer';
import Navbar from '@/_components/layout/navbar';

const muli = Mulish({
  subsets: ['latin'],
  variable: '--font-muli',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const jetbrains_mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const doto = Doto({
  subsets: ['latin'],
  variable: '--font-doto',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

// src/app/(main)/layout.tsx
export const metadata: Metadata = {
  title: 'Mickey Malotte',
  description: 'Full-stack developer crafting clean, functional web applications',
  keywords: ['developer', 'nextjs', 'typescript', 'tailwind'],
  authors: [{ name: 'Mickey Malotte' }],
  creator: 'Mickey Malotte',
  icons: {
    icon: [
      { url: '/icons/portfolio/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/portfolio/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/portfolio/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    shortcut: '/icons/portfolio/favicon.ico',
    apple: '/icons/portfolio/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/icons/portfolio/android-chrome-192x192.png',
      },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://app.mickeymalotte.com',
    title: 'Mickey Malotte',
    description: 'Full-stack developer crafting clean, functional web applications',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mickey Malotte',
    description: 'Full-stack developer crafting clean, functional web applications',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${muli.variable} ${jetbrains_mono.variable} ${doto.variable} `}
    >
      <body className="bg-base-100 font-sans antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="pt-[var(--nav-height)] flex-1 leading-relaxed">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
