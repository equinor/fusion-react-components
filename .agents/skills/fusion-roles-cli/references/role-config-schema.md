# Role Config Schema

Config file for `froles create --file <path>`. All sections are optional — include only what you need to manage.

> **Canonical schema**: [`https://rolesv2.api.fusion.equinor.com/public/schemas/role-config.schema.json`](https://rolesv2.api.fusion.equinor.com/public/schemas/role-config.schema.json) — this is the live, authoritative schema. See also [USING_CREATE_COMMAND.md](https://github.com/equinor/fusion-core-services/blob/main/tooling/fusion-roles-cli/Fusion.Roles.Cli/USING_CREATE_COMMAND.md) and [sample-create-file.json](https://github.com/equinor/fusion-core-services/blob/main/tooling/fusion-roles-cli/Fusion.Roles.Cli/sample-create-file.json).

**Always add the `$schema` reference** for editor validation and autocompletion:

```json
{
  "$schema": "https://rolesv2.api.fusion.equinor.com/public/schemas/role-config.schema.json"
}
```

---

## Contents

- Root object
- ScopeType
- AccessRole
- Role
- ClaimableRole
- Binding
- RoleAssignment
- ClaimableRoleAssignment
- DeleteRoleAssignmentRequest
- Complete example

## Root object

```json
{
  "$schema": "string (recommended)",
  "scopeTypes": [ ScopeType ],
  "accessRoles": [ AccessRole ],
  "roles": [ Role ],
  "claimableRoles": [ ClaimableRole ],
  "bindings": [ Binding ],
  "roleAssignments": [ RoleAssignment ],
  "claimableRoleAssignments": [ ClaimableRoleAssignment ],
  "deleteRoleAssignments": [ DeleteRoleAssignmentRequest ]
}
```

All arrays are optional. Omit sections you don't manage.

---

## ScopeType

Defines a scope dimension used to constrain roles (e.g. `project`, `contract`).

```json
{
  "name": "string (required — unique key)",
  "description": "string (optional)"
}
```

**Example:**
```json
{ "name": "project", "description": "Project scope" }
```

---

## AccessRole

An API permission owned by a system. Access roles are the leaf permissions that roles aggregate.

```json
{
  "systemIdentifier": "string (required — owning system identifier)",
  "name": "string (required — unique within system)",
  "description": "string (optional)",
  "scopeTypeIdentifier": "string (optional — links to a scope type)"
}
```

**Unique key**: `systemIdentifier` + `name`

**Example:**
```json
{
  "systemIdentifier": "my-service",
  "name": "MyService.Project.Write",
  "description": "Write access to project resources",
  "scopeTypeIdentifier": "project"
}
```

---

## Role

A named role that groups access roles. Users are assigned roles, not access roles directly.

```json
{
  "name": "string (required — unique key)",
  "displayName": "string (optional)",
  "description": "string (optional)",
  "accessRoleMappings": [
    {
      "accessRoleIdentifier": "string (access role name — required)",
      "reason": "string (optional — explains why this mapping exists)"
    }
  ]
}
```

**Warning**: `accessRoleMappings` is **fully reconciled** — mappings absent from the config are removed. Only access roles from systems declared in the config file are managed.

**Example:**
```json
{
  "name": "project-editor",
  "displayName": "Project Editor",
  "description": "Can edit project resources",
  "accessRoleMappings": [
    {
      "accessRoleIdentifier": "MyService.Project.Write",
      "reason": "Editors need write access"
    }
  ]
}
```

---

## ClaimableRole

Same structure as `Role`. Users can self-service claim these roles.

```json
{
  "name": "string (required — unique key)",
  "displayName": "string (optional)",
  "description": "string (optional)",
  "accessRoleMappings": [ ... ]
}
```

---

## Binding

Links an Entra (Azure AD) group to roles or claimable roles, optionally scoped.

```json
{
  "identifier": "string (required — unique key)",
  "system": "string (required — owning system identifier)",
  "description": "string (optional)",
  "reason": "string (set it: the API rejects empty reasons although the schema allows null)",
  "type": "string (e.g. 'EntraGroup')",
  "sourceSystem": "string (e.g. 'Entra')",
  "version": "string (required — e.g. '1.0.0')",
  "binding": {
    "version": "string (optional)",
    "group": {
      "id": "GUID (Entra group object ID)",
      "name": "string (optional — display name only)"
    },
    "roles": [
      {
        "name": "string (role name)",
        "type": "'Global' | 'Scoped' (required)",
        "scope": {
          "scopeTypeIdentifier": "string (required)",
          "isGlobal": "boolean (optional — true = every value of the scope type)",
          "value": "string (required unless isGlobal)"
        }
      }
    ],
    "claimableRoles": [
      {
        "name": "string (claimable role name)",
        "type": "'Global' | 'Scoped' (required)",
        "scope": { ... }
      }
    ]
  }
}
```

**Note**: `scope` must be `null` when `type` is `Global` and is required when `type` is `Scoped`. The binding diff in
dry-run output shows exactly which roles/groups are added or removed.

An access role's `scopeTypeIdentifier` describes the resource dimension the application can check; it does not require
direct assignments or binding entries for roles and claimable roles to be `Scoped`. Both support `Global`, which creates
unscoped assignments. `Scoped` attaches a scope type and value, or all values when `isGlobal` is `true`. Choose the
assignment type to match the application's authorization policy: a scope-agnostic check may accept a `Global`
assignment, while a scoped check requires `Scoped`. This is guidance, not a CLI rule that prevents global assignments
to scoped access roles.

**Example — global role binding:**
This example assumes `service-admin` maps to access roles the application grants without a resource scope.

```json
{
  "identifier": "admins-global-binding",
  "version": "1.0.0",
  "reason": "Service admins need global access",
  "system": "my-service",
  "type": "EntraGroup",
  "sourceSystem": "Entra",
  "binding": {
    "group": { "id": "04a439f6-cfc2-430b-8345-77d5a0151ef7" },
    "roles": [
      {
        "name": "service-admin",
        "type": "Global",
        "scope": null
      }
    ]
  }
}
```

When the application requires a project-scoped check and should grant access to every project, the recommended binding
uses `"type": "Scoped"` with `"scope": { "scopeTypeIdentifier": "project", "isGlobal": true }`. A `Global` assignment
is also supported, but it has no scope and does not pass scoped checks (see [concepts.md](concepts.md)).

**Example — scoped role binding:**
```json
{
  "identifier": "project-alpha-editors",
  "version": "1.0.0",
  "reason": "Project alpha editors need write access",
  "system": "my-service",
  "type": "EntraGroup",
  "sourceSystem": "Entra",
  "binding": {
    "group": { "id": "04a439f6-cfc2-430b-8345-77d5a0151ef7" },
    "roles": [
      {
        "name": "project-editor",
        "type": "Scoped",
        "scope": {
          "scopeTypeIdentifier": "project",
          "isGlobal": false,
          "value": "project-alpha"
        }
      }
    ]
  }
}
```

---

## RoleAssignment

A direct role assignment for a specific identity.

```json
{
  "roleIdentifier": "string (required — role name)",
  "accountIdentifier": "string (optional — email or UPN)",
  "source": "string (e.g. 'Entra')",
  "externalIdentifier": "string (object ID from source system)",
  "reason": "string (required)",
  "type": "'Global' | 'Scoped' (required)",
  "scope": {
    "scopeTypeIdentifier": "string (optional)",
    "isGlobal": "boolean (optional)",
    "value": "string (scope value; null when isGlobal=true)"
  },
  "validFrom": "ISO 8601 datetime (optional)",
  "validTo": "ISO 8601 datetime (optional)",
  "tags": [ "string" ]
}
```

**Unique key**: `roleIdentifier` + `source` + `externalIdentifier`
**Behaviour**: Create if missing; skip if exists. No partial updates.

**Example:**
```json
{
  "roleIdentifier": "project-editor",
  "accountIdentifier": "user@equinor.com",
  "source": "Entra",
  "externalIdentifier": "12345678-1234-1234-1234-123456789012",
  "reason": "Project alpha editor",
  "type": "Scoped",
  "scope": {
    "scopeTypeIdentifier": "project",
    "isGlobal": false,
    "value": "project-alpha"
  }
}
```

---

## ClaimableRoleAssignment

Same structure as `RoleAssignment` but uses `claimableRoleIdentifier`:

```json
{
  "claimableRoleIdentifier": "string (required — claimable role name)",
  "accountIdentifier": "string (optional)",
  "source": "string",
  "externalIdentifier": "string",
  "reason": "string (required)",
  "type": "'Global' | 'Scoped' (required)",
  "scope": { ... },
  "validFrom": "ISO 8601 datetime (optional)",
  "validTo": "ISO 8601 datetime (optional)",
  "tags": [ "string" ]
}
```

---

## DeleteRoleAssignmentRequest

Used in `deleteRoleAssignments` to remove specific assignments by ID (ID obtained from export):

```json
{
  "roleIdentifier": "string (required — role name)",
  "assignmentId": "string (required — assignment ID from API)"
}
```

---

## Complete example

```json
{
  "$schema": "https://rolesv2.api.fusion.equinor.com/public/schemas/role-config.schema.json",
  "scopeTypes": [
    { "name": "project", "description": "Project scope" }
  ],
  "accessRoles": [
    {
      "systemIdentifier": "my-service",
      "name": "MyService.Project.Read",
      "description": "Read project resources",
      "scopeTypeIdentifier": "project"
    },
    {
      "systemIdentifier": "my-service",
      "name": "MyService.Project.Write",
      "description": "Write project resources",
      "scopeTypeIdentifier": "project"
    }
  ],
  "roles": [
    {
      "name": "project-viewer",
      "displayName": "Project Viewer",
      "accessRoleMappings": [
        { "accessRoleIdentifier": "MyService.Project.Read" }
      ]
    },
    {
      "name": "project-editor",
      "displayName": "Project Editor",
      "accessRoleMappings": [
        { "accessRoleIdentifier": "MyService.Project.Read" },
        { "accessRoleIdentifier": "MyService.Project.Write" }
      ]
    }
  ],
  "bindings": [
    {
      "identifier": "editors-entra-binding",
      "version": "1.0.0",
      "reason": "Editors need write access",
      "system": "my-service",
      "type": "EntraGroup",
      "sourceSystem": "Entra",
      "binding": {
        "group": { "id": "04a439f6-cfc2-430b-8345-77d5a0151ef7" },
        "roles": [
          {
            "name": "project-editor",
            "type": "Scoped",
            "scope": {
              "scopeTypeIdentifier": "project",
              "isGlobal": true
            }
          }
        ]
      }
    }
  ]
}
```

The complete example uses a scoped assignment because its access roles declare the `project` scope type. This is the
recommended pattern when the application enforces project-scoped checks, not a requirement imposed by the schema or
CLI. The same role can instead be bound globally when the application intentionally treats role presence as sufficient:

```json
{
  "name": "project-editor",
  "type": "Global",
  "scope": null
}
```

That alternative creates unscoped access-role assignments and does not pass scoped checks. The application decides which
assignment type is appropriate for its authorization policy.
