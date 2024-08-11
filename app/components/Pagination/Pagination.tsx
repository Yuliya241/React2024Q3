import { useLocation, useNavigate } from '@remix-run/react';
import styles from './Pagination.module.css';

export default function Pagination({
  count,
  currentPage,
}: {
  count: number;
  currentPage: number;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const limit = 10;
  const totalPages = Math.ceil(count / limit);

  const clickPrevPage = () => {
    const nextPage = currentPage - 1;
    params.set('page', nextPage.toString());
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const clickNextPage = () => {
    const nextPage = currentPage + 1;
    params.set('page', nextPage.toString());
    navigate(`${location.pathname}?${params.toString()}`);
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
