import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/globals.css";
import Providers from "../lib/provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
