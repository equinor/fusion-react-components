import { useMemo, FC, SyntheticEvent } from 'react';
import { Button } from '@equinor/fusion-react-button';
import { Icon } from '@equinor/fusion-react-icon';

import useErrorStyles from './styles';

export type ErrorTypes = 'error' | 'accessDenied' | 'notFound' | 'noData' | 'failedDependency' | 'throttle';

export type ErrorMessageProps = {
  hasError?: boolean;
  errorType?: ErrorTypes;
  message?: any;
  resourceName?: string;
  title?: string;
  children?: any;
  icon?: any;
  action?: string;
  onTakeAction?: (event?: SyntheticEvent<Element, Event>) => void;
};

export const ErrorMessage: FC<ErrorMessageProps> = ({
  hasError,
  errorType = 'error',
  message,
  resourceName,
  title,
  children,
  icon,
  action,
  onTakeAction,
}) => {
  const styles = useErrorStyles();
  const getErrorMessageForType = (errorType: string) => {
    const iconProps = {
      width: 80,
      height: 80,
      cursor: 'default',
      color: '#666666',
    };

    switch (errorType) {
      case 'accessDenied':
        return {
          title: "It seems like you don't have access to this content",
          icon: <Icon icon="block" {...iconProps} />,
        };
      case 'notFound':
        return {
          title: `The ${resourceName} could not be found`,
          icon: <Icon icon="warning_outlined" {...iconProps} />,
        };
      case 'noData':
        return {
          title: `Unfortunately, we could not find any data for this component`,
          icon: <Icon icon="sync_off" {...iconProps} />,
        };
      case 'failedDependency': // 424
        return {
          title: `Unfortunately, we had problem with communicate with dependent system, ${resourceName}`,
          icon: <Icon icon="sync_off" {...iconProps} />,
        };
      case 'throttle': // 429
        return {
          title: `Unfortunately, we experience too many request for resource ${resourceName}`,
          icon: <Icon icon="sync_off" {...iconProps} />,
        };
      default:
        return {
          title: 'Oops! Something went wrong!',
          icon: <Icon icon="warning_outlined" {...iconProps} />,
        };
    }
  };

  const error = useMemo(() => getErrorMessageForType(errorType), [errorType]);

  if (!hasError) {
    return children;
  }

  return (
    <div className={styles.root}>
      <div className="messageContainer comfortable">
        {icon || error.icon}
        <div className="title">{title || error.title}</div>
        <div className="message">{message}</div>
        {action ? (
          <Button variant="outlined" onClick={onTakeAction}>
            {action}
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default ErrorMessage;
