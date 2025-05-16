import { redirect } from 'next/navigation';

export default function DemoPage() {
  // Automatically redirect to the first demo feature
  redirect('/demo/theme');
}
