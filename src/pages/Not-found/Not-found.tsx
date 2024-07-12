import { Link } from 'react-router-dom';
import styles from './Not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <img
        alt="404"
        src="../src/assets/404-error.png"
        className={styles.image}
      />
      <span className={styles.text}>Sorry, the page is Not Found</span>
      <Link to="/" className={styles.button}>
        GO HOME
      </Link>
    </div>
  );
}
