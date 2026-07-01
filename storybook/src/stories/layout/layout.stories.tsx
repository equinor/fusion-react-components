import type { Meta, StoryObj } from '@storybook/react-vite';

import { Layout, Page } from '@equinor/fusion-react-layout';

const meta: Meta<typeof Layout> = {
  title: 'ui/Layout',
  component: Layout,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const content: Story = {
  render: () => (
    <Layout>
      <Layout.Content>
        <h1>Main Content</h1>
        <p>This is the main content area</p>
      </Layout.Content>
    </Layout>
  ),
};

export const sidebar: Story = {
  render: () => (
    <Layout>
      <Layout.Sidebar>
        <h2>Sidebar</h2>
        <p>This is the sidebar content</p>
      </Layout.Sidebar>
      <Layout.Content>
        <h1>Main Content</h1>
        <p>This is the main content area</p>
      </Layout.Content>
    </Layout>
  ),
};

export const page: Story = {
  render: () => (
    <Layout>
      <Layout.Content>
        <Page>
          <Page.Header>
            <h1>Page Header</h1>
          </Page.Header>
          <Page.Main>
            <p>This is the main content of the page</p>
          </Page.Main>
          <Page.Footer>
            <p>Page Footer</p>
          </Page.Footer>
        </Page>
      </Layout.Content>
    </Layout>
  ),
};

export const pageAndSidebar: Story = {
  render: () => (
    <Layout>
      <Layout.Sidebar>
        <h2>Sidebar</h2>
        <p>This is the sidebar content</p>
      </Layout.Sidebar>
      <Layout.Content>
        <Page>
          <Page.Header>
            <h1>Page Header</h1>
          </Page.Header>
          <Page.Main>
            <p>This is the main content of the page</p>
          </Page.Main>
          <Page.Footer>
            <p>Page Footer</p>
          </Page.Footer>
        </Page>
      </Layout.Content>
    </Layout>
  ),
};
