/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { Canvas, Story } from '@storybook/addon-docs';

type StoryExampleProps = {
  storyId: string;
  showSource?: boolean;
};
export const StoryExample = ({ storyId, showSource }: StoryExampleProps): React.ReactElement => {
  return (
    <div>
      {/** @ts-ignore */}
      <Canvas withSource={showSource ? 'open' : undefined}>
        <Story name="Component" id={storyId} />
      </Canvas>
      <a href={`?path=/docs/${storyId}`}>Show story</a>
    </div>
  );
};
