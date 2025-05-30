import { useCallback } from 'react';

import { useForwardRef } from '@equinor/fusion-react-utils';
import { useObservableSubscription } from '@equinor/fusion-observable/react';
import { Button, type ButtonProps } from '@equinor/eds-core-react';

import { useClearFilter } from '../../hooks/useClearFilter';

export type ClearFilterButtonProps = React.PropsWithChildren<
  Omit<ButtonProps, 'onClick'> & { ref?: React.ForwardedRef<HTMLButtonElement> }
>;

/**
 * Component for resetting filter values.
 * uses the `useClearFilter` hook
 */
export const ClearFilterButton = (props: ClearFilterButtonProps): JSX.Element => {
  const { children, ...args } = props;
  const { clear, changed$ } = useClearFilter();
  const ref = useForwardRef<HTMLButtonElement>(props.ref);

  /** Subscribe to changes and toggle `disable` of button */
  useObservableSubscription(
    changed$,
    useCallback(
      (changed: object) => {
        if (ref.current) {
          ref.current.disabled = !Object.keys(changed).length;
        }
      },
      [ref],
    ),
  );

  /** Reset filters on click */
  const onClick = useCallback(() => clear(), [clear]);

  return (
    <Button variant="ghost" {...{ ...args, ref, onClick }}>
      {children ?? 'Clear Filter'}
    </Button>
  );
};

export default ClearFilterButton;
