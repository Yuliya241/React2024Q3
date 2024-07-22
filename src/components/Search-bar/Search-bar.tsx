import { useState, ChangeEvent } from 'react';
import { useAppSelector } from '../../redux/store/store';
import { SearchProps } from '../../types/types';
import styles from './Search-bar.module.css';
import { useSearchParams } from 'react-router-dom';
import { selectSearch } from '../../redux/selectors/selectors';

export default function SearchBar({ onSearch }: SearchProps) {
  const [, setSearchParams] = useSearchParams();
  const search = useAppSelector(selectSearch());
  const [searchTerm, setSearchTerm] = useState(search);

  const onChangeSearchTerm = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setSearchParams((params) => {
      params.set('search', e.target.value.trim());
      return params;
    });
  };

  const onSubmit = (): void => {
    setSearchTerm(searchTerm?.trim() || '');
    onSearch(searchTerm?.trim() || '');
    if (!searchTerm) {
      setSearchParams((params) => {
        params.delete('search');
        return params;
      });
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
