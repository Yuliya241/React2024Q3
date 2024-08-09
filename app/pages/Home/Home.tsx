import SearchBar from '../../components/Search-bar/Search-bar';
import ResultsList from '../../components/Results-list/Results-list';
import { LocalStorageValues } from '../../enums/enums';
import styles from './Home.module.css';
import Pagination from '../../components/Pagination/Pagination';
import ThemeButton from '../../components/ThemeSwitcher/ThemeButton';
import { initialPage, useThemeContext } from '../../utils/constants';
import Flyout from '../../components/Flyout/Flyout';
import ErrorBoundaryButton from '../../components/ErrorBoundaryButton/ErrorBoundaryButton';
import { useLoaderData, useLocation, useNavigation } from '@remix-run/react';
import { Person, PersonResponse } from '../../interfaces/interfaces';
import Detailed from '../Detailed/Detailed';
import Spinner from '../../components/Spinner/Spinner';

export default function Home() {
  const { isDark } = useThemeContext();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const search = params.get('search') || '';
  const page = Number(params.get('page')) || initialPage;
  const id = params.get('details');

  const { people, person }: { people: PersonResponse; person: Person } =
    useLoaderData();

  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

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
        {isLoading ? (
          <Spinner />
        ) : people.results ? (
          <div className={styles.wrapper}>
            <div
              className={
                !id ? `${styles.left}` : `${styles.left} ${styles.active}`
              }
            >
              <ResultsList results={people.results} />
              <Pagination
                count={people.count}
                currentPage={page || initialPage}
              />
            </div>
            {Boolean(id) && <Detailed details={person} />}
          </div>
        ) : (
          <p className={styles.empty}>Nothing Found...</p>
        )}
      </div>
      <Flyout />
    </main>
  );
}
