import { createGlobalStyle } from 'styled-components';
// @ts-expect-error: EDS does not provide types for this
import edsVariables from '@equinor/eds-tokens/css/variables.css?raw';

export const EdsTokens = createGlobalStyle`
  ${edsVariables}
`;

export default EdsTokens;
