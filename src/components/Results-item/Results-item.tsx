import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../interfaces/interfaces';
import styles from './Results-item.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { selectSelectedPerson } from '../../redux/selectors/selectors';
import {
  addSelectedPerson,
  removeSelectedPerson,
} from '../../redux/slices/selectedSlice';

export default function ResultsItem(props: Person) {
  const { name, birth_year, height, mass, hair_color, url } = props;
  const id = url.split('/').filter(Boolean).slice(-1).join('');
  const location = useLocation();

  const dispatch = useAppDispatch();
  const isSelected = useAppSelector(selectSelectedPerson(id));

  const handleCheckboxChange = (person: Person) => {
    return !isSelected
      ? dispatch(addSelectedPerson(person))
      : dispatch(removeSelectedPerson(person));
  };

  return (
    <Link to={`details/${id}${location.search}`} className={styles.link}>
      <div className={styles.item} data-testid="person-card">
        <input
          className={styles.item__input}
          type="checkbox"
          name="id"
          checked={isSelected}
          onChange={() => handleCheckboxChange(props)}
          onClick={(e) => e.stopPropagation()}
        />
        <p className={styles.item__name}>{name}</p>
        <p className={styles.item__property}>Birth year: {birth_year}</p>
        <p className={styles.item__property}>Height: {height}</p>
        <p className={styles.item__property}>Mass: {mass}</p>
        <p className={styles.item__property}>Hair color: {hair_color}</p>
      </div>
    </Link>
  );
}
