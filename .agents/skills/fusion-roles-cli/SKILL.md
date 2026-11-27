---
name: fusion-roles-cli
description: 'Manages Fusion Roles V2 config with froles. USE FOR: JSON role deployment, bindings, assignments, dry-run, assignment inspection and state export. DO NOT USE FOR: databases (use fusion-infra-cli), app code, Azure AD groups outside bindings, Roles V1 or exposed tokens.'
license: MIT
compatibility: >
  Requires froles installed as a .NET global tool from the Fusion-Public NuGet feed.
  Requires Azure CLI login (az login) or explicit token via -t flag.
metadata:
  version: "0.0.5"
  status: active
  owner: "@equinor/fusion-core"
  tags:
    - fusion
    - roles
    - cli
    - rbac
    - role-config
    - devops
---

# Fusion Roles CLI

## When to use

Create/update Fusion Roles V2 roles, bindings, assignments and scope types from JSON; inspect/export existing state.

Typical triggers:
- "Deploy the roles config for my service"
- "Create roles from this JSON file"
- "Export the current role config for fusion-myservice"
- "What does a roles config file look like?"
- "Add a binding for this Entra group"
- "Check what roles are assigned to this account"
- "Dry-run the role deployment"

## When not to use

- Database provisioning — use `fusion-infra-cli`
- Managing Azure AD groups themselves — use Azure portal or Graph API
- Roles V1 (legacy system); application code changes

## Required inputs

Config file, system identifier, target environment (`ci`, `fqa`, `fprd`, `tr`), resources/scopes to manage and reconciliation intent. Confirm files are complete for any deletion reconciliation.

## Safety

- Always dry-run before deploying, including production. Review mapping removals and binding diffs; confirm deployment writes with user.
- Access role mappings on roles/claimable roles are **fully reconciled**: mappings absent from config are removed. Only access roles belonging to systems declared in config are managed.
- Bindings/assignments are only deleted with `--reconcile-bindings=<system>` / `--reconcile-assignments[=<system>]`. `--reconcile-bindings` / `--reconcile-assignments` delete missing entries: use complete files only, dry-run first, confirm with user.
- `delete role-assignments` is destructive: confirm with user and dry-run first.
- `--dry-run` reads current server state (GET), needs target access and sends no create/update/delete requests. It cannot catch API validation errors; apply to `ci` before `fprd`.
- Never store tokens in config or print/persist tokens. Use `-t <token>` from secret variables in pipelines without echoing/logging values.
- Failed/uncertain writes: inspect current server state and fresh dry-run before retry. Idempotency is not proof nothing changed.

## Prerequisites

Confirm `froles` installed/current. When absent/outdated or tool help needed, read `references/setup.md` for install/update commands and source docs.
Auth uses `DefaultAzureCredential` (`az login` session); pass `-t <token>` to override.

## Core workflow — deploy a role config

### 1. Create the config file

Always include `$schema` for editor validation/autocompletion.
When starting config, read `references/config-examples.md` for minimal example. When authoring/validating resource fields, read `references/role-config-schema.md` for full live authoritative schema and definitions.

New to Roles V2 or modeling scoped access? Read `references/concepts.md` for system/resource concepts and global/scoped checks before choosing assignments.
For app config layout or reconciliation flags, read `references/file-layout.md` for per-environment owners, binding reasons, naming, scope separation and complete-file rules.
Split app config by environment/concern (`roles.<env>.json`, `bindings.<env>.json`, `access-assignments.<env>.json`); apply in that order.

### 2. Dry-run to verify changes

```bash
froles create -e ci --file roles-config.json --dry-run
```

Review created/patched/unchanged resources and binding diffs before approved deployment.

### 3. Deploy

Apply to `ci` before `fprd`. When choosing CI/QA/production command variants or inspecting natural-key reconciliation/drift, read `references/command-reference.md` for exact commands and resource matching.
`create` is **idempotent**: resources matched on natural keys, changed fields patched. Safety gates still apply on repeat runs.

### 4. Export current state (optional)

For onboarding/audit:

```bash
froles export my-service -e ci -o current-state.json
```

Modify export and feed back into `create` through dry-run/deployment gates.

## Expected output

Config and reviewed dry-run diffs, approved deployment outcome, optional exported state, target system/environment and inspected assignments. Report failures, unrun steps and uncertain state explicitly.
