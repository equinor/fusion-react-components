# froles deployment and reconciliation

## Deployment variants

Dry-run and obtain approval under SKILL.md before using these variants.

```bash
# CI
froles create -e ci --file roles-config.json

# QA
froles create -e fqa --file roles-config.json

# Production
froles create -e fprd --file roles-config.json
```

`create` is **idempotent** — safe to run repeatedly. Resources are matched on natural keys; only changed fields are patched.

## Reconciliation behaviour

The `create` command reconciles each resource type against its natural key:

| Resource | Natural key | Behaviour |
|----------|------------|-----------|
| Scope types | `name` | Create if missing; patch `description` if changed |
| Access roles | `systemIdentifier` + `name` | Create if missing; patch if changed |
| Roles / claimable roles | `name` | Create if missing; patch if changed; access role mappings fully reconciled |
| Bindings | `identifier` | Patch all fields; diff shows role/group additions and removals |
| Role assignments | `roleIdentifier` + `source` + `externalIdentifier` | Create if missing; skip if exists; delete only with `--reconcile-assignments` |

**Important**: Access role mappings on roles/claimable roles are **fully reconciled** — mappings absent from the config are removed. Only access roles belonging to systems declared in the config file are managed. Bindings and assignments are only deleted with `--reconcile-bindings=<system>` / `--reconcile-assignments[=<system>]`.

## Environments

| Key | Purpose |
|-----|---------|
| `ci` | Continuous integration |
| `fqa` | QA / pre-production |
| `fprd` | Production |
| `tr` | Training environment |
