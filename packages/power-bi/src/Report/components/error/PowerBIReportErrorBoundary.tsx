import { useContext, FC } from 'react';

// import { ErrorMessage } from '@equinor/fusion-components';

import { useSelector } from '@equinor/fusion/lib/epic';

import { ApiError } from '../../store/actions';
import { context } from '../../context';

import { processActionError } from './process-action-error';
import PowerBIReportInfo from '../../../ReportInfo';
import processReportInfoError from './process-reportInfo-error';

// TODO fix me
type ErrorMessageProps = { hasError: boolean; title?: string; message?: string; errorType?: string };
const ErrorMessage = (props: ErrorMessageProps) => {
  return (
    <div>
      <h1 style={{ color: 'red' }}>missing error message container</h1>
      <h2>{props.title}</h2>
      <p>{props.title}</p>
    </div>
  );
};

// type PowerBIReportErrorBoundryProps = PropsWithChildren<{}>;

// TODO: move me
const compareArray = (a: ApiError[], b: ApiError[]): boolean =>
  a.length === b.length && a.every((value, index) => value.action === b[index].action);

export const PowerBIReportErrorBoundary: FC = () => {
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
    return <ErrorMessage hasError={true} title={title} message={message} errorType={type} />;
  }

  return <>{props.children}</>;
};

export default PowerBIReportErrorBoundary;
