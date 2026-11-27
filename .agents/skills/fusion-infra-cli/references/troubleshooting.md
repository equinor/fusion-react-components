# finf diagnostics

## Troubleshooting

| Symptom | Cause / fix |
| --- | --- |
| 401/403 from the infra API | Identity lacks `Fusion.Infrastructure.Database.Manage`; check the pipeline login identity |
| Timeout waiting for operation | Default wait is 300 s; PR copies often need `--timeout 900` |
| `-c ci` fails to find a database | The source environment database has not been provisioned yet |
| Migrate fails with an HTTP error only | The response does not include the failing SQL; run the script locally against SQL Server first |
| Database not found on migrate/get | `--production` missing for production, or wrong name; use the name from the provision output |
| Principal cannot be resolved | Client id typo, or the CLI identity lacks Graph read; `--ignore-resolve-errors` only to continue deliberately |

## Full reference

For complete flag reference, run:
```bash
finf database provision --help
finf database migrate --help
```

Or see the source documentation:
- Fusion docs: `https://docs.fusion.equinor.com/docs/developer/api/database` and `developer/cli-tools/fusion-infra-cli`
- [README.md](https://github.com/equinor/fusion-core-services/blob/main/tooling/fusion-infra-cli/Fusion.Infra.Cli/README.md)
- [Source: tooling/fusion-infra-cli](https://github.com/equinor/fusion-core-services/tree/main/tooling/fusion-infra-cli)
