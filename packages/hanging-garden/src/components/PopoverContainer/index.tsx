import { forwardRef } from 'react';
import type { ForwardedRef, ForwardRefExoticComponent, PropsWithChildren, ReactNode, RefAttributes } from 'react';

import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

import Arrow from './Arrow';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: '16px',
      backgroundColor: 'var(--eds-color-bg-neutral-surface)',
      borderRadius: '4px',
      position: 'absolute',
      boxShadow: 'var(--eds-elevation-low)',
      transform: 'translateX(-50%)',
      marginTop: '8px',
    },
  }),
);

const PopoverContainer: ForwardRefExoticComponent<
  {
    children: ReactNode;
  } & RefAttributes<HTMLDivElement>
> = forwardRef((props: PropsWithChildren<{ readonly children: ReactNode }>, ref: ForwardedRef<HTMLDivElement>) => {
  const { children } = props;
  const styles = useStyles();
  return (
    <div ref={ref} className={styles.root}>
      <Arrow />
      <div>{children}</div>
    </div>
  );
});

PopoverContainer.displayName = 'PopoverContainer';

export default PopoverContainer;
