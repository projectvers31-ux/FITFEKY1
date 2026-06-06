import type { MetadataRoute } from "next"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fitfeky.com"

const DISALLOWED_PATHS = ["/api/", "/admin/"] as const
const DISALLOWED_DRAFT_PATTERNS = [
  "/?draft=*",
  "/?*draft=*",
  "/?preview=*",
  "/?*preview=*",
  "/draft/",
  "/drafts/",
  "/preview/",
] as const

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [...DISALLOWED_PATHS, ...DISALLOWED_DRAFT_PATTERNS],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
        disallow: [...DISALLOWED_PATHS],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [...DISALLOWED_PATHS, ...DISALLOWED_DRAFT_PATTERNS],
      },
      {
        userAgent: "MSNBot-Media",
        allow: "/",
        disallow: [...DISALLOWED_PATHS],
      },
      {
        userAgent: "Pinterestbot",
        allow: "/",
        disallow: [...DISALLOWED_PATHS],
        crawlDelay: 0,
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: [...DISALLOWED_PATHS, ...DISALLOWED_DRAFT_PATTERNS],
      },
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
    ],
    host: SITE_URL,
  }
}
