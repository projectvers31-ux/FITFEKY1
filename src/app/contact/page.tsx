import React from "react";

import { Background } from "@/components/background";
import Contact from "@/components/blocks/contact";
import { JsonLd, buildBreadcrumbList } from "@/components/shared/JsonLd";
import { buildContactPageSchema } from "@/lib/schema";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact FitFeky — We Read Every Message",
  description:
    "Found a bug in a calculator? Disagree with a review? Have a story to share? Reach out to the FitFeky editorial team — we read every email.",
  path: "/contact",
  keywords: [
    "contact FitFeky",
    "FitFeky support",
    "FitFeky editorial",
    "submit a story",
    "calculator feedback",
  ],
  imageAlt: "Contact the FitFeky team",
});

const Page = () => {
  const contactSchema = buildContactPageSchema({
    name: "Contact FitFeky",
    description:
      "Reach out to the FitFeky editorial team — we read every message about calculators, product reviews, and fitness content for women.",
    path: "/contact",
  })
  const breadcrumb = buildBreadcrumbList(SITE_URL, [
    { label: "Contact", href: "/contact" },
  ])

  return (
    <>
      <JsonLd data={[breadcrumb, contactSchema]} />
      <Background>
        <Contact />
      </Background>
    </>
  );
};

export default Page;