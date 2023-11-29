import { FunctionComponent, MutableRefObject } from 'react';

import { PowerBIReportProvider, PowerBIReportErrorBoundary, PowerBIBookmark } from './components';
import { PowerBIReportContext, context } from './context';
import PowerBIReportView, { PowerBIComponentConfig } from './components/view/PowerBIReportView';
import { ApiClient } from '../types';
import { useBookmarkWithConfig } from './components/hooks/useBookmarkWithConfig';

export type PowerBIProps = {
  readonly reportId: string;
  readonly hasContext?: boolean;
  readonly reloadOnContextChange?: boolean;
  readonly contextRef?: MutableRefObject<PowerBIReportContext>;
  readonly config?: PowerBIComponentConfig;
  readonly apiClient: ApiClient;
};

export const PowerBI: FunctionComponent<PowerBIProps> = ({
  reportId,
  hasContext = false,
  reloadOnContextChange = false,
  config,
  contextRef,
  apiClient,
}: PowerBIProps) => {
  const configWithBookmark = useBookmarkWithConfig(config);
  return (
    <PowerBIReportProvider
      id={reportId}
      hasContext={hasContext}
      reloadOnContextChange={reloadOnContextChange}
      apiClient={apiClient}
    >
      <PowerBIReportErrorBoundary>
        <PowerBIReportView config={configWithBookmark}></PowerBIReportView>
      </PowerBIReportErrorBoundary>
      <PowerBIBookmark />
      <context.Consumer>
        {(value) => {
          if (contextRef && contextRef?.current !== value) {
            contextRef.current = value || undefined;
          }
          return null;
        }}
      </context.Consumer>
    </PowerBIReportProvider>
  );
};

export default PowerBI;
