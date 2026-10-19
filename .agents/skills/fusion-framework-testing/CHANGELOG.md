# Changelog

## 0.2.0 - 2026-10-18

### minor

- [#276](https://github.com/equinor/fusion-skills/pull/276) [`46a0fb6`](https://github.com/equinor/fusion-skills/commit/46a0fb6c2165a6a7de448d2b23c8eea0773fc5a2) - Add guidance for Playwright end-to-end user journeys alongside Vitest tests


  - New `references/end-to-end-journeys.md`: when a journey is warranted, workflow-grouped `as a <role>` scenarios with accessible locators, serving the app next to `@equinor/fusion-openapi-mock-server` with `createMockAuth` users and per-test overrides, isolated data for parallel runs, screenshots as reviewed evidence instead of pixel gates, CI-only canonical baselines, and how coding agents should run journeys.
  - `SKILL.md` adds a journey row to the layer table, a step for complete workflows, and a rule against committing local baselines.

  resolves equinor/fusion-core-tasks#2405

## 0.1.0 - 2026-08-31

### minor

- [#221](https://github.com/equinor/fusion-skills/pull/221) [`df40bbc`](https://github.com/equinor/fusion-skills/commit/df40bbc28a8d9134ad433fe43d7110996e3e6143) - Add fusion-framework-testing skill for Vitest/Browser Mode testing of Fusion Framework React apps


  Covers `@equinor/fusion-framework-vitest-plugin-react-app` install and `defineProject` configuration, `renderAppHook`/`renderAppComponent`/`testApp` fixtures, composing and overriding fixtures with `test.extend`, troubleshooting common setup/browser/network failures, why Browser Mode is the default, choosing another browser provider or `happy-dom`/`jsdom`, and migrating an existing `@testing-library/react` suite.
