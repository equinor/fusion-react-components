# End-to-end user journeys with Playwright

Vitest Browser Mode tests cover components, hooks, and routes. A small set of Playwright **journeys**
covers complete user workflows against the served app. This reference describes how to keep
journeys behavior-driven, parallel, and cheap to review.

## When a journey is warranted

Write or run a journey only when a change crosses at least one of:

- several routes or a navigation flow;
- dialogs or side sheets that change persisted state;
- persisted state across reloads (local storage, server data, URL state);
- a primary user workflow, such as create, submit, or approve.

Isolated logic, copy, and styling changes do not need a journey; cover them with Vitest tests.

## Structure

- Keep journeys in their own package or folder (for example `playwright/journeys/*.spec.ts`), apart
  from co-located Vitest tests.
- Group specs by durable workflow, not by page or ticket.
- Name scenarios from the user's point of view (`as a <role> I want …`) and mark milestones with
  `test.step`.
- Use accessible locators (`getByRole` with a name, `getByLabel`). They double as an accessibility
  check and survive styling changes.
- Assertions on roles, navigation, state, and visible outcomes decide whether a journey passes.

## Run against the served app and a Fusion mock

Start the standalone Fusion mock server (`ffc mock-server <mocks-dir> --port <port>`, which needs the
`@equinor/fusion-framework-cli-plugin-mock-server` dev dependency) and serve the
app against it (the built bundle with `ffc app serve --mock <mock-url>`, or
`ffc app dev --mock <mock-url>` for a dev build), both through Playwright's `webServer` option, so
journeys need no credentials or live services. Mock sign-in works only when the app runs with
`--mock`.

- Use `createMockAuth(<mock-url>).setUser(context.request, user)` from
  `@equinor/fusion-openapi-mock-server` to sign each browser context in
  as a deterministic test user (roles as claims), without restarting the app.
- Override one service operation per test over HTTP (`POST /@fusion-mock/<service>/<operationId>`)
  and reset in `afterEach` (`POST /@fusion-mock/reset`), so a failed test cannot leak state.
- Give each test its own data (for example an in-memory database selected by a per-test cookie or
  header) so journeys can run `fullyParallel`.
- Pick free ports at startup rather than fixed ones, so journeys run beside other local stacks
  and other worktrees.

Sources: `packages/utils/openapi-mock-server/docs/testing-with-playwright.md` and the
`cookbooks/app-react-mock-playwright` example in `equinor/fusion-framework`.

## Screenshots are evidence, not a gate

Pixel comparison (`toHaveScreenshot`) fails on font rendering, operating system, and timing
differences that users never notice, and it hides the actual regression behind an image diff.
Prefer this split instead:

- Capture screenshots of meaningful milestones through one shared helper and store them as
  reviewed evidence (for example `baselines/<spec-name>/<milestone>.png`), attached to the report.
- Have each run report evidence as `added`, `modified`, or `deleted`. Only a run that executes every
  journey can detect unused images.
- Optionally fail a CI run when the report lists changes, so changed evidence is reviewed before it
  lands.
- Inspect changed images for clipping, overlap, missing content, or states that contradict the
  assertions.

## Canonical baselines come only from CI

Screenshots differ between macOS, Windows, and Linux, so host output is never canonical.

- Produce baselines only in a pinned container (Linux Chromium) in CI.
- Run journeys on a pull request on request (for example a `/generate-baseline` comment or label),
  post the new images in a PR comment, and let a collaborator accept them onto the branch with a
  label or comment.
- Regenerate baselines in the release pull request, so released baselines always match the
  released app.
- Never commit locally generated baselines. Discard any baseline changes a local run made.
- Split slow suites into shards or spec groups, one CI job each.

## Working with journeys as a coding agent

- **While iterating:** use Playwright only as a browser driver against the running dev stack to see
  the changed flow, and verify with focused Vitest tests. Do not run journey specs on every change.
- **Final validation:** once the change is complete and it crosses routes, dialogs, persisted state,
  or a primary workflow, run the affected journey spec once and confirm its assertions pass.
- Run a single spec, never the full suite locally, and never rerun to chase screenshot differences.
- Report the spec you ran and its outcome. State whether CI baseline generation was requested; do
  not claim visual approval that did not happen.
