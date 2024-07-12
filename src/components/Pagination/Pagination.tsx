import { PaginationProps } from '../../types/types';
import styles from './Pagination.module.css';

const Pagination = ({ setCurrentPage, currentPage }: PaginationProps) => {
  const pages = [];

  for (let i = 1; i <= 9; i += 1) {
    pages.push(i);
  }

  return (
    <div className={styles.pagination}>
      {pages.map((page, i) => {
        return (
          <button
            className={
              page == currentPage
                ? `${styles.button} ${styles.active} `
                : styles.button
            }
            onClick={() => setCurrentPage(page)}
            key={i}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
