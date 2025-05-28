import FeaturesSection from '@/_components/sections/features';
import Hero from '@/_components/sections/hero';
import { ChartIcon, GameIcon, SlidersIcon } from '@/_components/ui/icons';

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
            icon: <SlidersIcon />,
            title: 'Theme',
            description:
              "Modify this site's appearance in real-time. Change colors, fonts, and layout with live previews.",
            href: '/demo/theme',
            linkText: 'Try it',
            colorScheme: 'blue' as const,
          },
          {
            icon: <GameIcon />,
            title: 'Game',
            description:
              'Play a mini-game that demonstrates JavaScript logic and smooth animations.',
            href: '/demo/game',
            linkText: 'Play',
            colorScheme: 'green' as const,
          },
          {
            icon: <ChartIcon />,
            title: 'Data',
            description:
              'Explore interactive charts and graphs powered by real APIs with customizable parameters.',
            href: '/demo/data',
            linkText: 'Visualize',
            colorScheme: 'purple' as const,
          },
        ]}
      />
    </div>
  );
}
