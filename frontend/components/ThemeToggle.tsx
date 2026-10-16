"use client";
import React, { useEffect, useState, useRef, useId } from "react";
import { createPortal } from "react-dom";
import { Palette, Check, ChevronDown, Flame } from "lucide-react";
import { useTheme, Theme, ThemeDefinition } from "./ThemeProvider";
import { ItBeganMusic } from "./ItBeganMusic";

interface ThemePickerProps {
  compact?: boolean;
  className?: string;
}

export function ThemePicker({ compact = false, className = "" }: ThemePickerProps) {
  const { theme, setTheme, themes, currentThemeDef } = useTheme();
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, right: 8 });
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);



  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && !menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    const close = () => setIsOpen(false);
    if (isOpen) {
      menuRef.current?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')?.focus();
      window.addEventListener("resize", close);
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("resize", close);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const coreThemes = themes.filter((t) => t.category === "core");
  const colorThemes = themes.filter((t) => t.category === "color");
  const memeThemes = themes.filter((t) => t.category === "meme");

  return (
    <>
    {theme === 'itbegan' && <ItBeganMusic />}
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        ref={triggerRef}
        onClick={() => {
          const rect = triggerRef.current!.getBoundingClientRect();
          const viewportWidth = document.documentElement.clientWidth;
          setPosition({ top: rect.bottom + 8, right: Math.max(8, Math.min(viewportWidth - rect.right, viewportWidth - Math.min(320, viewportWidth - 16) - 8)) });
          setIsOpen(!isOpen);
        }}
        aria-label={`Choose theme: ${currentThemeDef.name}`}
        aria-controls={isOpen ? menuId : undefined}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        title={`Theme: ${currentThemeDef.name} — Click to choose theme`}
        className={`group relative inline-flex items-center justify-center gap-1.5 rounded-full transition-all duration-200 cursor-pointer select-none active:scale-95 shadow-sm border ${
          compact 
            ? "px-2.5 py-1.5 text-xs font-semibold" 
            : "px-3 py-1.5 text-xs font-bold"
        } bg-surface hover:bg-surface-hover text-foreground border-outline`}
      >
        <span className="text-sm select-none" role="img" aria-label={currentThemeDef.name}>
          {currentThemeDef.icon}
        </span>

        <span className={`${compact ? "hidden sm:inline-block" : "inline-block"} font-semibold text-xs tracking-tight`}>
          {currentThemeDef.name}
        </span>

        {/* Small active color accent badge */}
        <span 
          className="w-2 h-2 rounded-full shrink-0 shadow-xs ring-1 ring-black/20"
          style={{ backgroundColor: currentThemeDef.accentColor }}
        />

        <ChevronDown className={`w-3 h-3 text-neutral-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu Popover */}
      {isOpen && createPortal(
        <div 
          ref={menuRef}
          id={menuId}
          role="dialog"
          aria-label="Theme palette"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node) && !dropdownRef.current?.contains(event.relatedTarget as Node)) setIsOpen(false);
          }}
          className="fixed w-[min(20rem,calc(100vw-1rem))] rounded-2xl bg-surface border border-gray-200 dark:border-outline shadow-2xl p-2.5 sm:p-3 z-[99999] animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl text-neutral-900 dark:text-neutral-100"
          style={{ top: position.top, right: position.right, maxHeight: `calc(100dvh - ${position.top + 8}px)`, overflowY: "auto" }}
        >
          {/* Popover Header */}
          <div className="flex items-center justify-between px-2 py-1.5 mb-2 border-b border-gray-100 dark:border-outline/80">
            <div className="flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-gray-800 dark:text-neutral-200">
                Theme Palette
              </span>
            </div>
            <span className="text-[10px] bg-orange-500/10 text-orange-600 dark:text-orange-400 font-black px-2 py-0.5 rounded-full border border-orange-500/20">
              {themes.length} Themes
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* 1. Core Modes */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-wider px-2">
                Core Display
              </div>
              <div className="grid grid-cols-1 gap-1">
                {coreThemes.map((t) => (
                  <ThemeOptionItem
                    key={t.id}
                    themeDef={t}
                    isSelected={theme === t.id}
                    onSelect={() => handleSelectTheme(t.id)}
                  />
                ))}
              </div>
            </div>

            {/* 2. Color Atmospheres */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-wider px-2">
                Color Atmospheres
              </div>
              <div className="grid grid-cols-1 gap-1">
                {colorThemes.map((t) => (
                  <ThemeOptionItem
                    key={t.id}
                    themeDef={t}
                    isSelected={theme === t.id}
                    onSelect={() => handleSelectTheme(t.id)}
                  />
                ))}
              </div>
            </div>

            {/* 3. Meme Themes (Special Highlight) */}
            <div className="space-y-1 pt-1 border-t border-gray-100 dark:border-outline/80">
              <div className="flex items-center justify-between px-2">
                <span className="text-[10px] font-black text-amber-500 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-amber-500" /> Meme Background Themes
                </span>
                <span className="text-[9px] bg-amber-400/20 text-amber-600 dark:text-amber-300 font-extrabold px-1.5 py-0.2 rounded">
                  NEW
                </span>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {memeThemes.map((t) => (
                  <ThemeOptionItem
                    key={t.id}
                    themeDef={t}
                    isSelected={theme === t.id}
                    onSelect={() => handleSelectTheme(t.id)}
                    isSpecialMeme
                  />
                ))}
              </div>
            </div>
          </div>
        </div>, document.body
      )}
    </div>
    </>
  );
}

/**
 * Individual theme selection row item
 */
function ThemeOptionItem({
  themeDef,
  isSelected,
  onSelect,
  isSpecialMeme = false,
}: {
  themeDef: ThemeDefinition;
  isSelected: boolean;
  onSelect: () => void;
  isSpecialMeme?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`w-full flex items-center justify-between p-2 rounded-xl transition text-left cursor-pointer group border ${
        isSelected
          ? isSpecialMeme
            ? "bg-amber-500/15 dark:bg-amber-950/40 border-amber-500 text-amber-950 dark:text-amber-200 shadow-xs"
            : "bg-blue-50/80 dark:bg-surface-muted border-blue-500 text-blue-950 dark:text-white shadow-xs"
          : "border-transparent hover:bg-gray-100 dark:hover:bg-surface-hover text-gray-700 dark:text-neutral-300"
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Color preview circle with swatch */}
        <div 
          className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs shadow-xs border"
          style={{ 
            backgroundColor: themeDef.previewBg,
            borderColor: themeDef.borderPreview 
          }}
        >
          <span>{themeDef.icon}</span>
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-xs truncate">
              {themeDef.name}
            </span>
            {isSpecialMeme && (
              <span className="text-[9px] bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black px-1.5 py-0.2 rounded-full uppercase">
                Meme
              </span>
            )}
          </div>
          <div className="text-[10px] text-gray-500 dark:text-neutral-400 leading-relaxed">
            {themeDef.description}
          </div>
        </div>
      </div>

      <div className="shrink-0 pl-2">
        {isSelected ? (
          <span className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-xs">
            <Check className="w-3 h-3 stroke-[3]" />
          </span>
        ) : (
          <span 
            className="w-2.5 h-2.5 rounded-full opacity-40 group-hover:opacity-100 transition-opacity"
            style={{ backgroundColor: themeDef.accentColor }}
          />
        )}
      </div>
    </button>
  );
}

// Backward-compatible export
export const ThemeToggle = ThemePicker;
export default ThemePicker;
