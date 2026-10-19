---
name: fusion-infra-cli
description: 'Provision and migrate Fusion databases (Fusion Database-as-a-Service, Azure SQL) using the fusion-infra-cli (finf). USE FOR: provision a database for a service, run SQL migrations, provision or delete PR-specific ephemeral databases, check database state, wire finf into GitHub Actions or Azure DevOps, troubleshoot provision/migrate failures. DO NOT USE FOR: EF Core or application code changes (use fusion-developer-service), service deployments, role management, or infrastructure other than databases.'
license: MIT
compatibility: >
  Requires finf installed as a .NET global tool from the Fusion-Public NuGet feed (.NET 8+ SDK).
  Requires Azure CLI login (az login), a pipeline Azure login, or an explicit token via -t.
metadata:
  version: "0.1.0"
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

Use when a Fusion service database needs to be provisioned or migrated — locally during development or inside CI/CD pipelines.

Typical triggers:
- "Provision the database for the context service"
- "Run migrations on the QA database"
- "Set up a PR database for this pull request"
- "What does the database provision config look like?"
- "The pipeline is failing on the database provision step"
- "Create a PR database that copies from CI"

## When not to use

- Application code or service changes — use the service repo (EF Core wiring, migrations script, token auth: `fusion-developer-service`)
- Role or permission management — use `fusion-roles-cli`
- Infrastructure other than databases (networking, storage, etc.)
- Kubernetes or container management

## Prerequisites

Install `finf` as a .NET global tool:

```bash
dotnet tool install --global \
  --add-source "https://statoil-proview.pkgs.visualstudio.com/Fusion%20-%20Packages/_packaging/Fusion-Public/nuget/v3/index.json" \
  Fusion.Infra.Cli
```

Update to latest:

```bash
dotnet tool update --global \
  --add-source "https://statoil-proview.pkgs.visualstudio.com/Fusion%20-%20Packages/_packaging/Fusion-Public/nuget/v3/index.json" \
  Fusion.Infra.Cli
```

Auth uses `DefaultAzureCredential` automatically (picks up `az login` session). Pass `-t <token>` to override.

The calling identity (pipeline service principal or user) needs the app role `Fusion.Infrastructure.Database.Manage` on
the **Fusion Infrastructure Support** app; without it provision/migrate fail with 401/403. Request it from Fusion Core.
The infra API URL has a built-in default; `-u` only overrides it.

## Core workflow — provision a database

### 1. Create the provisioning config file

The config file defines the database resource. Minimal example (`db-config.json`):

```json
{
  "name": "my-service",
  "environment": "ci"
}
```

Full config with SQL permissions:

```json
{
  "name": "my-service",
  "environment": "fqa",
  "sqlPermission": {
    "owners": [
      { "clientId": "<app-registration-client-id>" }
    ],
    "contributors": [
      { "clientId": "<app-registration-client-id>" }
    ]
  }
}
```

See [references/db-config-schema.md](references/db-config-schema.md) for the full schema.

### 2. Run provisioning

**CI / non-production:**
```bash
finf database provision -f db-config.json -e ci \
  --sql-owner-client-id <client-id> \
  --sql-contributor-client-id <client-id> \
  -o response.json --verbose
```

**QA:**
```bash
finf database provision -f db-config.json -e fqa \
  --sql-owner-client-id <client-id> \
  --sql-contributor-client-id <client-id> \
  -o response.json --verbose
```

**Production** (add `--production` flag):
```bash
finf database provision -f db-config.json -e fprd \
  --production \
  --sql-owner-client-id <client-id> \
  --sql-contributor-client-id <client-id> \
  -o response.json --verbose
```

**Pull Request** (ephemeral database, copies from CI; `-an` replaces the config file, environment defaults to `pr`):
```bash
finf database provision -an my-service \
  -pr <pr-number> -ghr "equinor/my-repo" -c ci \
  --sql-contributor-client-id <client-id> \
  --timeout 900 -o response.json --verbose
```

`-c ci` copies `sqldb-fapp-my-service-db-ci`, which must exist. Delete PR databases when the PR closes: register the
Fusion PR-closed webhook (request the code from Fusion Core) or run `finf database delete -d <name>` in a PR-closed
workflow.

### 3. Run migrations

Read the database name from the provisioning output instead of guessing it (Fusion app databases are named
`sqldb-fapp-<app>-db-<env>`, PR databases `...-db-pr-<n>`):

```bash
NAME=$(jq -er '.database.name' response.json)

# Non-production
finf database migrate -d "$NAME" -m migrations/migration.sql -o migrations.json --verbose

# Production (--production on migrate too, or the database is not found)
finf database migrate -d "$NAME" -m migrations/migration.sql --production -o migrations.json --verbose
```

The `-m` flag accepts a directory of `.sql` files or a single `.sql` file. For EF Core, generate one idempotent script
in the build (`dotnet ef migrations script --idempotent`) and migrate before deploying the app.

### Other commands

- `finf database get -d <name> [--production]`: database details (server, users, roles).
- `finf database delete -d <name>`: delete a non-production database (the command has no production target).

Pipeline examples (GitHub Actions, Azure DevOps): [references/pipelines.md](references/pipelines.md).

## Environments

| Key | Purpose |
|-----|---------|
| `ci` | Continuous integration |
| `fqa` | QA / pre-production |
| `fprd` | Production (requires `--production` flag) |
| `pr` | Pull request ephemeral (default when `-pr` is given; requires `-ghr`) |

Environment names are free text used in the database name; Fusion apps use `ci`, `fqa`, `fprd` (many app teams only
`ci` and `fprd`).

## Troubleshooting

| Symptom | Cause / fix |
| --- | --- |
| 401/403 from the infra API | Identity lacks `Fusion.Infrastructure.Database.Manage`; check the pipeline login identity |
| Timeout waiting for operation | Default wait is 300 s; PR copies often need `--timeout 900` |
| `-c ci` fails to find a database | The source environment database has not been provisioned yet |
| Migrate fails with an HTTP error only | The response does not include the failing SQL; run the script locally against SQL Server first |
| Database not found on migrate/get | `--production` missing for production, or wrong name; use the name from the provision output |
| Principal cannot be resolved | Client id typo, or the CLI identity lacks Graph read; `--ignore-resolve-errors` only to continue deliberately |

## Full reference

For complete flag reference, run:
```bash
finf database provision --help
finf database migrate --help
```

Or see the source documentation:
- Fusion docs: `https://docs.fusion.equinor.com/docs/developer/api/database` and `developer/cli-tools/fusion-infra-cli`
- [README.md](https://github.com/equinor/fusion-core-services/blob/main/tooling/fusion-infra-cli/Fusion.Infra.Cli/README.md)
- [Source: tooling/fusion-infra-cli](https://github.com/equinor/fusion-core-services/tree/main/tooling/fusion-infra-cli)

## Safety

- Always use `--verbose` in pipelines to get diagnostic output
- Always save output with `-o response.json` so pipeline steps can reference the result
- The `--production` flag is an explicit guard — never omit it for `fprd` provisioning
- Never pass raw tokens in pipeline YAML — use secret variables and pass via `-t`
- `database delete` is irreversible — confirm with user before running (only non-production databases can be deleted)
- Do not run provision/migrate against shared environments (`ci`, `fqa`, `fprd`) without explicit user approval
