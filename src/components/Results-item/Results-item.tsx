import { Link } from 'react-router-dom';
import { Person } from '../../interfaces/interfaces';
import styles from './Results-item.module.css';

export default function ResultsItem(props: Person) {
  const { name, birth_year, height, mass, hair_color, url } = props;
  const id = url.split('/').filter(Boolean).slice(-1).join('');

  return (
    <Link to={`/${id}`} className={styles.link}>
      <div className={styles.item}>
        {name}
        <p className={styles.item__property}>Birth year: {birth_year}</p>
        <p className={styles.item__property}>Height: {height}</p>
        <p className={styles.item__property}>Mass: {mass}</p>
        <p className={styles.item__property}>Hair color: {hair_color}</p>
      </div>
    </Link>
  );
}
