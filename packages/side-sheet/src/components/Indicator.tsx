import styled from '@emotion/styled';

const StyledIndicator = styled.span<{ color?: HEXString }>`
  background-color: ${({ color }) => color || 'red'};
  height: 48px;
  width: 16px;
  margin-right: 1rem;
`;

export const Indicator = ({ color }: { color?: HEXString }) => {
  return <StyledIndicator color={color} />;
};

export type HEXString = `#${string}`;
