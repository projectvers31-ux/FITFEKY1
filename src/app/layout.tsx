import localFont from "next/font/local"
import Script from "next/script"

import type { Metadata, Viewport } from "next"

import { Footer } from "@/components/shared/Footer"
import { JsonLd } from "@/components/shared/JsonLd"
import { Navbar } from "@/components/shared/Navbar"
import { StyleGlideProvider } from "@/components/styleglide-provider"
import { ThemeProvider } from "@/components/theme-provider"
import "@/styles/globals.css"

const dmSans = localFont({
  src: [
    { path: "../../fonts/dm-sans/DMSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../fonts/dm-sans/DMSans-Italic.ttf", weight: "400", style: "italic" },
    { path: "../../fonts/dm-sans/DMSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../fonts/dm-sans/DMSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../fonts/dm-sans/DMSans-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-dm-sans",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
  fallback: ["system-ui", "sans-serif"],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fitfeky.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FitFeky — Smart Weight Loss Tools & Honest Reviews for Women",
    template: "%s | FitFeky",
  },
  description:
    "Free, science-backed weight loss calculators, a personal style quiz, and editor-tested product picks — built for women who want lasting results, not crash diets.",
  keywords: [
    "weight loss for women",
    "women's fitness",
    "calorie calculator for women",
    "macro calculator women",
    "body fat calculator",
    "women's weight loss plan",
    "hormone-friendly fat loss",
    "fitness tools for women",
    "honest product reviews",
  ],
  authors: [{ name: "FitFeky Editorial Team" }],
  creator: "FitFeky",
  publisher: "FitFeky",
  category: "Health & Wellness",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "FitFeky — Smart Weight Loss Tools for Women",
    description:
      "Free, science-backed calculators, a personal style quiz, and editor-tested product picks — built for lasting results.",
    siteName: "FitFeky",
    url: siteUrl,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FitFeky — Weight loss tools for women",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FitFeky — Smart Weight Loss Tools for Women",
    description:
      "Free, science-backed calculators and honest product reviews — built for lasting results.",
    images: ["/og-image.jpg"],
    creator: "@fitfeky",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FDF8F3" },
    { media: "(prefers-color-scheme: dark)", color: "#2B1F1A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const siteLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: "FitFeky",
        description:
          "Free, science-backed weight loss calculators, a personal style quiz, and editor-tested product picks for women.",
        inLanguage: "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/blog?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "FitFeky",
        url: `${siteUrl}/`,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/favicon/favicon.svg`,
        },
        sameAs: [
          "https://twitter.com/fitfeky",
          "https://pinterest.com/fitfeky",
          "https://instagram.com/fitfeky",
        ],
      },
      {
        "@type": "HealthAndBeautyBusiness",
        "@id": `${siteUrl}/#business`,
        name: "FitFeky",
        description:
          "Online resource for women's weight loss — calculators, reviews, and educational content.",
        url: `${siteUrl}/`,
        image: `${siteUrl}/og-image.jpg`,
      },
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://plausible.io" />
        <link rel="preconnect" href="https://plausible.io" />
        <JsonLd data={siteLd} />
      </head>
      <body className={`${dmSans.variable} antialiased`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {PLAUSIBLE_DOMAIN && (
            <Script
              defer
              data-domain={PLAUSIBLE_DOMAIN}
              src="https://plausible.io/js/script.js"
              strategy="afterInteractive"
            />
          )}
          <StyleGlideProvider />
          <Navbar />
          <main id="main-content" className="min-h-[calc(100vh-4rem)]">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
