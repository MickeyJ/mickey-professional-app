"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export default function DemoPageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const demoItems = [
    {
      name: "Theme Customizer",
      href: "/demo/theme",
      linkClassName: "feature-1-link",
    },
    {
      name: "Interactive Game",
      href: "/demo/game",
      linkClassName: "feature-2-link",
    },
    {
      name: "Data Visualization",
      href: "/demo/data",
      linkClassName: "feature-3-link",
    },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="w-full h-full flex flex-col ">
      <nav className="w-full">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-center items-center">
          {/* Desktop navigation */}
          <ul className="flex flex-col gap-3 items-center justify-center w-full sm:flex-row sm:gap-8 sm:items-start sm:justify-start">
            {demoItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(`${item.linkClassName}`, isActive(item.href) && " active")}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div>{children}</div>
    </div>
  );
}
