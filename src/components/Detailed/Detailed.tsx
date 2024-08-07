import styles from './Detailed.module.css';
import { Person } from '../../interfaces/interfaces';
import ButtonClose from '../ButtonClose/ButtonClose';
import { DetailsProps } from '../../types/types';
import { Api } from '../../enums/enums';

export const getPersonByID = async (id: number) => {
  if (!id) {
    return;
  }

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
  const person: Person = await results.json();

  return person;
};

export default async function Detailed({ id }: DetailsProps) {
  const person: Person | undefined = await getPersonByID(Number(id));

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.item__card} ${styles.active}`}>
        <ButtonClose />
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
  );
}
