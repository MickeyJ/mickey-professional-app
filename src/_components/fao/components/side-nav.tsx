'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavSection {
  title: string;
  items: {
    label: string;
    href: string;
    description?: string;
  }[];
}

const navSections: NavSection[] = [
  {
    title: 'Price & Market Analysis',
    items: [
      {
        label: 'Price Volatility Comparison',
        href: '/explore-fao/dashboard/price-comparison',
        description: 'Compare market volatility across time periods',
      },
      {
        label: 'Market Integration',
        href: '/explore-fao/dashboard/market-integration',
        description: 'Analyze price correlations between regions',
      },
    ],
  },
  {
    title: 'Production & Trade',
    items: [
      {
        label: 'Production Trends',
        href: '/explore-fao/dashboard/production-trends',
        description: 'Long-term crop production patterns',
      },
      {
        label: 'Trade Flow Network',
        href: '/explore-fao/dashboard/trade-flows',
        description: 'Global agricultural trade visualization',
      },
    ],
  },
  {
    title: 'Environmental Impact',
    items: [
      {
        label: 'Emissions by Sector',
        href: '/explore-fao/dashboard/emissions',
        description: 'Agricultural greenhouse gas emissions',
      },
      {
        label: 'Land Use Changes',
        href: '/explore-fao/dashboard/land-use',
        description: 'Historical land use transformations',
      },
    ],
  },
  {
    title: 'Food Security',
    items: [
      {
        label: 'Nutrition Indicators',
        href: '/explore-fao/dashboard/nutrition',
        description: 'Global nutrition and food security metrics',
      },
      {
        label: 'Food Balance Overview',
        href: '/explore-fao/dashboard/food-balance',
        description: 'Supply and utilization accounts',
      },
    ],
  },
  {
    title: 'Cross-Dataset Analysis',
    items: [
      {
        label: 'Climate vs Production',
        href: '/explore-fao/dashboard/climate-production',
        description: 'Temperature impact on agricultural yields',
      },
      {
        label: 'Development vs Food Security',
        href: '/explore-fao/dashboard/development-food',
        description: 'Economic indicators and nutrition outcomes',
      },
    ],
  },
];

export function Sidenav() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <nav className="w-full h-full">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-base-content mb-6">Data Explorer</h2>

        <div className="nav-section">
          {navSections.map((section) => {
            const isExpanded = expandedSections.includes(section.title);

            return (
              <div key={section.title}>
                <button
                  onClick={() => toggleSection(section.title)}
                  className={`expand-button mb-3 ${isExpanded ? 'expanded' : ''}`}
                >
                  <h3 className="nav-section-title">{section.title}</h3>
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isExpanded && (
                  <ul className="space-y-1 pl-2">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className={`nav-item ${isActive ? 'nav-item-active' : 'nav-item-inactive'}`}
                            title={item.description}
                          >
                            {item.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
