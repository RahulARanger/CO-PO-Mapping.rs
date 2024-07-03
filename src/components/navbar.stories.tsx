import type { Meta, StoryObj } from '@storybook/react';
import Navbar from "@/components/navbar"
import { AppShell } from '@mantine/core';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Main/Navbar',
  component: Navbar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <AppShell>
        <Story/>
      </AppShell>
    )
  ],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Step1: Story = {
  args: {
    stepIndex: 0
  },
};


export const Step2: Story = {
  args: {
    stepIndex: 1
  },
};
