import { selectForm } from '../../store/selectors/selectors';
import { useAppSelector } from '../../store/store';
import styles from './Main.module.css';

export default function Main() {
  const forms = useAppSelector(selectForm());

  return (
    <div className={styles.wrapper}>
      {forms.length ? (
        forms.map((form, index) => (
          <div
            className={
              index === forms.length - 1
                ? `${styles.form__card} ${styles.last}`
                : `${styles.form__card}`
            }
            key={index}
          >
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
              <span className={styles.form__field}>Country: </span>
              {form.country}
            </p>
            <p className={styles.form__value}>
              <span className={styles.form__field}>Gender: </span>
              {form.gender}
            </p>
            <p className={styles.form__value}>
              <span className={styles.form__field}>T&C: </span>
              {form.agreement}
            </p>
            <p className={styles.form__field}>Image:</p>
            {typeof form.image === 'string' && (
              <img className={styles.image} src={form.image} alt="image" />
            )}
          </div>
        ))
      ) : (
        <p className={styles.empty}>No submitted forms...</p>
      )}
    </div>
  );
}
