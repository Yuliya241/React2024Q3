'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './Pagination.module.css';

export default function Pagination(props: {
  count: number;
  currentPage: number;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const { count, currentPage } = props;
  const limit = 10;
  const totalPages = Math.ceil(count / limit);

  const clickPrevPage = () => {
    const nextPage = currentPage - 1;
    params.set('page', nextPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const clickNextPage = () => {
    const nextPage = currentPage + 1;
    params.set('page', nextPage.toString());
    router.push(`${pathname}?${params.toString()}`);
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
