---
name: fusion-infra-cli
description: 'Provisions Fusion SQL databases with finf. USE FOR: new Roles V2 database access configs, migrating legacy ACG configs, SQL migrations, PR databases and provisioning pipelines. DO NOT USE FOR: EF Core/app code (use fusion-developer-service), general role administration (use fusion-roles-cli), service deployment or non-database infrastructure.'
license: MIT
compatibility: >
  Requires finf installed as a .NET global tool from the Fusion-Public NuGet feed (.NET 8+ SDK).
  Requires Azure CLI login (az login), a pipeline Azure login, or an explicit token via -t.
metadata:
  version: "0.1.3"
  status: active
  owner: "@equinor/fusion-core"
  tags:
    - fusion
    - infra
    - database
    - cli
    - provisioning
    - migrations
    - devops
---

# Fusion Infra CLI

## When to use

Provision or migrate Fusion service databases locally or in CI/CD pipelines.

Typical triggers:
- "Provision the database for the context service"
- "Run migrations on the QA database"
- "Set up a PR database for this pull request"
- "What does the database provision config look like?"
- "The pipeline is failing on the database provision step"
- "Create a PR database that copies from CI"
- "Migrate this database config from ACG to Roles V2"

## When not to use

- Application code or service changes — use service repo (EF Core wiring, migrations script, token auth: `fusion-developer-service`)
- General role administration — use `fusion-roles-cli`; database access policies belong here
- Non-database infrastructure, Kubernetes or container management

## Required inputs

App name/config, target environment, SQL owner/contributor principals and migration path.
For access policies: owner-approved autoapproval users/group object IDs and explicit approver users per environment. Legacy ACG names are not group IDs; never infer or expand permissions from them.
For PR databases: PR number, GitHub repository and copy-source database only when copying.
Environment names are free text used in database names; Fusion apps use `ci`, `fqa`, `fprd`, `pr`.

## Safety

- Do not run provision/migrate against shared environments (`ci`, `fqa`, `fprd`) without explicit user approval. Confirm PR provisioning/cleanup writes too.
- `database delete` is irreversible; confirm before running. Only non-production databases can be deleted.
- `--production` is an explicit guard: never omit for `fprd` provisioning; production migrate/get need it too.
- Always use `--verbose` in pipelines and save output with `-o response.json` for downstream steps. Sanitize diagnostics before sharing.
- Never print or persist tokens. Never pass raw tokens in pipeline YAML; use secret variables via `-t`, without echoing/logging them.
- If a write fails or its outcome is uncertain, inspect database state before retry; do not assume failure means nothing changed.
- Config edits do not authorize provisioning or Entra cleanup. Preserve SQL permissions; require approval before applying suggested policies or removing legacy roles, assignments or tags.

## Prerequisites

Confirm `finf` installed/current. When absent/outdated, read `references/setup.md` for exact .NET global-tool install/update commands.
Auth uses `DefaultAzureCredential` (`az login` session); `-t <token>` overrides it.
Calling identity needs `Fusion.Infrastructure.Database.Manage` on **Fusion Infrastructure Support**; request from Fusion Core if missing. Without it provision/migrate fail with 401/403.
Infra API URL has built-in default; `-u` overrides it.

## Core workflow — provision a database

### 1. Create the provisioning config file

New access configurations use Roles V2, not legacy ACG names. Read `references/db-config-schema.md` before authoring; confirm compatible CLI, InfraSupport and SQL-access workflow versions and required caller permissions.

Config shape (`db-config.json`; replace example identities with approved values before use):

```json
{
  "name": "my-service",
  "environment": "ci",
  "accessControl": {
    "autoApproval": {
      "groups": [{ "id": "00000000-0000-0000-0000-000000000020", "name": "Example developers" }]
    },
    "approvers": {
      "users": [{ "accountIdentifier": "approver@example.com" }]
    }
  }
}
```

Users use `accountIdentifier`; groups require object `id`; approvers are explicit users only. These policies approve temporary access requests, never grant SQL access directly.

For legacy `administratorGroupName` / `developerGroupName` migration, read `references/roles-v2-migration.md` before editing. Inspect assignments read-only, propose an environment-specific policy, and stop for approval when identities or intent are unresolved. Do not copy sample identities.

For external policies, use `--access-file` with top-level `autoApproval` and `approvers`, without `accessControl`. It replaces both sections, not merges; omitted sections clear and `{}` clears both. Preserve legacy names only for a deliberate compatibility period.

### 2. Run provisioning

CI / non-production:

```bash
finf database provision -f db-config.json -e ci \
  --sql-owner-client-id <client-id> \
  --sql-contributor-client-id <client-id> \
  -o response.json --verbose
```

When provisioning QA, production, PR databases or file-based SQL permissions, read `references/provisioning-recipes.md` for exact variants.
For PRs, `-an` replaces config; environment defaults to `pr` with `-pr`, requiring `-ghr`. `-c ci` copies `sqldb-fapp-my-service-db-ci`, which must exist.
Delete PR databases when PR closes: register Fusion PR-closed webhook (request code from Fusion Core) or use approved `finf database delete -d <name>` in PR-closed workflow.

### 3. Run migrations

Read name from provisioning output; never guess. App databases use `sqldb-fapp-<app>-db-<env>`, PR databases `...-db-pr-<n>`.

```bash
NAME=$(jq -er '.database.name' response.json)

# Non-production
finf database migrate -d "$NAME" -m migrations/migration.sql -o migrations.json --verbose

# Production (--production on migrate too, or the database is not found)
finf database migrate -d "$NAME" -m migrations/migration.sql --production -o migrations.json --verbose
```

`-m` accepts directory of `.sql` files or one `.sql` file. For EF Core, generate idempotent build script (`dotnet ef migrations script --idempotent`); migrate before app deployment.

### Other commands

- `finf database get -d <name> [--production]`: details (server, users, roles); inspect before retry.
- `finf database delete -d <name>`: approved non-production deletion only.

When adding GitHub Actions/Azure DevOps steps, read `references/pipelines.md` for identity and pipeline examples.
On failure or unfamiliar flags, read `references/troubleshooting.md` for diagnosis, help commands and source docs.

## Expected output

Config changes or provisioning/migration results, database name/state, target environment, approved identities, commands and observed outcome. Report missing policy decisions, approval blockers, failures or unknown state; never imply an unrun operation succeeded.

## Repository-policy handoff

Follow target repository instructions for work tracking, validation, commits, changesets and pull requests. This skill does not authorize publication or override repository confirmation gates.
