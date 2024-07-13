import { Person } from '../../interfaces/interfaces';
import { SearchResultsProps } from '../../types/types';
import ResultsItem from '../Results-item/Results-item';
import styles from './Results-list.module.css';

export default function ResultsList({ data }: SearchResultsProps) {
  return (
    <>
      {data.length ? (
        <div className={styles.wrapper}>
          {data.map((person: Person) => (
            <ResultsItem key={person.name} {...person} />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>Nothing Found...</p>
      )}
    </>
  );
}
