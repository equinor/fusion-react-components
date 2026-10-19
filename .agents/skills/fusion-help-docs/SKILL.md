---
name: fusion-help-docs
description: 'Guides app teams through authoring, structuring, and publishing help documentation (articles, release notes, FAQs) using the fusion-help-cli. USE FOR: write help articles, create release notes, set up help docs, publish documentation, sync articles, configure help config file, maintain app help content, capture help screenshots with Playwright, keep help in sync with UI changes, validate help before publishing. DO NOT USE FOR: building the CLI itself, modifying Fusion.Services.Help internals, or non-documentation tasks.'
license: MIT
metadata:
  version: "0.1.2"
  status: active
  owner: "@equinor/fusion-core"
  tags:
    - help-documentation
    - fusion-help-cli
    - articles
    - release-notes
    - faq
    - screenshots
    - playwright
---

# Fusion Help Documentation

Author, structure, and publish help docs (articles, release notes, FAQs) via `fhelp` CLI.

## When to use

- Write help article for Fusion app
- Create/update release notes
- Set up docs folder structure + config
- Structure markdown for help system
- Publish/sync docs to Fusion environment
- Add FAQ entries
- Set up CI/CD pipeline to auto-publish
- Capture readable screenshots for articles, or validate help before publishing
- A UI change (labels, buttons, dialogs, pages, flows, roles) may have made help outdated

## When not to use

- Modifying `fusion-help-cli` source (`tooling/fusion-help-cli/`)
- Changing Fusion.Services.Help backend API
- General markdown editing unrelated to Fusion Help
- Non-documentation tasks

## Required inputs

Collect before creating:

| Input | Required | Description |
|-------|----------|-------------|
| **App key** | Yes | The Fusion app key (e.g. `my-app`, `resource-allocation-landingpage`). User must be admin for this app. |
| **Content type** | Yes | `articles`, `release-notes`, or `faqs` |
| **Docs root path** | Yes | Where the team stores their docs (e.g. `docs/help/`) |
| **Target environment** | For publish | `ci`, `fqa`, `tr`, or `fprd` |

Unknown app key → check app admin:
- **CI**: `https://fusion.ci.fusion-dev.net/apps/app-admin`
- **Production**: `https://fusion.equinor.com/apps/app-admin`

Look in "Admins" section — must be listed as admin to publish.

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

### 3. Write article content

Create markdown files in the articles root folder. The filename (without `.md`) must match the `slug` in the config.

**Article writing guidelines:**

- Write for end-users of the Fusion app
- Use `##`, `###` for structure — avoid `#` (title comes from config)
- Place images in `images/`; reference with `![Alt text](images/my-screenshot.png)`
- Help opens in a narrow side sheet (~450 px): capture one component per image, never the full page; avoid tables with more than two short columns
- Write alt text that says what the image shows and which control is outlined
- CLI auto-uploads images + rewrites paths to CDN
- **Images must be PNG** (CLI limitation)
- One topic per article
- Link related articles by title (platform handles deep linking)

Read slot header in [assets/article-template.md.hbs](assets/article-template.md.hbs), fill named slots as Markdown, repeat `#each` items, drop template comments, and unescape `\{{` to literal `{{`. Never evaluate mustaches inside slot values. Save filled article as `.md`; consumers may use their own renderer. Config: [assets/help-articles-template.json](assets/help-articles-template.json).

For reproducible screenshots, generate them with Playwright stories and the [assets/capture-story-helper.ts](assets/capture-story-helper.ts) helper, and validate articles, images, and app help links before publishing. See [references/screenshots-and-validation.md](references/screenshots-and-validation.md).

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

Fill [assets/release-note-template.md.hbs](assets/release-note-template.md.hbs) using same slot rules; omit empty `#if` sections. Config: [assets/help-release-notes-template.json](assets/help-release-notes-template.json).

### 5. Install and authenticate the CLI

**Install from the Fusion Public feed:**

