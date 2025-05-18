import type { Metadata } from "next";
// import { Roboto, Roboto_Mono } from 'next/font/google';
import { Doto, JetBrains_Mono, Mulish } from "next/font/google";

import "./globals.css";

import Footer from "@/_components/layout/footer";
import Navbar from "@/_components/layout/navbar";

const muli = Mulish({
  subsets: ["latin"],
  variable: "--font-muli",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const doto = Doto({
  subsets: ["latin"],
  variable: "--font-doto",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// const robotoSans = Roboto({
//   variable: '--font-roboto-sans',
//   subsets: ['latin'],
// });

// const robotoMono = Roboto_Mono({
//   variable: '--font-roboto-mono',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: "Mickey M | Developer",
  description: "Full-stack developer crafting clean, functional web applications",
  keywords: ["developer", "nextjs", "typescript", "tailwind"],
  authors: [{ name: "Mickey Malotte" }],
  creator: "Mickey Malotte",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mickeymalotte.com",
    title: "Your Name | Developer",
    description: "Full-stack developer crafting clean, functional web applications",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Name | Developer",
    description: "Full-stack developer crafting clean, functional web applications",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${muli.variable} ${jetbrains_mono.variable} ${doto.variable}`}>
      <body className="bg-base-100 font-sans antialiased  min-h-screen flex flex-col">
        <div style={{ paddingLeft: "calc(100vw - 100%)" }}></div>
        <Navbar />
        <main className="pt-[60px] px-6 flex-1 leading-relaxed">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
