import { SearchProps } from '../../types/types';
import styles from './Search-bar.module.css';

export default function SearchBar(props: SearchProps) {
  const { handleChange, handleSubmit, searchTerm } = props;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.form__title}>Search by name</h1>
      <div className={styles.form__wrapper}>
        <label htmlFor="name"></label>
        <input
          className={styles.form__input}
          type="text"
          id="name"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
        />
        <button className={styles.form__button}>Search</button>
      </div>
    </form>
  );
}
