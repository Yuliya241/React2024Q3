'use client';

import styles from './Detailed.module.css';
import { Person } from '../../interfaces/interfaces';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Detailed(props: {
  personResponse: Person | undefined;
  // isLoading: boolean;
}) {
  const { personResponse } = props;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  const closeDetailed = () => {
    params.delete('details');
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.item__card} ${styles.active}`}>
        <button
          className={styles.item__button}
          type="button"
          onClick={closeDetailed}
        >
          X
        </button>
        <p className={styles.item__name}>{personResponse?.name}</p>
        <p className={styles.item__property}>
          Birth year: {personResponse?.birth_year}
        </p>
        <p className={styles.item__property}>
          Height: {personResponse?.height}
        </p>
        <p className={styles.item__property}>Mass: {personResponse?.mass}</p>
        <p className={styles.item__property}>
          Hair color: {personResponse?.hair_color}
        </p>
      </div>
    </div>
  );
}
