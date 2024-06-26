import type { Meta, StoryObj } from '@storybook/react';

import { Label } from './Label.js';

type Story = StoryObj<typeof Label>;

export default { component: Label, tags: ['autodocs'] } as Meta<typeof Label>;

export const Default: Story = {
  args: {
    children: 'My Label'
  }
};
