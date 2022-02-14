import { Meta, Story } from '@storybook/react';
import { Breadcrumb, BreadcrumbProps } from '@equinor/fusion-react-breadcrumb/src';
import { BreadcrumbItemProps } from 'breadcrumb/src/types';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Examples/Breadcrumb',
  component: Breadcrumb,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

const breadcrumbs: BreadcrumbItemProps[] = [
  { link: '/link-to-domain', name: 'Domain', isActive: false },
  { link: '/link-to-kingdom', name: 'Kingdom', isActive: false },
  { link: '/link-to-phylum', name: 'Phylum', isActive: false },
  { link: '/link-to-class', name: 'Class', isActive: true },
];

export const Component: Story<BreadcrumbProps> = (props: BreadcrumbProps) => (
  <Breadcrumb {...props} breadcrumbs={breadcrumbs} />
);

export const Simple: Story = () => <Breadcrumb currentLevel={3} isFetching={false} breadcrumbs={breadcrumbs} />;

export const Colored: Story = () => (
  <div style={{ color: 'salmon' }}>
    <Breadcrumb isFetching={false} currentLevel={3} breadcrumbs={breadcrumbs} />
  </div>
);

export const Fetching: Story = () => (
  <div>
    <Breadcrumb isFetching={true} currentLevel={3} breadcrumbs={breadcrumbs} />
  </div>
);
