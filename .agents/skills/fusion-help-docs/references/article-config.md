# Article folders and config

## Instructions

### 1. Set up docs folder structure

Create folder layout:

```
docs/
  help/
    articles/                    # Markdown article files
      images/                    # Article images (PNG format)
    release-notes/               # Markdown release note files
      images/                    # Release note images (PNG format)
    faqs/                        # Optional: markdown FAQ body overrides
    help-articles.json           # Article config
    help-release-notes.json      # Release notes config (if using release notes)
```

> Folder and config names are flexible — must match what you pass to `fhelp`.

### 2. Create the article config file

Create `help-articles.json` (tells CLI which articles to sync):

```jsonc
{
  "articles": [
    {
      "slug": "my-app-getting-started",        // Must match the .md filename (without extension)
      "title": "Getting Started",               // Display title in Fusion Help
      "appKey": "my-app",                       // Your Fusion app key
      "sortOrder": 1.0,                         // Controls display order (lower = first)
      "summary": "Learn how to get started.",   // Short description shown in article list
      "tags": ["getting-started", "onboarding"],// Searchable tags
      "relevantApps": []                        // Optional: other app keys where this shows
    }
  ]
}
```

#### Config field reference

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `slug` | Yes | string | Unique identifier. Must match a `{slug}.md` file in the articles root folder. Use kebab-case. |
| `title` | Yes | string | Human-readable title displayed in Fusion Help. |
| `appKey` | Yes | string | Fusion app key this article belongs to. You must be admin for this app. |
| `sortOrder` | No | number | Controls display order. Lower numbers appear first. Default varies. Use decimals (1.0, 1.1, 2.0) for flexible ordering. |
| `summary` | Yes | string | Short description shown in article listings. |
| `tags` | No | string[] | Searchable tags for categorization. |
| `relevantApps` | No | string[] | Additional app keys where this article should appear. |
