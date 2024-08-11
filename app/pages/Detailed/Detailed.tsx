import styles from './Detailed.module.css';
import { useNavigate } from '@remix-run/react';
import { Person } from '../../interfaces/interfaces';

export default function Detailed({ details }: { details: Person }) {
  const navigate = useNavigate();

  const closeDetailed = () => {
    navigate(-1);
  };

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.item__card} ${styles.active}`}>
        <button
          className={styles.item__button}
          type="button"
          onClick={closeDetailed}
        >
          X
        </button>
        <p className={styles.item__name}>{details.name}</p>
        <p className={styles.item__property}>
          Birth year: {details.birth_year}
        </p>
        <p className={styles.item__property}>Height: {details.height}</p>
        <p className={styles.item__property}>Mass: {details.mass}</p>
        <p className={styles.item__property}>
          Hair color: {details.hair_color}
        </p>
      </div>
    </div>
  );
}
