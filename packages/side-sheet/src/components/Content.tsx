import { type PropsWithChildren } from 'react';
import styled from 'styled-components';

const StyledContentContainer = styled.div`
  overflow-y: auto;
  height: calc(100vh - 48px - 2rem);
  padding-left: 1rem;
`;

export const Content = ({ children }: PropsWithChildren<unknown>) => {
  return <StyledContentContainer>{children}</StyledContentContainer>;
};
