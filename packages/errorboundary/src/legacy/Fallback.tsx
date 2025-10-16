import type { ReactNode, SyntheticEvent } from 'react';
import { Typography, Button, Accordion } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { styled } from 'styled-components';

import type { ErrorType } from './types';
import { FallbackIcon } from './FallbackIcon';
import { type ReactElement, useCallback } from 'react';
import { useErrorBoundary } from 'react-error-boundary';

const Styled = {
  root: styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: ${tokens.spacings.comfortable.medium};
  `,
  stacktrace: styled.pre`
    overflow: auto;
    max-width: 100%;
    color: ${tokens.colors.interactive.danger__resting.hex};
    font-size: 0.8em;
    line-height: 1em;
    margin: 0;
  `,
};

export type FallbackProps = {
  readonly error: Error;
  readonly errorType?: ErrorType;
  readonly message?: ReactNode;
  readonly resourceName?: string;
  readonly title?: ReactNode;
  readonly icon?: ReactNode;
  readonly action?: string;
  readonly onTakeAction?: (event?: SyntheticEvent<Element, Event>) => void;
};

const generateTitle = (errorType?: ErrorType, resourceName = '<unknown resource>') => {
  switch (errorType) {
    case 'accessDenied':
      return "It seems like you don't have access to this content";
    case 'notFound':
      return `The ${resourceName} could not be found`;
    case 'noData':
      return 'Unfortunately, we could not find any data for this component';
    case 'failedDependency': // 424
      return `Unfortunately, we had problem with communicate with dependent system, ${resourceName}`;
    case 'throttle': // 429
      return `Unfortunately, we experience too many request for resource ${resourceName}`;
    default:
      return 'Oops! Something went wrong!';
  }
};

export const Fallback = (props: FallbackProps): ReactElement => {
  const { errorType, resourceName, title, message, error, action, onTakeAction } = props;
  const { resetBoundary } = useErrorBoundary();
  const onClick = useCallback(() => {
    if (onTakeAction) {
      onTakeAction();
    }
    resetBoundary();
  }, [resetBoundary, onTakeAction]);
  return (
    <Styled.root>
      <div>
        {props.icon ?? <FallbackIcon errorType={errorType} />}
        <Typography variant="h3">{title ?? generateTitle(errorType, resourceName)}</Typography>
        <Typography
          variant="ingress"
          token={{ color: tokens.colors.text.static_icons__tertiary.hex }}
        >
          {message ?? error.message}
        </Typography>

        {action && (
          <Button variant="outlined" onClick={onClick}>
            {action}
          </Button>
        )}
        {error && (
          <Accordion headerLevel="h5" chevronPosition="right" style={{ width: '100%' }}>
            <Accordion.Item>
              <Accordion.Header style={{ height: 'auto' }}>Error details</Accordion.Header>
              <Accordion.Panel>
                <Styled.stacktrace>{error.stack}</Styled.stacktrace>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        )}
      </div>
    </Styled.root>
  );
};
