import styled from 'styled-components';

const StyledIndicator = styled.span<{ color?: IndicatorColor }>`
  background-color: ${({ color }) => color || 'var(--eds-color-bg-danger-fill-emphasis-default)'};
  height: 3rem;
  width: 8px;
  margin-right: 1rem;
  border-radius: 2px;
`;

/**
 * Indicator colour. Prefer an EDS CSS custom property such as
 * `var(--eds-color-bg-accent-fill-emphasis-default)` so the colour follows the colour scheme.
 */
export const Indicator = ({ color }: { readonly color?: IndicatorColor }) => {
  return <StyledIndicator color={color} />;
};

export type HEXString = `#${string}`;
export type CSSVariableString = `var(--${string})`;
export type IndicatorColor = HEXString | CSSVariableString;
