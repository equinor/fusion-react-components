# @equinor/fusion-react-layout [![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-react-layout.svg)](https://www.npmjs.com/package/@equinor/fusion-react-layout)

Component for handling layout in your application.

Use this package to compose app-level layouts with an optional sidebar and page sections for header, main content, and footer.

## [Storybook](https://equinor.github.io/fusion-react-components/?path=/docs/ui-layout)

## Installation

```sh
npm install @equinor/fusion-react-layout
```

Or using pnpm:

```sh
pnpm install @equinor/fusion-react-layout
```

## Components

### `Layout`

`Layout` is the top-level container. It renders the application shell and accepts two child components:

- `Layout.Sidebar` for sidebar content
- `Layout.Content` for the main content area

If `Layout.Sidebar` is omitted, the layout automatically renders without a sidebar.

### `Layout.Sidebar`

`Layout.Sidebar` places its children in the layout sidebar slot. Use it for navigation, filters, secondary actions, or supporting information.

### `Layout.Content`

`Layout.Content` places its children in the main content slot. This is typically where you render pages, dashboards, or other primary content.

### `Page`

`Page` is a page-level wrapper that can be rendered inside `Layout.Content`. It provides structured slots for common page sections:

- `Page.Header`
- `Page.Main`
- `Page.Footer`

### `Page.Header`

Use `Page.Header` for page titles, summaries, breadcrumbs, and top-level actions.

### `Page.Main`

Use `Page.Main` for the primary page content.

### `Page.Footer`

Use `Page.Footer` for secondary actions, metadata, or status information shown at the bottom of the page.

## Usage

### Import from the main entry point

```ts
import { Layout, Page } from '@equinor/fusion-react-layout';
```

### Basic layout

Use `Layout` with `Layout.Content` when your view does not need a sidebar.

```tsx
import { Layout } from '@equinor/fusion-react-layout';

export function Example() {
  return (
    <Layout>
      <Layout.Content>
        <h1>Main content</h1>
        <p>This area is used for the primary content of the application.</p>
      </Layout.Content>
    </Layout>
  );
}
```

### Layout with sidebar

Add `Layout.Sidebar` when the page needs navigation or supporting content.

```tsx
import { Layout } from '@equinor/fusion-react-layout';

export function Example() {
  return (
    <Layout>
      <Layout.Sidebar>
        <h2>Navigation</h2>
        <p>Sidebar content goes here.</p>
      </Layout.Sidebar>
      <Layout.Content>
        <h1>Main content</h1>
        <p>This is the primary application area.</p>
      </Layout.Content>
    </Layout>
  );
}
```

### Page structure inside layout content

Render `Page` inside `Layout.Content` when you want to split a page into header, main, and footer sections.

```tsx
import { Layout, Page } from '@equinor/fusion-react-layout';

export function Example() {
  return (
    <Layout>
      <Layout.Content>
        <Page>
          <Page.Header>
            <h1>Page title</h1>
            <p>Short description of the current page.</p>
          </Page.Header>
          <Page.Main>
            <p>This is the main page content.</p>
          </Page.Main>
          <Page.Footer>
            <p>Last updated just now.</p>
          </Page.Footer>
        </Page>
      </Layout.Content>
    </Layout>
  );
}
```

### Full example with sidebar and page sections

```tsx
import { Layout, Page } from '@equinor/fusion-react-layout';

export function Example() {
  return (
    <Layout>
      <Layout.Sidebar>
        <h2>Filters</h2>
        <p>Use the sidebar for contextual tools and navigation.</p>
      </Layout.Sidebar>
      <Layout.Content>
        <Page>
          <Page.Header>
            <h1>Projects</h1>
          </Page.Header>
          <Page.Main>
            <p>Project overview content.</p>
          </Page.Main>
          <Page.Footer>
            <p>Showing 24 results.</p>
          </Page.Footer>
        </Page>
      </Layout.Content>
    </Layout>
  );
}
```

## Notes

- `Layout` detects whether `Layout.Sidebar` is present and enables the sidebar slot automatically.
- `Page` is optional. You can render any content directly inside `Layout.Content`.
