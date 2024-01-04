import { FunctionComponent, MutableRefObject } from 'react';

import { PowerBIReportProvider, PowerBIReportErrorBoundary, PowerBIBookmark } from './components';
import { PowerBIReportContext, context } from './context';
import PowerBIReportView, { PowerBIComponentConfig } from './components/view/PowerBIReportView';
import { ApiClient } from '../types';
import { useBookmarkWithConfig } from './components/hooks/useBookmarkWithConfig';
import { ErrorBoundary } from '@equinor/fusion-react-errorboundary';

export type PowerBIProps = {
  readonly reportId: string;
  readonly hasContext?: boolean;
  readonly reloadOnContextChange?: boolean;
  readonly contextRef?: MutableRefObject<PowerBIReportContext | undefined>;
  readonly config?: PowerBIComponentConfig;
  readonly apiClient: ApiClient;
  readonly ErrorBoundary: React.ReactNode;
};

export const PowerBI: FunctionComponent<PowerBIProps> = (props: PowerBIProps) => {
  const {
    reportId,
    hasContext = false,
    reloadOnContextChange = false,
    config,
    contextRef,
    apiClient,
    ErrorComponent = ErrorBoundary,
  } = props;
  const configWithBookmark = useBookmarkWithConfig(config);
  const ErrorComponent = ErrorBoundary;
  return (
    <ErrorBoundary fallbackRender={() => {}}>
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
    </ErrorBoundary>
  );
};

export default PowerBI;
