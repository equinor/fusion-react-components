import { mdcColorVariables } from '@equinor/fusion-web-theme';

const styleId = 'fusion-react-searchable-dropdown-colours';

/**
 * Maps the MWC colour properties read inside `fwc-searchable-dropdown` (list text, icons,
 * check boxes) to EDS colour variables, so the dropdown follows the light and dark colour
 * schemes even when it is rendered outside a Fusion `ThemeProvider`.
 */
export const colourOverrides = `fwc-searchable-dropdown{${mdcColorVariables.join(';')}}`;

/** Adds {@link colourOverrides} to the document once. */
export const applyColourOverrides = (): void => {
  if (typeof document === 'undefined' || document.getElementById(styleId)) return;
  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = colourOverrides;
  document.head.append(style);
};
