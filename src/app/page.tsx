import Detailed from '../components/Detailed/Detailed';
import ErrorBoundaryButton from '../components/ErrorBoundaryButton/ErrorBoundaryButton';
import Flyout from '../components/Flyout/Flyout';
import Pagination from '../components/Pagination/Pagination';
import ResultsList from '../components/Results-list/Results-list';
import SearchBar from '../components/Search-bar/Search-bar';
import ThemeButton from '../components/ThemeSwitcher/ThemeButton';
import styles from './styles.module.css';
import { Person, PersonResponse } from '../interfaces/interfaces';
import { getPeople } from '../actions/getPeopleAPI';
import { initialPage } from '../utils/constants';
import { getPersonByID } from '../actions/getPersonAPI';
import { ThemeContainer } from '../components/ThemeContainer/ThemeContainer';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: string;
    details?: string;
  };
}) {
  const searchValue = searchParams?.search || '';
  const currentPagee = Number(searchParams?.page) || initialPage;
  const id = Number(searchParams?.details) || 0;

  const people: PersonResponse = await getPeople(searchValue, currentPagee);
  const person: Person | undefined = await getPersonByID(id);

  // const [loading, setLoading] = useState(false);

  return (
    <ThemeContainer>
      <div className={styles.main__wrapper}>
        <div className={styles.button__container}>
          <ThemeButton />
          <ErrorBoundaryButton />
        </div>
        <SearchBar searchValue={searchValue} />
        <div className={styles.wrapper}>
          <div
            className={
              !!id ? `${styles.left}` : `${styles.left} ${styles.active}`
            }
          >
            <ResultsList
              results={people.results || []}
              // isLoading={loading}
            />
            <Pagination currentPage={currentPagee} count={people.count || 0} />
          </div>
          {person && (
            <Detailed
              personResponse={person}
              // isLoading={loading}
            />
          )}
        </div>
      </div>
      <Flyout />
    </ThemeContainer>
  );
}
