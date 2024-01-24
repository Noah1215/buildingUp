"use client";
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import theme from "./theme";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <GlobalStyles
          styles={{
            html: { boxSizing: "border-box", height: "100%" },
            body: {
              boxSizing: "border-box",
              height: "100%",
              margin: 0,
              background: "white",
            },
          }}
        />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
