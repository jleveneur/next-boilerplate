import '@/styles/globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Next.js Starter',
  description: 'Next.js starter template with TypeScript, Tailwind CSS, Prettier and ESLint.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn('min-h-screen font-sans antialiased', inter.variable)}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
