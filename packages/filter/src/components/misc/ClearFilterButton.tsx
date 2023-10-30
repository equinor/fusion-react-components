import { useCallback } from 'react';

import { useForwardRef } from '@equinor/fusion-react-utils';
import { useObservableSubscription } from '@equinor/fusion-observable/react';
import { Button, ButtonProps, HTMLButtonCustomElement } from '@equinor/fusion-react-button';

import { useClearFilter } from '../../hooks/useClearFilter';

export type ClearFilterButtonProps = Omit<ButtonProps, 'onClick'>;

/**
 * Component for resetting filter values.
 * uses the `useClearFilter` hook
 * inherits `ButtonProps` from `@equinor/fusion-react-button`
 */
export const ClearFilterButton = (props: ClearFilterButtonProps): JSX.Element => {
  const { label = 'Clear Filter', ...args } = props;
  const { clear, changed$ } = useClearFilter();
  const ref = useForwardRef<HTMLButtonCustomElement>(props.ref);

  /** Subscribe to changes and toggle `disable` of button */
  useObservableSubscription(
    changed$,
    useCallback(
      (changed: any) => {
        ref.current && (ref.current.disabled = !Object.keys(changed).length);
      },
      [ref],
    ),
  );

  /** Reset filters on click */
  const onClick = useCallback(() => clear(), [clear]);

  return <Button variant="ghost" {...{ ...args, ref, onClick, label }} />;
};

export default ClearFilterButton;
