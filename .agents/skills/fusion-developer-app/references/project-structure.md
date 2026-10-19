# Project Structure

Directory layout, layer responsibilities, file placement, tooling, and commit conventions for Fusion Framework apps.

## Directory structure

Typical Fusion app layout:

```
src/
├── App.tsx           # Root component — layout shell, routing
├── config.ts         # Fusion module configuration
├── index.ts          # Entry point (do not modify)
├── components/       # React components (presentation layer)
├── hooks/            # Custom React hooks
├── api/              # API clients, response schemas, data transforms
└── types/            # TypeScript interfaces, type aliases, enums
```

Projects may add directories (e.g. `pages/`, `utils/`, `context/`). Check existing structure first.
When the app grows beyond a few pages or gains workflows with their own state, move to the
[layered layout](#layered-layout-for-growing-apps).

## Layer responsibilities

| Layer        | Purpose                                    | Example files                |
|--------------|--------------------------------------------|------------------------------|
| `components` | Presentation: render UI, handle user events| `DataGrid.tsx`, `Header.tsx` |
| `hooks`      | State & side effects: encapsulate logic    | `useItems.ts`, `useFilter.ts`|
| `api`        | API clients, response schemas, data transforms | `itemApi.ts`               |
| `types`      | Type definitions: shared interfaces/enums  | `item.ts`, `api.ts`          |

## File placement rules

- One primary export per file (component, hook, service, or type module).
- Co-locate related files: a page component and its dedicated hook can share a directory.
- Barrel exports (`index.ts`) are optional — use when a directory has 3+ exports.

## Layered layout for growing apps

Once an app has several pages, workflows with their own state, or rules shared between pages,
separate the code that **decides** from the code that **draws**, and let dependencies point one way:

| Folder | Holds | May import |
| --- | --- | --- |
| `api/` | Gateways to external services: response schemas, requests, React Query hooks | nothing above it |
| `domain/` | Application logic and state: stores, flows, selectors, rules, settings | `api` |
| `components/` | Rendering of the domain, with helpers and labels only it uses | `api`, `domain` |
| `routes/` | Pages: compose components and providers, and route the domain | all of the above |

App bootstrap files (`index.ts`, `config.ts`, `routes.ts`) stay at the root.

- **`api/` holds no business logic.** It fetches, validates, and maps external data. Decisions about
  that data (status, permissions, available commands) belong in `domain/`.
- **Domains are business areas, not pages.** Name them after the data they own (`domain/work-order`,
  `domain/access`, `domain/settings`). Logic used by one page belongs to the domain whose data it
  works on, or stays beside its component when it is a small helper.
- **A domain exposes a small public surface.** Its `index.ts` exports its provider, hooks, and
  types; selectors and schemas are imported from their own modules. Keep every persisted user
  setting in one settings domain.
- **Providers do not render dialogs.** A domain provider builds its state and context; a component
  mounted inside it renders what that state shows.
- **Components compose; they are not a library.** Use one PascalCase folder per feature, named after
  what it is, with an `index.ts` for what routes and other features use. Parts of a feature sit inside
  it; nothing moves to a shared folder until a second feature needs it. Keep a small `Common/` for
  primitives every feature uses (messages, loading and error states).
- **Routes own the page.** A route renders the page chrome and composes components; a component never
  draws a page around itself.
- A self-contained feature that spans layers (for example guided tours) may live in its own folder
  with an explicit, documented place in the import table.

Add path aliases (`@api/*`, `@domain/*`, `@components/*`) in `tsconfig.json` `paths` and the
bundler, so imports state their layer.

### Enforce the direction with a test

A layering rule that is not checked erodes. A small Vitest test reads every source file and fails
when a layer imports one it may not:

```ts
// src/layers.test.ts
import { expect, test } from 'vitest';

const allowedImports: Record<string, readonly string[]> = {
  api: [],
  domain: ['api'],
  components: ['api', 'domain'],
  routes: ['api', 'domain', 'components'],
};

const sources = import.meta.glob<string>(['./**/*.{ts,tsx}', '!./**/*.test.{ts,tsx}'], {
  query: '?raw',
  import: 'default',
  eager: true,
});

const layerOf = (path: string) => path.split('/')[1];

const resolveLayer = (file: string, specifier: string) => {
  const alias = /^@(api|domain|components)(\/|$)/.exec(specifier);
  if (alias) return alias[1];
  if (!specifier.startsWith('.')) return null;
  const parts = file.split('/').slice(0, -1);
  for (const segment of specifier.split('/')) {
    if (segment === '..') parts.pop();
    else if (segment !== '.') parts.push(segment);
  }
  return parts[1] ?? null;
};

test('each layer imports only the layers below it', () => {
  const violations = Object.entries(sources).flatMap(([file, source]) => {
    const allowed = allowedImports[layerOf(file)];
    if (!allowed) return [];
    return [...source.matchAll(/from\s+'([^']+)'/g)]
      .map(([, specifier]) => ({ specifier, target: resolveLayer(file, specifier) }))
      .filter(({ target }) => target && target !== layerOf(file) && target in allowedImports)
      .filter(({ target }) => !allowed.includes(target as string))
      .map(({ specifier }) => `${file} imports ${specifier}`);
  });
  expect(violations).toEqual([]);
});
```

Place the test at `src/` so `import.meta.glob` paths start with `./<layer>/`. Record the layout in an
ADR so reviewers can point to it.

## Tooling

Check the project's `package.json` scripts and installed devDependencies for exact commands. Common Fusion app tooling:

| Tool          | Typical command            | Purpose                      |
|---------------|----------------------------|------------------------------|
| TypeScript    | `typecheck` / `tsc --noEmit` | Type checking (strict mode)|
| Biome         | `biome check src/`         | Lint + format validation     |
| ESLint        | `eslint src/`              | Lint (if project uses it)    |
| Dev server    | `dev`                      | Start Fusion CLI dev server  |
| Build         | `build`                    | Production build             |

Run commands via the project's package manager (`bun run`, `pnpm`, `npm run`).

## Commit conventions

Use conventional commits for all changes:

| Prefix      | When to use                                  |
|-------------|----------------------------------------------|
| `feat:`     | New feature or capability                    |
| `fix:`      | Bug fix                                      |
| `refactor:` | Code restructuring without behavior change   |
| `docs:`     | Documentation only                           |
| `style:`    | Formatting, whitespace, missing semicolons   |
| `test:`     | Adding or fixing tests                       |
| `chore:`    | Build, tooling, dependency updates           |

## Architecture Decision Records

Check for ADRs in `docs/adr/`. Follow them. Propose new ADRs for architectural decisions not already covered.
