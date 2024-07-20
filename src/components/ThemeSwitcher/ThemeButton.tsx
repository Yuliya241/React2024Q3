import styles from './ThemeButton.module.css';
import { LocalStorageValues } from '../../enums/enums';
import { useThemeContext } from '../../utils/constants';
import { ThemeButtonProps } from '../../types/types';

export default function ThemeButton({ handleClick }: ThemeButtonProps) {
  const { isDark } = useThemeContext();

  return (
    <button
      className={`${isDark === LocalStorageValues.DARK ? `${styles.button} ${styles.dark}` : `${styles.button}`}`}
      onClick={handleClick}
    >
      {isDark === LocalStorageValues.DARK ? '🌙' : '☀️'}
    </button>
  );
}
