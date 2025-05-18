import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [new URL("https://rickandmortyapi.com/**"), new URL("https://restcountries.com/v3.1/**")],
  },
};

export default nextConfig;
