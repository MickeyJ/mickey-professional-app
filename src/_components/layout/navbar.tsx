'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Demos', href: '/demo' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/demo') {
      return pathname.startsWith('/demo');
    }
    return pathname === href;
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="h-[var(--nav-height)] fixed top-0 left-0 right-0 flex flex-col justify-center z-30 glass-effect mr-1">
      <div className="px-6 py-4 flex justify-between items-center">
        <div>
          <Link
            href="/"
            className=" text-base-content "
          >
            <Image
              src="/mickey-logo-1.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
          </Link>
        </div>

        {/* Desktop navigation */}
        <ul className="hidden sm:flex gap-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn('nav-link', isActive(item.href) && ' active')}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          className="sm:hidden p-2 relative z-10 cursor-pointer"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className={cn('w-6 h-6 transition-transform duration-300', isOpen && 'rotate-90')}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile navigation */}
        <div
          className={cn(
            'z-50 absolute top-full left-0 right-0 sm:hidden bg-base-200 backdrop-blur-lg border-t border-neutral-200 transition-all duration-300 ease-out',
            isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
          )}
        >
          <ul className="py-4 px-6 space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'block py-3 px-4 rounded-button nav-link',
                    isActive(item.href) && 'nav-link-active'
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Backdrop overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
            style={{ top: '100%' }}
          />
        )}
      </div>
    </nav>
  );
}
