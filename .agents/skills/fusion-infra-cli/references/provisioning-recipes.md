# Provisioning recipes

Read only for SQL permissions, QA/production or PR provisioning. SKILL.md approval and token gates apply before these commands.

## Config with SQL permissions

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

## Provisioning variants

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

## Environments

| Key | Purpose |
|-----|---------|
| `ci` | Continuous integration |
| `fqa` | QA / pre-production |
| `fprd` | Production (requires `--production` flag) |
| `pr` | Pull request ephemeral (default when `-pr` is given; requires `-ghr`) |

Environment names are free text used in the database name; Fusion apps use `ci`, `fqa`, `fprd` (many app teams only
`ci` and `fprd`).
