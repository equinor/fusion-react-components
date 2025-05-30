import type { FC } from 'react';

import type { ICellRendererParams } from 'ag-grid-community';

import { styled } from 'styled-components';

import { StatusIcon } from './StatusIcon';

const Styled = {
  Container: styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  `,
};

/**
 * Renders a status component for a cell in an ag-grid table.
 * @param props - The cell renderer parameters.
 * @returns The rendered status component.
 */
export const StatusComponent: FC<ICellRendererParams> = (props: ICellRendererParams) => {
  const isGroupRow = props.node.group;
  if (isGroupRow) return null;
  return (
    <Styled.Container>
      <StatusIcon status={props.data?.status} />
    </Styled.Container>
  );
};

export default StatusComponent;
