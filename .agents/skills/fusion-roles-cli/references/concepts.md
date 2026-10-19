# Roles V2 concepts

What each Roles V2 resource is, how they relate, and when to use global or scoped access. Sources: Fusion docs
`developer/core-services/role-service/key-concepts` and `how-to-guides/scoped-access`, and the RolesV2 service model
(`src/Fusion.Services.RolesV2/Database/Entities` in fusion-core-services).

## Contents

- Building blocks
- How access is resolved
- Global vs scoped
- When to use what

## Building blocks

| Resource | What it is | Audience |
| --- | --- | --- |
| **System** | Your application's namespace in Roles V2 (`work-orders`). It owns access roles and has owners who manage them. Fusion creates it on request; the creator becomes owner. | Backend |
| **Access role** | A named check the backend evaluates (`WorkOrders.Write`). It belongs to exactly one system and optionally one scope type. Users do not see it. | Backend |
| **Scope type** | A kind of resource that access can be limited to (`project`, `contract`, `facility`). Shared across all systems; reuse an existing one (`GET /scope-types`) before asking Fusion for a new one. | Backend |
| **Role** | A user-facing group of access roles (`work-orders-editor`). Usually belongs to a system, but can map access roles from several systems. | Users |
| **Claimable role** | Like a role, but the user must activate it in the Fusion portal for a limited time before it takes effect. | Users |
| **Assignment** | Gives a role, claimable role or access role to an account (user or service principal), with an optional `validFrom`/`validTo` and a scope. | Admin |
| **Role binding** | Rule that creates and removes role assignments automatically from a source model, such as Entra group members or OrgChart positions. Each binding entry carries a scope. | Admin |

## How access is resolved

```text
binding (Entra group / OrgChart) ──creates──▶ role assignment (scope) ──expands to──▶ access role assignments (same scope)
user claims claimable role ──activates──▶ access role assignments (time-boxed)
                                                            │
API: AddFusionRolesV2(f => f.SystemName = "work-orders") ──┘ reads active access role assignments for its system
```

- The API only checks **active access role assignments** for its own system. Roles, claimable roles and bindings
  decide who gets them, and can change without an API deploy.
- Every access role assignment records the role assignment or claimable role assignment it came from.
- Non-.NET backends and frontends read the same data from
  `/accounts/{id}/active-access-role-assignments?$filter=systemName eq 'work-orders'`.

## Global vs scoped

There are two separate levels:

1. **Access role definition.** No scope type: the access role is granted for the whole system. With a scope type: it
   can be granted per resource.
2. **Assignment** (`type` + `scope` on binding role entries and assignments; `type` is required):

| Assignment | Config | Gives |
| --- | --- | --- |
| Global | `"type": "Global", "scope": null` | Access role assignments without a scope |
| Scoped, one resource | `"type": "Scoped", "scope": { "scopeTypeIdentifier": "project", "value": "<project id>" }` | That project only |
| Scoped, all resources | `"type": "Scoped", "scope": { "scopeTypeIdentifier": "project", "isGlobal": true }` | Every project |

The scope is copied to **every** access role in the role. API checks (`Fusion.Integration.Roles`):

| Check | Passes when |
| --- | --- |
| `HaveActiveAccessRole(role)` | The user has the access role, **ignoring scope** |
| `HaveScopedActiveAccessRole(role, scopeType, value)` | A `Scoped` assignment of that scope type with `isGlobal: true` or that value. A `Global` assignment does **not** pass |
| `HaveActiveAccessRoleForScopeTypeWithAnyScopeValue(role, scopeType)` | Any `Scoped` assignment of that scope type (use for list endpoints, then filter by value) |

Consequences:

- Never protect a scoped access role with `HaveActiveAccessRole`: a user scoped to project A would pass for project B.
- Admins who need every project of a scoped access role get `Scoped` + `isGlobal: true`, not `Global`.
- A role that mixes unscoped and scoped access roles cannot be assigned correctly: `Global` breaks the scoped checks,
  `Scoped` to one project hands out the unscoped access roles too. Keep them in separate roles and separate binding
  entries (`file-layout.md`).

## When to use what

| Situation | Use |
| --- | --- |
| Capability not tied to one resource (use the app, manage lookup data, admin settings) | Global access role, global assignment |
| Data belongs to a Fusion resource and users should only see or change their own (project, contract, facility) | Scoped access role; scope value = the resource identifier your API stores |
| Support or central admins who need all resources | `Scoped` assignment with `isGlobal: true` of the scoped access role |
| Access follows Entra group or OrgChart membership | Role binding, not hand-made assignments |
| Powerful or rarely needed access (bulk delete, production fixes) | Claimable role, so it is off by default and time-boxed |
| Service principal or one-off technical access | Direct role assignment (`access-assignments.<env>.json`) |
| Several apps need the same kind of resource limit | One shared scope type; never one scope type per app |

Grant users access through roles, claimable roles and bindings. Direct role assignment is for service
principals and narrow exceptions.
