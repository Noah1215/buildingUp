import * as React from "react";
import HomePage from "./page";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";

export const metadata = {
  title: "Building Up Alumni",
  description: "Building Up Alumni Web Page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        style={{
          background: "white",
          margin: 0,
        }}
      >
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
