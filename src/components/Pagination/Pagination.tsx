import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import styles from './Pagination.module.css';
import { selectTotal, selectPage } from '../../redux/selectors/selectors';
import {
  onClickPrevPage,
  onClickNextPage,
} from '../../redux/slices/searchSlice';

export default function Pagination() {
  const dispatch = useAppDispatch();
  const total = useAppSelector(selectTotal());
  const page = useAppSelector(selectPage());

  const clickPrevPage = () => dispatch(onClickPrevPage());
  const clickNextPage = () => dispatch(onClickNextPage());

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        disabled={page <= 1}
        className={styles.button}
        onClick={clickPrevPage}
        data-testid="prevPage"
      >
        &larr;
      </button>
      <span className={styles.page}>
        {page} / {total}
      </span>
      <button
        type="button"
        disabled={page >= total}
        className={styles.button}
        onClick={clickNextPage}
        data-testid="nextPage"
      >
        &rarr;
      </button>
    </div>
  );
}
