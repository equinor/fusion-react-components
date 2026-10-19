# Changelog

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
