# Page wiring recipe

## Instructions

### 2. Determine slug convention

Check if app already has a constants file with slugs:

- **Has existing slugs** → follow its naming pattern
- **No existing slugs** → use `{app-name}-{page-kebab}` convention

Reference existing conventions:

| App | Convention | Example |
|-----|-----------|---------|
| `fra-access-manager` | `{app-name}-{page-kebab}` | `fra-access-manager-access-groups` |
| `fra-app-management` | Unprefixed page name | `overview`, `requests` |
| `personnel-allocation` | `{app-name}-{page-kebab}` | `personnel-allocation-overview` |

Prefer prefixed convention for new apps — avoids slug collisions across apps.

### 3. Create or update the constants file

Create `src/constants/helpArticles.ts` (or the app's chosen location):

```typescript
export const FUSION_HELP_ARTICLES = {
    PAGE_NAME: '{app-name}-{page-kebab}',
};
```

Keys are `SCREAMING_SNAKE_CASE` matching the page concept. Values are kebab-case slug strings.

### 4. Wire each target page

For each page component that uses `PageLayout`:

**a. Add imports** (externals first, then `@fra/*`, then `@/*` aliases, then relative):

```typescript
import { useHelpCenter } from '@equinor/fusion-framework-react-app/help-center';

import { PageLayout } from '@fra/ui';

import { FUSION_HELP_ARTICLES } from '@/constants/helpArticles';
```

**b. Destructure the hook** inside the component body:

```typescript
const { openArticle, openReleaseNotes } = useHelpCenter();
```

If release notes not needed, destructure only `{ openArticle }`.

**c. Pass props to `PageLayout`**:

```tsx
<PageLayout
    title="Page Title"
    openHelpArticle={() => openArticle(FUSION_HELP_ARTICLES.PAGE_NAME)}
    openReleaseNotes={openReleaseNotes}
>
```

**Important**: `openHelpArticle` must be a **callback wrapper** `() => openArticle(slug)`, not a direct reference — `openArticle` requires the slug argument.
