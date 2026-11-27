# Help API service discovery

## Instructions

### 1. Discover the Help API base URL

Resolve URL dynamically or use known patterns:

| Environment | Base URL |
|-------------|----------|
| `ci` | `https://help.ci.api.fusion-dev.net` |
| `fqa` | `https://help.fqa.api.fusion-dev.net` |
| `fprd` | `https://help.api.fusion.equinor.com` |

**Dynamic discovery** (recommended for production tooling):

```
GET https://discovery.fusion.equinor.com/service-registry/environments/{env}/services
```

Look for the service with `key: "help"` in the response. Use the `uri` field as the base URL.
