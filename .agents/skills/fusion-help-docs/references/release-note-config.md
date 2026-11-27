# Release note config

## Instructions

### 4. Create the release notes config file (optional)

Create `help-release-notes.json` if team publishes release notes:

```jsonc
{
  "releaseNotes": [
    {
      "slug": "my-app-v2-release",              // Must match the .md filename
      "title": "Version 2.0 Release",           // Display title
      "appKey": "my-app",                       // Your Fusion app key
      "publishedDate": "2026-03-14T00:00:00Z",  // Publication date (ISO 8601)
      "tags": ["release", "v2"],                // Searchable tags
      "relevantApps": []                        // Optional: other app keys
    }
  ]
}
```

#### Release notes config field reference

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `slug` | Yes | string | Unique identifier. Must match a `{slug}.md` file in the release notes root folder. |
| `title` | Yes | string | Release note title. |
| `appKey` | Yes | string | Fusion app key. You must be admin. |
| `publishedDate` | Yes | ISO 8601 date | When the release was published. |
| `tags` | No | string[] | Searchable tags. |
| `relevantApps` | No | string[] | Additional app keys. |
