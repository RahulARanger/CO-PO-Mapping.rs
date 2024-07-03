import type { Meta, StoryObj } from "@storybook/react";
import { AppShell } from "@mantine/core";
import TakeExcelFile from "./take-excel";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Utils/TakeExcelFile",
	component: TakeExcelFile,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: "centered",
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<AppShell>
				<Story />
			</AppShell>
		),
	],
} satisfies Meta<typeof TakeExcelFile>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const UploadFile: Story = {
	args: {
		onDrop: console.log
	},
};

export const LoadingState: Story = {
	args: {
		stimulateLoading: true,
		onDrop: console.log
	},
};
