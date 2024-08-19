import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <NavLink
        to={'/'}
        className={({ isActive }): string =>
          isActive ? `${styles.link} ${styles.active}` : `${styles.link}`
        }
      >
        MAIN
      </NavLink>
      <NavLink
        to={'/uncontrolled'}
        className={({ isActive }): string =>
          isActive ? `${styles.link} ${styles.active}` : `${styles.link}`
        }
      >
        UNCONTROLLED FORM
      </NavLink>
      <NavLink
        to={'/react-hook-form'}
        className={({ isActive }): string =>
          isActive ? `${styles.link} ${styles.active}` : `${styles.link}`
        }
      >
        REACT HOOK FORM
      </NavLink>
    </header>
  );
}
