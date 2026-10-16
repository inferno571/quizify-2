"use client";
import React, { createContext, useContext, useSyncExternalStore } from "react";
import { THEMES, THEME_STORAGE_KEY, isTheme, type Theme, type ThemeDefinition } from "../lib/themes";
export { THEMES, type Theme, type ThemeDefinition } from "../lib/themes";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: boolean;
  themes: ThemeDefinition[];
  currentThemeDef: ThemeDefinition;
}
const ThemeContext = createContext<ThemeContextType>({
  theme: "light", setTheme: () => {}, toggleTheme: () => {},
  isDark: false, themes: THEMES, currentThemeDef: THEMES[0],
});

let sessionTheme: Theme | null = null;
function getTheme(): Theme {
  if (sessionTheme) return sessionTheme;
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (isTheme(saved)) return saved;
  } catch { /* System preference still works when storage is unavailable. */ }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function applyTheme(theme: Theme) {
  const definition = THEMES.find(t => t.id === theme)!;
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle("dark", definition.isDark);
  root.style.colorScheme = definition.isDark ? "dark" : "light";
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", definition.previewBg);
}
function setTheme(theme: Theme) {
  if (!isTheme(theme)) return;
  sessionTheme = theme;
  try { localStorage.setItem(THEME_STORAGE_KEY, theme); } catch {}
  applyTheme(theme);
  window.dispatchEvent(new CustomEvent("quizify_theme_change", { detail: theme }));
}
function subscribe(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const update = () => { applyTheme(getTheme()); onChange(); };
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY || event.key === null) {
      sessionTheme = null;
      update();
    }
  };
  const onCustom = (event: Event) => {
    const value: unknown = (event as CustomEvent<unknown>).detail;
    if (isTheme(value)) { sessionTheme = value; update(); }
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener("quizify_theme_change", onCustom);
  media.addEventListener("change", update);
  update();
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("quizify_theme_change", onCustom);
    media.removeEventListener("change", update);
  };
}
const serverTheme = (): Theme => "light";
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getTheme, serverTheme);
  const currentThemeDef = THEMES.find(t => t.id === theme)!;
  return (
    <ThemeContext.Provider value={{ theme, setTheme,
      toggleTheme: () => setTheme(currentThemeDef.isDark ? "light" : "dark"),
      isDark: currentThemeDef.isDark, themes: THEMES, currentThemeDef }}>
      {children}
    </ThemeContext.Provider>
  );
}
export function useTheme() { return useContext(ThemeContext); }
