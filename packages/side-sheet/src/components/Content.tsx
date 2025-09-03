import type { PropsWithChildren } from 'react';
import styled from 'styled-components';

const StyledContentContainer = styled.div`
  overflow-y: auto;
  height: 100%;
  padding: var(--side-sheet-content-padding, 1rem);
`;

export const Content = ({ children }: PropsWithChildren<unknown>) => {
  return <StyledContentContainer>{children}</StyledContentContainer>;
};
