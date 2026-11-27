/** Legacy typography colour properties (`--eds_<group>__<variant>_color`) used by classic EDS. */
const typographyColourProperties = [
  'heading__h1_bold',
  'heading__h1',
  'heading__h2',
  'heading__h3',
  'heading__h4',
  'heading__h5',
  'heading__h6',
  'input__helper',
  'input__label',
  'input__text',
  'input__text_monospaced',
  'navigation__breadcrumb',
  'navigation__breadcrumb_hover',
  'navigation__button',
  'navigation__drawer_active',
  'navigation__drawer_inactive',
  'navigation__label',
  'navigation__menu_tabs',
  'navigation__menu_title',
  'navigation__menu_title_hover',
  'paragraph__body_long_bold',
  'paragraph__body_long_bold_italic',
  'paragraph__body_long',
  'paragraph__body_long_italic',
  'paragraph__body_long_link',
  'paragraph__body_short_bold',
  'paragraph__body_short_bold_italic',
  'paragraph__body_short',
  'paragraph__body_short_italic',
  'paragraph__body_short_link',
  'paragraph__caption',
  'paragraph__ingress',
  'paragraph__meta',
  'paragraph__overline',
  'table__cell_header',
  'table__cell_numeric_monospaced',
  'table__cell_text_bold',
  'table__cell_text',
  'table__cell_text_link',
  'ui__accordion_header',
  'ui__chart',
  'ui__chip__badge',
  'ui__snackbar',
  'ui__tooltip',
];

/**
 * Maps the legacy custom properties that classic EDS 2.x components read their colours from
 * (the `@equinor/eds-tokens` JS values, `var(--eds_*, <static light value>)`) to EDS CSS colour
 * variables from `@equinor/eds-tokens/css/variables` (2.3.2), which switch with the colour
 * scheme.
 *
 * EDS publishes no official legacy-to-semantic mapping, so these pairs are approximations,
 * aligned with the mapping in `@equinor/fusion-web-theme`. Infographic and logo colours (brand
 * palette), the pressed overlays and `ui_background__semitransparent` are left unmapped. The
 * scrim and overlay need a translucent value, so they are in {@link classicOverlayColours}.
 */
export const classicColourVariables: Readonly<Record<string, string>> = {
  '--eds_text__static_icons__default': '--eds-color-text-neutral-strong',
  '--eds_text__static_icons__secondary': '--eds-color-text-neutral-subtle',
  '--eds_text__static_icons__tertiary': '--eds-color-text-neutral-subtle',
  '--eds_text__static_icons__primary_white': '--eds-color-text-accent-strong-on-emphasis',
  '--eds_ui_background__default': '--eds-color-bg-neutral-surface',
  '--eds_ui_background__light': '--eds-color-bg-neutral-canvas',
  '--eds_ui_background__medium': '--eds-color-bg-neutral-fill-muted-default',
  '--eds_ui_background__info': '--eds-color-bg-info-fill-muted-default',
  '--eds_ui_background__warning': '--eds-color-bg-warning-fill-muted-default',
  '--eds_ui_background__danger': '--eds-color-bg-danger-fill-muted-default',
  '--eds_interactive_primary__selected_highlight': '--eds-color-bg-accent-fill-muted-default',
  '--eds_interactive_primary__selected_hover': '--eds-color-bg-accent-fill-muted-hover',
  '--eds_interactive_primary__resting': '--eds-color-bg-accent-fill-emphasis-default',
  '--eds_interactive_primary__hover': '--eds-color-bg-accent-fill-emphasis-hover',
  '--eds_interactive_primary__hover_alt': '--eds-color-bg-accent-fill-muted-default',
  '--eds_interactive_secondary__highlight': '--eds-color-bg-info-fill-muted-default',
  '--eds_interactive_secondary__resting': '--eds-color-bg-neutral-fill-emphasis-default',
  '--eds_interactive_secondary__link_hover': '--eds-color-bg-neutral-fill-emphasis-hover',
  '--eds_interactive_danger__highlight': '--eds-color-bg-danger-fill-muted-default',
  '--eds_interactive_danger__resting': '--eds-color-bg-danger-fill-emphasis-default',
  '--eds_interactive_danger__hover': '--eds-color-bg-danger-fill-emphasis-hover',
  '--eds_interactive_danger__text': '--eds-color-text-danger-subtle',
  '--eds_interactive_warning__highlight': '--eds-color-bg-warning-fill-muted-default',
  '--eds_interactive_warning__resting': '--eds-color-bg-warning-fill-emphasis-default',
  '--eds_interactive_warning__hover': '--eds-color-bg-warning-fill-emphasis-hover',
  '--eds_interactive_warning__text': '--eds-color-text-warning-subtle',
  '--eds_interactive_success__highlight': '--eds-color-bg-success-fill-muted-default',
  '--eds_interactive_success__resting': '--eds-color-bg-success-fill-emphasis-default',
  '--eds_interactive_success__hover': '--eds-color-bg-success-fill-emphasis-hover',
  '--eds_interactive_success__text': '--eds-color-text-success-subtle',
  '--eds_interactive_table__cell__fill_resting': '--eds-color-bg-neutral-surface',
  '--eds_interactive_table__cell__fill_hover': '--eds-color-bg-neutral-fill-muted-default',
  '--eds_interactive_table__cell__fill_activated': '--eds-color-bg-accent-fill-muted-default',
  '--eds_interactive_table__header__fill_activated': '--eds-color-bg-neutral-fill-muted-default',
  '--eds_interactive_table__header__fill_hover': '--eds-color-bg-neutral-fill-muted-hover',
  '--eds_interactive_table__header__fill_resting': '--eds-color-bg-neutral-canvas',
  '--eds_interactive__disabled__text': '--eds-color-text-disabled',
  '--eds_interactive__text_highlight': '--eds-color-bg-info-fill-muted-default',
  '--eds_interactive__focus': '--eds-color-border-focus',
  '--eds_interactive__disabled__border': '--eds-color-border-disabled',
  '--eds_interactive__disabled__fill': '--eds-color-bg-disabled',
  '--eds_interactive__link_on_interactive_colors': '--eds-color-text-accent-strong-on-emphasis',
  '--eds_interactive__icon_on_interactive_colors': '--eds-color-text-accent-strong-on-emphasis',
  '--eds_interactive__link_in_snackbars': '--eds-color-text-link',
  ...Object.fromEntries(
    typographyColourProperties.map((name) => [
      `--eds_${name}_color`,
      name.endsWith('_link') ? '--eds-color-text-link' : '--eds-color-text-neutral-strong',
    ]),
  ),
};

