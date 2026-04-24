import {
  type HTMLAttributes,
  type ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { combineLatest, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { useObservableSubscription } from '@equinor/fusion-observable/react';
import Chip, { type ChipElement, type ChipElementProps } from '@equinor/fusion-wc-chip';
import { useFilterContext } from '../../hooks';
import { actions } from '../../actions';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';

Chip;

/** method for extracting selection to array */
// biome-ignore lint/suspicious/noExplicitAny: selection can be any type from the filter context
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

const Styled = {
  Root: styled.div`
    display: flex;
    gap: ${tokens.spacings.comfortable.small};
  `,
  Chip: styled.span`
    margin-right: ${tokens.spacings.comfortable.small};
  `,
};

export type SelectionChipsProps = HTMLAttributes<HTMLDivElement> & {
  readonly chips: Pick<ChipElementProps, 'variant'>;
};

export const SelectionChips = (props: SelectionChipsProps): ReactElement => {
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

  return (
    <Styled.Root {...args} className={className} ref={ref}>
      {items?.map((x) => (
        // @ts-expect-error fwc-chip is a valid HTML element
        <fwc-chip key={x.key} value={x.key} removable variant={chips.variant}>
          <span>{x.title} </span>
          <Styled.Chip slot="graphic">{x.selection.length}</Styled.Chip>
          {/* @ts-expect-error fwc-chip is a valid HTML element */}
        </fwc-chip>
      ))}
    </Styled.Root>
  );
};
