import { HeaderProps } from 'react-table';
import { TableData } from '../types';
import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

import ColumnMenu from './menu/ColumnMenu';

const useStyle = makeStyles(
  (theme) =>
    createStyles({
      root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...theme.typography.table.cell_header.style,
        marginRight: '1em',
      },
      resizer: {
        touchAction: 'none',
        height: '100%',
        width: '1em',
        display: 'inline-flex',
        overflow: 'hidden',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        right: 0,
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

export type FusionColumnHeaderProps<D extends TableData> = HeaderProps<D>;

export const FusionColumnHeader = <D extends TableData>(props: FusionColumnHeaderProps<D>): JSX.Element => {
  const { column } = props;
  const styles = useStyle();
  return (
    <div className={styles.root}>
      {column.render('Header')}
      {column.showMenu && <ColumnMenu {...props}></ColumnMenu>}
      <span className={styles.resizer} {...column.getResizerProps()}></span>
    </div>
  );
};

export default FusionColumnHeader;
