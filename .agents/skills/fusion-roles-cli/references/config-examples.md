# Minimal Roles V2 config

Include `$schema`; follow SKILL.md dry-run and approval gates before deployment.

Minimal example (`roles-config.json`):

```json
{
  "$schema": "https://rolesv2.api.fusion.equinor.com/public/schemas/role-config.schema.json",
  "accessRoles": [
    {
      "systemIdentifier": "my-service",
      "name": "MyService.Project.Read",
      "description": "Read access to project resources"
    }
  ],
  "roles": [
    {
      "name": "project-viewer",
      "displayName": "Project Viewer",
      "accessRoleMappings": [
        { "accessRoleIdentifier": "MyService.Project.Read" }
      ]
    }
  ]
}
```
