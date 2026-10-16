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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleTheme();
  };

  if (!mounted) {
    return (
      <div 
        className={`${
          compact ? "w-8 h-8 sm:w-9 sm:h-9" : "px-3 py-1.5 text-xs font-bold"
        } rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 opacity-60 inline-flex items-center justify-center ${className}`}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`group relative inline-flex items-center justify-center gap-1.5 rounded-full transition-all duration-200 cursor-pointer select-none active:scale-95 shadow-sm ${
        compact 
          ? "w-8 h-8 sm:w-9 sm:h-9" 
          : "px-3 py-1.5 text-xs font-bold"
      } ${
        isDark
          ? "bg-neutral-900 hover:bg-neutral-800 text-amber-300 border border-neutral-700 hover:border-amber-400/50 hover:shadow-amber-400/10"
          : "bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 hover:text-black"
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center pointer-events-none">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20 transition-transform duration-300 group-hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 text-neutral-700 fill-neutral-700/20 transition-transform duration-300 group-hover:-rotate-12" />
        )}
      </div>
      {!compact && (
        <span className="hidden sm:inline-block font-semibold pointer-events-none">
          {isDark ? "Light" : "Dark"}
        </span>
      )}
    </button>
  );
}
