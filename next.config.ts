import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      new URL('https://rickandmortyapi.com/**'),
      new URL('https://restcountries.com/v3.1/**'),
      new URL('https://formspree.io/f/xdkgvdaq'),
      new URL('https://api.nal.usda.gov/fdc/v1/foods/**'),
      new URL('https://zs39isn4zj.us-west-2.awsapprunner.com/**'),
      new URL('http://localhost:8000/**'),
    ],
  },
};

export default nextConfig;
