import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'StoryQuest AI — Adaptive Educational Storytelling',
  description: 'Teach any school concept through a personalized story a child won’t want to stop reading, and check actual understanding through adaptive learning.',
};

export const viewport: Viewport = {
  themeColor: '#0284c7',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-amber-200 selection:text-amber-900">
        {children}
      </body>
    </html>
  );
}
