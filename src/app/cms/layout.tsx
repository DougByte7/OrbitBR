import React from "react";

import "@mantine/core/styles.css";

import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

export const metadata = {
  title: "Orbit CMS",
};

const theme = createTheme({
  primaryColor: "primary",
  colors: {
    primary: [
      "#6c31ed",
      "#6c31ed",
      "#6c31ed",
      "#6c31ed",
      "#6c31ed",
      "#6c31ed",
      "#6c31ed",
      "#6c31ed",
      "#6c31ed",
      "#6c31ed",
    ],
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <head>
        <ColorSchemeScript />
      </head>
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />

      <MantineProvider forceColorScheme="dark" theme={theme}>
        <ModalsProvider>{children}</ModalsProvider>
      </MantineProvider>
    </>
  );
}
