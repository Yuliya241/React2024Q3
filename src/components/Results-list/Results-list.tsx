import { Person } from '../../interfaces/interfaces';
import ResultsItem from '../Results-item/Results-item';
import Spinner from '../Spinner/Spinner';
import styles from './Results-list.module.css';

export default function ResultsList(props: {
  results: Person[];
  isLoading: boolean;
}) {
  const { results, isLoading } = props;

  return isLoading ? (
    <Spinner />
  ) : results.length ? (
    <div className={styles.detailed}>
      <div className={styles.wrapper}>
        {results.map((person: Person) => (
          <ResultsItem key={person.name} {...person} />
        ))}
      </div>
    </div>
  ) : (
    <p className={styles.empty}>Nothing Found...</p>
  );
}
