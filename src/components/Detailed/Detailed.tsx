import styles from './Detailed.module.css';
import Spinner from '../Spinner/Spinner';
import { Person } from '../../interfaces/interfaces';
import { useRouter } from 'next/router';

export default function Detailed(props: {
  personResponse: Person | undefined;
  isLoading: boolean;
}) {
  const { personResponse, isLoading } = props;
  const router = useRouter();

  const closeDetailed = () => {
    router.back();
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.wrapper}>
          <div className={`${styles.item__card} ${styles.active}`}>
            <button
              className={styles.item__button}
              type="button"
              onClick={closeDetailed}
            >
              X
            </button>
            <p className={styles.item__name}>{personResponse?.name}</p>
            <p className={styles.item__property}>
              Birth year: {personResponse?.birth_year}
            </p>
            <p className={styles.item__property}>
              Height: {personResponse?.height}
            </p>
            <p className={styles.item__property}>
              Mass: {personResponse?.mass}
            </p>
            <p className={styles.item__property}>
              Hair color: {personResponse?.hair_color}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
