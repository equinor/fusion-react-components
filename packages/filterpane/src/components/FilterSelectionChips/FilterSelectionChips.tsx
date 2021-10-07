import Icon from '../Icon';
import { close } from '@equinor/eds-icons';
import useFilterContext from '../../hooks/useFilterContext';

import { useChipsSelection } from './useChipsSelection';

import { useStyles } from './FilterSelectionChips.style';

/**
 *Looks at the filter selections and summarized all none-empty selections into a Chip.
 *Chip will show name filter title, amount selected and a clear filter button .
 */
export const FilterSelectionChips = (): JSX.Element => {
  const chips = useChipsSelection();
  const { store } = useFilterContext();
  const styles = useStyles();

  return (
    <div className={styles.ChipsContainer}>
      {chips.map((chip) => (
        <div key={'Chip' + chip.key} className={styles.Chip}>
          {`${chip.title} (${Array.isArray(chip.selection) ? chip.selection.length : chip.selection}) `}
          <div className={styles.ChipResetFilter}>
            <Icon
              icon={close}
              onClick={chip.noFilterReset ? undefined : () => store.clearSingleFilterSelection(chip.key)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterSelectionChips;
