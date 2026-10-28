import { createGlobalStyle } from 'styled-components';
// @ts-expect-error: EDS does not provide types for this
import edsVariables from '@equinor/eds-tokens/css/variables.css?raw';

/**
 * Global style injecting the EDS token CSS variables.
 *
 * `color-scheme: only light` keeps native controls and UA styles light even when the OS prefers
 * dark. TEMPORARY until Fusion supports dark mode (equinor/fusion-core-tasks#2120).
 */
export const EdsTokens = createGlobalStyle`
  ${edsVariables}

  :root {
    color-scheme: only light;
  }
`;

export default EdsTokens;
