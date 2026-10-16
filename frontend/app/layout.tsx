import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'katex/dist/katex.min.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Quizify 2 — AI Quiz Generator | Made by Saksham Sooden',
  description: 'Quizify 2 — AI-powered quiz generator created by Saksham Sooden. Upload study material to generate custom quizzes or upload existing question papers to practice instantly.',
};

import { NgrokHeaderInterceptor } from '../components/NgrokHeaderInterceptor';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#2c3e50" />
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%23f97316'/><circle cx='50' cy='50' r='20' fill='none' stroke='white' stroke-width='8'/></svg>" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col font-sans bg-white text-[#2c3e50]`}>
        <NgrokHeaderInterceptor />
        {children}
      </body>
    </html>
  );
}
