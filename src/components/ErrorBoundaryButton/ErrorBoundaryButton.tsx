'use client';

import styles from './ErrorBoundaryButton.module.css';

export const ErrorBoundaryButton = () => {
  const throwErrorClick = (): void => {
    throw new Error('This is a test errorboundary error!!!');
  };

  return (
    <button className={styles.button__error} onClick={throwErrorClick}>
      Throw Error
    </button>
  );
};
