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
        <link
          rel="mask-icon"
          href="/icon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: "https://www.saltandpeps.com",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://www.saltandpeps.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </script>

        {/* <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "SaltandPeps",
            url: "https://www.saltandpeps.com",
            logo: "https://www.saltandpeps.com/logo.png",
            sameAs: [
              "https://www.facebook.com/saltandpeps",
              "https://www.instagram.com/saltandpeps",
            ],
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+1-800-555-1212",
              contactType: "Customer Service",
            },
          })}
        </script> */}

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.saltandpeps.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "About",
                item: "https://www.saltandpeps.com/about",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Contact",
                item: "https://www.saltandpeps.com/contact",
              },
            ],
          })}
        </script>
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
