import { useRouter } from 'next/router';
import styles from './Pagination.module.css';

export default function Pagination(props: {
  count: number;
  currentPage: number;
}) {
  const { push, query } = useRouter();
  const { count, currentPage } = props;
  const limit = 10;
  const totalPages = Math.ceil(count / limit);

  const clickPrevPage = () => {
    push({
      query: { ...query, page: currentPage - 1 },
    });
  };

  const clickNextPage = () => {
    push({
      query: { ...query, page: currentPage + 1 },
    });
  };

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        disabled={currentPage <= 1}
        className={styles.button}
        onClick={clickPrevPage}
        data-testid="prevPage"
      >
        &larr;
      </button>
      <span className={styles.page}>
        {currentPage} / {totalPages}
      </span>
      <button
        type="button"
        disabled={currentPage >= totalPages}
        className={styles.button}
        onClick={clickNextPage}
        data-testid="nextPage"
      >
        &rarr;
      </button>
    </div>
  );
}
