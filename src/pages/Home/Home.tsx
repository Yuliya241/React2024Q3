import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import SearchBar from '../../components/Search-bar/Search-bar';
import ResultsList from '../../components/Results-list/Results-list';
import { Api, LocalStorageKey } from '../../enums/enums';
import Spinner from '../../components/Spinner/Spinner';
import ErrorBoundaryButton from '../../components/ErrorBoundaryButton/ErrorBoundaryButton';
import styles from './Home.module.css';
import { Item } from '../../interfaces/interfaces';
import Pagination from '../../components/Pagination/Pagination';

const localStorageKey = localStorage.getItem(LocalStorageKey.KEY);

export default function Main() {
  const [searchValue, setSearchValue] = useState<string>(
    localStorageKey ? localStorageKey : ''
  );
  const [, setError] = useState<unknown>();
  const [searchResults, setsearchResults] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    localStorage.setItem(LocalStorageKey.KEY, searchValue || '');
    getSearchResults();
    setPage(1);
  };

  const getSearchResults = async () => {
    try {
      setIsLoading(true);
      const results = await fetch(
        `${Api.url}?search=${searchValue?.trim()}&page=${page}
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

  useEffect(() => {
    getSearchResults();
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <main className={styles.main}>
      <ErrorBoundaryButton />
      <SearchBar
        handleChange={handleChange}
        searchTerm={searchValue || ''}
        handleSubmit={handleSubmit}
      />
      {isLoading ? <Spinner /> : <ResultsList data={searchResults} />}
      {!isLoading && <ResultsList data={searchResults} /> ? (
        <Pagination setCurrentPage={setPage} currentPage={page} />
      ) : null}
    </main>
  );
}
