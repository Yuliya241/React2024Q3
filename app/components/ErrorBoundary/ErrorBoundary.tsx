import styles from './ErrorBoundary.module.css';

export function ErrorBoundaryFallback() {
  return (
    <h1 className={styles.error} data-testid="errorboundary">
      Sorry.. Something went wrong...Try reloading the page.
    </h1>
  );
}
