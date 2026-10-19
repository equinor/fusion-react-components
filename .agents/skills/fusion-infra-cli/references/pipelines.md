# finf in pipelines

Pipeline identity (service connection or GitHub OIDC app registration) needs the app role
`Fusion.Infrastructure.Database.Manage` on the **Fusion Infrastructure Support** app. `finf` picks up the Azure login
through `DefaultAzureCredential`; no token flag needed.

## GitHub Actions

```yaml
permissions:
  id-token: write
  contents: read

steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-dotnet@v4
    with:
      dotnet-version: '10.0.x'
  - uses: azure/login@v3
    with:
      client-id: ${{ vars.DEPLOY_CLIENT_ID }}
      tenant-id: ${{ secrets.AZURE_TENANT_ID }}
      subscription-id: ${{ vars.AZURE_SUBSCRIPTION_ID }}

  - name: Install finf
    run: dotnet tool install --global --add-source "https://statoil-proview.pkgs.visualstudio.com/Fusion%20-%20Packages/_packaging/Fusion-Public/nuget/v3/index.json" Fusion.Infra.Cli

  - name: Provision database (ci)
    id: database
    run: |
      set -euo pipefail
      finf database provision \
        -f infra/database/db-config.json \
        -e ci \
        --sql-contributor-client-id "${{ vars.API_CLIENT_ID }}" \
        -o provisioning-output.json \
        --verbose
      echo "name=$(jq -er '.database.name' provisioning-output.json)" >> "$GITHUB_OUTPUT"

  - name: Apply migrations (ci)
    run: |
      set -euo pipefail
      finf database migrate \
        -d "${{ steps.database.outputs.name }}" \
        -m artifacts/migrations/migration.sql \
        -o migration-result.json \
        --verbose
```

Production: same steps with `-e fprd --production` on `provision`, and only `--production` on `migrate` (it takes no `-e`).

Pull request database (copy of CI), typically in the PR deploy workflow:

```yaml
  - name: Provision PR database
    run: |
      finf database provision \
        -an my-app \
        -pr ${{ github.event.pull_request.number }} \
        -ghr ${{ github.repository }} \
        -c ci \
        --sql-contributor-client-id "${{ vars.API_CLIENT_ID }}" \
        --timeout 900 \
        -o provisioning-output.json \
        --verbose
```

The migration script comes from the build job: `dotnet ef migrations script --idempotent ... --output
artifacts/migrations/migration.sql` (EF wiring and design-time factory: `fusion-developer-service`,
`references/using-sql-database.md`).

## Azure DevOps

```yaml
steps:
  - script: dotnet tool install --global --add-source "https://statoil-proview.pkgs.visualstudio.com/Fusion%20-%20Packages/_packaging/Fusion-Public/nuget/v3/index.json" Fusion.Infra.Cli
    displayName: Install finf

  - task: AzureCLI@2
    displayName: Provision database
    inputs:
      azureSubscription: $(azureServicePrincipal)
      scriptType: pscore
      scriptLocation: inlineScript
      inlineScript: |
        $prod = if ("$(environment)" -eq "fprd") { @("--production") } else { @() }
        finf database provision `
          -f ./infra/database/db-config.json `
          -e "$(environment)" `
          @prod `
          --sql-contributor-client-id $(clientId) `
          -o provisioning-output.json `
          --verbose
```
