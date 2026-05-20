# Shared UI Props Reference

Reference for `@fra/ui` component interfaces relevant to Fusion Help integration. Components are already implemented — **do not modify them**.

## PageHeaderProps

Defined in `shared/ui/src/components/layout/page-layout/components/page-header/PageHeaderUtil.ts`.

```typescript
export interface PageHeaderProps {
    title: string;
    subtitle?: string;
    description?: string;
    openHelpArticle?: () => void;
    openReleaseNotes?: () => void;
    helpTooltipText?: string;
    breadcrumbs?: Breadcrumb[];
    hideDescription?: boolean;
    setHideDescription?: (hide: boolean) => void;
    collapsed?: boolean;
    covering?: boolean;
    children?: ReactNode;
}
```

### Help-relevant props

| Prop | Type | Description |
|------|------|-------------|
| `openHelpArticle` | `() => void` | Callback to open a help article. When provided, renders a `FusionHelpButton` in the header actions area. When `undefined`, no help button appears. |
| `openReleaseNotes` | `() => void` | Callback to open release notes. When provided, renders a `WhatsNewButton` in the header (only visible when header is not collapsed). |
| `helpTooltipText` | `string` | Optional tooltip text for the help button. Passed through to `FusionHelpButton`. |

### Behavior

- `PageLayout` extends `PageHeaderProps`, passes props to `PageHeader`
- `FusionHelpButton` renders only when `openHelpArticle` truthy
- `WhatsNewButton` renders when `openReleaseNotes` truthy and header not collapsed
- Help button wrapped in `fusion-help` anchor for `@fra/announcements`

## FusionHelpButtonProps

Defined in `shared/ui/src/components/common/fusion-help-button/FusionHelpButtonUtil.ts`.

```typescript
type ButtonDensity = 'comfortable' | 'compact';

export interface FusionHelpButtonProps {
    tooltipText?: string;
    openHelpArticle?: () => void;
    density?: ButtonDensity;
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tooltipText` | `string` | `''` | Tooltip shown on hover. |
| `openHelpArticle` | `() => void` | — | Click handler. When `undefined`, the button shows `no-pointer` cursor style. |
| `density` | `ButtonDensity` | `'comfortable'` | EDS density variant. |

### Visual

- Ghost icon button with `info_circle` from `@equinor/eds-icons`
- Icon color: `theme.colors.interactive.primary__resting` (Equinor blue)
- Wrapped in `EdsProvider` for density
- Wrapped in `Tooltip` from `@equinor/eds-core-react`

## useHelpCenter Hook

Provided by `@equinor/fusion-framework-react-app/help-center` (external — not part of this monorepo).

```typescript
import { useHelpCenter } from '@equinor/fusion-framework-react-app/help-center';

const { openArticle, openReleaseNotes } = useHelpCenter();
```

| Return | Type | Description |
|--------|------|-------------|
| `openArticle` | `(slug: string) => void` | Opens the Fusion Help sidesheet and navigates to the article matching the slug. |
| `openReleaseNotes` | `() => void` | Opens the Fusion Help sidesheet on the release notes view. |

### Important notes

- Must be called inside a component descended from the Fusion Framework app shell (`makeComponent` / `renderApp`)
- `openArticle` requires a slug argument — always wrap it: `() => openArticle(slug)`
- If slug doesn't match a published article, sidesheet opens but shows no content (silent failure)
- Available in all apps that depend on `@equinor/fusion-framework-react-app`
