'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import styles from './ButtonClose.module.css';

export default function ButtonClose() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  const closeDetailed = () => {
    params.delete('details');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <button
      className={styles.item__button}
      type="button"
      onClick={closeDetailed}
    >
      X
    </button>
  );
}
