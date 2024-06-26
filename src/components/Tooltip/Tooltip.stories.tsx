import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { DownloadIcon } from 'lucide-react';

import { Tooltip } from './Tooltip.js';

type Story = StoryObj<typeof Tooltip>;

export default {
  component: Tooltip,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} as Meta<typeof Tooltip>;

export const Outline: Story = {
  args: {
    children: (
      <React.Fragment>
        <Tooltip.Trigger>Hover</Tooltip.Trigger>
        <Tooltip.Content>
          <p>Add to library</p>
        </Tooltip.Content>
      </React.Fragment>
    )
  }
};

export const Icon: Story = {
  args: {
    children: (
      <React.Fragment>
        <Tooltip.Trigger size="icon">
          <DownloadIcon />
        </Tooltip.Trigger>
        <Tooltip.Content>
          <p>Add to library</p>
        </Tooltip.Content>
      </React.Fragment>
    )
  }
};
