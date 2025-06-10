'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

export default function DemoPageLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const demoItems = [
    // {
    //   name: 'Theme Customizer',
    //   href: '/demo/theme',
    //   linkClassName: 'feature-1-link',
    // },
    {
      name: 'Rick and Morty Game',
      href: '/demo/game',
      linkClassName: 'feature-2-link',
    },
    {
      name: 'Data Visualization',
      href: '/demo/data',
      linkClassName: 'feature-3-link',
      subRoutes: ['/food-prices', '/food-nutrition'],
    },
  ];

  const isActive = (href: string) => {
    // Check if the current pathname matches the href or starts with it for sub-routes
    console.log(`Checking active state for href: ${href}, current pathname: ${pathname}`);

    return pathname === href || pathname.startsWith(href + '/');
  };
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="w-full h-full flex flex-col">
      <nav className="w-full relative">
        <div className="max-w-6xl mx-auto px-6 md:py-2 flex justify-center items-center">
          {/* Desktop navigation */}
          <ul className="hidden sm:flex flex-col gap-3 items-center justify-center w-full sm:flex-row sm:gap-8 sm:items-start sm:justify-start">
            {demoItems.map((item) => (
              <li
                key={item.name}
                className=""
              >
                <Link
                  href={item.href}
                  className={cn(`${item.linkClassName}`, isActive(item.href) && ' active')}
                >
                  {item.name}
                </Link>
                <div className="h-[20] mt-1 flex flex-row items-center gap-2">
                  {isActive(item.href) &&
                    item.subRoutes &&
                    item.subRoutes.map((subRoute) => (
                      <Link
                        key={subRoute}
                        href={`${item.href}${subRoute}`}
                        className={cn(
                          'sub-link text-xs',
                          isActive(`${item.href}${subRoute}`) && ' sub-active'
                        )}
                      >
                        {' '}
                        {subRoute}{' '}
                      </Link>
                    ))}
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button
            className="sm:hidden p-2 fixed top-3 z-50 cursor-pointer"
            style={{
              top: 'calc(12px + env(safe-area-inset-top, 0px))',
            }}
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
                    onClick={() => setIsOpen(false)}
                    className={cn(`${item.linkClassName} block`, isActive(item.href) && ' active')}
                  >
                    {item.name}
                  </Link>
                  <div className="h-[20] mt-1 flex flex-row items-center gap-2">
                    {item.subRoutes &&
                      item.subRoutes.map((subRoute) => (
                        <Link
                          key={subRoute}
                          href={`${item.href}${subRoute}`}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            'sub-link text-sm',
                            isActive(`${item.href}${subRoute}`) && ' sub-active'
                          )}
                        >
                          {' '}
                          {subRoute}{' '}
                        </Link>
                      ))}
                  </div>
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
