import { CSSProperties } from 'react';
import { TableOptions, useTable, useSortBy, PluginHook, Column, useResizeColumns, useFlexLayout } from 'react-table';

import { makeStyles, createStyles, clsx, theme, FusionTheme } from '@equinor/fusion-react-styles';

import { FusionColumnHeader } from './column/ColumnHeader';
import { TableData } from './types';
import { useDefaultColumn } from './column';
// import { TableData } from './types';

type SpacingType = keyof typeof theme.spacing.comfortable;

type StyleProps = {
  spacing: SpacingType;
};

const defaultStyleProps: StyleProps = {
  spacing: 'small',
};

const useStyles = makeStyles<FusionTheme, StyleProps>(
  (theme) =>
    createStyles({
      root: {
        ...theme.typography.table.cell_text.style,
        borderCollapse: 'collapse',
      },
      thead: {
        background: theme.colors.interactive.table__header__fill_resting.value.hex,
        borderBottom: `2px solid ${theme.colors.ui.background__medium.value.hex}`,
        '& th:hover': {
          background: theme.colors.interactive.table__header__fill_hover.value.rgba,
        },
      },
      cell: ({ spacing }) => ({
        ...theme.spacing.comfortable[spacing].style,
      }),
      row: {
        borderBottom: `1px solid ${theme.colors.ui.background__medium.value.hex}`,
        '&:hover': {
          background: theme.colors.interactive.table__cell__fill_hover.value.rgba,
        },
      },
    }),
  { name: 'fusion-table' }
);

export interface FusionTableProps<D extends TableData> extends TableOptions<D> {
  columns: Array<Column<D>>;
  plugins?: Array<PluginHook<D>>;
  sort?: boolean;
  spacing?: SpacingType;
  style?: CSSProperties;
  className?: string;
}

export const FusionTable = <D extends TableData>(props: FusionTableProps<D>): JSX.Element => {
  const { sort, plugins = [], spacing = 'x_small', style, className, ...options } = props;

  const styles = useStyles({ ...defaultStyleProps, spacing });

  // TODO: check if sort is allready added?
  sort && plugins.push(useSortBy);
  true && plugins.push(useFlexLayout);
  true && plugins.push(useResizeColumns);

  const columns = props.columns; // useTableHeaders(props.columns, 'table');

  const defaultColumn = useDefaultColumn<D>(props);

  const instance = useTable({ ...options, columns, defaultColumn }, ...plugins);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state } = instance;

  return (
    <>
      <div {...getTableProps()} style={style} className={clsx(styles.root, className)}>
        <section className={clsx(styles.thead)}>
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <div {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                // eslint-disable-next-line react/jsx-key
                <div {...column.getHeaderProps()} className={clsx(styles.cell)}>
                  <FusionColumnHeader {...instance} key={index} className={clsx(styles.cell)} column={column} />
                </div>
              ))}
            </div>
          ))}
        </section>
        <section {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              // eslint-disable-next-line react/jsx-key
              <div {...row.getRowProps()} className={styles.row}>
                {row.cells.map((cell) => (
                  // eslint-disable-next-line react/jsx-key
                  <div {...cell.getCellProps()} className={clsx(styles.cell)}>
                    {cell.render('Cell')}
                  </div>
                ))}
              </div>
            );
          })}
        </section>
      </div>
      <pre>
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre>
    </>
  );
};

export default FusionTable;
