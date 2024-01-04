import { useContext } from 'react';

import { ErrorBoundary, createFallbackRender } from '@equinor/fusion-react-errorboundary/legacy';

import { useObservableSelector, useObservableState } from '@equinor/fusion-observable/react';

import {} from '../../store/types';
import { context } from '../../context';

// import { processActionError } from './process-action-error';
import PowerBIReportInfo from '../../../ReportInfo';
import processReportInfoError from './process-reportInfo-error';
import { ActionError } from '@equinor/fusion-observable';

type PowerBIReportErrorBoundryProps = {
  children: React.ReactNode;
};

// TODO: move me
const compareArray = (a: ActionError[], b: ActionError[]): boolean =>
  a.length === b.length && a.every((value, index) => value.action === b[index].action);

export const PowerBIReportErrorBoundary = (_props: PowerBIReportErrorBoundryProps): JSX.Element => {
  const { store } = useContext(context);

  const { value: id } = useObservableState(useObservableSelector(store, 'id'));
  const { value: errors } = useObservableState(useObservableSelector(store, 'errors', compareArray));
  const reportInfoError = errors?.find(({ cause }) => cause.status === );

  if (reportInfoError) {
    const reportInfoErrorString = processReportInfoError(reportInfoError);
    return <PowerBIReportInfo id={id || ''} {...reportInfoErrorString} />;
  }
  if (errors?.length) {
    // const { title, message, type } = processActionError(errors[0]);
    return <ErrorBoundary  fallbackRender={(props) => {
      props.error
    }} />;
  }

  return <>props.children</>;
};

export default PowerBIReportErrorBoundary;
