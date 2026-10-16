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


export const THEME_STORAGE_KEY = "quizify_theme";
export function isTheme(value: unknown): value is Theme {
  return THEMES.some(theme => theme.id === value);
}

// The same definitions drive first paint and the hydrated theme picker.
export const themeInitScript = `(() => {
  const themes = ${JSON.stringify(THEMES)};
  let saved;
  try { saved = localStorage.getItem("quizify_theme"); } catch {}
  const theme = themes.find(t => t.id === saved) || themes.find(t => t.id ===
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  const root = document.documentElement;
  root.dataset.theme = theme.id;
  root.classList.toggle('dark', theme.isDark);
  root.style.colorScheme = theme.isDark ? 'dark' : 'light';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme.previewBg);
})();`;
