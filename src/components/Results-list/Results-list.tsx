import { Person } from '../../interfaces/interfaces';
import ResultsItem from '../Results-item/Results-item';
import styles from './Results-list.module.css';

export default function ResultsList({ results }: { results: Person[] }) {
  return (
    <>
      {results.length ? (
        <div className={styles.wrapper}>
          {results.map((person: Person) => (
            <ResultsItem key={person.name} {...person} />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>Nothing Found...</p>
      )}
    </>
  );
}
