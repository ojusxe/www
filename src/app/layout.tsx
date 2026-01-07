import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Container } from "../components/ui/container";
import Footer from "../components/footer";
import Header from "../components/header";
import { ThemeProvider } from "../contexts/theme-context";
import config from "../constants/config";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "dev -- ojus",
    template: "%s -- ojus",
  },
  description: config.SITE_DESCRIPTION,
  robots: "index, follow",
  metadataBase: new URL(config.SITE_URL),
  openGraph: {
    title: config.SITE_NAME,
    description: config.SITE_DESCRIPTION,
    url: config.SITE_URL,
    siteName: config.SITE_NAME,
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
        alt: config.SITE_NAME,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.SITE_NAME,
    description: config.SITE_DESCRIPTION,
    images: ["/opengraph.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetBrainsMono.variable} antialiased`}
    >
      <head>
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="font-inter bg-background text-foreground relative w-full min-h-screen background">
        <ThemeProvider>
          <main className="flex flex-col w-full h-full max-w-xl mx-auto justify-start min-h-screen px-4 md:px-0">
            <Header />
            <Container>
              {children}
              <Analytics />
            </Container>
          </main>
          <Footer />
          <div
            id="ascii-display"
            aria-hidden="true"
            className="ascii-display opacity"
          ></div>
        </ThemeProvider>
      </body>
    </html>
  );
}
