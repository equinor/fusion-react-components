/**
 * Maps Material (MWC/MDC) colour custom properties to EDS colour variables.
 *
 * `fwc-theme` already maps `--mdc-theme-primary`, `--mdc-theme-surface`,
 * `--mdc-theme-on-surface` and friends through the Fusion theme variables. These cover
 * the remaining properties read by MWC internals (`fwc-select`, `fwc-list-item`,
 * `fwc-check-list-item`), which otherwise fall back to light-only literals.
 *
 * The values are EDS variables only, so they follow the active colour scheme.
 */
export const mdcColorSchemeVariables = {
  '--mdc-theme-text-primary-on-background': '--eds-color-text-neutral-strong',
  '--mdc-theme-text-secondary-on-background': '--eds-color-text-neutral-subtle',
  '--mdc-theme-text-hint-on-background': '--eds-color-text-neutral-subtle',
  '--mdc-theme-text-icon-on-background': '--eds-color-text-neutral-subtle',
  '--mdc-theme-text-disabled-on-background': '--eds-color-text-disabled',
  '--mdc-checkbox-unchecked-color': '--eds-color-border-strong',
  '--mdc-checkbox-checked-color': '--eds-color-bg-accent-fill-emphasis-default',
  '--mdc-checkbox-ink-color': '--eds-color-text-accent-strong-on-emphasis',
  '--mdc-checkbox-disabled-color': '--eds-color-text-disabled',
  '--mdc-select-fill-color': '--eds-color-bg-neutral-fill-muted-default',
  '--mdc-select-ink-color': '--eds-color-text-neutral-strong',
  '--mdc-select-label-ink-color': '--eds-color-text-neutral-subtle',
  '--mdc-select-focused-label-color': '--eds-color-text-accent-strong',
  '--mdc-select-dropdown-icon-color': '--eds-color-text-neutral-subtle',
  '--mdc-select-focused-dropdown-icon-color': '--eds-color-text-accent-strong',
  '--mdc-select-idle-line-color': '--eds-color-border-strong',
  '--mdc-select-hover-line-color': '--eds-color-text-neutral-strong',
  '--mdc-select-outlined-idle-border-color': '--eds-color-border-strong',
  '--mdc-select-outlined-hover-border-color': '--eds-color-text-neutral-strong',
  '--mdc-select-outlined-disabled-border-color': '--eds-color-border-disabled',
  '--mdc-select-disabled-fill-color': '--eds-color-bg-disabled',
  '--mdc-select-disabled-ink-color': '--eds-color-text-disabled',
  '--mdc-select-disabled-dropdown-icon-color': '--eds-color-text-disabled',
  '--mdc-select-error-color': '--eds-color-text-danger-strong',
  '--mdc-select-error-dropdown-icon-color': '--eds-color-text-danger-strong',
} as const;

/** `property:var(--eds-…)` declarations for {@link mdcColorSchemeVariables}. */
export const mdcColorVariables: string[] = Object.entries(mdcColorSchemeVariables).map(
  ([property, variable]) => `${property}:var(${variable})`,
);
