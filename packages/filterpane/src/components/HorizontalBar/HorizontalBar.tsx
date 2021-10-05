import { FC } from 'react';
import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      HorizontalBar: {
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        height: '48px',
        borderBottom: `solid 1px ${theme.colors.ui.background__medium.value.hex}`,
      },
    }),
  { name: 'fusion-filterpane-horizontalBar' }
);

/**
 * Generic empty horizontal bar. Use for consistent styling
 * @param children are added left to right.
 * @example
 * <HorizontalBar>{children}</HorizontalBar>
 */
export const HorizontalBar: FC = (props): JSX.Element => {
  const styles = useStyles();

  return <div className={styles.HorizontalBar}>{props?.children}</div>;
};

export default HorizontalBar;
