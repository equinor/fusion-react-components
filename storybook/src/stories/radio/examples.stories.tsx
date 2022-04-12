import { Meta, Story } from '@storybook/react';
import { Radio, RadioProps } from '@equinor/fusion-react-radio/src';

export default {
  title: 'Examples/Radio',
  component: Radio,
} as Meta;

export const Component: Story = (props: Omit<RadioProps, 'ref'>) => {
  const label = props.label ?? props.name;
  return (
    <div style={{ display: 'flex', flexFlow: 'column' }}>
      <Radio {...props} label={`${label}-1`} />
      <Radio {...props} label={`${label}-2`} />
      <Radio {...props} label={`${label}-3`} />
    </div>
  );
};

Component.args = {
  name: 'test',
  label: 'radio',
};
