import FeaturesSection from '@/_components/sections/features';
import Hero from '@/_components/sections/hero';
import { ChartIcon, GameIcon } from '@/_components/ui/icons';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <FeaturesSection
        title="Interactive Demonstrations"
        subTitle="Explore the tools and techniques I use daily"
        features={[
          {
            icon: <GameIcon />,
            title: 'Rick and Morty Game',
            description: `
              Play a silly Rick and Morty card match game using the Rick and Morty API.
              Search over 800 characters, choose your favorites, and try to match them in time... oh geez, I don't know Rick!
            `,
            href: '/demo/game',
            linkText: 'Play',
            colorScheme: 'green' as const,
          },
          {
            icon: <ChartIcon />,
            title: 'Data, APIs, and Visualizations',
            description:
              'Explore fascinating data using interactive visualizations and API integrations, including global commodity prices and nutrition data.',
            href: '/demo/data',
            linkText: 'Visualize',
            colorScheme: 'purple' as const,
          },
        ]}
      />
    </div>
  );
}
