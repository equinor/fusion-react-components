# Database Provisioning Config Schema

Config file for `finf database provision -f <file>`. All fields are optional unless noted.

> **Source of truth**: [`ProvisionDatabaseCommand.cs`](https://github.com/equinor/fusion-core-services/blob/main/tooling/fusion-infra-cli/Fusion.Infra.Cli/Commands/Database/ProvisionDatabaseCommand.cs) and the [infra-cli README](https://github.com/equinor/fusion-core-services/blob/main/tooling/fusion-infra-cli/Fusion.Infra.Cli/README.md). If this file conflicts with the source, the source wins.

## Contents

- Root object
- `pullRequest` object
- `sqlPermission` object
- `accessControl` object
- `configuration` object
- Minimal working example
- Full example with permissions in file

## Root object

Schematic overview; use the complete examples below for JSON files.

```text
{
  "name": "string",
  "environment": "ci | fqa | fprd | pr",
  "pullRequest": { ... },
  "sqlPermission": { ... },
  "accessControl": { ... },
  "configuration": { ... },
  "metadata": { "key": "string" },
  "annotations": { "key": "string" }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | App name; used to derive DB name. Can be overridden with `-an`. |
| `environment` | string | Target environment. Can be overridden with `-e`. |
| `pullRequest` | object | PR-specific config. Can be supplied via CLI flags instead. |
| `sqlPermission` | object | SQL owner/contributor definitions. Can be supplied via CLI flags instead. |
| `accessControl` | object | Roles V2 autoapproval and explicit approvers; legacy ACG names only for compatibility. |
| `configuration` | object | Advanced database name/provisioning mode config. |
| `metadata` | object | Custom key-value metadata. |
| `annotations` | object | Custom key-value annotations (merged with auto-detected pipeline annotations). |

---

## `pullRequest` object

```json
{
  "pullRequest": {
    "pullRequestNumber": "123",
    "gitHubRepository": "equinor/my-repo",
    "copyFromEnvironment": "ci"
  }
}
```

All three fields can alternatively be passed as CLI flags: `-pr`, `-ghr`, `-c`.

---

## `sqlPermission` object

```json
{
  "sqlPermission": {
    "owners": [
      {
        "objectId": "guid (optional)",
        "clientId": "guid (optional)",
        "displayName": "string (optional)"
      }
    ],
    "contributors": [
      {
        "objectId": "guid (optional)",
        "clientId": "guid (optional)",
        "displayName": "string (optional)"
      }
    ]
  }
}
```

- **owners**: Full SQL control (db_owner)
- **contributors**: Read/write access (db_datareader + db_datawriter)
- Each entry uses exactly one of `objectId` (Entra object ID), `clientId` (app registration client ID), or `displayName`.
- Can also be set via `--sql-owner-client-id`, `--sql-contributor-client-id`, etc. CLI flags

---

## `accessControl` object

Default for new configurations:

```json
{
  "accessControl": {
    "autoApproval": {
      "users": [{ "accountIdentifier": "developer@example.com" }],
      "groups": [{ "id": "00000000-0000-0000-0000-000000000020", "name": "Example developers" }]
    },
    "approvers": {
      "users": [{ "accountIdentifier": "approver@example.com" }]
    }
  }
}
```

Replace all example identities with owner-approved values. Users accept UPN/email or nonempty Entra user object ID through `accountIdentifier`; the API resolves them through People. Groups require `id`; optional `name` is descriptive, not an identifier. Approvers cannot be groups.

Autoapproval users/group members receive automatic approval when requesting temporary reader or owner access; they must still request it. Approvers' own requests are also autoapproved. There are no separate reader/owner lists, and policy membership neither grants SQL access directly nor makes a user an approver.

`--access-file access-ci.json` accepts an object with `autoApproval` and `approvers` at its root, without `accessControl`. It replaces both embedded sections and preserves legacy group names. Lists never merge; omitted sections clear and `{}` explicitly clears both. Invalid files fail before provisioning.

Reprovisioning reconciles only provisioner-owned Roles V2 records. Direct assignments expire after one year and renew in place; group bindings have no individual expiry. SQL permissions and temporary grants remain unchanged.

CI policy applies to its exact database; PR policy uses an independent shared PR family. PR provisioning needs no CI database unless copying with `copyFromEnvironment` / `-c`. Production is independent; FQA/test require their own embedded policy or explicit access file. Never assume CI policy propagates.

### Legacy compatibility

`administratorGroupName` and `developerGroupName` are optional when a policy section is configured. If either legacy name is supplied, both are required. These `acg-*` values refer to legacy Fusion Developer Tools Entra app roles, not security-group object IDs. Do not recreate them for new policies or guess mappings. The unreleased `requestors` property was renamed to `autoApproval` and is rejected, not an alias.

---

## `configuration` object

```json
{
  "configuration": {
    "databaseFullyQualifiedName": "sql-myservice-[environment]",
    "provisioningMode": "string"
  }
}
```

The `[environment]` placeholder in `databaseFullyQualifiedName` is substituted with the resolved environment name
(`<env>-<pr>` for PR databases). `provisioningMode` is `fapp` (app databases, named `sqldb-fapp-<name>-db-<env>`)
or `fcore` (Fusion core services). Overriding the database name requires an extra role on the infra API; app teams
normally leave `configuration` out. CLI equivalents: `-d <database-name>` and, for access groups, `-agn` / `-dgn`.

---

## Minimal working example

```json
{
  "name": "my-service",
  "environment": "ci"
}
```

Permission principals are then supplied via CLI flags:
```bash
finf database provision -f db-config.json \
  --sql-owner-client-id <app-client-id> \
  --sql-contributor-client-id <app-client-id> \
  -o response.json --verbose
```

---

## Full example with permissions in file

```json
{
  "name": "context",
  "environment": "fqa",
  "sqlPermission": {
    "owners": [
      { "clientId": "<app-registration-client-id>" }
    ],
    "contributors": [
      { "clientId": "<app-registration-client-id>" }
    ]
  },
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
