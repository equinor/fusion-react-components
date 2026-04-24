import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';

export const Styled = {
  Root: styled.div`
    display: flex;
    flex-flow: column;
    min-width: 150px;
  `,
  Items: styled.div<{ $layout: 'column' | 'row' }>`
    display: flex;
    flex-flow: ${({ $layout }) => $layout};
    overflow-y: auto;
  `,
  Title: styled.span`
    color: ${tokens.typography.heading.h3.color};
    font-family: ${tokens.typography.heading.h3.fontFamily};
    font-size: ${tokens.typography.heading.h3.fontSize};
    font-weight: ${tokens.typography.heading.h3.fontWeight};
    line-height: ${tokens.typography.heading.h3.lineHeight};
  `,
};
