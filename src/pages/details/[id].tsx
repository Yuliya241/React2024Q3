import { useParams } from 'react-router';
import styles from './Detailed.module.css';
import { useState } from 'react';
import Spinner from '../../components/Spinner/Spinner';
// import { useNavigate } from 'react-router-dom';
import { useGetPersonByIdQuery } from '../../redux/api/StarWarsApi';

export default function Detailed() {
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const navigate = useNavigate();

  const { data, isFetching } = useGetPersonByIdQuery(id || '');

  const closeDetailed = () => {
    setIsOpen(false);
    // navigate(-1);
  };

  return (
    <>
      {isFetching && !isOpen ? (
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
            <p className={styles.item__name}>{data?.name}</p>
            <p className={styles.item__property}>
              Birth year: {data?.birth_year}
            </p>
            <p className={styles.item__property}>Height: {data?.height}</p>
            <p className={styles.item__property}>Mass: {data?.mass}</p>
            <p className={styles.item__property}>
              Hair color: {data?.hair_color}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
