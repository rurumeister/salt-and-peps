import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Cutive, Inconsolata, Inter, Spectral } from "next/font/google";
import React from "react";
import ClientProviders from "./ClientProviders";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const cutive = Cutive({
  weight: "400",
  variable: "--font-cutive",
  display: "swap",
  subsets: ["latin"],
});
const inconsolata = Inconsolata({
  weight: ["200", "500", "600"],
  variable: "--font-inconsolata",
  display: "swap",
  subsets: ["latin"],
});

const spectral = Spectral({
  weight: "400",
  variable: "--font-spectral",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SaltandPeps - Photography, Pre-Wedding, Content Creator Singapore",
  description:
    "SaltandPeps: Professional Photography, Pre-Wedding, and Content Creation services in Singapore. Explore our gallery and services.",
  keywords: "Photography, Pre-Wedding, Content Creator, Singapore, SaltandPeps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="author" content="SaltandPeps" />
        <meta
          name="google-site-verification"
          content="xVxh85h8MAid6JFbrKCSX5xv5THBc3xvMMINxi3NKzk"
        />
        <link rel="canonical" href="https://www.saltandpeps.com" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icon/favicon-16x16.png"
        />
      </head>
      <body
        className={`${inter.className} ${spectral.variable} ${inconsolata.className} ${cutive.className}`}
      >
        <ClientProviders>
          {children}
          <Analytics />
          <SpeedInsights />
        </ClientProviders>
      </body>
    </html>
  );
}
