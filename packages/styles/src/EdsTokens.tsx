import { createGlobalStyle } from 'styled-components';
import { mdcColorVariables } from '@equinor/fusion-web-theme';
// @ts-expect-error: EDS does not provide types for this
import edsVariables from '@equinor/eds-tokens/css/variables.css?raw';
import { classicColourSchemeStyles } from './classic-colours';

// Declared on every scheme boundary because a custom property resolves its `var()` where it is
// declared; inheriting a value resolved at `:root` would ignore a nested `data-color-scheme`.
export const EdsTokens = createGlobalStyle`
  ${edsVariables}

  :root, [data-color-scheme], fwc-theme {
    ${mdcColorVariables.join(';')};
  }

  /* Classic EDS 2.x components follow dark mode; light mode keeps their classic colours. */
  ${classicColourSchemeStyles()}
`;

export default EdsTokens;
