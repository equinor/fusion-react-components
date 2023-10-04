import { Component, PropsWithChildren } from 'react';

import ErrorMessage from './ErrorMessage';
import type { ErrorBoundaryProps } from './types';

export { ErrorBoundaryProps } from './types';

export class ErrorBoundary extends Component<PropsWithChildren<ErrorBoundaryProps>> {
  state = { hasError: false };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render(): JSX.Element {
    return (
      <ErrorMessage hasError={this.state.hasError} {...this.props}>
        {this.props.children}
      </ErrorMessage>
    );
  }
}

export default ErrorBoundary;
