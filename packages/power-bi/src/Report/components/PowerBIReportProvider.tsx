import {
  useEffect,
  PropsWithChildren,
  FunctionComponent,
  useRef,
  useMemo,
  useState,
  useLayoutEffect,
  useCallback,
} from 'react';

import { context, PowerBIEmbedComponent, PowerBIEmbedEventEntry, PowerBIReportContext } from '../context';
import { Subject } from 'rxjs';

import { Store } from '../store';
import { distinctUntilKeyChanged, filter, map } from 'rxjs/operators';
import { ApiClient } from '../../types';

import {
  useObservableLayoutSubscription,
} from '@equinor/fusion-observable/react';

// import PowerBITelemetryObserver from '../telemetry/observer';

type Props = PropsWithChildren<{
  readonly id: string;
  readonly hasContext: boolean;
  readonly reloadOnContextChange?: boolean;
  readonly apiClient: ApiClient;
  readonly context?: { externalId: string; type: string };
}>;

const { Provider } = context;

export const PowerBIReportProvider: FunctionComponent<Props> = ({
  children,
  id,
  hasContext,
  // reloadOnContextChange,
  apiClient,
  context,
}: Props) => {
  const store = useMemo(() => new Store(id, { apiClient }), [id, apiClient]);
  const event$ = useMemo(() => new Subject<PowerBIEmbedEventEntry>(), []);

  /**
   * Null default, as to not set contextAccess before embedInfo has been fetched
   */
  const [hasRls, setHasRls] = useState<boolean | undefined>(undefined);

  const component = useRef<PowerBIEmbedComponent | undefined>(undefined);

  // TODO add metrics
  // const metrics = useMemo(() => new PowerBITelemetryObserver(store, logger), [store, logger]);

  // useEffect(() => {
  //   if (reloadOnContextChange && component.current) {
  //     component.current.reload();
  //   }
  // }, [selectedContext, component, reloadOnContextChange]);

  /**
   * when new store created, fetch embed info for the report
   */
  useLayoutEffect(() => store.requestEmbedInfo(), [store]);

  /**
   * when embed info is loaded, check if
   */
  useObservableLayoutSubscription(
    useMemo(
      () =>
        store.pipe(
          distinctUntilKeyChanged('embedInfo'),
          map((x) => !!x?.embedInfo),
        ),
      [store],
    ),
    useCallback((rls: boolean) => {
      setHasRls(rls);
    }, []),
    useCallback(() => {
      setHasRls(undefined);
    }, []),
  );

  useObservableLayoutSubscription(
    useMemo(
      () =>
        store.pipe(
          distinctUntilKeyChanged('hasContextAccess'),
          filter((x) => Boolean(x.hasContextAccess && !x.token)),
        ),
      [store],
    ),
    useCallback(() => store.requestAccessToken(), [store]),
  );

  /**
   * if not using context, or hasRLS is determined to be false, the the process through to requestToken.
   * When EmbedInfo is fetched, the hasRls state should resolve to true/false or we have caught an error.
   */
  useEffect(() => {
    if (!hasContext || hasRls === false) {
      store.contextAccess = true;
    }
    return () => {
      store.contextAccess = false;
    };
  }, [store, hasContext, hasRls]);

  useEffect(() => {
    if (context && hasRls) {
      /**
       * Determines context access on wither rapport uses RLS and if it uses context.
       * checkContextAccess should only run for reports using context AND RLS.
       */
      return store.checkContextAccess(context);
    }
  }, [store, hasRls, context]);

  return (
    <Provider
      value={useMemo(() => ({ store, event$, component }) satisfies PowerBIReportContext, [store, event$, component])}
    >
      {children}
    </Provider>
  );
};

export default PowerBIReportProvider;
