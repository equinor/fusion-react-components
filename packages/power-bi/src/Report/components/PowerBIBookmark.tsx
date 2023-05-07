import { useContext, useState, useEffect, useCallback } from 'react';
import { context, PowerBIEmbedEvents } from '../context';
import { Report } from 'powerbi-client';
import { filter, first } from 'rxjs/operators';

import { useCurrentBookmark } from '@equinor/fusion-framework-react-module-bookmark';

export const PowerBIBookmark = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const pbiContext = useContext(context);

  if (!pbiContext) return null;
  const { component, event$ } = pbiContext;

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
    async (bookmark: string) => {
      report.bookmarksManager.applyState(bookmark);
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
      applyBookmark(currentBookmark.payload);
    }
  }, [currentBookmark]);

  return null;
};

export default PowerBIBookmark;
