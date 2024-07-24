import { LocalStorageValues } from '../../enums/enums';
import {
  selectSelectedPeople,
  selectSelectedPeopleCount,
} from '../../redux/selectors/selectors';
import { clearAllSelectedPeople } from '../../redux/slices/mainSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { useThemeContext } from '../../utils/constants';
import downloadCsvFile from '../../utils/downaldCsvFile';
import styles from './Flyout.module.css';

export default function Flyout() {
  const { isDark } = useThemeContext();
  const selectedCount = useAppSelector(selectSelectedPeopleCount());
  const selectedPeople = useAppSelector(selectSelectedPeople());
  const dispatch = useAppDispatch();

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
        <a
          className={styles.button}
          href={downloadCsvFile(selectedPeople)}
          download={`${selectedCount}_people.csv`}
        >
          Download
        </a>
      </div>
    </div>
  );
}
