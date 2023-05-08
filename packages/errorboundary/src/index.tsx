import { Component, PropsWithChildren } from 'react';

import ErrorMessage from './ErrorMessage';
import type { ErrorMessageProps } from './types';

export class ErrorBoundary extends Component<PropsWithChildren<ErrorMessageProps>> {
  state = { hasError: false };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    return (
      <ErrorMessage hasError={this.state.hasError} {...this.props}>
        {this.props.children}
      </ErrorMessage>
    );
  }
}

export default ErrorBoundary;
