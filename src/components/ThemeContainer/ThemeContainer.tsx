'use client';

import styles from './ThemeContainer.module.css';
import { useThemeContext } from '../../context/ThemeProvider';
import { LocalStorageValues } from '../../enums/enums';
import { ThemeProps } from '../../types/types';

export const ThemeContainer = ({ children }: ThemeProps) => {
  const { isDark } = useThemeContext();

  return (
    <main
      className={`${isDark === LocalStorageValues.DARK ? `${styles.main} ${styles.dark}` : `${styles.main}`}`}
    >
      {children}
    </main>
  );
};
