# CI/CD pipelines for fhelp

Automate publishing via Azure DevOps or GitHub Actions. Both authenticate with Azure (service connection or workload identity federation) and let `fhelp` pick up the credential through `DefaultAzureCredential`. The pipeline identity must be admin for the app key.

## Azure DevOps

```yaml
parameters:
  - name: environment
    type: string
    default: ci
    values: [ci, fqa, fprd]
  - name: azureSubscription
    type: string

steps:
  - checkout: self

  - script: |
      dotnet tool install --global --add-source "https://statoil-proview.pkgs.visualstudio.com/Fusion%20-%20Packages/_packaging/Fusion-Public/nuget/v3/index.json" Fusion.Help.Cli
    displayName: "Install fusion help CLI"

  - task: AzureCLI@2
    displayName: "Sync help articles"
    inputs:
      azureSubscription: ${{ parameters.azureSubscription }}
      scriptType: pscore
      scriptLocation: inlineScript
      inlineScript: |
        fhelp article sync `
          -f ./docs/help/help-articles.json `
          -r ./docs/help/articles `
          -e "${{ parameters.environment }}" `
          -v

  - task: AzureCLI@2
    displayName: "Sync release notes"
    inputs:
      azureSubscription: ${{ parameters.azureSubscription }}
      scriptType: pscore
      scriptLocation: inlineScript
      inlineScript: |
        fhelp releasenotes sync `
          -f ./docs/help/help-release-notes.json `
          -r ./docs/help/release-notes `
          -e "${{ parameters.environment }}" `
          -v
```

## GitHub Actions

```yaml
name: Sync Help Documentation

on:
  push:
    branches: [main]
    paths: ['docs/help/**']

permissions:
  id-token: write
  contents: read

jobs:
  sync-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup .NET
        uses: actions/setup-dotnet@v4
        with:
          dotnet-version: '8.0.x'

      - name: Install fusion help CLI
        run: |
          dotnet tool install --global \
            --add-source "https://statoil-proview.pkgs.visualstudio.com/Fusion%20-%20Packages/_packaging/Fusion-Public/nuget/v3/index.json" \
            Fusion.Help.Cli

      - name: Azure Login
        uses: azure/login@v2
        with:
          client-id: ${{ secrets.AZURE_CLIENT_ID }}
          tenant-id: '3aa4a235-b6e2-48d5-9195-7fcf05b459b0'
          subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}

      - name: Sync articles
        run: |
          fhelp article sync \
            -f ./docs/help/help-articles.json \
            -r ./docs/help/articles \
            -e ci -v
```

Add a `fhelp releasenotes sync` step the same way when the app publishes release notes. Promote `ci` → `fqa` → `fprd`.
