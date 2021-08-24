import { useContext, useEffect, useState } from 'react';
import FilterContext from '../../FilterContext';
import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
import Icon from '../Icon';
import { close } from '@equinor/eds-icons';

type FilterChips = {
  key: string;
  title: string;
  noFilterReset: boolean;
  selection: any;
};

const useStyles = makeStyles(
  () =>
    createStyles({
      ChipsContainer: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridGap: '8px',
        alignContent: 'center',
        overflow: 'auto',
      },
      Chip: {
        display: 'flex',
        background: 'lightgrey',
        borderRadius: '8px',
        whiteSpace: 'nowrap',
        padding: '8px',
        lineHeight: '24px',
        alignItems: 'center',
      },
    }),
  { name: 'fusion-filterpane-chips' }
);

const useChipsSelection = () => {
  const { store } = useContext(FilterContext);
  const [chips, setChips] = useState<FilterChips[]>([]);

  useEffect(() => {
    const subscription = store.selection$.subscribe((selections: Record<string, any>) => {
      const chips: FilterChips[] = Object.keys(selections)
        .filter((selection) => selections[selection].length)
        .map((key) => {
          const { title, noFilterReset } = store.getFilterSetting(key);
          return {
            key: key,
            title: title,
            noFilterReset: Boolean(noFilterReset),
            selection: selections[key],
          };
        });
      setChips(chips);
    });
    return () => subscription.unsubscribe();
  }, []);
  return chips;
};

/**
 *Looks at the filter selections and summarized all none-empty selections into a Chip.
 *Chip will show name filter title, amount selected and a clear filter button .
 */

const FilterSelectionChips = (): JSX.Element => {
  const chips = useChipsSelection();
  const { store } = useContext(FilterContext);
  const styles = useStyles();

  return (
    <div className={styles.ChipsContainer}>
      {chips.map((chip) => (
        <div key={'Chip' + chip.key} className={styles.Chip}>
          {`${chip.title} (${Array.isArray(chip.selection) ? chip.selection.length : chip.selection}) `}
          <Icon
            icon={close}
            onClick={chip.noFilterReset ? undefined : () => store.clearSingleFilterSelection(chip.key)}
          />
        </div>
      ))}
    </div>
  );
};

export default FilterSelectionChips;

/* <Chip
          key={'Chips' + chip.key}
          title={`${chip.title} (${Array.isArray(chip.selection) ? chip.selection.length : chip.selection}) `}
          primary
          onRemove={chip.noFilterReset ? undefined : () => store.updateFilterSelection(chip.key, [])}
        /> */
