"use client";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
  isDark: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback((newTheme: Theme) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const body = document.body;

    if (newTheme === "dark") {
      root.classList.add("dark");
      if (body) body.classList.add("dark");
      root.setAttribute("data-theme", "dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      if (body) body.classList.remove("dark");
      root.setAttribute("data-theme", "light");
      root.style.colorScheme = "light";
    }

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", newTheme === "dark" ? "#000000" : "#ffffff");
    }
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("quizify_theme", newTheme);
    } catch {}
    applyTheme(newTheme);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("quizify_theme_change", { detail: newTheme }));
    }
  }, [applyTheme]);

  const toggleTheme = useCallback(() => {
    // Check actual DOM class to guarantee toggle always flips correctly
    const isCurrentlyDark = typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : theme === "dark";
    const next: Theme = isCurrentlyDark ? "light" : "dark";
    setTheme(next);
  }, [theme, setTheme]);

  useEffect(() => {
    setMounted(true);
    let initial: Theme = "light";
    try {
      const savedTheme = localStorage.getItem("quizify_theme") as Theme | null;
      if (savedTheme === "dark" || savedTheme === "light") {
        initial = savedTheme;
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        initial = prefersDark ? "dark" : "light";
      }
    } catch {
      initial = "light";
    }

    setThemeState(initial);
    applyTheme(initial);

    // Listen for storage changes across tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "quizify_theme" && (e.newValue === "dark" || e.newValue === "light")) {
        setThemeState(e.newValue);
        applyTheme(e.newValue);
      }
    };

    const handleCustomChange = (e: any) => {
      if (e.detail === "dark" || e.detail === "light") {
        setThemeState(e.detail);
        applyTheme(e.detail);
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("quizify_theme_change" as any, handleCustomChange);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("quizify_theme_change" as any, handleCustomChange);
    };
  }, [applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isDark: theme === "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
