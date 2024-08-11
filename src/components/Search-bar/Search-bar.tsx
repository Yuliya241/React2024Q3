'use client';

import { useState, ChangeEvent } from 'react';
import { initialPage } from '../../utils/constants';
import styles from './Search-bar.module.css';
import { LocalStorageKeys } from '../../enums/enums';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function SearchBar(props: { searchValue: string }) {
  const { searchValue } = props;
  const [searchTerm, setSearchTerm] = useState(searchValue);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  const onChangeSearchTerm = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const onSubmit = (): void => {
    setSearchTerm(searchTerm?.trim() || '');
    if (typeof window !== 'undefined') {
      localStorage.setItem(LocalStorageKeys.SEARCH, searchTerm);
    }
    if (searchTerm !== '') {
      params.set('page', initialPage.toString());
      params.set('search', searchTerm);
      router.push(`${pathname}?${params.toString()}`);
    } else {
      router.push('/');
    }
  };

  return (
    <div className={styles.form}>
      <h1 className={styles.form__title}>Search by name</h1>
      <div className={styles.form__wrapper}>
        <label htmlFor="name"></label>
        <input
          className={styles.form__input}
          type="text"
          id="name"
          placeholder="Search..."
          value={searchTerm || ''}
          onChange={onChangeSearchTerm}
        />
        <button className={styles.form__button} onClick={onSubmit}>
          Search
        </button>
      </div>
    </div>
  );
}
