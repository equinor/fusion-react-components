import { Meta, Story } from '@storybook/react';
import { Loader, LoaderProps } from '@equinor/fusion-react-loader/src';

export default {
  title: 'Examples/Loader',
  component: Loader,
} as Meta;

export const Component: Story<LoaderProps> = (props: LoaderProps) => <Loader {...props} />;
Component.args = {
  text: 'Loading React Components',
};
