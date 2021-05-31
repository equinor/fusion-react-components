import { HeaderProps } from 'react-table';
import { TableData } from '../types';
import { clsx, createStyles, makeStyles } from '@equinor/fusion-react-styles';

const useStyle = makeStyles(
  (theme) =>
    createStyles({
      root: {
        display: 'flex',
        alignItems: 'center',
        userDrag: 'none',
      },
      container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        userSelect: 'none',
        userDrag: 'none',
        // only when resize
      },
      content: {
        display: 'inline-flex',
        alignItems: 'center',
        userDrag: 'none',
      },
      menu: {
        display: 'inline-flex',
        alignItems: 'center',
        marginRight: 5,
      },
      resizer: {
        touchAction: 'none',
        height: '100%',
        width: '2em',
        display: 'inline-flex',
        overflow: 'hidden',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        right: '-0.9em',
        zIndex: 1,
        '&:after': {
          content: '""',
          display: 'block',
          height: '50%',
          borderLeft: `1px solid ${theme.colors.interactive.disabled__border.value.rgba}`,
        },
      },
    }),
  { name: 'fusion-table-header' }
);

export const ColumnHeader = <D extends TableData>(props: HeaderProps<D>): JSX.Element => {
  const { column } = props;
  const styles = useStyle({ spacing: column.spacing });
  return (
    <div className={clsx(styles.root)}>
      <div className={clsx(styles.container)}>
        <span className={styles.content}>{column.render('Header')}</span>
        {!column.disableMenu && <span className={styles.menu}>{column.render('Menu')}</span>}
      </div>
      <span className={styles.resizer} {...column.getResizerProps()}></span>
    </div>
  );
};

export default ColumnHeader;
