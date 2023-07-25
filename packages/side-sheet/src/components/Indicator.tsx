import styled from 'styled-components';

const StyledIndicator = styled.span<{ color?: HEXString }>`
  background-color: ${({ color }) => color || 'red'};
  height: 3rem;
  width: 1rem;
  margin-right: 1rem;
`;

export const Indicator = ({ color }: { color?: HEXString }) => {
  return <StyledIndicator color={color} />;
};

export type HEXString = `#${string}`;
