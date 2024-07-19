/* eslint-disable react-compiler/react-compiler */
/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import SearchBar from '../../components/Search-bar/Search-bar';
import ResultsList from '../../components/Results-list/Results-list';
import { Api, LocalStorageKey } from '../../enums/enums';
import Spinner from '../../components/Spinner/Spinner';
import ErrorBoundaryButton from '../../components/ErrorBoundaryButton/ErrorBoundaryButton';
import styles from './Home.module.css';
import Pagination from '../../components/Pagination/Pagination';
import { Outlet, useSearchParams } from 'react-router-dom';
import { PersonResponse } from '../../interfaces/interfaces';

const localStorageKey = localStorage.getItem(LocalStorageKey.KEY);
const initialPage = 1;

export default function Main() {
  const [isOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(
    localStorageKey ? localStorageKey : ''
  );
  const [, setError] = useState<unknown>();
  const [searchResults, setsearchResults] = useState<PersonResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState(
    Number(searchParams.get('page')) || initialPage
  );

  useEffect(() => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
    getAllResults();
  }, [page]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value.trim());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    localStorage.setItem(LocalStorageKey.KEY, search || '');
    searchData();
    setPage(1);
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
      const data: PersonResponse = await results.json();
      setIsLoading(false);
      setsearchResults(data);
    } catch (error) {
      setError(error);
    }
  };

  const getAllResults = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${Api.url}?search=${search}&page=${page}
        `,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const results: PersonResponse = await response.json();
      setIsLoading(false);
      setsearchResults(results);
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
            <ResultsList results={searchResults.results} />
            <Pagination
              setCurrentPage={setPage}
              currentPage={page}
              count={searchResults.count}
            />
          </div>
          <Outlet />
        </div>
      ) : (
        <p className={styles.empty}>Nothing Found...</p>
      )}
    </main>
  );
}
