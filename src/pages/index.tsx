/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import ResultsList from '../components/Results-list/Results-list';
import SearchBar from '../components/Search-bar/Search-bar';
import { LocalStorageValues } from '../enums/enums';
import { initialPage, useThemeContext } from '../utils/constants';
import ErrorBoundaryButton from '../components/ErrorBoundaryButton/ErrorBoundaryButton';
import Flyout from '../components/Flyout/Flyout';
import Pagination from '../components/Pagination/Pagination';
import ThemeButton from '../components/ThemeSwitcher/ThemeButton';
import { getRunningQueriesThunk, starWarsApi } from '../redux/api/StarWarsApi';
import { wrapper } from '../redux/store/store';
import styles from './styles.module.css';
import { InferGetServerSidePropsType } from 'next';
import Detailed from '../components/Detailed/Detailed';

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
  search,
  page,
  personResponse,
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { isDark } = useThemeContext();
  // const router = useRouter();
  const [loadingData] = useState(false);
  const [loadingDetails] = useState(false);

  // const isLoadingDetails = !!id;

  // useEffect(() => {
  //   const start = () => {
  //     // setLoadingData(true);
  //     if (isLoadingDetails) {
  //       setLoadingDetails(true);
  //     } else {
  //       setLoadingData(true);
  //     }
  //   };
  //   const end = () => {
  //     setLoadingDetails(false);
  //     setLoadingData(false);
  //   };

  //   router.events.on(RouterEvent.START, start);
  //   router.events.on(RouterEvent.COMPLETE, end);
  //   router.events.on(RouterEvent.ERROR, end);

  //   return () => {
  //     router.events.off(RouterEvent.START, start);
  //     router.events.off(RouterEvent.COMPLETE, end);
  //     router.events.off(RouterEvent.ERROR, end);
  //   };
  // }, [router, isLoadingDetails]);

  return (
    <main
      className={`${isDark === LocalStorageValues.DARK ? `${styles.main} ${styles.dark}` : `${styles.main}`}`}
    >
      <div className={styles.main__wrapper}>
        <div className={styles.button__container}>
          <ThemeButton />
          <ErrorBoundaryButton />
        </div>
        <SearchBar searchValue={search} />
        <div className={styles.wrapper}>
          <div
            className={
              !!id ? `${styles.left}` : `${styles.left} ${styles.active}`
            }
          >
            <ResultsList
              results={peopleResponse.data?.results || []}
              isLoading={loadingData}
            />
            <Pagination
              currentPage={page}
              count={peopleResponse?.data?.count || 1}
            />
          </div>
          {personResponse.data && (
            <Detailed
              personResponse={personResponse.data}
              isLoading={loadingDetails}
            />
          )}
        </div>
      </div>
      <Flyout />
    </main>
  );
}
