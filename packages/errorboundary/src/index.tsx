import { Component, ErrorInfo } from 'react';
import { ErrorMessage, ErrorMessageProps } from './errormessage';

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorMessage: string;
}
export class ErrorBoundary extends Component<ErrorMessageProps, State> {
  constructor(props: ErrorMessageProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorMessage: '',
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      hasError: true,
      error,
      errorInfo,
      errorMessage: error.message || '',
    });
  }

  getErrorMessage() {
    const { errorMessage } = this.state;
    const { message } = this.props;

    if (message) {
      return message;
    }
    if (errorMessage !== '') {
      return errorMessage;
    }

    return 'Unhandled error message';
  }

  takeAction() {
    if (this.state.hasError && this.props.onTakeAction) {
      return this.props.onTakeAction();
    }
    window.location.reload();
  }

  render() {
    const { hasError, errorType, children, action } = this.props;
    return (
      <ErrorMessage
        hasError={this.state.hasError || hasError}
        errorType={errorType || 'error'}
        message={this.getErrorMessage()}
        onTakeAction={this.takeAction}
        action={action || 'Retry'}
        {...this.props}
      >
        {children}
      </ErrorMessage>
    );
  }
}

export default ErrorBoundary;
