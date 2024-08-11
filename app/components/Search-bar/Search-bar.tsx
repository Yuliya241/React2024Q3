import { useState, ChangeEvent } from 'react';
import { initialPage } from '../../utils/constants';
import styles from './Search-bar.module.css';
import { LocalStorageKeys } from '../../enums/enums';
import { useLocation, useNavigate } from '@remix-run/react';

export default function SearchBar({ searchValue }: { searchValue: string }) {
  const [searchTerm, setSearchTerm] = useState(searchValue);
  const navigate = useNavigate();
  const location = useLocation();

  const onChangeSearchTerm = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const onSubmit = (): void => {
    setSearchTerm(searchTerm?.trim() || '');
    if (typeof window !== 'undefined') {
      localStorage.setItem(LocalStorageKeys.SEARCH, searchTerm);
    }
    if (searchTerm !== '') {
      const params = new URLSearchParams(location.search);
      params.set('page', initialPage.toString());
      params.set('search', searchTerm);
      navigate(`${location.pathname}?${params.toString()}`);
    } else {
      navigate('/');
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
