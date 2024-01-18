---
"@equinor/fusion-react-icon": minor
"@equinor/fusion-react-errorboundary": patch
"@equinor/fusion-react-components-stories": patch
---

- In the `packages/errorboundary/package.json` file:
  - The dependency `@equinor/fusion-react-icon` with version `^0.3.0` has been removed.
  - In the `packages/icon/README.md` file:
    - The entire content has been replaced with a deprecation notice.
  - In the `storybook/package.json` file:
    - The dependency `@equinor/fusion-react-icon` with version `^0.3.0` has been removed.
  - In the `storybook/src/stories/button/button-link.stories.mdx` file:
    - The line mentioning `@equinor/fusion-react-icon` has been replaced with a reference to using EDS (Equinor Design System) for icons.
  - In the `storybook/src/stories/button/button-link.stories.tsx` file:
    - The import statement for `@equinor/fusion-react-icon` has been replaced with an import statement for `@equinor/fusion-wc-icon`.
  - In the `storybook/src/stories/button/button.stories.tsx` file:
    - The import statement for `@equinor/fusion-react-icon` has been replaced with an import statement for `@equinor/fusion-wc-icon`.
