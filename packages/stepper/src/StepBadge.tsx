import { Icon } from '@equinor/eds-core-react';
import { done as doneStepIcon } from '@equinor/eds-icons';
import styled, { css } from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import type { ReactElement } from 'react';

const Styled = {
  Badge: styled.div<{ $active?: boolean; $done?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--badge-size, 21px);
    height: var(--badge-size, 21px);
    ${({ $active, $done }) => {
      switch (true) {
        case $active:
          return css`
            border: 1px solid ${tokens.colors.interactive.primary__resting.hex};
            background-color: ${tokens.colors.interactive.primary__resting.hex};
            color: ${tokens.colors.text.static_icons__primary_white.hex};
          `;
        case $done:
          return css`
            border: 1px solid ${tokens.colors.interactive.primary__resting.hex};
            color: ${tokens.colors.interactive.primary__resting.hex};
          `;
        default:
          return css`
            border: 1px solid ${tokens.colors.interactive.disabled__border.hex};
            color: ${tokens.colors.text.static_icons__default.hex};
          `;
      }
    }}
    font-size: calc(${tokens.typography.paragraph.caption.fontSize} * var(--content-resize, 1));
    font-weight: 400;
    line-height: 1.2;
    border-radius: 50%;
  `,
};

export type BadgeProps = {
  readonly position?: number;
  readonly active: boolean;
  readonly done?: boolean;
};

export const Badge = ({ position, active, done }: BadgeProps): ReactElement => {
  return (
    <Styled.Badge $active={active} $done={done}>
      {done ? <Icon data={doneStepIcon} /> : position}
    </Styled.Badge>
  );
};
