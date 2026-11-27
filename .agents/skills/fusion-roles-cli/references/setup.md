# froles setup and help

## Prerequisites

Install `froles` as a .NET global tool:

```bash
dotnet tool install --global \
  --add-source "https://statoil-proview.pkgs.visualstudio.com/Fusion%20-%20Packages/_packaging/Fusion-Public/nuget/v3/index.json" \
  Fusion.Roles.Cli
```

Update to latest:

```bash
froles --update
```

Auth uses `DefaultAzureCredential` automatically (picks up `az login` session). Pass `-t <token>` to override.

## Full reference

For complete command and flag reference, run:
```bash
froles --help
froles create --help
```

Or see the source documentation:
- [README.md](https://github.com/equinor/fusion-core-services/blob/main/tooling/fusion-roles-cli/Fusion.Roles.Cli/README.md)
- [USING_CREATE_COMMAND.md](https://github.com/equinor/fusion-core-services/blob/main/tooling/fusion-roles-cli/Fusion.Roles.Cli/USING_CREATE_COMMAND.md)
- [Source: tooling/fusion-roles-cli](https://github.com/equinor/fusion-core-services/tree/main/tooling/fusion-roles-cli)
