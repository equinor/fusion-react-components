import React, { useRef, useCallback, useEffect, useState, useMemo } from 'react';
import { HTMLTextInputCustomElement, TextInput } from '@equinor/fusion-react-textinput';
import { HTMLMenuCustomElement, Menu } from '@equinor/fusion-react-menu';
import { ListItem, ListItemProps } from '@equinor/fusion-react-list';
import { BehaviorSubject, from, Observable, ObservableInput, Subject, switchMap, tap, withLatestFrom } from 'rxjs';

export type SearchableSelectProps = {
  data: Array<Item>;
  query: QueryFn;
};

export type Item = Pick<ListItemProps, 'text' | 'selected' | 'value'>;

export type SearchableSelectFilterFn = (query: string) => Array<Item> | ObservableInput<Item>;

type QueryFn = (args: {
  query: string;
  currentData: Array<Item>;
  initialData: Array<Item>;
  signal: AbortSignal;
}) => ObservableInput<Array<Item>>;

const defaultQuery: QueryFn = async ({ query, initialData }) => {
  return initialData.filter((x) => x.text?.match(new RegExp(query, 'gi')));
};

const useQueryData = (args: { queryFn: QueryFn; initialData: Array<Item> }) => {
  const { initialData, queryFn } = args;

  const query$ = useMemo(() => new Subject<string>(), []);
  const data$ = useState(() => new BehaviorSubject<Array<Item>>(initialData))[0];

  const [data, _setData] = useState<Array<Item>>(data$.value);

  useEffect(() => {
    console.log(1, 'allright', query$, data$);
    const sub = query$
      .pipe(
        tap(console.debug),
        /** get the latest data */
        withLatestFrom(data$),
        /** abort ongoing queries and create a new query */
        switchMap(
          ([query, currentData]) =>
            /** create a observable for executing the query */
            new Observable<Array<Item>>((observer) => {
              /** create a controller for signaling the consumer when the query is aborted  */
              const controller = new AbortController();
              /** execute the query */
              const fn = queryFn({ query, currentData, initialData, signal: controller.signal });
              /** wrap the query and observe response */
              from(fn).subscribe(observer);
              /** signal abortion on tear-down */
              return () => controller.abort();
            })
        )
      )
      /** map query results to current data */
      .subscribe(data$);
    /** teardown subscription to query */
    return () => sub.unsubscribe();
  }, [query$, data$, initialData, queryFn]);

  useEffect(() => {
    const sub = data$.subscribe(_setData);
    return () => sub.unsubscribe();
  }, [data$]);

  const setQuery = useCallback(
    (q: string) => {
      query$.next(q);
    },
    [query$]
  );

  return { data, setQuery };
};

export const SearchableSelect = (props: SearchableSelectProps): JSX.Element => {
  const menuRef = useRef<HTMLMenuCustomElement>(null);
  const inputRef = useRef<HTMLTextInputCustomElement>(null);
  const [open, _setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<ListItemProps | null>(null);

  const { data, setQuery } = useQueryData({ queryFn: props.query ?? defaultQuery, initialData: props.data });

  console.log(data);

  const setOpen = useCallback(
    (open: boolean) => {
      console.log(open ? 'opening :)' : 'closing ;)');
      menuRef.current && (menuRef.current.open = open);
    },
    [menuRef]
  );

  const onSelect = useCallback(
    (e: React.SyntheticEvent<HTMLMenuElement, CustomEvent<{ index: number }>>) => {
      console.log(e);
      const { index } = e.nativeEvent.detail;
      const selected = data[index];
      setSelected(selected);
      if (inputRef.current && selected.text) {
        inputRef.current.value = selected.text;
      }
    },
    [data]
  );

  useEffect(() => {
    if (menuRef.current) {
      // menuRef.current.style.setProperty('--mdc-menu-max-height', '100px');
      menuRef.current.anchor = inputRef.current;
    }
  }, [menuRef, inputRef]);

  return (
    <div>
      <TextInput
        ref={inputRef}
        type="search"
        // value={selected?.text}
        onInput={(e) => setQuery(e.currentTarget.value)}
        iconTrailing={open ? 'arrow_drop_down' : 'arrow_drop_up'}
        onClick={() => setOpen(true)}
      ></TextInput>
      {/* <p
        onClick={(e) => {
          console.log(e);
          return setOpen(true);
        }}
      >
        +
      </p> */}
      <Menu
        ref={menuRef}
        corner="BOTTOM_START"
        menuCorner="END"
        onOpen={() => _setOpen(true)}
        onClosed={() => _setOpen(false)}
        onSelected={onSelect}
        fullwidth
        activatable
      >
        {data.map((menuItem, index) => (
          <ListItem {...menuItem} key={index}>
            {menuItem.text}
          </ListItem>
        ))}
      </Menu>
      <pre>{JSON.stringify(selected, null, 2)}</pre>
    </div>
  );
};
