# Reports API Surface

## Service source
- `fusion-core-services/src/Fusion.Services.Reports`

## Endpoint groups (controller-level)
- `ReportsController`
- `PublicController`
- `GroupsController`
- `AdminController`

## Priority workflow coverage
- report list/detail flows
- report configuration create/update flows
- embed/public access flows
- admin/group/security-related workflows

## Model clarity map
- Entity models: `Controllers/ViewModels/Entities/*`
- Request models: `Controllers/ViewModels/Request/*`
- Enum model families: `Controllers/ViewModels/Enums/*`

## Capability / OPTIONS defaults
- This service exposes public `OPTIONS` capability probes for report access checks, including `OPTIONS /reports/{id}` and the advanced context-membership access route.
- Frontend consumers should use these probes to decide whether edit, publish, or access-dependent report actions should be enabled for the current caller.
- Because report read access does not imply report mutation access, do not light up admin or write UI purely from successful `GET /reports/{id}` responses.

## React/TypeScript defaults
- Preferred Fusion Framework stack:
	- `@equinor/fusion-framework-module-http`
	- named service-discovery client for reports endpoints
- Suggested client file: `src/api/reportsClient.ts`
- Suggested hook file: `src/features/reports/useReports.ts`
- Keep report summary models distinct from embed/config models.
- Starter shape:

```ts
export interface ReportSummary {
	id: string;
	title?: string;
}

export async function listReports(baseUrl: string, init?: RequestInit) {
	const response = await fetch(`${baseUrl}/reports`, init);
	if (!response.ok) throw new Error(`Reports API failed: ${response.status}`);
	return (await response.json()) as ReportSummary[];
}
```

## C# HttpClient defaults
- Preferred backend stack:
	- `AddFusionIntegrationCore(environment)`
	- `AddFusionIntegrationHttpClient("reports-client", setup)`
	- `WithFusionServiceEndpoint(FusionServiceEndpointKeys.Reports)`
	- separate wrappers or method groups for public/embed vs admin operations
- Suggested client class: `ReportsApiClient`
- Suggested local models: `ReportSummary`, `EmbedConfig`, `UpdateReportRequest`
- Keep embed token/config models isolated from admin update models.
- Starter shape:

```csharp
public sealed class ReportsApiClient(HttpClient httpClient)
{
		public async Task<IReadOnlyList<ReportSummary>?> GetReportsAsync(CancellationToken cancellationToken)
				=> await httpClient.GetFromJsonAsync<IReadOnlyList<ReportSummary>>("reports", cancellationToken);
}

public sealed record ReportSummary(string Id, string? Title);
```

## Suggested local models
- `ReportSummary`
- `EmbedConfig`
- `ReportConfig`
- `UpdateReportRequest`

## Representative model snapshots
- `ReportSummary`: report id, title, ownership/editability metadata
- `EmbedConfig`: embed url, token/config, report type details
- `CreateReportRequest`: title, owner, optional global identifier
- `UpdateConfigRequest`: report type plus provider-specific config fields

## Validation highlights
- `CreateReportRequest.Title` is required
- `CreateReportRequest.OwnedBy` is required
- `CreateReportRequest.GlobalIdentifier` is optional but must be URL-safe and between 3 and 50 chars when present
- `UpdateConfigRequest.Type` is required
- `UpdateConfigRequest.GroupId` is required for Power BI config types
- `UpdateConfigRequest.EmbedUrl` must be an absolute URL when provided

## Versioning notes
- Report/embed/security model families are distinct and should be mapped explicitly in client code.
