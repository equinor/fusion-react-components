## Why

The skill `fusion-discover-skills` has been deprecated upstream.
The recommended replacement is `fusion-skills`.

## Current behavior

The deprecated skill `fusion-discover-skills` is still installed locally.

## New behavior

- Removes `fusion-discover-skills` from installed skills
- Updates lock file to remove the entry
- Successor `fusion-skills` is already installed — no additional install needed

## References

- Workflow run: https://github.com/equinor/fusion-react-components/actions/runs/27407381059
- Successor skill: `fusion-skills`

## Reviewer focus

- Confirm `fusion-discover-skills` is no longer referenced in project configuration
- Verify the successor `fusion-skills` skill files are correct
- Verify lock file updates reflect both the removal and addition
