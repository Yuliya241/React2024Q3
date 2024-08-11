import { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';
import { LocalStorageKeys, LocalStorageValues } from '../enums/enums';
import { ThemeProps } from '../types/types';

export const ThemeProvider = ({ children }: ThemeProps) => {
  const [isDark, setIsDark] = useState(() => {
    const initialTheme =
      typeof window !== 'undefined' &&
      localStorage.getItem(LocalStorageKeys.SEARCH);
    return initialTheme ? initialTheme : LocalStorageValues.LIGHT;
  });

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme =
        prev === LocalStorageValues.LIGHT
          ? LocalStorageValues.DARK
          : LocalStorageValues.LIGHT;
      if (typeof window !== 'undefined') {
        localStorage.setItem(LocalStorageKeys.THEME, newTheme);
      }

      return newTheme;
    });
  };

  useEffect(() => {
    const saved = localStorage.getItem(LocalStorageKeys.THEME);
    if (saved) {
      setIsDark(saved);
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
