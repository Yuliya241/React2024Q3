import { Component, ErrorInfo } from 'react';
import { Props, State } from '../../types/types';
import { ErrorBoundaryValues } from '../../enums/enums';

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(ErrorBoundaryValues.consoleError, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Sorry.. Something went wrong...Try reloading the page.</h1>;
    }

    return this.props.children;
  }
}
