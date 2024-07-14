/* eslint-disable react-compiler/react-compiler */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import SearchBar from '../../components/Search-bar/Search-bar';
import ResultsList from '../../components/Results-list/Results-list';
import { Api, LocalStorageKey } from '../../enums/enums';
import Spinner from '../../components/Spinner/Spinner';
import ErrorBoundaryButton from '../../components/ErrorBoundaryButton/ErrorBoundaryButton';
import styles from './Home.module.css';
import { Person } from '../../interfaces/interfaces';
import Pagination from '../../components/Pagination/Pagination';
import { Outlet, useOutletContext, useSearchParams } from 'react-router-dom';

const localStorageKey = localStorage.getItem(LocalStorageKey.KEY);
const initialPage = '1';
type ContextType = { isOpen: boolean };

export default function Main() {
  const [isOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(
    searchParams.get('search') || localStorageKey || ''
  );
  const [, setError] = useState<unknown>();
  const [searchResults, setsearchResults] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState(searchParams.get('page') || initialPage);

  useEffect(() => {
    setSearchParams({ search, page });
    getAllResults();
  }, [page]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value.trim());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    localStorage.setItem(LocalStorageKey.KEY, search || '');
    setSearchParams({ search });
    searchData();
  };

  const searchData = async () => {
    try {
      setIsLoading(true);
      const results = await fetch(
        `${Api.url}?search=${search}
        `,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await results.json();
      setIsLoading(false);
      setsearchResults(data.results);
    } catch (error) {
      setError(error);
    }
  };

  const getAllResults = async () => {
    try {
      setIsLoading(true);
      const results = await fetch(
        `${Api.url}?search=${search}&page=${page}
        `,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await results.json();
      setIsLoading(false);
      setsearchResults(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className={styles.main}>
      <ErrorBoundaryButton />
      <SearchBar
        handleChange={handleChange}
        searchTerm={search}
        handleSubmit={handleSubmit}
      />
      {isLoading ? (
        <Spinner />
      ) : searchResults ? (
        <div className={styles.wrapper}>
          <div
            className={
              isOpen ? `${styles.left}` : `${styles.left} ${styles.active}`
            }
          >
            <div className={styles.list}>
              <ResultsList data={searchResults} />
            </div>
            <Pagination setCurrentPage={setPage} currentPage={page} />
          </div>
          <div className={isOpen ? `${styles.right}` : ''}>
            <Outlet context={{ isOpen } satisfies ContextType} />
          </div>
        </div>
      ) : (
        <p className={styles.empty}>Nothing Found...</p>
      )}
    </main>
  );
}

export function useUser() {
  return useOutletContext<ContextType>();
}
