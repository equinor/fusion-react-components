# Build and deploy

```sh
# Build the portal template
ffc portal build

# Upload to the Fusion portal service (authenticate via `az login` or FUSION_TOKEN env var)
ffc portal upload --portal-id <id>

# Tag a specific version
ffc portal tag --portal-id <id> --tag latest --version <version>
```

> **Never paste tokens directly into commands.** Use `az login` for interactive auth or set `FUSION_TOKEN` env var for CI pipelines.
