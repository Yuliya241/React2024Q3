import { PaginationProps } from '../../types/types';
import styles from './Pagination.module.css';

const Pagination = ({
  setCurrentPage,
  currentPage,
  count,
}: PaginationProps) => {
  const limit = 10;
  const totalPages = Math.ceil(count / limit);

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        disabled={currentPage <= 1}
        className={styles.button}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        &larr;
      </button>
      <span className={styles.page}>{currentPage}</span>
      <button
        type="button"
        disabled={currentPage >= totalPages}
        className={styles.button}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        &rarr;
      </button>
    </div>
  );
};

export default Pagination;
