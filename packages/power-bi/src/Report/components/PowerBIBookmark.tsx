import { useContext, FunctionComponent, useState, useEffect, useCallback } from 'react';
import { context, PowerBIEmbedEvents, PowerBIEmbedEventEntry } from '../context';
import { Report } from 'powerbi-client';
import { filter, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { useSelector } from '@equinor/fusion';
import { useCurrentBookmark } from '@equinor/fusion-framework-react-module-bookmark';

type Props = {
  hasContext: boolean;
};

const nextRender = (event$: Observable<PowerBIEmbedEventEntry>) => {
  return event$.pipe(
    filter((x) => x.type === PowerBIEmbedEvents.rendered),
    first()
  );
};

export const PowerBIBookmark: FunctionComponent<Props> = ({ hasContext }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const pbiContext = useContext(context);

  if (!pbiContext) return null;
  const { component, store, event$ } = pbiContext;

  /**
   * @eskil - seems like the bookmark sidesheet does not display if the AppSettingsManager is rendered to early
   * this only triggers re-render when status of the store changes
   */
  useSelector(store, 'status');

  const report = component?.current as Report;

  const captureBookmark = async () => {
    if (!report || !isLoaded) return '';

    try {
      const bookmark = await report.bookmarksManager.capture();
      return bookmark.state || '';
    } catch (err) {
      console.error(err);
      return '';
    }
  };

  const applyBookmark = useCallback(
    async (bookmark: string, awaitForContextSwitch: boolean) => {
      awaitForContextSwitch
        ? nextRender(event$).subscribe(() => report.bookmarksManager.applyState(bookmark))
        : report.bookmarksManager.applyState(bookmark);
    },
    [report]
  );

  useEffect(() => {
    const loaded$ = event$.pipe(
      filter((x) => x.type === PowerBIEmbedEvents.Loaded),
      first()
    );
    const subscription = loaded$.subscribe(() => setIsLoaded(true));

    return () => {
      subscription.unsubscribe();
    };
  }, [event$]);

  const { currentBookmark } = useCurrentBookmark<string>(captureBookmark as unknown as () => string);

  useEffect(() => {
    if (currentBookmark && isLoaded) {
      applyBookmark(currentBookmark.payload, hasContext);
    }
  }, [currentBookmark, hasContext]);

  return null;
};

export default PowerBIBookmark;
