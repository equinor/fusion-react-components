# Scaffold a new portal

Use the Fusion Framework CLI:

```sh
mkdir my-fusion-portal && cd my-fusion-portal
pnpm init
pnpm add -D @equinor/fusion-framework-cli
```

Create the required files:

- **`portal.manifest.ts`** — portal metadata and configuration:

```typescript
import { definePortalManifest } from '@equinor/fusion-framework-cli/portal';

export default definePortalManifest((env, { base }) => ({
  name: 'my-portal',
  version: '1.0.0',
  entry: './src/index.tsx',
}));
```

- **`portal.schema.ts`** (optional) — configuration validation schema
- **`src/index.tsx`** — portal entry point

Start the dev server:

```sh
pnpm fusion-framework-cli portal dev
# or: ffc portal dev
```
