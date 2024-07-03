// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import darkTheme from '@/themes';
import React from "react";
import type { ReactNode } from 'react';
import './globals.css';
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';

export const metadata = {
  title: 'My Mantine app',
  description: 'I have followed setup instructions carefully',
};

export function Provider(properties: {children: ReactNode}): ReactNode{
  return  <MantineProvider theme={darkTheme} defaultColorScheme='dark'>{properties.children}</MantineProvider>
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
       <Provider>
        {children}
        </Provider>
      </body>
    </html>
  );
}