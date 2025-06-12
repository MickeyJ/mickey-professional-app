'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Sidenav } from '@/_components/fao/components/side-nav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Default to open on desktop, closed on mobile
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Set initial state based on screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setSidebarOpen(window.innerWidth >= 768); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="min-h-screen bg-base-1-bg">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Toggle for all screen sizes */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="icon-button"
                aria-label="Toggle navigation"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {sidebarOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>

              <h1 className="text-lg md:text-xl font-semibold text-base-content">
                <span className="hide-mobile">FAO Global Agricultural Data Explorer</span>
                <span className="show-mobile">FAO Data Explorer</span>
              </h1>
            </div>

            <Link
              href="/explore-fao"
              className="text-sm text-base-3-txt hover:text-accent-primary transition-colors"
            >
              <span className="hide-mobile">← Back to Overview</span>
              <span className="show-mobile">← Back</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className={`dashboard-layout ${sidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
        {/* Sidebar */}
        <aside className="sidebar-push">
          <div className="scroll-area h-full">
            <Sidenav />
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content scroll-area">
          <div className="dashboard-content">{children}</div>
        </main>
      </div>
    </div>
  );
}
