"use client";
import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  compact?: boolean;
  className?: string;
}

export function ThemeToggle({ compact = false, className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme, isDark } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Avoid SSR hydration layout shifts with placeholder button
    return (
      <div 
        className={`${
          compact ? "w-8 h-8 sm:w-9 sm:h-9" : "px-3 py-1.5 text-xs font-bold"
        } rounded-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 opacity-60 inline-flex items-center justify-center ${className}`}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`group relative inline-flex items-center justify-center gap-1.5 rounded-full transition-all duration-200 cursor-pointer select-none active:scale-95 ${
        compact 
          ? "w-8 h-8 sm:w-9 sm:h-9" 
          : "px-3 py-1.5 text-xs font-bold"
      } ${
        isDark
          ? "bg-slate-800 hover:bg-slate-700/80 text-amber-300 border border-slate-700 shadow-xs hover:border-amber-400/50 hover:shadow-amber-400/10"
          : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300/80 shadow-xs hover:text-slate-900"
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20 transition-transform duration-300 group-hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 text-slate-700 fill-slate-700/20 transition-transform duration-300 group-hover:-rotate-12" />
        )}
      </div>
      {!compact && (
        <span className="hidden sm:inline-block font-semibold">
          {isDark ? "Light" : "Dark"}
        </span>
      )}
    </button>
  );
}
