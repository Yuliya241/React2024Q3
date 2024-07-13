import { useParams } from 'react-router';
import styles from './Detailed.module.css';
import { useEffect, useState } from 'react';
import { Api } from '../../enums/enums';
import { Person } from '../../interfaces/interfaces';
import Spinner from '../../components/Spinner/Spinner';

export default function Detailed() {
  const [person, setPerson] = useState<Person>();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getPersonByID = async () => {
      try {
        setIsLoading(true);
        const results = await fetch(
          `${Api.url}${id}
          `,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await results.json();
        setIsLoading(false);
        setPerson(data);
      } catch (error) {
        console.log(error);
      }
    };
    getPersonByID();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.item__wrapper}>
          <p className={styles.item__name}>{person?.name}</p>
          <p className={styles.item__property}>
            Birth year: {person?.birth_year}
          </p>
          <p className={styles.item__property}>Height: {person?.height}</p>
          <p className={styles.item__property}>Mass: {person?.mass}</p>
          <p className={styles.item__property}>
            Hair color: {person?.hair_color}
          </p>
        </div>
      )}
    </>
  );
}
