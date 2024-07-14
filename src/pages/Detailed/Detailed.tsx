/* eslint-disable react-compiler/react-compiler */
/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from 'react-router';
import styles from './Detailed.module.css';
import { useEffect, useState } from 'react';
import { Api } from '../../enums/enums';
import { Person } from '../../interfaces/interfaces';
import Spinner from '../../components/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Home/Home';

export default function Detailed() {
  const [person, setPerson] = useState<Person>();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const [isOpen = useUser(), setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getPersonByID = async () => {
      try {
        if (!id) {
          return;
        }
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
        setIsOpen(true);
        setIsLoading(false);
        setPerson(data);
      } catch (error) {
        console.log(error);
      }
    };
    getPersonByID();
  }, [id]);

  const closeDetailed = () => {
    setIsOpen(false);
    setIsLoading(false);
    navigate(-1);
  };

  return (
    <>
      {isLoading && !isOpen ? (
        <Spinner />
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.item__card}>
            <button
              className={styles.item__button}
              type="button"
              onClick={closeDetailed}
            >
              X
            </button>
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
        </div>
      )}
    </>
  );
}
