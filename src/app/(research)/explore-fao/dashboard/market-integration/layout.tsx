// app/market-integration/layout.tsx
import { MarketIntegrationProvider } from './context';

export default function MarketIntegrationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MarketIntegrationProvider>{children}</MarketIntegrationProvider>;
}
