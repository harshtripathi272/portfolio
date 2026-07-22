import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";

import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScrollProvider } from "@/components/smooth-scroll";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Preloader } from "@/components/kinetic/preloader";
import { Cursor } from "@/components/kinetic/cursor";

import "./globals.css";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Used only for the italic emphasis words, so a single weight is plenty.
const fontSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: `${DATA.name} — ML & Full-stack Engineer`,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: DATA.name,
    description: DATA.description,
    url: DATA.url,
    siteName: DATA.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: DATA.name,
    card: "summary_large_image",
  },
  icons: { icon: "/me-circle.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "antialiased",
          fontSans.variable,
          fontMono.variable,
          fontSerif.variable
        )}
        style={{ ["--font-display" as string]: "var(--font-sans)" }}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Preloader />
          <Cursor />
          <div className="grain" aria-hidden />
          <SmoothScrollProvider>
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
