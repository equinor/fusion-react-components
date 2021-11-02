import { Meta } from '@storybook/react';

import { useCallback, useEffect, useState, useRef } from 'react';

import { Button } from '@storybook/components';

import {
  useObservable,
  useObservableEffect,
  Action,
  Observable,
  mapAction,
  useObservableState,
  useSelector,
  useSelectorState,
} from '@equinor/fusion-react-observable';

export const Simple = () => {
  type Actions = Action<'foo' | 'bar' | 'elg'>;

  const store = useObservable((_state: string, action: Actions) => {
    switch (action.type) {
      case 'bar':
        return 'bar';
      default:
        return action.type;
    }
  }, '');

  const [_, refresh] = useState(0);

  const sideEffect = useCallback(
    (action$: Observable<Actions>): Observable<Actions> =>
      action$.pipe(mapAction('foo', (a) => ({ type: 'elg', gg: a.type }))),
    []
  );

  useObservableEffect(store, sideEffect);

  const ref = useRef<HTMLSourceElement>(null);

  useEffect(() => {
    store.subscribe((x) => ref.current && (ref.current.innerText += x + ' '));
  }, [ref, store]);

  return (
    <div>
      <code ref={ref}></code>
      <br />
      <Button onClick={() => store.dispatch({ type: 'foo' })}>Dispatch foo</Button>
      <Button onClick={() => store.dispatch({ type: 'bar' })}>Dispatch bar</Button>
      <Button onClick={() => store.dispatch({ type: 'bar' })}>Dispatch bar</Button>
      <Button onClick={() => refresh(_ + 1)}>test state</Button>
    </div>
  );
};

export const Selector = () => {
  type Actions = Action<'foo' | 'bar' | 'foobar'>;
  type State = {
    foo: {
      bar: number;
    };
    bar: {
      foo: number;
    };
    foobar: number;
  };

  const store = useObservable(
    (state: State, action: Actions) => {
      switch (action.type) {
        case 'foo':
          return { ...state, foo: { bar: state.foo.bar + 1 } };
        case 'bar':
          return { ...state, bar: { foo: state.bar.foo + 1 } };
        case 'foobar':
          return { ...state, foobar: state.foobar + 1 };
      }
    },
    {
      foo: { bar: 0 },
      bar: { foo: 0 },
      foobar: 0,
    }
  );

  const foo$ = useSelector(store, 'foo');
  const bar = useSelectorState(foo$, 'bar');

  const foo = useSelectorState(
    store,
    useCallback((state) => state.bar.foo, [])
  );

  const foobar = useObservableState(store);

  const [_, refresh] = useState(0);

  return (
    <div>
      <br />
      <p>foo:bar = {bar}</p>
      <p>bar:foo = {foo}</p>
      <pre>foobar = {JSON.stringify(foobar, null, 2)}</pre>
      <Button onClick={() => store.dispatch({ type: 'foo' })}>Dispatch foo</Button>
      <Button onClick={() => store.dispatch({ type: 'bar' })}>Dispatch bar</Button>
      <Button onClick={() => store.dispatch({ type: 'foobar' })}>Dispatch foobar</Button>
      <Button onClick={() => refresh(_ + 1)}>test state</Button>
    </div>
  );
};

export default {
  title: 'Examples/Observables',
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
} as Meta;
