import { useEffect, useState } from 'react';
import SearchBar from '../../components/Search-bar/Search-bar';
import ResultsList from '../../components/Results-list/Results-list';
import { LocalStorageValues } from '../../enums/enums';
import Spinner from '../../components/Spinner/Spinner';
import ErrorBoundaryButton from '../../components/ErrorBoundaryButton/ErrorBoundaryButton';
import styles from './Home.module.css';
import Pagination from '../../components/Pagination/Pagination';
import { Outlet, useSearchParams } from 'react-router-dom';
import ThemeButton from '../../components/ThemeSwitcher/ThemeButton';
import { initialPage, useThemeContext } from '../../utils/constants';
import { useGetAllPeopleQuery } from '../../redux/api/StarWarsApi';
import {
  getPeople,
  setPage,
  setSearch,
  setTotal,
} from '../../redux/slices/mainSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { selectPage, selectSearch } from '../../redux/selectors/selectors';
import Flyout from '../../components/Flyout/Flyout';

export default function Main() {
  const [isOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { isDark } = useThemeContext();
  const searchQuery = searchParams.get('search') || '';

  const dispatch = useAppDispatch();
  const search = useAppSelector(selectSearch());
  const page = useAppSelector(selectPage());

  const { data, isFetching } = useGetAllPeopleQuery({
    search: search || '',
    page: page,
  });

  useEffect(() => {
    setSearchParams((params) => {
      params.set('page', String(page));
      return params;
    });
    if (data) {
      dispatch(getPeople(data.results));
      dispatch(setTotal(data.count));
    }
  }, [page, setSearchParams, data, dispatch]);

  const clickSearchButton = (): void => {
    dispatch(setPage(initialPage));
    dispatch(setSearch(searchQuery));
  };

  return (
    <main
      className={`${isDark === LocalStorageValues.DARK ? `${styles.main} ${styles.dark}` : `${styles.main}`}`}
    >
      <div className={styles.main__wrapper}>
        <div className={styles.button__container}>
          <ThemeButton />
          <ErrorBoundaryButton />
        </div>
        <SearchBar onSearch={clickSearchButton} />
        {isFetching ? (
          <Spinner />
        ) : data?.results ? (
          <div className={styles.wrapper}>
            <div
              className={
                isOpen ? `${styles.left}` : `${styles.left} ${styles.active}`
              }
            >
              <ResultsList results={data?.results} />
              <Pagination />
            </div>
            <Outlet />
          </div>
        ) : (
          <p className={styles.empty}>Nothing Found...</p>
        )}
      </div>
      <Flyout />
    </main>
  );
}
