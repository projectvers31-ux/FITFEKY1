import { Shield, Eye, Lock, FileText } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Privacy Policy — FitFeky",
  description:
    "How FitFeky collects, uses, and protects your data. GDPR & FTC compliant. No marketing cookies, no third-party trackers, no accounts.",
  path: "/privacy-policy",
  keywords: [
    "FitFeky privacy policy",
    "GDPR compliant",
    "FTC disclosure",
    "data protection",
    "no cookies analytics",
  ],
  imageAlt: "FitFeky privacy policy",
})

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-3 text-muted-foreground">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </header>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="size-5 text-primary" /> GDPR Compliance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed">
            <p>
              FitFeky (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is committed to
              protecting your privacy in compliance with the EU General Data Protection
              Regulation (GDPR).
            </p>
            <p>
              <strong>Data we collect:</strong> We collect minimal data. Our fitness calculators
              run entirely in your browser — your inputs (weight, height, etc.) are never sent
              to our servers. We use a privacy-friendly analytics tool (Plausible) that does
              not track individuals or use cookies.
            </p>
            <p>
              <strong>Your rights (GDPR):</strong> You have the right to access, correct,
              delete, or export any data we hold about you. To exercise these rights, contact
              us at privacy@fitfeky.com.
            </p>
            <p>
              <strong>Legal basis:</strong> We process data only on the legal basis of consent
              (e.g., newsletter signup) or legitimate interest (e.g., basic, anonymous
              analytics).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="size-5 text-primary" /> FTC Compliance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed">
            <p>
              In accordance with the Federal Trade Commission (FTC) guidelines (16 CFR Part
              255), we disclose material relationships with product manufacturers and
              advertisers.
            </p>
            <p>
              <strong>Affiliate links:</strong> FitFeky is a participant in the Amazon Services
              LLC Associates Program and other affiliate programs. We earn a commission when
              you click certain links and make a purchase. This is clearly disclosed on every
              page that contains such links.
            </p>
            <p>
              <strong>Honest reviews:</strong> Our reviews reflect our genuine opinions.
              Compensation does not influence our content. We will always disclose when we
              receive free products for review.
            </p>
            <p>
              <strong>Endorsement transparency:</strong> Any testimonial or endorsement on
              this site represents the individual&apos;s actual experience and is not
              compensated beyond free product (when applicable).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="size-5 text-primary" /> Cookies & Tracking
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed">
            <p>
              We use <strong>no marketing cookies</strong> and no third-party tracking
              scripts. Our analytics (Plausible) is cookieless and privacy-friendly by design.
            </p>
            <p>
              The only data stored in your browser is:
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Theme preference (light/dark mode)</li>
              <li>Affiliate disclosure dismissal state</li>
            </ul>
            <p>You can clear these at any time by clearing your browser&apos;s localStorage.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="size-5 text-primary" /> Data Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed">
            <p>
              All data transmission between your browser and our site is encrypted via HTTPS
              (TLS 1.3). We do not maintain user accounts, so there is no password database to
              compromise.
            </p>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third
              parties. Period.
            </p>
            <p>
              <strong>Children&apos;s privacy:</strong> Our site is not directed to children
              under 13, and we do not knowingly collect information from minors.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Changes to This Policy</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed">
            <p>
              We may update this privacy policy from time to time. The &ldquo;Last updated&rdquo;
              date at the top of this page reflects when changes were made. Continued use of
              the site after changes constitutes acceptance.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed">
            <p>
              Questions? Email us at <a href="mailto:privacy@fitfeky.com" className="text-primary underline-offset-4 hover:underline">privacy@fitfeky.com</a>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
