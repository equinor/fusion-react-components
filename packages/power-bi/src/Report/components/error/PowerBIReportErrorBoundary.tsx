import { useContext } from 'react';

import { ErrorBoundary } from '@equinor/fusion-react-errorboundary';

import { useSelector } from '@equinor/fusion/lib/epic';

import { ApiError } from '../../store/actions';
import { context } from '../../context';

import { processActionError } from './process-action-error';
import PowerBIReportInfo from '../../../ReportInfo';
import processReportInfoError from './process-reportInfo-error';

type PowerBIReportErrorBoundryProps = {
  children: React.ReactNode;
};

// TODO: move me
const compareArray = (a: ApiError[], b: ApiError[]): boolean =>
  a.length === b.length && a.every((value, index) => value.action === b[index].action);

export const PowerBIReportErrorBoundary = (_props: PowerBIReportErrorBoundryProps): JSX.Element => {
  const { store } = useContext(context);

  const id = useSelector(store, 'id');
  const errors = useSelector(store, 'errors', compareArray);
  const reportInfoError = errors?.find(({ error }) => error.statusCode === 403);

  if (reportInfoError) {
    const reportInfoErrorString = processReportInfoError(reportInfoError);
    return <PowerBIReportInfo id={id || ''} {...reportInfoErrorString} />;
  }
  if (errors?.length) {
    const { title, message, type } = processActionError(errors[0]);
    return <ErrorBoundary hasError={true} title={title} message={message} errorType={type} />;
  }

  return <>props.children</>;
};

export default PowerBIReportErrorBoundary;
