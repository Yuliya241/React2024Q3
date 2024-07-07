import { Component } from 'react';
import { Props, State } from '../../types/types';
import { ErrorBoundaryValues } from '../../enums/enums';
import styles from './ErrorBoundary.module.css';

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error) {
    console.log(ErrorBoundaryValues.consoleError, error.message);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <h1 className={styles.error}>
          Sorry.. Something went wrong...Try reloading the page.
        </h1>
      );
    }

    return this.props.children;
  }
}
