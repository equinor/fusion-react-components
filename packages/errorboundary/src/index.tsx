import { Component, PropsWithChildren } from 'react';

import ErrorMessage from './ErrorMessage';
import type { ErrorBoundaryProps } from './types';

export { ErrorBoundaryProps } from './types';

export class ErrorBoundary extends Component<PropsWithChildren<ErrorBoundaryProps>> {
  state = { hasError: false };

  componentDidCatch() {
    console.log('ERRORBOUNDARY::CATCHING SOME SHIT');
    this.setState({ hasError: true });
  }

  conmponentDidMount() {
    console.log('ERRORBOUNDARY::WTAF', this.props.children);
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
