# Input Validation & Error Handling

## Validation Pattern

All input validated before processing. Layers:

### 1. Request-Level Validation (HTTP)

```
✓ Content-Type: application/json
✓ Authorization header present
✓ API version supported
```

**Errors**: `400 Bad Request`, `401 Unauthorized`, `415 Unsupported Media Type`

### 2. Model Validation (FluentValidation)

Before business logic runs, all input is validated:

```text
// Backend service validation rules:
Email must be a valid format
Name must be 1-200 characters
StartDate must be before EndDate
```

**Error response** (ProblemDetails with validation extensions):
```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "error": {
    "code": "ModelValidationError",
    "message": "Model contained 2 errors",
    "errors": [
      { "property": "email", "message": "Email must be a valid email address" },
      { "property": "startDate", "message": "Start date must be before end date" }
    ]
  },
  "errors": {
    "email": ["Email must be a valid email address"],
    "startDate": ["Start date must be before end date"]
  },
  "traceId": "...",
  "timestamp": "..."
}
```

### 3. Business Logic Validation

After model validation, business rules are checked:

```text
// Example business rules:
Cannot assign position holder outside hiring period
Cannot delete context with active positions
Cannot modify archived context
```

**Error response** (via `FusionApiError.InvalidOperation` or thrown as domain exception):
```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "Invalid operation",
  "status": 400,
  "detail": "Cannot delete context with active positions",
  "error": {
    "code": "InvalidOperation",
    "message": "Cannot delete context with active positions"
  },
  "traceId": "...",
  "timestamp": "..."
}
```

---

## Error Response Format

Services return RFC 7807 `ProblemDetails` with Fusion extensions. Envelope consistent across services using this pattern; `error` content varies. Pre-convention/custom-middleware services may differ.

### Validation errors (400)

FluentValidation failures produce a `ProblemDetails` with both a legacy `error` object and a standard `errors` dictionary:

```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "error": {
    "code": "ModelValidationError",
    "message": "Model contained 2 errors",
    "errors": [
      { "property": "email", "message": "Email must be a valid email address", "attemptedValue": "bad" },
      { "property": "startDate", "message": "Must be before end date" }
    ]
  },
  "errors": {
    "email": ["Email must be a valid email address"],
    "startDate": ["Must be before end date"]
  },
  "traceId": "00-abc123...",
  "timestamp": "2026-04-17T10:30:00Z"
}
```

> Top-level `errors` (field → message[]) matches ASP.NET Core format. `error.errors` is legacy with extra context (`attemptedValue`). Prefer top-level `errors`.

### Domain and operational errors (404, 409, 424, etc.)

Domain errors use same envelope with `error` extension:

```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
  "title": "Resource not found",
  "status": 404,
  "instance": "abc-123",
  "error": {
    "code": "ResourceNotFound",
    "message": "Context abc-123 was not found",
    "resourceIdentifier": "abc-123"
  },
  "traceId": "00-abc123...",
  "timestamp": "2026-04-17T10:30:00Z"
}
```

Controllers: `FusionApiError` factory methods (common patterns from `Fusion.AspNetCore`):
- `FusionApiError.NotFound(resource, message)` → 404
- `FusionApiError.InvalidOperation(code, message)` → 400
- `FusionApiError.ResourceExists(resource, message, exception)` → 409
- `FusionApiError.Forbidden(message)` → 403
- `FusionApiError.FailedDependency(code, message)` → 424
- `FusionApiError.IncorrectETag(message)` → 409

> Signatures vary by service version. Verify via source or `mcp_fusion_search_backend_code`.

### Unhandled exceptions (500, middleware-caught)

Common exception middleware (e.g. `ApiExceptionMiddleware`) maps exception types to HTTP status. Typical:
- `NotFoundError` → 404
- `NotAuthorizedError` → 403 (may include `accessRequirements` in the error)
- `ResourceExistsError` → 409
- `ReadOnlyModeError` → 500 with read-only context

> Illustrative of fusion-libraries pattern. Not all services implement every mapping — check target middleware config.

### Common Error Codes

