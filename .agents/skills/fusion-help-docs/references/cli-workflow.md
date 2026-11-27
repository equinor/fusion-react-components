# CLI setup, publishing and troubleshooting

## Contents

- [Instructions](#instructions)
- [Troubleshooting](#troubleshooting)


## Instructions

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

### 9. FAQs (supplementary)

FAQs use an Excel-based workflow and require app-level access. This is a temporary solution best suited for scenarios where FAQs span multiple apps.

```powershell
fhelp faq sync -f docs/help/faqs.xlsx -e ci -v
```

For most teams, managing FAQs through the Fusion Help Admin UI at `https://fusion.equinor.com/apps/fusion-help-admin` is simpler.

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| `DefaultAzureCredential failed to retrieve a token` | Not authenticated | Run `az login` |
| `403 Forbidden` | Not an admin for the app key | Check admin list at the app admin page, or verify the `appKey` in your config |
| Article not created (skipped) | No matching `.md` file in root folder | Ensure filename matches slug exactly: `{slug}.md` |
| Source system mismatch warning | Article was created via UI, CLI won't overwrite | Use `--no-validation` carefully, or use a different slug |
| Images not uploading | Wrong format | Images must be **PNG** format |
| Screenshot text unreadable in the help panel | Full-page or full-width capture | Capture one component; reflow with a narrower `width` first |
