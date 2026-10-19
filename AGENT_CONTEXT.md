# Agent context maintenance

This repository uses [APM](https://microsoft.github.io/apm/) for an explicitly selected set of
GitHub Copilot skills. [apm.yml](./apm.yml) is the dependency allowlist;
[apm.lock.yaml](./apm.lock.yaml) records exact resolved content.
Commit both files and the deployed `.agents/skills/` context. Never commit `apm_modules/`.

## Restore and verify

Use APM **0.33.0**, the version pinned in the sync workflow. From a clean checkout, run:

```sh
apm --version
apm install --frozen
apm audit --ci
git status --short
```

The install must restore the locked context without an unexplained diff. The audit checks
lockfile consistency, deployed content, and drift. Investigate failures rather than bypassing
them with `--force`, `--no-drift`, or disabled audits.
No component build or Storybook installation is needed for an agent-context-only change.

## Update declared dependencies

```sh
apm outdated
apm update --yes
apm install --frozen
apm audit --ci
git diff
```

Review and commit the coherent lockfile and deployed-context changes. The `#^1.9.0` constraints
allow compatible releases from `1.9.0` up to, but not including, `2.0.0`; the lockfile makes
ordinary installs reproducible. Exact release pins would prevent automatic advancement.
Dependencies are individual skill directories, not a broad preset: updates must not
automatically discover additional skills. Adding a dependency or changing a major-version
boundary requires explicit review of its source, capabilities, and deployed files.

Do not run `npx skills` alongside APM or edit installed managed copies. Improve upstream skills
in their source repository and consume a reviewed release. Preserve repository-owned files
outside the managed inventory; do not use `apm install --force` to overwrite collisions.

## Daily automation

[APM Sync](./.github/workflows/apm-sync.yml) is a local copy of
`equinor/fusion-skills/.github/workflows/apm-sync.yml` (originally reviewed at
`40aa2ebfc983c92aed854725369013dc921dc30f`). This public repository cannot call that internal
repository's reusable workflow, so the steps live in the workflow file itself.
It runs at **08:17 UTC every day, including Saturday and Sunday**, and retains manual dispatch.
GitHub schedules are best-effort, not a strict 24-hour execution guarantee.

The workflow owns updating within manifest constraints, deployment, and PR creation.
It uses `chore/apm-sync`, reuses its open PR, and merges default-branch advances without a
force-push. A merge conflict fails for manual resolution; a no-change run must not create an
empty commit or PR. Do not add a second updater, release-pin rewriter, or discovery workflow.

The workflow grants only `contents: write` and `pull-requests: write`. Repository/organization
policy must permit its actions and GitHub Actions PR creation. PR creation uses `GITHUB_TOKEN`;
a maintainer may need to approve downstream PR workflows, and token-triggered pushes do not
start push workflows. Do not substitute another publishing mechanism if policy blocks it.

`equinor/fusion-skills` is internal, so the job token cannot clone it. The APM update step
receives the repository secret `APM_FUSION_SKILLS_TOKEN` as `GITHUB_APM_PAT_EQUINOR`; the token
needs read access to `equinor/fusion-skills` contents only. Without the secret the run falls
back to the job token and fails with an authentication error. Keep the APM version in the
workflow aligned with the one used here.

After explicit approval to publish and roll out:

1. Exercise a real allowed update and inspect the complete manifest/lock/deployed-context PR.
2. Rerun it and confirm the same PR is reused, including any reviewer-owned work.
3. Verify a no-change run creates no empty commit or duplicate PR.
4. Record a successful **scheduled** run on the default branch, not just a manual run.

These remote checks are rollout evidence, not established by a local installation.
With APM 0.29.0, local validation reported that organization-policy discovery could not
follow a GitHub API redirect for `equinor/.github`; built-in integrity/drift checks passed,
but organization-policy enforcement was skipped by APM. Resolve policy discovery with the
APM/policy owners before treating these checks as organization-policy approval.
The historical failed updater run
[38872979056](https://github.com/equinor/fusion-react-components/actions/runs/38872979056)
has no jobs; its runtime root cause is unverified. The missing manifest and obsolete callers
were independently confirmed configuration gaps.

## Legacy ownership reconciliation

Migration tracks equinor/fusion-core-tasks#2474, under equinor/fusion-core-tasks#2469.
The legacy `skills-lock.json` on base commit `2743ca3443c5a6c3c21aad4a00e7e03cf49d3b5d`
contained **31 entries**, all sourced from **equinor/fusion-skills**. Its historical contents
remain available in Git. Reconcile that inventory before removing the lock or old managed files.

The following 27 entries are retained as explicit APM dependencies at their upstream paths:

| Upstream directory | Retained entries |
| --- | --- |
| `skills/` | `fusion`, `fusion-developer-app`, `fusion-developer-portal`, `fusion-devtools`, `fusion-help-api`, `fusion-help-docs`, `fusion-help-integration`, `fusion-infra-cli`, `fusion-issue-authoring`, `fusion-roles-cli`, `fusion-rules`, `fusion-skill-authoring`, `fusion-skills` |
| `skills/.system/` | `equinor-design-system`, `fusion-code-conventions`, `fusion-research`, `fusion-rule-author` |
| `skills/.experimental/` | `fusion-core-services`, `fusion-dependency-review`, `fusion-design`, `fusion-framework-testing`, `fusion-github-review-resolution`, `fusion-issue-solving`, `fusion-issue-task-planning`, `fusion-mcp`, `fusion-package-scribe`, `fusion-pm-mcp` |

Despite its non-Fusion name, **equinor-design-system is supplied by equinor/fusion-skills**
at `skills/.system/equinor-design-system`, not by a different EDS repository.
Its design-token reference capability and source provenance are retained; it is unchanged
between the legacy deployment and the initial APM release.

The remaining four legacy entries are intentionally mapped rather than reinstalled:

| Legacy entry | Reconciliation |
| --- | --- |
| `fusion-backend-dev` | Deprecated upstream. Its client/API-consumption role is retained through `fusion-core-services` and `fusion-research`. Backend implementation remains outside this component repository; do not add the backend development preset. |
| `fusion-framework-feature-toggling` | Already absent from deployed files. Its replacement chain ends at retained `fusion-developer-app`. |
| `fusion-issue-author-feature` | Already absent from deployed files. Retained `fusion-issue-authoring` owns feature issue authoring. |
| `fusion-issue-author-user-story` | Already absent from deployed files. Retained `fusion-issue-authoring` owns user-story authoring. |

The tracked **fusion-framework-mocking** directory is **not in the legacy lock**.
It was added by the earlier discovery PR #3380 and matches the upstream
`skills/.experimental/fusion-framework-mocking` content at Fusion Skills v1.9.0.
It remains byte-for-byte unchanged and outside APM ownership in this migration.
Review any future adoption into APM separately; do not delete unowned files during pruning.
Other repository-authored instructions, agents, configuration, and historical PR drafts are untouched.

Only legacy lock-owned directories were removed before installing APM; installed content is
generated by APM, not locally rewritten. The old update caller and the caller of the removed
shared discovery workflow are replaced by one daily APM caller. No discovery replacement is
installed, so a dependency refresh cannot silently enroll new skills.
