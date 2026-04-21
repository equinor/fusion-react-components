import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';

export const Styled = {
  Root: styled.div<{ $inactive?: boolean; $hide?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    background-color: transparent;
    will-change: background-color;
    transition: 125ms background-color ease-out;

    &:hover {
      background-color: ${tokens.colors.interactive.primary__hover_alt.rgba};
    }

    ${({ $inactive }) =>
      $inactive &&
      `
      filter: grayscale(100%);
      opacity: 0.5;
    `}

    ${({ $hide }) =>
      $hide &&
      `
      display: none;
    `}
  `,
  Counter: styled.span`
    color: ${tokens.typography.input.label.color};
    font-family: ${tokens.typography.input.label.fontFamily};
    font-size: ${tokens.typography.input.label.fontSize};
    font-weight: ${tokens.typography.input.label.fontWeight};
    line-height: ${tokens.typography.input.label.lineHeight};
    white-space: nowrap;
    margin: 0 ${tokens.spacings.comfortable.small};
  `,
};
