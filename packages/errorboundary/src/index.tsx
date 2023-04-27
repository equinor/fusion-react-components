import { Component } from 'react';

import ErrorMessage from './ErrorMessage';
import useErrorStyles from './useErrorStyles';
import type { ErrorMessageProps } from './types';

const styles = useErrorStyles();

export class ErrorBoundary extends Component<ErrorMessageProps> {
  state = { didCatch: false };
  render() {
    if (this.state.didCatch) {
      return (
        <div className={styles.container}>
          <div className={styles.messageContainer}>
            <div className={styles.title}>Something went wrong</div>
            <div className={styles.message}>
              Please try refresh browser, if problem persists, please contact support through service now
            </div>
          </div>
        </div>
      );
    }
    return <ErrorMessage {...this.props}>{this.props.children}</ErrorMessage>;
  }
  componentDidCatch() {
    this.setState({ didCatch: true });
  }
}

export default ErrorBoundary;
