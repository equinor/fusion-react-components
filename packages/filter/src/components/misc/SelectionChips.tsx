import { PointerEvent, useCallback, useMemo, useState } from 'react';
import { combineLatest, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { useSubscription } from '@equinor/fusion-react-observable';
import { Chip, ChipProps, HTMLChipCustomElement } from '@equinor/fusion-react-chip';
import { useFilterContext } from '../../hooks';
import { actions } from '../../actions';
import { clsx, createStyles, makeStyles } from '@equinor/fusion-react-styles';

/** method for extracting selection to array */
const formatSelection = (selection: any): string[] => {
  switch (true) {
    case selection === undefined:
    case selection === null:
      return [];
    case typeof selection === 'string':
      return [selection];
    case selection instanceof Set:
      return [...selection];
    default:
      /** TODO - fix selection for additional types */
      console.error('unsupported selection type!', selection);
      return [];
  }
};

type SelectionItem = {
  key: string;
  title: string;
  selection: string[];
};

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        display: 'flex',
        gap: theme.spacing.comfortable.small.getVariable('padding'),
      },
      chip: {
        marginRight: theme.spacing.comfortable.small.getVariable('padding'),
      },
    }),
  { name: 'fusion-filter-selection-chips' }
);

export type SelectionChipsProps = JSX.IntrinsicElements['div'] & {
  chips: Omit<ChipProps, 'removable' | 'onRemove' | 'value' | 'children'>;
};

export const SelectionChips = (props: SelectionChipsProps): JSX.Element => {
  const { chips, className, ...args } = props;
  const { filter$, selection$ } = useFilterContext();
  const [items, setItems] = useState<SelectionItem[]>([]);
  useSubscription(
    useMemo(
      () =>
        /** Observe filter and selection changes */
        combineLatest([filter$, selection$]).pipe(
          switchMap(([filters, selections]) => {
            const items = Object.values(filters)
              /** normalize data to SelectionItem */
              .map((filter) => {
                const { title, key } = filter;
                const selection = formatSelection(selections[key]);
                return { key, title, selection };
              })
              /** Exclude filters that does not have any selection */
              .filter((x) => !!x.title && !!x.selection.length);
            return of(items as SelectionItem[]);
          })
        ),
      [filter$, selection$]
    ),
    setItems
  );

  const onRemove = useCallback(
    (e: PointerEvent<HTMLChipCustomElement>) => {
      selection$.next(actions.selection.remove(String(e.currentTarget.value)));
    },
    [selection$]
  );

  const styles = useStyles();

  return (
    <div {...args} className={clsx(styles.root, className)}>
      {items?.map((x) => (
        <Chip {...chips} key={x.key} value={x.key} onRemove={onRemove} removable>
          <span>{x.title} </span>
          <span slot="graphic" className={styles.chip}>
            {x.selection.length}
          </span>
        </Chip>
      ))}
    </div>
  );
};
