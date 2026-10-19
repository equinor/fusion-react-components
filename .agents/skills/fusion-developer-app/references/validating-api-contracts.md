# Validating API Contracts with Zod

TypeScript types are erased at runtime, so `client.json<WorkOrder[]>()` only *claims* a shape.
When a provider renames a field or adds an enum value, the app fails later, far from the cause.
Parse every response with a schema at the API boundary so contract drift fails loudly, once, with
field-level detail.

Examples target **Zod 4** (`import { z } from 'zod'`). Check the installed major version first;
Zod 3 differs (see [Zod 3 differences](#zod-3-differences)).

## Where to validate

Validate inside the request function in `src/api/`, before data reaches the React Query cache or
components. Keep one folder per resource: schema, request, query options/hook.

```typescript
// src/api/work-orders/work-orders.fetch.ts
import { jsonSelector, type ResponseSelector } from '@equinor/fusion-framework-module-http/selectors';
import type { IHttpClient } from '@equinor/fusion-framework-react-app/http';
import { z } from 'zod';
import { type WorkOrder, WorkOrderListSchema } from './work-orders.schema';

/** Raised when a response does not match the expected contract; never retried. */
export class ApiContractError extends Error {
  readonly issues: z.core.$ZodIssue[];
  constructor(what: string, error: z.ZodError) {
    super(`The ${what} response does not match the expected contract:\n${z.prettifyError(error)}`);
    this.name = 'ApiContractError';
    this.issues = error.issues;
  }
}

const workOrdersSelector: ResponseSelector<WorkOrder[]> = async (response) => {
  const result = WorkOrderListSchema.safeParse(await jsonSelector(response));
  if (!result.success) throw new ApiContractError('work orders', result.error);
  return result.data;
};

/** Reads work orders; resolves only with validated data. */
export const fetchWorkOrders = (client: IHttpClient, signal?: AbortSignal) =>
  client.json('/work-orders', { selector: workOrdersSelector, signal });
```

The query hook stays thin and never re-validates (see `references/using-react-query.md`). A contract
error will not heal on retry, so skip retries for it:

```typescript
useQuery({
  queryKey: ['work-orders'],
  queryFn: ({ signal }) => fetchWorkOrders(client, signal),
  retry: (count, error) => !(error instanceof ApiContractError) && count < 3,
});
```

Avoid: `client.json<WorkOrder[]>('/work-orders')` (an unchecked cast), or parsing inside
components, which spreads validation and lets unvalidated data into the cache.

## External vs app-owned schemas

| Schema owner | Unknown properties | Builder |
|---|---|---|
| Another team's API | Strip, so additive changes do not break the app | `z.object()` (strips by default) |
| Your own API, or data your app writes (settings, saved payloads) | Reject, so drift is caught in your own change | `z.strictObject()` or `.strict()` |

Stripping only relaxes *unknown* keys. Known fields and enum values stay fully validated:

```typescript
// External: equipment service owned by another team
export const WorkOrderSchema = z.object({
  id: z.guid(),
  title: z.string(),
  status: z.enum(['Planned', 'InProgress', 'Completed']),
  dueDate: z.iso.datetime({ offset: true }).nullable(),
  equipment: z.object({ id: z.guid(), tag: z.string() }),
});
export const WorkOrderListSchema = z.array(WorkOrderSchema);
export type WorkOrder = z.infer<typeof WorkOrderSchema>;

// App-owned: a saved view the app persists itself
export const SavedFilterSchema = z.strictObject({
  statuses: z.array(WorkOrderSchema.shape.status),
  equipmentIds: z.array(z.guid()),
});
```

Because external objects are stripped, extra provider metadata never flows into data the app saves.
Do not use `z.looseObject()`/`.loose()` on external objects just to keep extra fields, and never
copy a raw response into a saved payload; build saved data from validated, app-owned schemas.

## Treat new fields and enum values as contract changes

Before adding, changing, or diagnosing a schema:

1. Fetch the provider's **current** OpenAPI document (or its documented contract). Do not infer the
   contract from memory, mock data, or an old checkout.
2. Compare every property, nullability, and enum value of the response models with the schema.
   JSON property names are usually camelCase; expanded/`$expand` variants only add properties.
3. To adopt a new property or enum value, update together: schema, mock data, test fixtures, and a
   schema test.
4. Unknown enum semantics are a question for the provider, not a guess.

Avoid hiding malformed known fields; it turns a contract break into silently wrong data:

```typescript
// Bad: an unknown status, a renamed field, or a broken item becomes an empty list
status: z.string(),                                  // loses enum validation
z.array(WorkOrderSchema).catch([]),                  // hides the failure
items.filter((item) => WorkOrderSchema.safeParse(item).success); // skips records
```

## Ids from SQL Server / Entity Framework

Fusion APIs on Azure SQL generate entity keys sequentially, so inserts don't fragment the clustered
index. The keys come from Entity Framework's sequential `Guid` generator or `NEWSEQUENTIALID()`. These
values are ordered for SQL Server's `uniqueidentifier` sort order and overwrite the RFC 4122/9562 variant
bits, so ids such as `d3b52d2c-4df1-486a-34a7-08df1e1b120b` fail `z.uuid()`.

Validate entity ids with `z.guid()`, which checks only the shape. Use `z.uuid()` only when the provider
guarantees RFC UUIDs, for example UUIDv7 keys from a PostgreSQL API; an OpenAPI `format: uuid` alone
doesn't guarantee that. This is about validation only: the frontend never generates entity ids, and
choosing keys is the API's job.

## Failure UX

A contract failure is an outage of that dependency, not an empty result. Render a dedicated
"*Service* unavailable" state with a retry and expandable technical details listing each issue's
path and message. Report it through the project's telemetry or analytics wrapper (see
`references/using-analytics.md`).

```tsx
if (error) {
  const issues = error instanceof ApiContractError ? error.issues : [];
  return (
    <ErrorState title="Work orders unavailable" onRetry={() => refetch()}>
      {issues.map((issue) => (
        <li key={issue.path.join('.')}>{`${issue.path.join('.') || '(root)'}: ${issue.message}`}</li>
      ))}
    </ErrorState>
  );
}
```

`ErrorState` stands for the project's error page or EDS-based component. Avoid a blank page, a
generic toast, or an empty table that looks like "no work orders".

## Testing

Keep a realistic fixture next to the schema (shape copied from the provider contract) and cover
at least: the real shape parses, additive unknown fields are stripped, and a broken known field fails.

```typescript
import { describe, expect, it } from 'vitest';
import { createWorkOrder } from './work-orders.fixture';
import { WorkOrderSchema } from './work-orders.schema';

describe('WorkOrderSchema', () => {
  it('parses a provider-shaped work order with a sequential GUID id', () => {
    const order = createWorkOrder({ id: 'd3b52d2c-4df1-486a-34a7-08df1e1b120b' });
    expect(WorkOrderSchema.parse(order)).toEqual(order);
  });

  it('strips additive unknown fields', () => {
    const parsed = WorkOrderSchema.parse({ ...createWorkOrder(), priorityScore: 7 });
    expect(parsed).not.toHaveProperty('priorityScore');
  });

  it('rejects an unknown status with its field path', () => {
    const result = WorkOrderSchema.safeParse({ ...createWorkOrder(), status: 'Paused' });
    expect(result.error?.issues[0]?.path).toEqual(['status']);
  });
});
```

Use the same fixture for HTTP mocks (see `references/configure-mocking.md`) so mocks cannot drift
from the schema.

## Zod 3 differences

Zod 3 also strips unknown keys by default and has `z.strictObject()`/`.strict()`, but uses
`.passthrough()` instead of `z.looseObject()`, `z.string().datetime()` instead of `z.iso.datetime()`,
and has no `z.guid()` or `z.prettifyError()`. Use a GUID regex such as
`/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i` instead of `z.string().uuid()`, and format
`error.issues` yourself.
