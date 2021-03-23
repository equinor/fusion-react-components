import Arrow from './Arrow';
import { makeStyles, createStyles } from '@equinor/fusion-react-styles';
import { forwardRef, PropsWithChildren, ReactNode, Ref } from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: '16px',
      backgroundColor: 'white',
      borderRadius: '4px',
      position: 'absolute',
      boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.14)',
      transform: 'translateX(-50%)',
      marginTop: '8px',
    },
  })
);

const PopoverContainer = forwardRef<HTMLDivElement | null, PropsWithChildren<ReactNode>>(({ children }, ref) => {
  const styles = useStyles();
  return (
    <div ref={ref as Ref<HTMLDivElement>} className={styles.root}>
      <Arrow />
      <div>{children}</div>
    </div>
  );
});

PopoverContainer.displayName = 'PopoverContainer';

export default PopoverContainer;
