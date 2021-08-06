import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
import { PropsWithChildren, useState } from 'react';

import FilterCategory from './components/FilterCategory';
import FilterSelectorMinimized from './components/FilterSelectorMinimized';
import FilterSelectorOpen from './components/FilterSelectorOpen';

type FilterSelectorProps = { compact?: boolean };

export type FilterCategory = {
  filterKey: string;
  title: string;
  selected: boolean;
};

const useStyles = makeStyles(() =>
  createStyles({
    FilterSelectorContainer: {
      position: 'sticky',
      left: 0,
      background: 'inherit',
      zIndex: 99,
    },
  })
);

const FilterSelector = ({ compact = false, children }: PropsWithChildren<FilterSelectorProps>): JSX.Element => {
  const [show, setShow] = useState(true);

  const styles = useStyles();

  return (
    <div className={styles.FilterSelectorContainer}>
      {show ? (
        <FilterSelectorOpen compact={compact} setShow={setShow}>
          {children}
        </FilterSelectorOpen>
      ) : (
        <FilterSelectorMinimized setShow={setShow} />
      )}
    </div>
  );
};

export default FilterSelector;