```powershell
dotnet tool install --global --add-source "https://statoil-proview.pkgs.visualstudio.com/Fusion%20-%20Packages/_packaging/Fusion-Public/nuget/v3/index.json" Fusion.Help.Cli
```

**Update an existing installation:**

```powershell
dotnet tool uninstall --global Fusion.Help.Cli
dotnet tool install --global --add-source "https://statoil-proview.pkgs.visualstudio.com/Fusion%20-%20Packages/_packaging/Fusion-Public/nuget/v3/index.json" Fusion.Help.Cli
```

**Authenticate via Azure CLI:**

```powershell
az login
```

CLI uses `DefaultAzureCredential` — picks up `az login` session automatically.

### 6. Publish documentation

**Sync articles:**

```powershell
fhelp article sync -f docs/help/help-articles.json -r docs/help/articles -e ci -v
```

**Sync release notes:**

```powershell
fhelp releasenotes sync -f docs/help/help-release-notes.json -r docs/help/release-notes -e ci -v
```

**Command flags:**

| Flag | Description |
|------|-------------|
| `-f`, `--file` | Path to the JSON config file |
| `-r`, `--root` | Path to the folder containing markdown files |
| `-e`, `--env` | Target environment: `ci`, `fqa`, `tr`, `fprd` |
| `-t`, `--token` | Override the access token (optional) |
| `-v`, `--verbose` | Show detailed logging output |
| `--no-validation` | Skip source system check — **use with caution**, can overwrite UI-created content |

**Environment promotion order:** `ci` → `fqa` → `fprd` (skip `tr` unless testing infrastructure).

Test in `ci` before promoting to `fqa` then `fprd`.

### 7. Set up CI/CD pipeline (recommended)

Automate publishing via Azure DevOps or GitHub Actions. Use the pipeline examples in [references/ci-pipelines.md](references/ci-pipelines.md).

### 8. Keep help in sync with the app

After a change to what users see or do, search articles, FAQs, and stories for the old and new UI labels, verify behavior against the running app, update text and stories, recapture, inspect every image, and run validation. Follow the checklist in [references/screenshots-and-validation.md](references/screenshots-and-validation.md#keep-help-in-sync-with-the-app).

### 9. FAQs (supplementary)

FAQs use an Excel-based workflow and require app-level access. This is a temporary solution best suited for scenarios where FAQs span multiple apps.

```powershell
fhelp faq sync -f docs/help/faqs.xlsx -e ci -v
```

For most teams, managing FAQs through the Fusion Help Admin UI at `https://fusion.equinor.com/apps/fusion-help-admin` is simpler.

## Expected output

- `docs/help/` folder with articles, images, and config
- Markdown article file(s) with proper content
- Valid `help-articles.json` (+ optional `help-release-notes.json`)
- How to install, auth, and run `fhelp`
- CI/CD pipeline snippet (optional)
- Playwright stories and captured component screenshots, plus validation results (when screenshots are used)

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| `DefaultAzureCredential failed to retrieve a token` | Not authenticated | Run `az login` |
| `403 Forbidden` | Not an admin for the app key | Check admin list at the app admin page, or verify the `appKey` in your config |
| Article not created (skipped) | No matching `.md` file in root folder | Ensure filename matches slug exactly: `{slug}.md` |
| Source system mismatch warning | Article was created via UI, CLI won't overwrite | Use `--no-validation` carefully, or use a different slug |
| Images not uploading | Wrong format | Images must be **PNG** format |
| Screenshot text unreadable in the help panel | Full-page or full-width capture | Capture one component; reflow with a narrower `width` first |

## Safety & constraints

- **Never use `--no-validation` without understanding** — can overwrite UI-created content
- Test in `ci` before publishing to `fprd`
- `sourceSystem` auto-set to `Fusion.Help.Cli`; CLI and UI articles have different source systems and won't conflict unless `--no-validation` is used
- Slugs must be globally unique — use app-specific prefix (e.g. `my-app-getting-started`)
- Never commit access tokens — use `az login` or pipeline service principals
