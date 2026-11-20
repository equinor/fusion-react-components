const RULE = /([^{}]+)\{([^{}]*)\}/g;
const LIGHT_ROOT = ':root,[data-color-scheme=light]';
const ALIAS = /^(--eds-color-[\w-]+)\s*:\s*(var\(--eds-color-[\w-]+\))$/;

/**
 * Extracts the EDS semantic colour aliases (for example
 * `--eds-color-bg-neutral-surface: var(--eds-color-neutral-2)`) from the
 * `@equinor/eds-tokens` 2.x `css/variables.css` source.
 *
 * EDS declares these aliases only on `:root, [data-color-scheme="light"]`, while
 * `[data-color-scheme="dark"]` only re-declares the palette. A dark subtree below a light root,
 * such as a dark `<body>` under a light `<html>`, would otherwise inherit aliases already
 * resolved to light values.
 *
 * @param source - The raw `@equinor/eds-tokens/css/variables.css` text, formatted or minified.
 * @returns The alias declarations, without trailing semicolons.
 */
export const colourSchemeAliasDeclarations = (source: string): string[] => {
  const declarations: string[] = [];
  for (const [, selector, body] of source.matchAll(RULE)) {
    if (selector.replace(/\s|["']/g, '') !== LIGHT_ROOT) continue;
    for (const declaration of body.split(';')) {
      const match = declaration.trim().match(ALIAS);
      if (match) declarations.push(`${match[1]}: ${match[2]}`);
    }
  }
  return declarations;
};
