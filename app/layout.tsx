import type { Metadata } from "next";
import { Inconsolata, Inter, Spectral } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const inconsolata = Inconsolata({
  weight: "200",
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
  title: "SaltandPeps",
  description: "Content Creator based in SG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${spectral.variable} ${inconsolata.className}`}
      >
        {children}
      </body>
    </html>
  );
}
