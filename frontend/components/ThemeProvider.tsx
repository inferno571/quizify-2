"use client";
import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";

export type Theme = 
  | "light"       // "Default"
  | "dark"        // "AMOLED/Dark"
  | "midnight"    // "Midnight Navy"
  | "emerald"     // "Emerald Matrix"
  | "cyberpunk"   // "Cyberpunk Sunset"
  | "larp"        // "LARP Meme Theme"
  | "itsover";    // "It's Over Meme Theme"

export interface ThemeDefinition {
  id: Theme;
  name: string;
  category: 'core' | 'color' | 'meme';
  isDark: boolean;
  icon: string;
  description: string;
  accentColor: string;
  previewBg: string;
  borderPreview: string;
}

export const THEMES: ThemeDefinition[] = [
  {
    id: 'light',
    name: 'Default',
    category: 'core',
    isDark: false,
    icon: '☀️',
    description: 'Clean academic light & crisp typography',
    accentColor: '#f97316',
    previewBg: '#ffffff',
    borderPreview: '#e2e8f0',
  },
  {
    id: 'dark',
    name: 'AMOLED/Dark',
    category: 'core',
    isDark: true,
    icon: '🌑',
    description: 'Pure pitch black #000000 & OLED battery saver',
    accentColor: '#f59e0b',
    previewBg: '#000000',
    borderPreview: '#262626',
  },
  {
    id: 'midnight',
    name: 'Midnight Navy',
    category: 'color',
    isDark: true,
    icon: '🌌',
    description: 'Deep oceanic navy & arctic cyan',
    accentColor: '#38bdf8',
    previewBg: '#070c1e',
    borderPreview: '#1d2d54',
  },
  {
    id: 'emerald',
    name: 'Emerald Matrix',
    category: 'color',
    isDark: true,
    icon: '🌲',
    description: 'Cyber terminal green & dark forest',
    accentColor: '#10b981',
    previewBg: '#02160b',
    borderPreview: '#0a542c',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    category: 'color',
    isDark: true,
    icon: '🔮',
    description: 'Synthwave violet & hot neon magenta',
    accentColor: '#ec4899',
    previewBg: '#13072b',
    borderPreview: '#5b21b6',
  },
  {
    id: 'larp',
    name: 'LARP (No Limit)',
    category: 'meme',
    isDark: true,
    icon: '🏆',
    description: 'Wide LARP poster backdrop & golden aura',
    accentColor: '#f59e0b',
    previewBg: '#1c1503',
    borderPreview: '#f59e0b',
  },
  {
    id: 'itsover',
    name: "It's Over (Wojak)",
    category: 'meme',
    isDark: false,
    icon: '😭',
    description: 'NPTEL Wojak "IT\'S OVER" backdrop',
    accentColor: '#ef4444',
    previewBg: '#f8fafc',
    borderPreview: '#cbd5e1',
  },
];

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: boolean;
  themes: ThemeDefinition[];
  currentThemeDef: ThemeDefinition;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
  isDark: false,
  themes: THEMES,
  currentThemeDef: THEMES[0],
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback((newTheme: Theme) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const body = document.body;

    const isDarkTheme = ['dark', 'midnight', 'emerald', 'cyberpunk', 'larp'].includes(newTheme);

    if (isDarkTheme) {
      root.classList.add("dark");
      if (body) body.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      if (body) body.classList.remove("dark");
      root.style.colorScheme = "light";
    }

    root.setAttribute("data-theme", newTheme);
    if (body) body.setAttribute("data-theme", newTheme);

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      const colorMap: Record<Theme, string> = {
        light: '#ffffff',
        dark: '#000000',
        midnight: '#070c1e',
        emerald: '#02160b',
        cyberpunk: '#13072b',
        larp: '#000000',
        itsover: '#ffffff',
      };
      metaThemeColor.setAttribute("content", colorMap[newTheme] || '#000000');
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
    // Quick flip between Default Light and AMOLED Dark
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  useEffect(() => {
    setMounted(true);
    let initial: Theme = "light";
    try {
      const savedTheme = localStorage.getItem("quizify_theme") as Theme | null;
      const validIds: Theme[] = ['light', 'dark', 'midnight', 'emerald', 'cyberpunk', 'larp', 'itsover'];
      if (savedTheme && validIds.includes(savedTheme)) {
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
      if (e.key === "quizify_theme" && e.newValue) {
        const validIds: Theme[] = ['light', 'dark', 'midnight', 'emerald', 'cyberpunk', 'larp', 'itsover'];
        if (validIds.includes(e.newValue as Theme)) {
          setThemeState(e.newValue as Theme);
          applyTheme(e.newValue as Theme);
        }
      }
    };

    const handleCustomChange = (e: any) => {
      if (e.detail) {
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

  const isDark = useMemo(() => {
    return ['dark', 'midnight', 'emerald', 'cyberpunk', 'larp'].includes(theme);
  }, [theme]);

  const currentThemeDef = useMemo(() => {
    return THEMES.find(t => t.id === theme) || THEMES[0];
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      toggleTheme, 
      isDark, 
      themes: THEMES, 
      currentThemeDef 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
