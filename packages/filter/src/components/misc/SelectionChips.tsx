import { useEffect, useMemo, useRef, useState } from 'react';
import { combineLatest, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { useObservableSubscription } from '@equinor/fusion-observable/react';
import Chip, { type ChipElement, type ChipElementProps } from '@equinor/fusion-wc-chip';
import { useFilterContext } from '../../hooks';
import { actions } from '../../actions';
import { clsx, createStyles, makeStyles } from '@equinor/fusion-react-styles';

Chip;

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
  { name: 'fusion-filter-selection-chips' },
);

export type SelectionChipsProps = JSX.IntrinsicElements['div'] & {
  readonly chips: Pick<ChipElementProps, 'variant'>;
};

export const SelectionChips = (props: SelectionChipsProps): JSX.Element => {
  const { chips, className, ...args } = props;
  const { filter$, selection$ } = useFilterContext();
  const [items, setItems] = useState<SelectionItem[]>([]);

  const ref = useRef<HTMLDivElement>(null);

  useObservableSubscription(
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
          }),
        ),
      [filter$, selection$],
    ),
    setItems,
  );

  useEffect(() => {
    const el = ref.current;
    if (el) {
      const handler = (e: Event) => {
        const value = (e.target as ChipElement).value;
        selection$.next(actions.selection.remove(String(value)));
      };
      el.addEventListener('remove', handler);
      return () => el.removeEventListener('remove', handler);
    }
  }, [selection$]);

  const styles = useStyles();

  return (
    <div {...args} className={clsx(styles.root, className)} ref={ref}>
      {items?.map((x) => (
        <fwc-chip key={x.key} value={x.key} removable variant={chips.variant}>
          <span>{x.title} </span>
          <span slot="graphic" className={styles.chip}>
            {x.selection.length}
          </span>
        </fwc-chip>
      ))}
    </div>
  );
};
