"use client"

import dynamic from "next/dynamic"

import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure"

const AffiliateDisclosureClient = dynamic(
  () => Promise.resolve({ default: AffiliateDisclosure }),
  { ssr: false },
)

export function AffiliateDisclosureWrapper() {
  return <AffiliateDisclosureClient />
}
