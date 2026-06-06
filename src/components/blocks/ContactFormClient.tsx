"use client"

import dynamic from "next/dynamic"

const ContactForm = dynamic(
  () => import("./contact-form").then((m) => m.ContactForm),
  {
    ssr: false,
    loading: () => (
      <div className="w-full space-y-4 rounded-md border p-2 sm:p-5 md:p-8">
        <div className="h-10 w-1/3 animate-pulse rounded-md bg-muted" />
        <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
        <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
        <div className="h-32 w-full animate-pulse rounded-md bg-muted" />
        <div className="ml-auto h-10 w-24 animate-pulse rounded-md bg-muted" />
      </div>
    ),
  },
)

export default function ContactFormClient() {
  return <ContactForm />
}
