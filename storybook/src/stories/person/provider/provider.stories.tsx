import { Meta, StoryObj } from '@storybook/react-vite';

import { PersonProvider, PersonResolver, PersonSelect, PersonSearchResult } from '@equinor/fusion-react-person';

import { Theme } from '../../../components/Theme';
import { resolver as mainResolver } from '../person-resolver';

const meta: Meta<typeof PersonSelect> = {
  title: 'person/Provider',
  component: PersonProvider,
};

export default meta;

export const resolver: PersonResolver = {
  search: (args) => {
    const method = mainResolver.search;

    if (method) {
      const found = method(args) as PersonSearchResult;
      return found.slice(0, 3);
    }

    return [];
  },
};

type Story = StoryObj<typeof PersonProvider>;

export const customProvider: Story = {
  decorators: [
    (Story) => (
      <Theme>
        <PersonProvider resolve={mainResolver}>
          <Story />
        </PersonProvider>
      </Theme>
    ),
  ],
  args: {
    resolve: resolver,
  },
  render: (props) => {
    return (
      <PersonProvider {...props}>
        <PersonSelect />
      </PersonProvider>
    );
  },
};
