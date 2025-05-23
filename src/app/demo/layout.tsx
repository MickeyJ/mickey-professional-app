'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

export default function DemoPageLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const demoItems = [
    {
      name: 'Theme Customizer',
      href: '/demo/theme',
      linkClassName: 'feature-1-link',
    },
    {
      name: 'Interactive Game',
      href: '/demo/game',
      linkClassName: 'feature-2-link',
    },
    {
      name: 'Data Visualization',
      href: '/demo/data',
      linkClassName: 'feature-3-link',
    },
  ];

  const isActive = (href: string) => pathname === href;
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="w-full h-full flex flex-col">
      <nav className="w-full relative">
        <div className="max-w-6xl mx-auto px-6 md:py-2 flex justify-center items-center">
          {/* Desktop navigation */}
          <ul className="hidden sm:flex flex-col gap-3 items-center justify-center w-full sm:flex-row sm:gap-8 sm:items-start sm:justify-start">
            {demoItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(`${item.linkClassName}`, isActive(item.href) && ' active')}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button
            className="sm:hidden p-2 fixed top-3 z-50 cursor-pointer"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className={cn('w-6 h-6 transition-all duration-300', isOpen && 'rotate-180')}
              fill="none"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6"
                    stroke="var(--color-feature-1-base)"
                    className="transition-all duration-300"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 6l12 12"
                    stroke="var(--color-feature-3-base)"
                    className="transition-all duration-300"
                  />
                </>
              ) : (
                <>
                  {/* Top line - Feature 1 (Teal) */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16"
                    stroke="var(--color-feature-1-base)"
                    className="transition-all duration-300"
                  />
                  {/* Middle line - Feature 2 (Amber) */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 12h16"
                    stroke="var(--color-feature-2-base)"
                    className="transition-all duration-300"
                  />
                  {/* Bottom line - Feature 3 (Red/Orange) */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 18h16"
                    stroke="var(--color-feature-3-base)"
                    className="transition-all duration-300"
                  />
                </>
              )}
            </svg>
          </button>

          {/* Mobile navigation menu */}
          <div
            className={cn(
              'sm:hidden absolute top-full left-0 w-full bg-gray-900 border-t border-gray-700 transition-all duration-300 z-20',
              isOpen
                ? 'opacity-100 visible transform translate-y-0'
                : 'opacity-0 invisible transform -translate-y-2'
            )}
          >
            <ul className="flex flex-col gap-3 p-6">
              {demoItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      `${item.linkClassName} block py-2`,
                      isActive(item.href) && ' active'
                    )}
                    onClick={() => setIsOpen(false)} // Close menu when link is clicked
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <div>{children}</div>
    </div>
  );
}
