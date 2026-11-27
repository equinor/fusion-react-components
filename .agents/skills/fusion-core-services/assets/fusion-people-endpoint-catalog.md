# People API Endpoint Catalog

## Contents

- [Subscription endpoint](#subscription-endpoint)
- [Person profiles — Read & manage](#person-profiles--read--manage)
- [Search — Query & search persons](#search--query--search-persons)
- [Batch operations — Ensure, create, validate](#batch-operations--ensure-create-validate)
- [People Picker — Search & resolve (Graph-backed)](#people-picker--search--resolve-graph-backed)
- [Presence & awareness](#presence--awareness)
- [Maintenance — Cache & state](#maintenance--cache--state)
- [Legacy & special operations](#legacy--special-operations)
- [Authorization notes](#authorization-notes)
- [Typical status codes](#typical-status-codes)
- [Excluded endpoints](#excluded-endpoints)

This catalog covers all public, non-admin endpoints across API versions. Admin, cache, analytics, and most migration controllers are excluded. The subscription route is documented because it is public, but it is backend-only. Deprecated operations are noted individually; a version number alone does not imply deprecation.

## Subscription endpoint
- `PUT /subscriptions/persons` → backend subscription registration/update returning `ApiEventSubscriptionV1`
  Application-token only. Use for person-change event delivery, local projection syncing, or cache invalidation rather than UI workflows.

## Person profiles — Read & manage

### Current versions (recommended)
- `GET /persons/{personId}` (API v3/v4) — fetch person profile
  - V3: standard person with OData expansion (roles, positions, contracts, manager)
  - V4: enhanced with aggregated roles/positions and companies expansion
- `GET /persons/me` (API v3/v4) — current authenticated user's profile
- `GET /persons/{personId}/extended-profile` (API v3) — read extended profile properties
- `PATCH /persons/{personId}/extended-profile` (API v3) — update isPrimaryAccount and preferredContactMail

### Account linking
- `GET /persons/{personId}/linked-accounts` (API v1) — list linked accounts
- `POST /persons/{personId}/linked-accounts` (API v1) — link two accounts (requires both in Azure AD)
  - Request: `AccountLinkRequest` with identifier and optional description
  - Response: `ApiPersonLink` with both profiles
- `DELETE /persons/{personId}/linked-accounts/{targetId}` (API v1) — remove account link

### Legacy endpoints (use v3/v4 instead)
- `GET /persons/{personId}` (API v2 / `2.0`) — deprecated; no v1 / `1.0` operation exists. Use current v3/v4 (`3.0`, `4.0`).
- `GET /serviceprincipals/{servicePrincipalId}` (API v1) — fetch service principal profile as V1

## Search — Query & search persons
- `GET /persons` (API v1 / `1.0`, not flagged deprecated) — simple search query string parameter
  - Query parameter: `query` (string)
  - Response: `List<ApiPersonSearchResultV1>`
- `GET /persons` (API v2) — OData search with better support
  - Query parameter: `$search` (OData search syntax)
  - Response: `List<ApiPersonSearchResultV2>`

## Batch operations — Ensure, create, validate

### Ensure persons exist
- `POST /persons/ensure` (API v2/v3) — batch-resolve/ensure persons by identifiers
  - Request: `ValidatePersonsRequest` with list of identifiers (mail, UPN, or Azure ID)
  - Response: `List<ApiPersonValidationResultV2>` with per-identifier status
  - Note: Always returns 200, check individual statusCode for each result
- `POST /persons/{personId}/ensure` (API v1) — OBSOLETE: single-person ensure, returns `ApiPersonV1`

### Create local persons
- `POST /persons` (API v1) — create local (non-Azure AD) person profiles
  - Request: `CreatePersonsRequest` with list of name, mail, optional fields
  - Response: `List<ApiCreatePersonResult>` with per-person creation status (201/409/500)
  - Note: Runs each in separate transaction for individual error handling

### Application identity
- `POST /application/ensure` (API v1) — ensure current app/service principal exists
  - Requires: `AppOnly` authorization policy
  - Response: `ApiPersonV1` for the authenticated app identity

## People Picker — Search & resolve (Graph-backed)
- `POST /people-picker/suggestions` — search for persons and service principals
  - Request: `PeoplePickerQueryRequest` with queryString and optional type filter ("Person" or "SystemAccount")
  - Response: `ApiPagedCollection<ApiPeoplePickerAccount>` (top 10 results with avatars and SAS-signed avatar URLs)
- `POST /people-picker/resolve` — batch-resolve persons/service principals by identifiers
  - Request: `ResolveProfilesRequest` with list of identifiers (mail, UPN, or Azure ID, max 100)
  - Response: `List<ApiPeoplePickerProfile>` with per-identifier resolution status and details
- `GET /people-picker/persons/{personId}/avatar` — retrieve person's avatar as SVG
  - Requires SAS token authentication (provided in search results)
  - Response: SVG image (64x64) or SVG with initials if no photo available

## Presence & awareness
- `GET /persons/{personId}/presence` (API v1 and v1-preview / `1.0`, `1.0-preview`) — fetch user's current presence status
  - Response: `ApiPresenceV1` with availability and activity
- `POST /persons/presences` — batch-fetch presence for multiple users

## Maintenance — Cache & state

### Cache reset (elevated permissions required)
- `POST /persons/me/reset` (API v1) — reset cache for current user
  - Scope: "Fusion.CacheControl.Manage" OR current user
  - Response: 200 OK when complete
- `POST /persons/{personId}/reset` (API v1) — reset cache for specific person
  - Scope: "Fusion.CacheControl.Manage" OR the target user
  - Response: 200 OK when complete

## Legacy & special operations

### Group membership verification
- `POST /persons/{personId}/checkMemberGroups` (API v1–v4 / `1.0`, `2.0`, `3.0`, `4.0`) — check if person is member of Azure AD groups

## Authorization notes
- Most endpoints require elevated-user or trusted-application checks through fluent authorization
- People Picker endpoints often require valid current-user identity but some use Graph direct access
- Cache reset requires elevated permissions or the resource owner's identity
- Photo/avatar retrieval uses SAS token-based access

## Typical status codes
- `200 OK` — successful read or operation
- `201 Created` — successful creation (POST /persons)
- `204 NoContent` — delete successful
- `400 Bad Request` — invalid identifiers, missing required fields, or malformed payloads
- `401 Unauthorized` — authentication missing or invalid
- `403 Forbidden` — authorization requirement not met
- `404 Not Found` — person/resource does not exist
- `409 Conflict` — duplicate linked-account or resource already exists
- `424 FailedDependency` — upstream service (Graph, search) failure

## Excluded endpoints
- `AdminController` — admin-only operations
- `CacheController`, `AnalyticsController` — internal operations
- `MigrationController` — operational migration routes; source also exposes `OPTIONS /persons/migrations` for elevated migration capability checks
- Deprecated operations not listed above; verify each operation's live OpenAPI deprecation flag
- Roles-related endpoints (managed by RolesV2 API)
