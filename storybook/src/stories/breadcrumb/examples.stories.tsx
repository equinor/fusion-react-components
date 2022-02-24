import { Meta, Story } from '@storybook/react';
import { Breadcrumb, BreadcrumbProps } from '@equinor/fusion-react-breadcrumb/src';
import { BreadcrumbItemProps } from 'breadcrumb/src/types';
import { MemoryRouter } from 'react-router-dom';
import { theme } from '@equinor/fusion-react-styles';

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
  parameters: {
    chromatic: { disableSnapshot: false },
  },
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
  <div
    style={{
      color: theme.colors.text.static_icons__tertiary.getVariable('color'),
    }}
  >
    <Breadcrumb isFetching={false} currentLevel={3} breadcrumbs={breadcrumbs} />
  </div>
);
Colored.parameters = {
  docs: {
    storyDescription: `Controlled by parent color. Color should preferably not be black, use EDS Color Tokens for text.`,
  },
};

export const NoHoverColor: Story = () => (
  <div
    style={{
      color: theme.colors.text.static_icons__default.getVariable('color'),
    }}
  >
    <Breadcrumb isFetching={false} currentLevel={3} breadcrumbs={breadcrumbs} hasHoverColor={false} />
  </div>
);
NoHoverColor.parameters = {
  docs: {
    storyDescription: `Hover color is inherited if hasHoverColor is false.`,
  },
};

export const Fetching: Story = () => (
  <div>
    <Breadcrumb isFetching={true} currentLevel={3} breadcrumbs={breadcrumbs} />
  </div>
);
Fetching.parameters = {
  docs: {
    storyDescription: `Displaying XSmall text skeletons when isFetching is true.`,
  },
};
