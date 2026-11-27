# Changelog

## 0.1.3 - 2026-11-08

### patch

- [#400](https://github.com/equinor/fusion-skills/pull/400) [`7319423`](https://github.com/equinor/fusion-skills/commit/7319423dde0b6b2dbee0e1e9f28411a2b6b66483) Thanks [@erlendthune](https://github.com/erlendthune)! - Default new database access configurations to Roles V2 autoapproval and explicit approvers. Document safe legacy ACG migration, environment isolation, access-file replacement, and separate approval for provisioning and Entra cleanup.


  refs equinor/fusion-core-tasks#2713

## 0.1.2 - 2026-11-01

### patch

- [#393](https://github.com/equinor/fusion-skills/pull/393) [`51da027`](https://github.com/equinor/fusion-skills/commit/51da0277628440f94532d6901d1bb3f678dc350a) - Load finf setup, provisioning variants and diagnostics only when needed; retain database approval, production targeting and output-derived migration steps in the entrypoint.


  resolves equinor/fusion-core-tasks#2691

## 0.1.1 - 2026-11-01

### patch

- [#372](https://github.com/equinor/fusion-skills/pull/372) [`61c8e4b`](https://github.com/equinor/fusion-skills/commit/61c8e4bba4f71a2cf00e83c73e32e992460e1e69) - Shorten discovery wording while keeping finf database provisioning, SQL migrations, PR databases and pipeline triggers, distinct from application code and role bindings. Keep secret-exposure and unconfirmed-destructive-change exclusions.


  resolves equinor/fusion-core-tasks#2673

## 0.1.0 - 2026-10-13

### minor

- [#255](https://github.com/equinor/fusion-skills/pull/255) [`fe03c5a`](https://github.com/equinor/fusion-skills/commit/fe03c5a24a5a011d5e6550e4f21d4387bae79ea0) Thanks [@alftore](https://github.com/alftore)! - Bring `fusion-infra-cli` in line with the current `finf` source and Fusion docs.


  - State the required `Fusion.Infrastructure.Database.Manage` app role and the built-in API URL default
  - Read the database name from the provisioning output (`sqldb-fapp-<app>-db-<env>`) instead of guessed names
  - PR databases: `-an` without a config file, `pr` as the default environment, longer `--timeout`, cleanup webhook or `database delete`
  - Document `database get` / `database delete`, add a troubleshooting table and `references/pipelines.md` (GitHub Actions, Azure DevOps)
  - `db-config-schema.md`: `provisioningMode` values and database-name override

## 0.0.1 - 2026-07-03

### patch

- [#194](https://github.com/equinor/fusion-skills/pull/194) [`e01e200`](https://github.com/equinor/fusion-skills/commit/e01e2001214e42a3bd1f5153561073a5c70e4f4e) Thanks [@alftore](https://github.com/alftore)! - Add fusion-infra-cli skill for database provisioning


  New skill covering the `finf` CLI tool for provisioning and migrating Fusion
  databases. Primary use case is deploying databases via CI/CD pipelines.

  Includes:
  - SKILL.md with core workflows for provision, migrate, PR databases
  - references/db-config-schema.md with the full provisioning config JSON schema
