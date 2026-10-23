# Changelog

## 0.1.3 - 2026-10-22

### patch

- [#322](https://github.com/equinor/fusion-skills/pull/322) [`da178d5`](https://github.com/equinor/fusion-skills/commit/da178d5ed9d130dc5a0a684f3ebaf6b1e5f28faa) - Stop recommending brace expansion in Copilot `applyTo`


  Copilot code review splits `applyTo` on commas before glob matching, so `**/*.{ts,tsx}` becomes invalid patterns and the instruction is silently skipped.

  - Use comma-separated patterns (`**/*.ts, **/*.tsx`) in the Copilot multiple-patterns example
  - Mark brace globs in the cheat sheet as Claude Code `paths` only, and add a common-mistakes row
  - Forbid brace expansion in the scoped template `pathPattern` slot, the quality checklist, and drafting rules

  resolves equinor/fusion-skills#321

## 0.1.2 - 2026-10-18

### patch

- [#291](https://github.com/equinor/fusion-skills/pull/291) [`31a05b2`](https://github.com/equinor/fusion-skills/commit/31a05b2a8705e40801dc8373dc3d072991cb5aad) - Convert Copilot, Claude, scoped, and Cursor rule starters to `.md.hbs` with declared slots. Preserve native rule output formats and update discovery links.


  resolves equinor/fusion-core-tasks#2445

## 0.1.1 - 2026-05-07

### patch

- [#170](https://github.com/equinor/fusion-skills/pull/170) [`5e43223`](https://github.com/equinor/fusion-skills/commit/5e432232917b2b1642431d80cf1698bbefe80ee8) - Apply caveman-compress prose style to SKILL.md.


  - Drop articles, filler, hedging from SKILL.md activation body

## 0.1.0 - 2026-03-21

### minor

- [#116](https://github.com/equinor/fusion-skills/pull/116) [`2037597`](https://github.com/equinor/fusion-skills/commit/20375978cba700b828b5c912e7159ef117ee2422) - Add fusion-rule-author support skill with workflow, templates, and references


  Internal support skill providing the canonical 7-step authoring workflow, starter templates, frontmatter scenarios, follow-up questions, quality checklist, and tech-stack examples for GitHub Copilot, Cursor, and Claude Code rule files.
