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
      <header className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 px-6 md:px-8 py-3 flex items-center justify-between shadow-sm sticky top-0 z-10 shrink-0 transition-colors">
        <div className="flex items-center gap-6 cursor-pointer">
          <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
            <div className="relative w-11 h-11 bg-orange-500 rounded-xl flex items-center justify-center shadow-md shadow-orange-500/20">
               <div className="w-5 h-5 border-3 border-white rounded-full"></div>
               <span className="absolute -top-1.5 -right-1.5 bg-[#2c3e50] dark:bg-slate-950 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border border-white dark:border-slate-700 shadow">3</span>
            </div>
            <div className="h-8 w-px bg-gray-200 dark:bg-slate-700 mx-0.5 hidden sm:block"></div>
            <div className="leading-tight">
              <div className="font-black text-xl tracking-tight text-[#2c3e50] dark:text-white flex items-center gap-1.5">
                QUIZIFY <span className="bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded font-black">3</span>
              </div>
              <div className="text-[10px] font-bold text-gray-500 dark:text-gray-400 tracking-wider uppercase">
                Made by <span className="text-orange-600 dark:text-orange-400 font-extrabold">Saksham Sooden</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <LarpGuideButton />
          <PlayerBadge />
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-slate-800 dark:to-slate-800/80 border border-orange-200/80 dark:border-slate-700 rounded-full text-xs font-semibold text-orange-700 dark:text-orange-400 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="hidden sm:inline">Crafted by</span>
            <span>Saksham Sooden</span>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-white dark:bg-slate-950 transition-colors">
        {children}
      </main>
      <footer className="py-6 bg-[#2c3e50] dark:bg-slate-950 text-[#bdc3c7] dark:text-slate-400 text-xs text-center border-t-4 border-[#E67E22] flex flex-col items-center justify-center gap-1.5 px-4">
        <div className="flex items-center justify-center gap-2 font-semibold text-sm text-white">
          <span className="tracking-wide">Quizify 3</span>
          <span className="text-orange-400">•</span>
          <span className="text-orange-300 font-bold">Made with ❤️ by Saksham Sooden</span>
        </div>
        <div className="text-gray-400 dark:text-slate-500">© 2026 Quizify 3. All rights reserved.</div>
      </footer>

    </>
  );
}
