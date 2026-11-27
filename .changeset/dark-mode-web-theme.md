---
"@equinor/fusion-web-theme": minor
---

Follow the EDS colour scheme instead of forcing light mode: the `color-scheme: only light` declaration is removed. Most colour properties now resolve to an EDS 2.x `--eds-color-*` CSS variable (from `@equinor/eds-tokens/css/variables`) without a literal fallback, so the host must load the EDS colour variables. Infographic, logo and overlay colours stay static. Typography colours resolve to EDS 2.x text variables in the same way. The new `colorSchemeVariables` export documents the colour mapping.

Ref: equinor/fusion-core-tasks#2755
