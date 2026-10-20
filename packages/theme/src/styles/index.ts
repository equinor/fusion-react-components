import { colors, colorVariables } from './colors';
import { elevation, elevationVariables } from './elevation';
import { spacing, spacingVariables } from './spacing';
import { typography, typographyVariables } from './typography';

export const styles = {
  colors,
  elevation,
  spacing,
  typography,
};

export const attributes = [
  ...colorVariables,
  ...elevationVariables,
  ...spacingVariables,
  ...typographyVariables,
];

export default styles;
