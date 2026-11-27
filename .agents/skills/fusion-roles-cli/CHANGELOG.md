# Changelog

## 0.0.5 - 2026-11-21

### patch

- [#465](https://github.com/equinor/fusion-skills/pull/465) [`bc5839a`](https://github.com/equinor/fusion-skills/commit/bc5839a7534118791cfd62fd9bfbf872e2f7ac13) Thanks [@erlendthune](https://github.com/erlendthune)! - Clarify that access-role scope types do not mandate scoped assignments. Show scoped best practice alongside a valid Global alternative.


  refs equinor/fusion-core-tasks#3040

## 0.0.4 - 2026-11-01

### patch

- [#393](https://github.com/equinor/fusion-skills/pull/393) [`51da027`](https://github.com/equinor/fusion-skills/commit/51da0277628440f94532d6901d1bb3f678dc350a) - Load froles setup, config examples and reconciliation catalog only when needed; retain dry-run-first, deletion confirmation and ordered role deployment in the entrypoint.


  resolves equinor/fusion-core-tasks#2691

## 0.0.3 - 2026-11-01

### patch

- [#372](https://github.com/equinor/fusion-skills/pull/372) [`61c8e4b`](https://github.com/equinor/fusion-skills/commit/61c8e4bba4f71a2cf00e83c73e32e992460e1e69) - Shorten discovery wording while keeping froles Roles V2 JSON deployment, bindings, assignments, inspection and export, distinct from database provisioning and application code. Keep Roles V1, group-management and token-exposure exclusions.


  resolves equinor/fusion-core-tasks#2673

## 0.0.2 - 2026-10-13

### patch

- [#255](https://github.com/equinor/fusion-skills/pull/255) [`fe03c5a`](https://github.com/equinor/fusion-skills/commit/fe03c5a24a5a011d5e6550e4f21d4387bae79ea0) Thanks [@alftore](https://github.com/alftore)! - Add `references/concepts.md` explaining the Roles V2 building blocks (system, access role, scope type, role, claimable role, assignment, binding), how access is resolved, global vs scoped access, which API check passes for which assignment, and when to use each.


  Fix `references/role-config-schema.md` to match the published schema: binding roles and assignments require `type` (`Global` with `scope: null`, or `Scoped`), assignments require `reason`, bindings require `version`.

- [#255](https://github.com/equinor/fusion-skills/pull/255) [`fe03c5a`](https://github.com/equinor/fusion-skills/commit/fe03c5a24a5a011d5e6550e4f21d4387bae79ea0) Thanks [@alftore](https://github.com/alftore)! - Add `references/file-layout.md` describing the per-environment app layout (`roles.<env>.json`, `bindings.<env>.json`, `access-assignments.<env>.json`), deploy order, reconcile flags (`--reconcile-bindings`, `--reconcile-assignments`, `--merge-system-owners`), scoped vs global access roles, naming, and gotchas; document reconcile and dry-run safety in `SKILL.md`.

## 0.0.1 - 2026-07-03

### patch

- [#194](https://github.com/equinor/fusion-skills/pull/194) [`e01e200`](https://github.com/equinor/fusion-skills/commit/e01e2001214e42a3bd1f5153561073a5c70e4f4e) Thanks [@alftore](https://github.com/alftore)! - Add fusion-roles-cli skill for role config deployment


  New skill covering the `froles` CLI tool for deploying Fusion Roles V2
  configuration from JSON config files.

  Includes:
  - SKILL.md with core workflows for create, dry-run, export
  - references/role-config-schema.md with the full JSON schema for all resource
    types (scope types, access roles, roles, claimable roles, bindings,
    role assignments, claimable role assignments)
