import { Person } from '../../interfaces/interfaces';
import styles from './Results-item.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { selectSelectedPerson } from '../../redux/selectors/selectors';
import {
  addSelectedPerson,
  removeSelectedPerson,
} from '../../redux/slices/selectedSlice';
import { useLocation, useNavigate } from '@remix-run/react';

export default function ResultsItem(props: Person) {
  const { name, birth_year, height, mass, hair_color, url } = props;
  const id = url.split('/').filter(Boolean).slice(-1).join('');
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const isSelected = useAppSelector(selectSelectedPerson(id));

  const handleCheckboxChange = (person: Person) => {
    return !isSelected
      ? dispatch(addSelectedPerson(person))
      : dispatch(removeSelectedPerson(person));
  };

  const openDetailed = () => {
    const params = new URLSearchParams(location.search);
    params.set('details', id);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  return (
    <div
      className={styles.item}
      data-testid="person-card"
      onClick={openDetailed}
    >
      <input
        className={styles.item__input}
        type="checkbox"
        name="id"
        data-testid="select-checkbox"
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
  );
}