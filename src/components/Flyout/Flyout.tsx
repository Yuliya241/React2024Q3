import { LocalStorageValues } from '../../enums/enums';
import { selectSelectedPeopleCount } from '../../redux/selectors/selectors';
import { clearAllSelectedPeople } from '../../redux/slices/mainSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { useThemeContext } from '../../utils/constants';
import styles from './Flyout.module.css';

export default function Flyout() {
  const selectedCount = useAppSelector(selectSelectedPeopleCount());
  const dispatch = useAppDispatch();
  const { isDark } = useThemeContext();

  const clearAll = () => dispatch(clearAllSelectedPeople());

  if (!selectedCount) return;

  return (
    <div
      className={`${isDark === LocalStorageValues.DARK ? `${styles.wrapper} ${styles.dark}` : `${styles.wrapper}`}`}
    >
      <p className={styles.text}>
        <span className={styles.text__count}>{selectedCount}</span>
        {selectedCount === 1 ? ' item is ' : ' items are '}selected
      </p>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={clearAll}>
          Unselect all
        </button>
        <button className={styles.button}>Download</button>
      </div>
    </div>
  );
}
