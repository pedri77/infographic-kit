import { registerTheme } from '@antv/infographic';

export interface ThemePreset {
  colorPrimary: string;
  colorBg: string;
  isDarkMode?: boolean;
}

export const THEME_PRESETS: Record<string, ThemePreset> = {
  'corporate': {
    colorPrimary: '#1a56db',
    colorBg: '#ffffff',
  },
  'mwi-dark': {
    colorPrimary: '#10b981',
    colorBg: '#0f172a',
    isDarkMode: true,
  },
  'iacademy-warm': {
    colorPrimary: '#f59e0b',
    colorBg: '#fffbeb',
  },
  'trigr-slate': {
    colorPrimary: '#6366f1',
    colorBg: '#f8fafc',
  },
  'cyber-red': {
    colorPrimary: '#ef4444',
    colorBg: '#0c0a09',
    isDarkMode: true,
  },
};

/** Register all portfolio themes with AntV */
export function registerPortfolioThemes(): void {
  for (const [name, preset] of Object.entries(THEME_PRESETS)) {
    registerTheme(name, {
      colorPrimary: preset.colorPrimary,
      colorBg: preset.colorBg,
    });
  }
}

export const THEME_NAMES = Object.keys(THEME_PRESETS);
