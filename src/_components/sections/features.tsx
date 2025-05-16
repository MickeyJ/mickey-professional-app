import { cn } from '@/lib/utils';
import Link from 'next/link';
import { SlidersIcon, GameIcon, ChartIcon } from '@/_components/ui/icons';

// Feature Card
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  linkText: string;
  colorScheme: 'blue' | 'green' | 'purple';
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  href,
  linkText,
  colorScheme,
}) => {
  const colorClasses = {
    blue: {
      iconBg: 'feature-1-icon',
      link: 'feature-1-link',
    },
    green: {
      iconBg: 'feature-2-icon',
      link: 'feature-2-link',
    },
    purple: {
      iconBg: 'feature-3-icon',
      link: 'feature-3-link',
    },
  };

  return (
    <div className="feature-card flex flex-col h-full">
      <div
        className={cn(
          'w-12 h-12 rounded-lg flex items-center justify-center mb-6',
          colorClasses[colorScheme].iconBg
        )}
      >
        {icon}
      </div>
      <h3 className="text-heading-md  mb-3">{title}</h3>
      <p className="text-body-md  mb-4">{description}</p>
      <div className="mt-auto">
        <Link
          href={href}
          className={colorClasses[colorScheme].link}
        >
          {linkText} →
        </Link>
      </div>
    </div>
  );
};

// Features Section
export default function FeaturesSection() {
  const features = [
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
  ];

  return (
    <section className="py-10 px-6 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-heading-lg text-bright mb-4">
            Interactive Demonstrations
          </h2>
          <p className="text-body-lg text-dim">
            Explore the tools and techniques I use daily
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              href={feature.href}
              linkText={feature.linkText}
              colorScheme={feature.colorScheme}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
