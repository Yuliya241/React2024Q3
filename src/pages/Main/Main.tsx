import { selectForm } from '../../store/selectors/selectors';
import { useAppSelector } from '../../store/store';
import styles from './Main.module.css';

export default function Main() {
  const form = useAppSelector(selectForm());

  return (
    <div className={styles.wrapper}>
      {form &&
        form.map((form, index) => (
          <div className={styles.form__card} key={index}>
            <p className={styles.form__value}>
              <span className={styles.form__field}>Name: </span>
              {form.name}
            </p>
            <p className={styles.form__value}>
              <span className={styles.form__field}>Age: </span>
              {form.age}
            </p>
            <p className={styles.form__value}>
              <span className={styles.form__field}>Email: </span>
              {form.email}
            </p>
            <p className={styles.form__value}>
              <span className={styles.form__field}>Password: </span>
              {form.password}
            </p>
            <p className={styles.form__value}>
              <span className={styles.form__field}>Confirm password: </span>
              {form.confirmPassword}
            </p>
            <p className={styles.form__value}>
              <span className={styles.form__field}>Gender: </span>
              {form.gender}
            </p>
            <p className={styles.form__value}>
              <span className={styles.form__field}>Agreement: </span>
              {form.agreement}
            </p>
            <p className={styles.form__field}>Picture:</p>
            {typeof form.picture === 'string' && (
              <img src={form.picture} alt="picture" />
            )}
            <p className={styles.form__value}>
              <span className={styles.form__field}>Country: </span>
              {form.country}
            </p>
          </div>
        ))}
    </div>
  );
}
