import { Component } from 'react';
import { ErrorBoundaryValues } from '../../enums/enums';
import styles from './ErrorBoundaryButton.module.css';

export default class ErrorBoundaryButton extends Component {
  state = {
    hasError: false,
  };

  public throwErrorClick = (): void => this.setState({ hasError: true });

  public render() {
    if (this.state.hasError) {
      throw new Error(ErrorBoundaryValues.message);
    }

    return (
      <button className={styles.button__error} onClick={this.throwErrorClick}>
        Throw Error
      </button>
    );
  }
}
