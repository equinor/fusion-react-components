# Migrate Legacy Database Access Policies to Roles V2

Source of truth: [finf Database Access Policy](https://github.com/equinor/fusion-core-services/blob/main/tooling/fusion-infra-cli/Fusion.Infra.Cli/README.md#database-access-policy) and [Roles V2 sample](https://github.com/equinor/fusion-core-services/blob/main/tooling/fusion-infra-cli/Fusion.Infra.Cli/db-config.roles-v2.sample.json). Check deployed CLI, InfraSupport and SQL-access workflow compatibility before rollout; repository examples do not prove deployment readiness.

## 1. Inventory Without Writes

- Identify configs and provisioning call sites for each environment, including PRs and CLI overrides. Record database naming, SQL principals and migration steps to preserve.
- Record `administratorGroupName`, `developerGroupName`, and actual database `adm-acg` / `dev-acg` tags when accessible. They contain legacy app-role values, not Entra security-group IDs.
- In Entra, locate the Fusion Developer Tools app registration's `appRoles` definitions and enterprise application's Users and groups assignments. Verify tenant, application ID and role ID before matching `acg-*` values. Microsoft Graph read-only equivalents: `GET /servicePrincipals/{id}?$select=id,appId,displayName,appRoles` and paginated `GET /servicePrincipals/{id}/appRoleAssignedTo`; filter assignments by matched `appRoleId`.
- Keep user and group assignments distinct; groups retain object IDs. Flag application principals, unresolved identities and ambiguous mappings for review. Do not silently flatten groups into individual users or treat group display names as IDs.
- If directory access is unavailable, report the permission blocker and request an owner-provided inventory; never request tokens or secrets.

## 2. Obtain an Approved Policy

Legacy membership is evidence for a candidate, not approval to grant new rights. The old admin/developer distinction does not map mechanically: Roles V2 autoapproval covers both reader and owner requests, while approvers must be explicit users. Confirm the intended access with the database owner, especially for production.

Record approved autoapproval users/groups and explicit approver users per environment. Do not infer approvers from legacy administrators or broaden a reader-only population to owner autoapproval. Stop before replacing a live config if these decisions remain unresolved; present a candidate and missing inputs instead of inserting placeholder identities or empty policy lists.

## 3. Edit Configuration Only

- Replace legacy names with sibling `accessControl.autoApproval` and `accessControl.approvers` using the schema example directly linked from SKILL.md. Preserve database name, environment, `configuration`, SQL permissions, metadata, annotations and pipeline SQL-principal overrides.
- Remove both legacy fields for an approved Roles V2-only cutover. Retain both only for an explicitly agreed compatibility window; do not claim retention guarantees fallback behavior.
- Choose embedded policies or environment-specific `--access-file`. External files contain top-level `autoApproval` / `approvers`, replace both sections, and clear omitted sections. Review the effective policy, not just JSON syntax.
- CI and production are separate policies. PR provisioning manages a separate shared PR-family policy, not per-PR assignments or automatic CI inheritance. Supply FQA/test policies explicitly too. Keep existing PR copy behavior; CI is required only when copying.
- Use `autoApproval`, never the rejected `requestors` property. Never transplant sample identities or a PR/copy sample wholesale into CI/production.

## 4. Validate and Roll Out With Approval

Validate JSON, required identity fields, explicit approver users and absence of unintended SQL/naming changes. Review all affected environment/pipeline paths; ensure `--access-file` cannot clear policy unexpectedly. Report config-only validation separately from live verification.

After explicit provisioning approval, pilot one service in CI. Verify expected scoped assignments/bindings, repeat provisioning, reader/owner autoapproval, manual review and approver routing. Policy membership must not grant SQL access by itself. Verify environment isolation and unchanged service-principal SQL permissions/migrations before expanding rollout. Production requires separate approval and `--production`.

## 5. Assess Legacy Cleanup Separately

Do not delete Entra roles, role assignments, security groups or database tags during config conversion. Inventory all remaining consumers, including databases outside the repository. Shared roles such as `acg-fusion-core` cannot be retired after migrating only one service.

Check whether reprovisioning removes old tags; do not assume. Once no consumers depend on them, propose removal of obsolete `adm-acg` / `dev-acg` tags, app-role assignments and definitions for separate explicit approval. Retain shared security groups used by Roles V2 or other applications. Record retained/removed resources and rationale.