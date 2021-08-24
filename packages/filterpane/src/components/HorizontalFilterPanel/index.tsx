import { PropsWithChildren } from 'react';
import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
type FilterPanelProps = Record<string, unknown>;

const useStyles = makeStyles(
  () =>
    createStyles({
      FilterPanelContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        boxSizing: 'border-box',
      },
    }),
  { name: 'fusion-filterpane-horizontalFilterPanel' }
);

/**
 * A simple component that spans horizontal, used as a container for the standard filterpanel.
 * Add components as children, they will flow as columns (flex-direction).
 *
 * @param children Add all components used for filterpanel
 * @example
 *    <FilterPanel>
 *      <FilterSection isMinimized={minimized} useFilterSelector useFilterSelectorSearch>
 *         <CheckBoxFilter filter={{ ...firstNameCheck }} useSelectAll useSearch />
 *       </FilterSection>
 *     </FilterPanel>
 */

const HorizontalFilterPanel = ({ children }: PropsWithChildren<FilterPanelProps>): JSX.Element => {
  const styles = useStyles();
  return <div className={styles.FilterPanelContainer}>{children}</div>;
};

export default HorizontalFilterPanel;
