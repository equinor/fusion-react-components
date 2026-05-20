# Authorization Patterns

## Request Authentication

Most Fusion services require a Bearer token. See [API Key Authentication](#api-key-authentication-special-cases) for exceptions:

```
Authorization: Bearer {jwt_token}
```

Token from Azure AD using the Fusion app registration:
- **Client ID**: `{app-client-id}` (from your Fusion app registration)
- **Authority**: `https://login.microsoftonline.com/{tenant-id}/`
- **Delegated scope format**: `api://{resource-app-id}/{scope-name}`
- **Client credentials scope format**: `api://{resource-app-id}/.default`

### Example Scopes

**Delegated scopes** (user/app acting on behalf of a signed-in user):

| Service | Scope |
| --- | --- |
| People | `api://{resource-app-id}/user_impersonation` |
| Org | `api://{resource-app-id}/user_impersonation` |
| Context | `api://{resource-app-id}/user_impersonation` |

> Delegated scope names defined per service's Azure AD app registration. `user_impersonation` is common — verify actual scope in target service.
**Application scope** (client credentials / app-only access):

| Flow | Scope |
| --- | --- |
| Client credentials | `api://{resource-app-id}/.default` |

---

## Authorization Requirements

Fusion services use ASP.NET Core authorization requirements. Common patterns:

### Requirement-Based Authorization

```csharp
// Backend service defines a requirement
public class MustBeContextManagerRequirement : IAuthorizationRequirement
{
    public string ContextId { get; set; }
}

// Frontend passes the requirement check implicitly via:
// 1. User identity (roles, claims)
// 2. Resource ownership (context manager, project lead, etc.)
```

**Consumers**:
- Azure AD identity must include the required role/claim
- Or must be explicitly listed as responsible (context manager, position holder, etc.)
- If denied: `403 Forbidden`

### Common Requirements

| Scenario | Requirement | How to satisfy |
| --- | --- | --- |
| Read Context | `CanReadContext` | Any authenticated user with delegated `api://{context-resource-app-id}/user_impersonation` scope |
| Modify Context | `IsContextManager` | Must have "ContextManager" role in that context OR hold a position in it |
| Delete Position | `CanDeletePosition` | Must be HR admin OR context manager where position exists |
| View Person | `CanViewPerson` | Any authenticated user with delegated `api://{people-resource-app-id}/user_impersonation` scope |

> **Note:** Use `.default` scopes only for client-credentials (app-only) flows. For delegated (on-behalf-of-user) flows, use service-specific scopes like `user_impersonation`.

---

## Role-Based Access Control (RBAC)

Fusion services assign roles per user per resource. Example: roles in a context:

```json
{
  "contextId": "abc-def",
  "userId": "person-123",
  "roles": ["ContextManager", "Approver", "Contributor"]
}
```

**How roles affect API behavior**:
- **ContextManager**: Can create positions, assign responsibilities, modify context properties
- **Approver**: Can approve requests within the context
- **Contributor**: Can edit owned resources; read access to context
- **Viewer**: Read-only access to context and positions

Check token `scp` claim or app roles for coarse permissions. Per-context roles (`ContextManager`, `Approver`, `Contributor`): use Fusion endpoints — not Azure AD token claims.

---

## Common Authorization Errors

### 401 Unauthorized

**Cause**: Missing or invalid token

**Fix**:
- Confirm token is in `Authorization: Bearer {token}` header
- Verify token is not expired
- Verify token was requested with correct scope

### 403 Forbidden

**Cause**: Token is valid but user doesn't have required role/permission

**Fix**:
- Confirm user has required role in this context/service
- Ask context manager to assign role if needed
- Check if user is responsible (position holder, manager, etc.)

### 403 Forbidden with authorization detail

**Cause**: Caller doesn't satisfy authorization requirement

**Response example** (ProblemDetails with Fusion `error` extension):
```json
{
  "type": "https://docs.fusion-dev.net/development/api/errors/#403",
  "title": "User is not authorized to access data",
  "status": 403,
  "detail": "User must be context manager",
  "error": {
    "code": "Forbidden",
    "message": "User must be context manager",
    "accessRequirements": [
      { "code": "IsContextManager", "description": "Must be context manager", "outcome": "Failed", "wasEvaluated": true }
    ]
  },
  "traceId": "...",
  "timestamp": "..."
}
```

**Fix**: Escalate to someone with required role

---

## Service-to-Service Authentication

Internal service-to-service:

1. Service acquires token for its **service principal** (not user)
2. Token requested with service's own scope
3. Called service validates caller's service identity

As client, don't implement directly. Know:
- Fusion services communicate securely
- Cross-service calls are authenticated and authorized
- If a service can't reach another, it's usually a service principal permission issue

---

## API Key Authentication (Special Cases)

Non-user integrations may use API keys instead of Azure AD tokens:

```
Authorization: ApiKey {api-key}
```

**When**: Limited external integrations, batch operations, webhook receivers

**How to get**: Request from service owner; usually provided in project setup

---

## Checking Your Permissions

Before calling an endpoint:

1. **Get token**: Azure AD with appropriate scope:
   - **Delegated** (user flow): `api://{resource-app-id}/user_impersonation`
   - **App-only** (client credentials): `api://{resource-app-id}/.default`
2. **Decode the token**: Use jwt.ms to see your roles/claims
3. **Check the endpoint docs**: Look for "Required role" or "Requirement"
4. **Verify you have that role**: If not, ask manager or context manager to assign it

### Example Token Claims

**Delegated token** (user acting via an app):
```json
{
  "oid": "person-object-id",
  "name": "John Doe",
  "email": "john.doe@equinor.com",
  "scp": "user_impersonation",
  "aud": "{resource-app-id}"
}
```

**App-only token** (client credentials, no user context):
```json
{
  "oid": "service-principal-object-id",
  "appid": "{client-app-id}",
  "roles": ["Application.ReadWrite"],
  "aud": "{resource-app-id}"
}
```

> **Key difference:** Delegated tokens carry `scp` (delegated permissions); app-only tokens carry `roles` (application permissions). Never both in one token.

Per-context roles (e.g. ContextManager, Approver) are Fusion-level concepts returned in API responses, not Azure AD token claims.
