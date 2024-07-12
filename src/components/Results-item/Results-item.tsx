import { Item } from '../../interfaces/interfaces';
import styles from './Results-item.module.css';

export default function ResultsItem(props: Item) {
  const { name, birth_year, height, mass, hair_color } = props;

  return (
    <div className={styles.item}>
      {name}
      <p className={styles.item__property}>Birth year: {birth_year}</p>
      <p className={styles.item__property}>Height: {height}</p>
      <p className={styles.item__property}>Mass: {mass}</p>
      <p className={styles.item__property}>Hair color: {hair_color}</p>
    </div>
  );
}
