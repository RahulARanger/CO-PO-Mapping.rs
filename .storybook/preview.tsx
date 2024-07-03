import '@mantine/core/styles.css';
import React from "react";
import type { Preview } from "@storybook/react";
import {Provider} from "../src/app/layout"

export const decorators = [
  (renderStory: any) => (<Provider>{renderStory()}</Provider>)
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
