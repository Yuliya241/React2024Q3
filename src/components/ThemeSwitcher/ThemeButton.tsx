'use client';

import styles from './ThemeButton.module.css';
import { LocalStorageValues } from '../../enums/enums';
import { useThemeContext } from '../../context/ThemeProvider';

export default function ThemeButton() {
  const { isDark, toggleTheme } = useThemeContext();

  return (
    <button
      data-testid="theme-button"
      className={`${isDark === LocalStorageValues.DARK ? `${styles.button} ${styles.dark}` : `${styles.button}`}`}
      onClick={toggleTheme}
    >
      {isDark === LocalStorageValues.DARK ? '🌙' : '☀️'}
    </button>
  );
}
