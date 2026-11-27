# finf setup

## Prerequisites

Install `finf` as a .NET global tool:

```bash
dotnet tool install --global \
  --add-source "https://statoil-proview.pkgs.visualstudio.com/Fusion%20-%20Packages/_packaging/Fusion-Public/nuget/v3/index.json" \
  Fusion.Infra.Cli
```

Update to latest:

```bash
dotnet tool update --global \
  --add-source "https://statoil-proview.pkgs.visualstudio.com/Fusion%20-%20Packages/_packaging/Fusion-Public/nuget/v3/index.json" \
  Fusion.Infra.Cli
```

Auth uses `DefaultAzureCredential` automatically (picks up `az login` session). Pass `-t <token>` to override.

The calling identity (pipeline service principal or user) needs the app role `Fusion.Infrastructure.Database.Manage` on
the **Fusion Infrastructure Support** app; without it provision/migrate fail with 401/403. Request it from Fusion Core.
The infra API URL has a built-in default; `-u` only overrides it.
