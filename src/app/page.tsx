import Flyout from '../components/Flyout/Flyout';
import SearchBar from '../components/Search-bar/Search-bar';
import ThemeButton from '../components/ThemeSwitcher/ThemeButton';
import styles from './styles.module.css';
import { initialPage } from '../utils/constants';
import { ThemeContainer } from '../components/ThemeContainer/ThemeContainer';
import ResultsLoading from '../components/Loadings/Results-loading';
import DetailedLoading from '../components/Loadings/Detailed-loading';
import { ErrorBoundaryButton } from '../components/ErrorBoundaryButton/ErrorBoundaryButton';

export default async function Page({
  searchParams,
}: {
  searchParams: {
    search: string;
    page: string;
    details: string;
  };
}) {
  const searchValue = searchParams.search || '';
  const currentPage = searchParams.page || initialPage.toString();
  const id = searchParams.details;

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
              !id ? `${styles.left}` : `${styles.left} ${styles.active}`
            }
          >
            <ResultsLoading
              searchParams={{
                search: searchValue,
                page: currentPage,
              }}
            />
          </div>
          {Boolean(id) && <DetailedLoading id={id} />}
        </div>
      </div>
      <Flyout />
    </ThemeContainer>
  );
}
