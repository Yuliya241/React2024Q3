import styles from './ThemeButton.module.css';
import { LocalStorageValues } from '../../enums/enums';
import { useThemeContext } from '../../utils/constants';

export default function ThemeButton() {
  const { isDark, toggleTheme } = useThemeContext();

  return (
    <button
      className={`${isDark === LocalStorageValues.DARK ? `${styles.button} ${styles.dark}` : `${styles.button}`}`}
      onClick={toggleTheme}
    >
      {isDark === LocalStorageValues.DARK ? '🌙' : '☀️'}
    </button>
  );
}