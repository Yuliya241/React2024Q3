import { Component } from 'react';
import { ErrorBoundaryValues } from '../../enums/enums';

export default class ErrorBoundaryButton extends Component {
  state = {
    hasError: false,
  };

  public throwErrorClick = (): void => this.setState({ hasError: true });

  public render() {
    if (this.state.hasError) {
      throw new Error(ErrorBoundaryValues.message);
    }

    return <button onClick={this.throwErrorClick}>Throw Error</button>;
  }
}