| Code | HTTP Status | Meaning |
| --- | --- | --- |
| `ModelValidationError` | 400 | Input doesn't match schema or FluentValidation rules |
| `ResourceNotFound` | 404 | Resource doesn't exist |
| `InvalidOperation` | 400 | Business logic constraint violated |
| `ResourceExists` / exception type | 409 | Resource already exists |
| `NotAuthorized` | 403 | Not authorized for action |
| `FailedDependency` | 424 | Downstream service error |
| `Gone` | 410 | Resource has been removed |
| `NotImplemented` | 501 | Endpoint not yet implemented |

---

## How to Handle Error Responses

### For Validation Errors (400)

1. Check the `errors` dictionary for field-level messages
2. Show the user the specific error message
3. Let them correct the input
4. Retry the request

**Frontend example**:
```typescript
if (response.status === 400) {
  const body = await response.json();
  // body.errors is a Record<string, string[]>
  const fieldErrors: Record<string, string> = {};
  for (const [field, messages] of Object.entries(body.errors)) {
    fieldErrors[field] = (messages as string[])[0];
  }
  
  // Show errors in form next to fields
  form.setErrors(fieldErrors);
}
```

### For Business Rule Violations (400)

Business rules require additional steps:

1. Parse `error.code` and `error.message` from the ProblemDetails response
2. Either:
   - Fix the prerequisite (delete active positions first, etc.)
   - Take an alternate action (update instead of delete)
   - Contact someone with higher permissions

**Example** (returned via `FusionApiError.InvalidOperation`):
```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "Invalid operation",
  "status": 400,
  "detail": "Cannot delete context with active positions",
  "error": {
    "code": "InvalidOperation",
    "message": "Cannot delete context with active positions"
  },
  "traceId": "...",
  "timestamp": "..."
}
```

### For Conflict (409)

Resource already exists or state changed:

1. Fetch current state
2. Decide: overwrite (send version), merge, or error to user

**Optimistic lock pattern**:
```text
Request: PUT /contexts/{id}
Headers: { "If-Match": "\"etag-value\"" }
Body: { "title": "New Title" }
```

```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.8",
  "title": "Resource version does not match",
  "status": 409,
  "error": {
    "code": "IncorrectETag",
    "message": "ETag did not match, the resource might have been updated. Refresh and try again."
  },
  "traceId": "...",
  "timestamp": "..."
}
```

---

## Retry Strategy

Retry only for operations safe to repeat:
- Inherently idempotent methods (`GET`, `HEAD`)
- Write operations protected by idempotency key, `ETag`/`If-Match`, or explicit deduplication

Avoid auto-retries for non-idempotent writes (e.g. `POST`/command operations) unless API contract explicitly guarantees safe retry.

| Status | Retryable? | Strategy |
| --- | --- | --- |
| 400, 401, 403, 404, 422 | ❌ No | Fix the request; retrying won't help |
| 409 | ⚠️ Depends | Do not blindly retry version/state conflicts; fetch current state, resolve the conflict, then retry only with an updated request. Use backoff only for explicitly transient conflicts |
| 429, 503, 504 | ✅ Conditional | Retry with exponential backoff only for idempotent or deduplication-protected requests |
| 500 | ✅ Conditional | Retry once only if the operation is idempotent or protected; if it still fails, investigate |

**Recommended backoff**:
```
Attempt 1: immediate
Attempt 2: wait 100ms + random jitter
Attempt 3: wait 200ms + random jitter
Attempt 4: wait 400ms + random jitter
...stop after 3-4 attempts
```

---

## Testing Validation

Before sending requests to production:

1. **Happy path**: Valid data with all required fields
2. **Missing required fields**: Each required field removed one at a time
3. **Invalid formats**: 
   - Wrong type (string instead of number)
   - Invalid email format
   - Date outside allowed range
4. **Business rules**: 
   - Conflicting values (StartDate > EndDate)
   - Violating constraints (duplicate, out of bounds)
   - State violations (can't transition from this state)

Most Fusion services include example payloads in their Swagger/OpenAPI documentation.
