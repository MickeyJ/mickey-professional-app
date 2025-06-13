import Link from 'next/link';

import { cn } from '@/lib/utils';

// Feature Card
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  linkText: string;
  additionalLink?: {
    text: string;
    href: string;
  };
  colorScheme: 'blue' | 'green' | 'purple';
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  href,
  linkText,
  additionalLink,
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
    <div className="feature-card flex flex-col h-full gap-3 mx-auto w-[90%] sm:w-full ">
      <div
        className={cn(
          'w-12 h-12 rounded-lg flex items-center justify-center',
          colorClasses[colorScheme].iconBg
        )}
      >
        {icon}
      </div>
      <h3 className="text-heading-sm sm:text-heading-md">{title}</h3>
      <p className="text-dim text-body-sm sm:text-body-md ">{description}</p>
      {additionalLink ? (
        <div className="mt-auto flex flex-row items-end justify-between text-heading-sm">
          <Link
            href={additionalLink.href}
            className="text-sm text-info hover:text-bright transition-colors"
          >
            {additionalLink.text}
          </Link>
          <Link
            href={href}
            className={`${colorClasses[colorScheme].link} cursor-pointer`}
          >
            {linkText} →
          </Link>
        </div>
      ) : (
        <div className="ml-auto mt-auto text-heading-sm">
          <Link
            href={href}
            className={`${colorClasses[colorScheme].link} cursor-pointer`}
          >
            {linkText} →
          </Link>
        </div>
      )}
    </div>
  );
};

interface FeatureSectionProps {
  title: string;
  subTitle: string;
  features: FeatureCardProps[];
}

// Features Section
export default function FeaturesSection({ title, subTitle, features = [] }: FeatureSectionProps) {
  const featuresGridClass = () => {
    if (features.length === 1) return 'sm:grid-cols-1';
    if (features.length === 2) return 'sm:grid-cols-2';
    if (features.length === 3) return 'sm:grid-cols-3';
    // Handle more than 3 features
    return `sm:grid-cols-${Math.min(features.length, 4)}`;
  };
  return (
    <section className="py-10 px-6 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-heading-lg text-bright mb-4">{title}</h2>
          <p className="text-body-lg text-dim">{subTitle}</p>
        </div>

        <div className={`grid grid-cols-1 ${featuresGridClass()} gap-8`}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              href={feature.href}
              linkText={feature.linkText}
              additionalLink={feature.additionalLink}
              colorScheme={feature.colorScheme}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
