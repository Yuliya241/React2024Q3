import { useState, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { LocalStorageKeys, LocalStorageValues } from '../enums/enums';
import { ThemeProps } from '../types/types';

export const ThemeProvider = ({ children }: ThemeProps) => {
  const [isDark, setIsDark] = useState(() => {
    const initialTheme = localStorage.getItem(LocalStorageKeys.THEME);
    return initialTheme ? initialTheme : LocalStorageValues.LIGHT;
  });

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme =
        prev === LocalStorageValues.LIGHT
          ? LocalStorageValues.DARK
          : LocalStorageValues.LIGHT;
      localStorage.setItem(LocalStorageKeys.THEME, newTheme);
      document.body.classList.toggle(LocalStorageValues.DARK);
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
