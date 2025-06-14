import type { Metadata } from 'next';
// import { Roboto, Roboto_Mono } from 'next/font/google';
import { Mulish, Source_Sans_3 } from 'next/font/google';

import './globals.css';

const primary = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-primary',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'], // More weights available
  display: 'swap',
});

const muli = Mulish({
  subsets: ['latin'],
  variable: '--font-primary',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FAO Data Explorer',
  description: 'demonstration of SQL REST API version of the full FAO database',
  keywords: ['FAO', 'data', 'data analysis', 'rest api', 'sql', 'food', 'agriculture'],
  authors: [{ name: 'Mickey Malotte' }],
  creator: 'Mickey Malotte',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://app.mickeymalotte.com/expore-fao',
    title: 'FAO Data Explorer',
    description: 'demonstration of SQL REST API version of the full FAO database',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAO Data Explorer',
    description: 'demonstration of SQL REST API version of the full FAO database',
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
      className={`${primary.variable} ${muli.variable}`}
    >
      <body className="antialiased min-h-screen flex flex-col">
        <main className="pt-[var(--nav-height)] flex-1 leading-relaxed">{children}</main>
      </body>
    </html>
  );
}
