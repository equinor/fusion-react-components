import styled from 'styled-components';

const StyledIndicator = styled.span<{ color?: HEXString }>`
  background-color: ${({ color }) => color || 'red'};
  height: 3rem;
  width: 8px;
  margin-right: 1rem;
  border-radius: 2px;
`;

export const Indicator = ({ color }: { readonly color?: HEXString }) => {
  return <StyledIndicator color={color} />;
};

export type HEXString = `#${string}`;
