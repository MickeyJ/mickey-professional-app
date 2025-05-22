import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      new URL("https://rickandmortyapi.com/**"),
      new URL("https://restcountries.com/v3.1/**"),
      new URL("https://formspree.io/f/xdkgvdaq"),
    ],
  },
};

export default nextConfig;
