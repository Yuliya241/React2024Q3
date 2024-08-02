/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import ResultsList from '../components/Results-list/Results-list';
import SearchBar from '../components/Search-bar/Search-bar';
// import Spinner from '../components/Spinner/Spinner';
import { LocalStorageValues } from '../enums/enums';
import { initialPage, useThemeContext } from '../utils/constants';
import { Outlet } from 'react-router-dom';
import ErrorBoundaryButton from '../components/ErrorBoundaryButton/ErrorBoundaryButton';
import Flyout from '../components/Flyout/Flyout';
import Pagination from '../components/Pagination/Pagination';
import ThemeButton from '../components/ThemeSwitcher/ThemeButton';
import { getRunningQueriesThunk, starWarsApi } from '../redux/api/StarWarsApi';
import { wrapper } from '../redux/store/store';
import styles from './styles.module.css';
import { InferGetServerSidePropsType } from 'next';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const search = context.query.search?.toString() || '';
    const page = Number(context.query.page) || initialPage;
    const id = Number(context.query.details) || 0;

    const peopleResponse = await store.dispatch(
      starWarsApi.endpoints.getAllPeople.initiate({
        search,
        page,
      })
    );

    const personResponse = await store.dispatch(
      starWarsApi.endpoints.getPersonById.initiate(String(id))
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        peopleResponse,
        search,
        page,
        personResponse,
        id,
      },
    };
  }
);

export default function Main({
  peopleResponse,
  // search,
  page,
  // personResponse,
  // id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isOpen] = useState(false);
  const { isDark } = useThemeContext();

  return (
    <main
      className={`${isDark === LocalStorageValues.DARK ? `${styles.main} ${styles.dark}` : `${styles.main}`}`}
    >
      <div className={styles.main__wrapper}>
        <div className={styles.button__container}>
          <ThemeButton />
          <ErrorBoundaryButton />
        </div>
        <SearchBar />
        {peopleResponse.data?.results ? (
          <div className={styles.wrapper}>
            <div
              className={
                isOpen ? `${styles.left}` : `${styles.left} ${styles.active}`
              }
            >
              <ResultsList results={peopleResponse.data?.results} />
              <Pagination
                currentPage={page}
                count={peopleResponse.data.count}
              />
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