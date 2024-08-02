import { useState, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { selectSearch } from '../../redux/selectors/selectors';
import { useRouter } from 'next/router';
import { initialPage } from '../../utils/constants';
import styles from './Search-bar.module.css';
import { setSearch } from '../../redux/slices/searchSlice';

export default function SearchBar() {
  const search = useAppSelector(selectSearch());
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState(search);
  const { push, query } = useRouter();

  const onChangeSearchTerm = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const onSubmit = (): void => {
    setSearchTerm(searchTerm?.trim() || '');
    dispatch(setSearch(searchTerm?.trim() || ''));
    if (searchTerm !== '') {
      push({
        query: { ...query, search: searchTerm, page: initialPage },
      });
    } else {
      push('/');
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
