## Why

The skill `fusion-app-react-dev` has been deprecated upstream.
The recommended replacement is `fusion-developer-app`.

## Current behavior

The deprecated skill `fusion-app-react-dev` is still installed locally.

## New behavior

- Removes `fusion-app-react-dev` from installed skills
- Updates lock file to remove the entry
- Successor `fusion-developer-app` is already installed — no additional install needed

## References

- Workflow run: https://github.com/equinor/fusion-react-components/actions/runs/27407381059
- Successor skill: `fusion-developer-app`

## Reviewer focus

- Confirm `fusion-app-react-dev` is no longer referenced in project configuration
- Verify the successor `fusion-developer-app` skill files are correct
- Verify lock file updates reflect both the removal and addition
