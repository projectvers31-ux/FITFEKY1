"use client"

import dynamic from "next/dynamic"

import { StickyMobileCTA } from "@/components/shared/StickyMobileCTA"

const StickyMobileCTAClient = dynamic(
  () => Promise.resolve({ default: StickyMobileCTA }),
  { ssr: false },
)

interface Props {
  label: string
  href: string
  storageKey?: string
}

export function StickyMobileCTAWrapper({ label, href, storageKey }: Props) {
  return <StickyMobileCTAClient label={label} href={href} storageKey={storageKey} />
}