/**
 * Translucent scrim colour derived from `--eds-color-bg-backdrop`, which is opaque. The classic
 * scrim is translucent, so the page behind it stays visible.
 */
export const classicScrimColour =
  'color-mix(in srgb, var(--eds-color-bg-backdrop) 60%, transparent)';

/**
 * Dark, near-opaque background for classic `Tooltip` and `Snackbar`, derived from the darkest
 * neutral surface. The classic overlay is a translucent dark grey with white text.
 */
export const classicOverlayColour =
  'color-mix(in srgb, var(--eds-color-bg-neutral-canvas) 90%, transparent)';

/** Legacy scrim and overlay properties, declared as CSS values rather than variable names. */
export const classicOverlayColours: Readonly<Record<string, string>> = {
  '--eds_ui_background__scrim': classicScrimColour,
  '--eds_ui_background__overlay': classicOverlayColour,
};

/**
 * Light text for classic components on the overlay background (`Tooltip` and `Snackbar`).
 *
 * `--eds_text__static_icons__primary_white` maps to the on-emphasis text colour, which is dark in
 * dark mode because contained buttons and `SideBar` use it on light emphasis fills. Inside the
 * overlay components it points at the mapped `--eds_text__static_icons__default` instead. That
 * property is only defined in dark mode, so in light mode the reference is invalid and the
 * components keep their classic white fallback.
 */
export const classicOverlayTextStyles = `
[role="tooltip"], [role="alert"][popover] {
  --eds_text__static_icons__primary_white: var(--eds_text__static_icons__default);
}
`;

/**
 * Returns CSS declarations that point every legacy property in {@link classicColourVariables}
 * at its EDS variable and set {@link classicOverlayColours}. Place them under the host's dark
 * colour-scheme selector only, so light mode keeps the classic values.
 */
export const classicColourDeclarations = (): string =>
  [
    ...Object.entries(classicColourVariables).map(
      ([legacy, variable]) => `${legacy}: var(${variable});`,
    ),
    ...Object.entries(classicOverlayColours).map(([legacy, value]) => `${legacy}: ${value};`),
  ].join('\n');

/**
 * Applies {@link classicColourDeclarations} wherever `@equinor/eds-tokens` 2.3.2 selects dark:
 * `[data-color-scheme="dark"]`, and a root without `data-color-scheme="light"` when the system
 * prefers dark. A nested `[data-color-scheme="light"]` resets the legacy properties to `initial`,
 * so classic components there use their light fallbacks instead of inherited dark values. It also
 * includes {@link classicOverlayTextStyles}.
 */
export const classicColourSchemeStyles = (): string => {
  const declarations = classicColourDeclarations();
  const resets = [...Object.keys(classicColourVariables), ...Object.keys(classicOverlayColours)]
    .map((legacy) => `${legacy}: initial;`)
    .join('\n');
  return `
[data-color-scheme="dark"] {
${declarations}
}
@media (prefers-color-scheme: dark) {
  :root:not([data-color-scheme="light"]) {
${declarations}
  }
}
[data-color-scheme="light"] {
${resets}
}
${classicOverlayTextStyles}`;
};
