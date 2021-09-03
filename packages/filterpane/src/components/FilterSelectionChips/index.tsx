import { useEffect, useState } from 'react';

import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
import Icon from '../Icon';
import { close } from '@equinor/eds-icons';
import useFilterContext from '../../hooks/useFilterContext';

type FilterChips = {
  key: string;
  title: string;
  noFilterReset: boolean;
  selection: any;
};

// TODO @odinr @olerichard - replace this when chips are mode as a component

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      ChipsContainer: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridGap: '8px',
        alignContent: 'center',
        overflow: 'auto',
      },
      Chip: {
        fontFamily: 'Equinor',
        fontWeight: 500,
        fontSize: '0.875rem',
        color: theme.colors.interactive.primary__resting.value.hex,
        display: 'flex',
        borderRadius: '16px',
        background: theme.colors.interactive.primary__selected_highlight.value.hex,
        whiteSpace: 'nowrap',
        padding: '4px 8px ',
        lineHeight: '24px',
        alignItems: 'center',
      },
      ChipResetFilter: {
        borderRadius: '16px',
        '&:hover': {
          background: theme.colors.interactive.primary__hover_alt.value.hex,
        },
      },
    }),
  { name: 'fusion-filterpane-chips' }
);

const useChipsSelection = () => {
  const { store } = useFilterContext();
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

/* <Chip
          key={'Chips' + chip.key}
          title={`${chip.title} (${Array.isArray(chip.selection) ? chip.selection.length : chip.selection}) `}
          primary
          onRemove={chip.noFilterReset ? undefined : () => store.updateFilterSelection(chip.key, [])}
        /> */
