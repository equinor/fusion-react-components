# Recommended file layout for an app's Roles V2 config

Pattern from Fusion app repos (`infra/roles/`), shown for an invented Work Orders app (`work-orders`). Keep the config as code, one concern per
file, one file set per Roles V2 environment.

## Contents

- Files
- What goes where
- Deploy order and CI
- Reconcile flags
- Scoped vs global access roles
- Naming
- Gotchas

## Files

```text
infra/roles/
  roles.ci.json                # system + owners, access roles, roles, claimable roles (ci)
  roles.prod.json              # same for fprd
  bindings.ci.json             # Entra group / OrgChart bindings that auto-create assignments (ci)
  bindings.prod.json
  access-assignments.ci.json   # explicit one-off assignments (ci)
  access-assignments.prod.json
  README.md                    # model, groups, access-role → endpoint map, how to apply
```

Every file starts with `"$schema": "https://rolesv2.api.fusion.equinor.com/public/schemas/role-config.schema.json"`.

Why split: definitions change rarely and are reviewed carefully; bindings follow organisation changes; one-off
assignments must never leak from ci to prod. Separate files let each environment diverge without touching the other and
let CI apply them with different reconcile flags.

## What goes where

| File | Sections | Notes |
| --- | --- | --- |
| `roles.<env>.json` | `systems`, `accessRoles`, `roles`, `claimableRoles` | `systems[].owners`: team leads plus **only that environment's** pipeline identity. Never make the ci pipeline an owner in fprd |
| `bindings.<env>.json` | `bindings` | `EntraGroup` bindings (group id + roles). Every binding sets `reason` (the API rejects empty reasons although the schema allows null) |
| `access-assignments.<env>.json` | `roleAssignments`, `claimableRoleAssignments` | Exceptional, time-boxed grants (`validTo`), e.g. ci testers. Prefer bindings for steady access |

Pattern for admin access: a normal role bound to the dev team group, plus a claimable role with the same access roles so
others can claim admin temporarily without joining the group.

## Deploy order and CI

1. `roles.<env>.json` (creates the system first, so access roles can reference it in the same run)
2. `bindings.<env>.json`
3. `access-assignments.<env>.json`

```bash
froles create -e ci -f infra/roles/roles.ci.json --dry-run
froles create -e ci -f infra/roles/roles.ci.json
froles create -e ci -f infra/roles/bindings.ci.json --reconcile-bindings=<system> --dry-run   # review deletions first
froles create -e ci -f infra/roles/bindings.ci.json --reconcile-bindings=<system>
froles create -e ci -f infra/roles/access-assignments.ci.json
```

In CI (deploy-infra workflow) apply the ci files to `ci` and the prod files to `fprd` (behind the production GitHub
environment), authenticating as the environment's pipeline identity via OIDC. Apply to `ci` first.

## Reconcile flags

`froles create` creates and patches; by default it never deletes.

| Flag | Effect |
| --- | --- |
| (none) | Assignments append-only; bindings patched; access-role mappings on roles fully reconciled |
| `--reconcile-bindings=<system>` | Bindings of that system not in the file are deleted (file with no bindings deletes all) |
| `--reconcile-assignments` | For roles named in the file, assignments not in the file are deleted |
| `--reconcile-assignments=<system>` | All direct and claimable assignments of roles owned by the system must be in the file; omitted/empty arrays clear them |
| `--merge-system-owners` | Keep existing owners and add the configured ones |

Use reconcile flags only on files that are the complete source of truth, always with `--dry-run` first. Access roles,
roles, and claimable roles are never deleted by the CLI; remove them in Fusion Core Admin.

## Scoped vs global access roles

- An access role is global or tied to one scope type (`project`, `contract`, ...); the scope is set on the assignment
  (`"type": "Global", "scope": null` or `"type": "Scoped"` with `scopeTypeIdentifier` + `value`, or `isGlobal: true`
  for every value).
- Assigning a role with a scope applies it to **every** access role in that role: keep global and scoped access roles in
  separate roles and separate binding entries.
- Frontend role helpers typically only count global assignments; scoped access needs its own frontend check.
- API side: `HaveScopedActiveAccessRole(role, scopeType, value)` passes for a `Scoped` assignment with `isGlobal: true`
  or a matching value; a `Global` assignment does not pass. See `concepts.md`.

## Naming

- Access roles: PascalCase with dots, `<App>.<Capability>` (`WorkOrders.Read`); mirror them in an API constants class.
- Roles and claimable roles: kebab-case (`work-orders-admin`, `work-orders-admin-claim`); the API never checks
  role names, so renaming them has no code impact.
- Keep the user-facing description of the base read access role useful: it is shown to users who lack access.

## Gotchas

- `--dry-run` only reads existing state from the server and skips all writes, so it cannot catch schema or API
  validation errors; apply to ci first.
- A stale local `froles` can silently skip sections (for example `systems`); run `froles --update`.
- Re-applying should print "Already exists (no changes)"; anything else is drift worth reading.
- Record manual steps (system creation approval, pipeline identity ownership) in `docs/manual-solution-setup.md`.
