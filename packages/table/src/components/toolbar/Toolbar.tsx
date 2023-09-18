import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
import { ReactNode } from 'react';
import { ExportToExcelBtn } from './ExportToExcelBtn';

type ToolbarProps = JSX.IntrinsicElements['div'] & {
  children?: ReactNode | undefined;
  hideExportBtn?: boolean;
};

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'row',
      gap: '1em',
    },
  }),
);

/**
 * Component for the Table component. Pass this component as a prop to the `slot` prop in Table.
 * @param JSX.IntrinsicElements - HTML attributes, e.g. styling.
 * @param children - Any ReactNode that you want to be inside the toolbar.
 * @param hideExportBtn - defaults to true, set to false if you want export functionality.
 *  @example ```jsx
 * <Table options={options}
 * slots={{Toolbar: <Toolbar hideExportBtn={false}
 * style={{justifyContent: "end"}}
 * children={<SomeButton/>}/>
 * }}
 * />
 * ```
 */
export const Toolbar = (props: ToolbarProps): JSX.Element => {
  const { hideExportBtn = true, children, ...rest } = props;
  const styles = useStyles();
  return (
    <div className={styles.container} {...rest}>
      {!hideExportBtn && <ExportToExcelBtn />}
      {children}
    </div>
  );
};
