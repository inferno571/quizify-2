import React from 'react';
import Link from 'next/link';
import { PlayerBadge } from '../../components/PlayerBadge';
import { LarpGuideButton } from '../../components/LarpGuideModal';
import { ThemeToggle } from '../../components/ThemeToggle';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="bg-surface border-b border-gray-100 dark:border-outline px-4 md:px-8 py-3 flex flex-wrap gap-3 items-center justify-between shadow-sm sticky top-0 z-10 shrink-0 transition-colors">
        <div className="flex items-center gap-6 cursor-pointer">
          <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
            <div className="relative w-11 h-11 bg-orange-500 rounded-xl flex items-center justify-center shadow-md shadow-orange-500/20">
               <div className="w-5 h-5 border-3 border-white rounded-full"></div>
               <span className="absolute -top-1.5 -right-1.5 bg-[#2c3e50] dark:bg-canvas text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border border-white dark:border-outline shadow">5</span>
            </div>
            <div className="h-8 w-px bg-gray-200 dark:bg-neutral-800 mx-0.5 hidden sm:block"></div>
            <div className="leading-tight">
              <div className="font-black text-xl tracking-tight text-[#2c3e50] dark:text-white flex items-center gap-1.5">
                QUIZIFY <span className="bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded font-black">5</span>
                <span className="text-[10px] tracking-wide text-orange-600 dark:text-orange-400">PRO ULTRA</span>
              </div>
              <div className="text-[10px] font-bold text-gray-500 dark:text-neutral-400 tracking-wider uppercase">
                Made by <span className="text-orange-600 dark:text-orange-400 font-extrabold">Saksham Sooden</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <ThemeToggle compact />
          <LarpGuideButton />
          <PlayerBadge />
          <div className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-neutral-900 dark:to-neutral-900 border border-orange-200/80 dark:border-outline rounded-full text-xs font-semibold text-orange-700 dark:text-orange-400 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="hidden sm:inline">Crafted by</span>
            <span>Saksham Sooden</span>
          </div>
        </div>
      </header>

      <main className="app-background flex-1 bg-canvas transition-colors">
        {children}
      </main>
      <footer className="py-6 bg-[#2c3e50] dark:bg-canvas text-[#bdc3c7] dark:text-neutral-400 text-xs text-center border-t-4 border-[#E67E22] flex flex-col items-center justify-center gap-1.5 px-4">
        <div className="flex flex-wrap items-center justify-center gap-2 font-semibold text-sm text-white">
          <span className="tracking-wide">Quizify 5 Pro Ultra</span>
          <span className="text-orange-400">•</span>
          <span className="text-orange-300 font-bold">Made with ❤️ by Saksham Sooden</span>
        </div>
        <div className="text-gray-400 dark:text-neutral-500">© 2026 Quizify 5 Pro Ultra. All rights reserved.</div>
      </footer>

    </>
  );
}
