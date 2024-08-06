import Link from 'next/link';
import styles from './styles.module.css';

export default function NotFound() {
  return (
    <div className={styles.wrapper__notfound}>
      <p className={styles.image}>404</p>
      <span className={styles.text}>Sorry, the page is Not Found</span>
      <Link href="/" className={styles.button}>
        GO HOME
      </Link>
    </div>
  );
}
